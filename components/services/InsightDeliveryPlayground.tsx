"use client";

import { useState } from 'react';
import { motion } from 'motion/react';

export function InsightDeliveryPlayground() {
  const [activeTab, setActiveTab] = useState<'b2b' | 'consumers' | 'healthcare'>('b2b');

  const data = {
    b2b: [
      { label: "US Tech Leaders", value: 92, count: "480 completed" },
      { label: "EU IT Managers", value: 85, count: "390 completed" },
      { label: "APAC Developers", value: 78, count: "380 completed" }
    ],
    consumers: [
      { label: "Premium Shoppers", value: 95, count: "620 completed" },
      { label: "Active Parents", value: 88, count: "510 completed" },
      { label: "Suburban Families", value: 91, count: "550 completed" }
    ],
    healthcare: [
      { label: "Primary Care MDs", value: 86, count: "120 completed" },
      { label: "Clinical Specialists", value: 80, count: "95 completed" },
      { label: "Nursing Directors", value: 89, count: "140 completed" }
    ]
  };

  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex flex-col justify-between p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60 z-10">
        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Live Metrics Console</span>
        <div className="flex gap-1 bg-zinc-200/60 p-1 rounded-xl">
          {(['b2b', 'consumers', 'healthcare'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 rounded-lg text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-white text-zinc-900 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10 flex-grow justify-center py-4">
        {data[activeTab].map((item, idx) => (
          <div key={idx} className="flex flex-col text-left gap-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-700">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B84FF]" />
                {item.label}
              </span>
              <span className="font-mono text-zinc-900 text-[11px] font-black">{item.value}% Valid</span>
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="h-3 bg-zinc-100/90 rounded-full flex-grow overflow-hidden border border-zinc-200/40">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#5B84FF] to-[#02E8F8]"
                />
              </div>
              <span className="text-[9px] font-bold text-zinc-400 min-w-[70px] text-right font-mono uppercase tracking-tight">{item.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-zinc-200/60 text-center z-10">
        <div className="bg-white border border-zinc-100 rounded-2xl p-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.005)]">
          <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-tight">Total Sync</span>
          <span className="text-sm font-black text-zinc-950 font-mono tracking-tight">1.6M+</span>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.005)]">
          <span className="block text-[8px] font-black text-[#5B84FF] uppercase tracking-widest leading-tight">Validity</span>
          <span className="text-sm font-black text-emerald-600 font-mono tracking-tight">99.7%</span>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.005)]">
          <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-tight">Duplicates</span>
          <span className="text-sm font-black text-zinc-950 font-mono tracking-tight">0.0%</span>
        </div>
      </div>
    </div>
  );
}
