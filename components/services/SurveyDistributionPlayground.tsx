"use client";

import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export function SurveyDistributionPlayground() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex items-center justify-center p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,132,255,0.03),transparent_70%)] pointer-events-none" />

      {/* SVG Path lines for connections */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B84FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Connection curve lines */}
        <path d="M 200 150 Q 110 110 60 70" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 200 150 Q 290 110 340 70" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 200 150 Q 110 190 60 230" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 200 150 Q 290 190 340 230" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Native animated flowing particles */}
        <circle r="4" fill="#02E8F8" filter="url(#glow)">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 200 150 Q 110 110 60 70" />
        </circle>
        <circle r="4" fill="#5B84FF" filter="url(#glow)">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 200 150 Q 290 110 340 70" />
        </circle>
        <circle r="4" fill="#5B84FF" filter="url(#glow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M 200 150 Q 110 190 60 230" />
        </circle>
        <circle r="4" fill="#02E8F8" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 200 150 Q 290 190 340 230" />
        </circle>
      </svg>

      {/* Central Hub Node */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ boxShadow: ["0 0 15px rgba(91,132,255,0.2)", "0 0 30px rgba(91,132,255,0.4)", "0 0 15px rgba(91,132,255,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center shadow-lg"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#02E8F8] animate-pulse absolute top-2 right-2" />
          <Send size={20} className="text-[#5B84FF]" />
          <span className="text-[7px] font-black uppercase text-zinc-400 tracking-wider mt-1.5">CORE</span>
        </motion.div>
      </div>

      {/* Channel Nodes */}
      <div className="absolute top-[35px] left-[20px] sm:left-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">Panel API</span>
          <span className="text-[7.5px] font-medium text-zinc-400">Direct integration</span>
          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Connected
          </span>
        </motion.div>
      </div>

      <div className="absolute top-[35px] right-[20px] sm:right-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">SMS Link</span>
          <span className="text-[7.5px] font-medium text-zinc-400">Mobile direct</span>
          <span className="text-[8px] font-bold text-[#5B84FF] bg-[#5B84FF]/5 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#02E8F8] animate-pulse" /> Active
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-[35px] left-[20px] sm:left-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">Email Send</span>
          <span className="text-[7.5px] font-medium text-zinc-400">Secure templates</span>
          <span className="text-[8px] font-bold text-[#5B84FF] bg-[#5B84FF]/5 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#02E8F8] animate-pulse" /> Transmitting
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-[35px] right-[20px] sm:right-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">Mobile App</span>
          <span className="text-[7.5px] font-medium text-zinc-400">In-app intercept</span>
          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Connected
          </span>
        </motion.div>
      </div>
    </div>
  );
}
