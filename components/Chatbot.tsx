"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ChevronDown, MoreVertical, Paperclip, Smile, Send, MessageCircle, Bot } from "lucide-react";


interface MarkdownRendererProps {
  text: string;
  isUser: boolean;
}

function MarkdownRenderer({ text, isUser }: MarkdownRendererProps) {
  const parseInline = (inlineText: string): React.ReactNode[] => {
    // Regex for bold, italic, inline code, and markdown links
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = inlineText.split(regex);
    
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong 
            key={index} 
            className={`font-semibold ${isUser ? "text-white font-bold" : "text-gray-900 font-bold"}`}
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em 
            key={index} 
            className={`italic ${isUser ? "text-white/95" : "text-gray-800"}`}
          >
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code 
            key={index} 
            className={`px-1 py-0.5 rounded font-mono text-sm ${
              isUser 
                ? "bg-white/20 text-white" 
                : "bg-gray-200 text-red-600"
            }`}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a 
            key={index} 
            href={linkMatch[2]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`underline transition-colors ${
              isUser 
                ? "text-white hover:text-white/80" 
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  const lines = text.split(/\r?\n/);
  const blocks: Array<
    | { type: "p" | "h1" | "h2" | "h3" | "h4"; text: string }
    | { type: "ul" | "ol"; items: string[] }
  > = [];
  
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      continue;
    }

    // Headers
    const headerMatch = trimmedLine.match(/^(#{1,4})\s+(.*)$/);
    if (headerMatch) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      const level = headerMatch[1].length;
      blocks.push({
        type: `h${level}` as any,
        text: headerMatch[2],
      });
      continue;
    }

    // Bullet lists (supporting *, -, •)
    const bulletMatch = trimmedLine.match(/^[*•-]\s+(.*)$/);
    if (bulletMatch) {
      if (currentList && currentList.type !== "ul") {
        blocks.push(currentList);
        currentList = null;
      }
      if (!currentList) {
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Numbered lists
    const numberMatch = trimmedLine.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      if (currentList && currentList.type !== "ol") {
        blocks.push(currentList);
        currentList = null;
      }
      if (!currentList) {
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(numberMatch[1]);
      continue;
    }

    // Paragraph
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
    blocks.push({ type: "p", text: line });
  }

  if (currentList) {
    blocks.push(currentList);
  }

  return (
    <div className="flex flex-col gap-2">
      {blocks.map((block, bIdx) => {
        switch (block.type) {
          case "ul":
            return (
              <ul 
                key={bIdx} 
                className={`list-disc pl-5 my-0.5 flex flex-col gap-1 ${
                  isUser ? "text-white" : "text-gray-700"
                }`}
              >
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed">
                    {parseInline(item)}
                  </li>
                ))}
              </ul>
            );
          
          case "ol":
            return (
              <ol 
                key={bIdx} 
                className={`list-decimal pl-5 my-0.5 flex flex-col gap-1 ${
                  isUser ? "text-white" : "text-gray-700"
                }`}
              >
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed">
                    {parseInline(item)}
                  </li>
                ))}
              </ol>
            );

          case "h1":
          case "h2":
          case "h3":
          case "h4": {
            const HeadingTag = block.type;
            const headingClasses: Record<string, string> = {
              h1: "text-xl font-bold mt-2 mb-1",
              h2: "text-lg font-semibold mt-2 mb-1",
              h3: "text-base font-semibold mt-1.5 mb-1",
              h4: "text-sm font-semibold mt-1 mb-1",
            };
            return (
              <HeadingTag 
                key={bIdx} 
                className={`${headingClasses[block.type]} ${
                  isUser ? "text-white" : "text-gray-900"
                }`}
              >
                {parseInline(block.text)}
              </HeadingTag>
            );
          }

          case "p":
          default:
            return (
              <p 
                key={bIdx} 
                className={`leading-relaxed ${
                  isUser ? "text-white" : "text-gray-700"
                }`}
              >
                {parseInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
    file?: {
      name: string;
      size: number;
      type: string;
    };
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! 👋 Welcome to EvoGlobalInsight. How can we help you with your market research, audience intelligence, or consumer insight needs today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  // GSAP animation for premium entrance of chat options when opened
  useEffect(() => {
    if (isOpen && optionsRef.current) {
      const options = optionsRef.current.children;
      gsap.fromTo(
        options,
        { opacity: 0, y: 15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1, // Wait for modal animation or new message rendering
        }
      );
    }
  }, [isOpen, isTyping, messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const fetchBotResponse = async (currentMessages: Message[], newUserMsg: Message) => {
    const newHistory = [...currentMessages, newUserMsg];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: data.text || "Sorry, I couldn't process that.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: "I'm sorry, I'm having trouble connecting to the servers right now. Please check your API keys.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: trimmed,
    };
    
    setInputValue("");
    fetchBotResponse(messages, userMsg);
  };

  const handleOptionClick = (option: string) => {
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: option,
    };
    
    fetchBotResponse(messages, userMsg);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: `Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB). Please review it.`,
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
      },
    };

    e.target.value = ""; // Reset file input value
    fetchBotResponse(messages, fileMessage);
  };

  const handleBotClick = () => {
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: "Who are you and how can you help me?",
    };
    fetchBotResponse(messages, userMsg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col absolute bottom-0 right-0 origin-bottom-right"
            style={{ height: "600px", maxHeight: "80vh" }}
          >
            {/* Header Section */}
            <div className="relative">
              {/* Main blue gradient header */}
              <div 
                className="pt-5 pb-8 px-5 flex items-center justify-between"
                style={{ background: "linear-gradient(90deg, #3C83F6 0%, #12D5F8 100%)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
                      alt="Sarah Jenkins" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <div className="text-xs font-medium text-white/80">Research Expert</div>
                    <div className="text-lg font-bold leading-tight tracking-wide">Sarah Jenkins</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <MoreVertical size={20} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronDown size={24} />
                  </button>
                </div>
              </div>
              
              {/* White curve masking the bottom of the blue header */}
              <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[25px]">
                  <path d="M0,0 V46.29 c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#ffffff"></path>
                </svg>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 bg-white flex flex-col gap-4 no-scrollbar">
              {/* Messages List */}
              {messages.map((message) => (
                <motion.div 
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed max-w-[85%] ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm self-end"
                      : "bg-gray-100 text-gray-700 rounded-tl-sm self-start"
                  }`}
                  style={message.sender === "user" ? { background: "linear-gradient(135deg, #3C83F6 0%, #12D5F8 100%)" } : {}}
                >
                  {message.file ? (
                    <div className="flex items-center gap-2">
                      <Paperclip size={18} className="shrink-0" />
                      <div className="text-left">
                        <div className="font-semibold text-sm line-clamp-1 break-all">{message.file.name}</div>
                        <div className="text-[10px] text-white/80">{(message.file.size / 1024).toFixed(1)} KB</div>
                      </div>
                    </div>
                  ) : (
                    <MarkdownRenderer text={message.text} isUser={message.sender === "user"} />
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-gray-400 text-[15px] leading-relaxed max-w-[85%] self-start flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </motion.div>
              )}

              {/* Options */}
              {!isTyping && messages[messages.length - 1]?.sender === "bot" && (
                <div ref={optionsRef} className="flex flex-wrap gap-2 justify-end mt-2">
                  {["Consumer Insights", "Audience Panel", "B2B Research", "Pricing"].map((option, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="px-4 py-1.5 rounded-full border border-[var(--brand)] text-[var(--brand-dark)] text-sm font-medium hover:bg-[var(--brand-soft)] transition-colors cursor-pointer"
                    >
                      {option}
                    </button>
                  ))}
                  <button 
                    onClick={() => handleOptionClick("Talk to a Researcher")}
                    className="px-4 py-1.5 rounded-full border border-[var(--brand)] text-[var(--brand-dark)] text-sm font-medium hover:bg-[var(--brand-soft)] transition-colors relative cursor-pointer"
                  >
                    Talk to a Researcher
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input Area */}
            <div className="px-5 py-4 border-t border-gray-100 bg-white relative">
              {/* Emoji Picker Overlay */}
              {emojiOpen && (
                <div className="absolute bottom-20 left-5 bg-white border border-gray-200 shadow-xl rounded-xl p-3 flex gap-2 z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {["😊", "👍", "👋", "🔥", "💡", "🚀", "📊", "❤️"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setInputValue(prev => prev + emoji);
                        setEmojiOpen(false);
                      }}
                      className="text-xl hover:scale-125 transition-transform cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {/* Hidden File Input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="*/*"
              />

              <input 
                type="text" 
                placeholder="Enter your message..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="w-full text-[15px] outline-none text-gray-700 placeholder-gray-400 pb-4"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-gray-400">
                  <button 
                    onClick={handleBotClick}
                    className="hover:text-gray-600 transition-colors cursor-pointer"
                    title="Assistant Help"
                  >
                    <Bot size={20} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="hover:text-gray-600 transition-colors cursor-pointer"
                    title="Upload File"
                  >
                    <Paperclip size={20} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={() => setEmojiOpen(!emojiOpen)}
                    className="hover:text-gray-600 transition-colors cursor-pointer"
                    title="Insert Emoji"
                  >
                    <Smile size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Send Button */}
              <button 
                onClick={handleSendMessage}
                className="absolute right-5 bottom-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform cursor-pointer"
                style={{ background: "linear-gradient(135deg, #3C83F6 0%, #12D5F8 100%)" }}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, x: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30 absolute bottom-0 right-0 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #3C83F6 0%, #12D5F8 100%)" }}
          >
            <MessageCircle size={32} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
