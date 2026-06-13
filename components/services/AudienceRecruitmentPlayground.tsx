"use client";

import { motion } from 'motion/react';

export function AudienceRecruitmentPlayground() {
  const floatingChips = [
    { text: "B2B Tech Buyers", x: "-35%", y: "-25%", delay: 0, color: "text-[#5B84FF] border-[#5B84FF]/20" },
    { text: "Healthcare Pro", x: "32%", y: "-35%", delay: 0.5, color: "text-[#2563EB] border-[#2563EB]/20" },
    { text: "SMB Owners", x: "-38%", y: "25%", delay: 1, color: "text-[#7C3AED] border-[#7C3AED]/20" },
    { text: "Active Parents", x: "35%", y: "20%", delay: 1.5, color: "text-[#02E8F8] border-[#02E8F8]/20" },
    { text: "Global Students", x: "2%", y: "-42%", delay: 2, color: "text-[#5B84FF] border-[#5B84FF]/20" },
    { text: "Niche Consumers", x: "-2%", y: "42%", delay: 2.5, color: "text-[#7C3AED] border-[#7C3AED]/20" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex items-center justify-center p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[14%] aspect-square rounded-full border border-dashed border-zinc-200" />
        <div className="w-[34%] aspect-square rounded-full border border-dashed border-zinc-200/80 absolute" />
        <div className="w-[58%] aspect-square rounded-full border border-dashed border-zinc-200/60 absolute" />
        <div className="w-[82%] aspect-square rounded-full border border-dashed border-zinc-200/40 absolute" />
      </div>

      {/* Crosshairs lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 to-transparent" />
        <div className="h-[85%] w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 to-transparent absolute" />
      </div>

      {/* Pulse radar scanner effect */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] aspect-square rounded-full bg-[conic-gradient(from_0deg,rgba(91,132,255,0.06),transparent_40%)] pointer-events-none origin-center"
      />

      {/* Target Center Node */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 rounded-full bg-[#5B84FF] flex items-center justify-center relative shadow-[0_0_15px_rgba(91,132,255,0.4)]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="absolute -inset-3 rounded-full border border-[#5B84FF]/30 animate-ping" />
        </motion.div>
      </div>

      {/* Floating demographic tag chips */}
      {floatingChips.map((chip, idx) => (
        <motion.div
          key={idx}
          style={{ x: chip.x, y: chip.y }}
          animate={{
            y: [`calc(${chip.y} - 8px)`, `calc(${chip.y} + 8px)`, `calc(${chip.y} - 8px)`],
            x: [`calc(${chip.x} - 6px)`, `calc(${chip.x} + 6px)`, `calc(${chip.x} - 6px)`]
          }}
          transition={{
            duration: 5 + idx,
            repeat: Infinity,
            delay: chip.delay,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.08, zIndex: 30 }}
          className={`absolute px-3.5 py-2 rounded-2xl border bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(91,132,255,0.15)] select-none ${chip.color}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#02E8F8]" />
          {chip.text}
        </motion.div>
      ))}
    </div>
  );
}
