"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ChevronDown, MoreVertical, Paperclip, Smile, Send, MessageCircle, Bot } from "lucide-react";


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

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
          delay: 0.3, // Wait for modal animation to finish mostly
        }
      );
    }
  }, [isOpen]);

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
                  <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <MoreVertical size={20} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
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
              {/* Bot greeting */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-gray-700 text-[15px] leading-relaxed max-w-[85%] self-start"
              >
                Hi there! 👋 Welcome to EvoGlobalInsight. How can we help you with your market research, audience intelligence, or consumer insight needs today?
              </motion.div>

              {/* Options */}
              <div ref={optionsRef} className="flex flex-wrap gap-2 justify-end mt-2">
                {["Consumer Insights", "Audience Panel", "B2B Research", "Pricing"].map((option, idx) => (
                  <button 
                    key={idx}
                    className="px-4 py-1.5 rounded-full border border-[var(--brand)] text-[var(--brand-dark)] text-sm font-medium hover:bg-[var(--brand-soft)] transition-colors"
                  >
                    {option}
                  </button>
                ))}
                <button className="px-4 py-1.5 rounded-full border border-[var(--brand)] text-[var(--brand-dark)] text-sm font-medium hover:bg-[var(--brand-soft)] transition-colors relative">
                  Talk to a Researcher
                  {/* Small red arrow from image (conceptual) */}
                  {/* <img src="/red-arrow.png" className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-10 pointer-events-none" /> */}
                </button>
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input Area */}
            <div className="px-5 py-4 border-t border-gray-100 bg-white relative">
              <input 
                type="text" 
                placeholder="Enter your message..." 
                className="w-full text-[15px] outline-none text-gray-700 placeholder-gray-400 pb-4"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors"><Bot size={20} strokeWidth={1.5} /></button>
                  <button className="hover:text-gray-600 transition-colors"><Paperclip size={20} strokeWidth={1.5} /></button>
                  <button className="hover:text-gray-600 transition-colors"><Smile size={20} strokeWidth={1.5} /></button>
                  
                  
                </div>
              </div>

              {/* Send Button */}
              <button 
                className="absolute right-5 bottom-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform"
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
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30 absolute bottom-0 right-0"
            style={{ background: "linear-gradient(135deg, #3C83F6 0%, #12D5F8 100%)" }}
          >
            <MessageCircle size={32} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
