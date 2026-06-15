import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri || mongoUri.includes("<username>")) {
      return NextResponse.json({ error: "Please configure your MONGODB_URI in .env.local" }, { status: 500 });
    }

    // 1. Initialize MongoDB Client
    const client = new MongoClient(mongoUri);
    await client.connect();

    // The database and collection where you want to store vectors
    // Please ensure you have created a Vector Search Index on this collection via the Atlas UI
    const namespace = "langchain_db.documents";
    const [dbName, collectionName] = namespace.split(".");
    const collection = client.db(dbName).collection(collectionName);

    // 2. Load the PDF Document from the public folder
    const pdfPath = path.join(process.cwd(), "public", "Designing robust electronic surveys in marketing research.pdf");
    const loader = new PDFLoader(pdfPath);
    const rawDocs = await loader.load();

    // 3. Split the Document into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(rawDocs);

    // 4. Initialize Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
    });

    // 5. Ingest into MongoDB Atlas Vector Search
    // Note: Ensure your index is named "default" (or specify the name) and supports 768 dimensions for Gemini.
    await MongoDBAtlasVectorSearch.fromDocuments(splitDocs, embeddings, {
      collection: collection as any,
      indexName: "vector_index", // Matches the index name you create in Atlas
      textKey: "text",
      embeddingKey: "embedding",
    });

    await client.close();

    return NextResponse.json({ success: true, message: `Successfully ingested ${splitDocs.length} document chunks into MongoDB.` });
  } catch (error: any) {
    console.error("Ingestion Error:", error);
    return NextResponse.json({ error: error.message || "Failed to ingest document" }, { status: 500 });
  }
}
