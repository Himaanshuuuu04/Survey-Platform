import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

// We use a global variable to cache the MongoClient in a serverless environment to prevent connection leaks
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri || mongoUri.includes("<username>")) {
    throw new Error("MONGODB_URI is not configured in .env.local");
  }
  const client = new MongoClient(mongoUri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Extract the latest message and chat history
    const latestMessage = messages[messages.length - 1];
    const historyMessages = messages.slice(0, messages.length - 1);

    // Convert history to LangChain message instances
    const chatHistory = historyMessages.map((msg: any) => {
      if (msg.sender === "user") return new HumanMessage(msg.text);
      if (msg.sender === "bot") return new AIMessage(msg.text);
      return new HumanMessage(msg.text);
    });

    // 1. Initialize MongoDB Vector Store
    const client = await getMongoClient();
    const collection = client.db("langchain_db").collection("documents");
    
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-2",
    });

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: collection as any,
      indexName: "vector_index",
      textKey: "text",
      embeddingKey: "embedding",
    });

    const retriever = vectorStore.asRetriever({ k: 4 });

    // 2. Initialize the Chat Model
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-3.5-flash",
      temperature: 0.7,
    });

    const formatDocs = (docs: any[]) => docs.map((doc) => doc.pageContent).join("\n\n");

    // 3. Create History-Aware Retriever logic using LCEL
    const contextualizeQSystemPrompt = `Given a chat history and the latest user question 
which might reference context in the chat history, formulate a standalone question 
which can be understood without the chat history. Do NOT answer the question, 
just reformulate it if needed and otherwise return it as is.`;

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const historyAwareRetriever = RunnableSequence.from([
      contextualizeQPrompt,
      model,
      new StringOutputParser(),
      retriever,
    ]);

    // 4. Create Document Chain logic
    const qaSystemPrompt = `You are Sarah Jenkins, an expert Market Research assistant at EvoGlobalInsight.
Use the following pieces of retrieved context to answer the user's question.
If you don't know the answer based on the context, you can rely on your general market research knowledge, but prioritize the context.
Keep your answers concise, professional, and conversational (avoid markdown headers where possible).

Context:
{context}`;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", qaSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    // 5. Combine into a Conversational RAG Chain
    const ragChain = RunnableSequence.from([
      {
        // If there is no chat history, we don't need to contextualize the question.
        context: async (input: { input: string; chat_history: any[] }) => {
          if (input.chat_history.length === 0) {
            const docs = await retriever.invoke(input.input);
            return formatDocs(docs);
          } else {
            const docs = await historyAwareRetriever.invoke(input);
            return formatDocs(docs);
          }
        },
        input: (input: any) => input.input,
        chat_history: (input: any) => input.chat_history,
      },
      qaPrompt,
      model,
      new StringOutputParser(),
    ]);

    // 6. Invoke the RAG Chain
    const responseText = await ragChain.invoke({
      chat_history: chatHistory,
      input: latestMessage.text,
    });

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: error.message || "Failed to process chat" }, { status: 500 });
  }
}
