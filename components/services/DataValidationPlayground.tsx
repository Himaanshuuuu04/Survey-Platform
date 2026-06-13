"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export function DataValidationPlayground() {
  const [inflow, setInflow] = useState<Array<{ id: number; name: string; type: string; status: 'pending' | 'verified' | 'failed'; detail: string }>>([
    { id: 1, name: "Response #9821", type: "VPN Proxy Check", status: 'pending', detail: "Analyzing IP reputation..." },
    { id: 2, name: "Response #9822", type: "B2B Tech Cohort", status: 'verified', detail: "Valid fingerprint match" },
    { id: 3, name: "Response #9823", type: "Speedrunner Match", status: 'failed', detail: "Completed in 14s (threshold 120s)" },
    { id: 4, name: "Response #9824", type: "Healthcare Cohort", status: 'verified', detail: "Unique device record verified" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInflow(prev => {
        const next = [...prev];
        const first = next.shift()!;
        const newId = first.id + 4;
        const randomType = Math.random() > 0.5 
          ? (Math.random() > 0.5 ? "B2B Tech Cohort" : "Consumer Panel")
          : (Math.random() > 0.5 ? "VPN Proxy Check" : "Speedrunner Match");
        
        let status: 'pending' | 'verified' | 'failed' = 'pending';
        let detail = "Analyzing...";
        if (randomType.includes("Cohort") || randomType.includes("Panel")) {
          status = 'verified';
          detail = "Unique device record verified";
        } else if (randomType.includes("VPN")) {
          status = 'failed';
          detail = "Residential proxy mismatch";
        } else {
          status = 'failed';
          detail = "Completed in under 15 seconds";
        }

        const newItem = {
          id: newId,
          name: `Response #${newId + 9800}`,
          type: randomType,
          status,
          detail
        };
        return [...next, newItem];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex flex-col justify-between p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60 z-10">
        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Validation Shield Feed</span>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-mono">
          99.7% ACCURACY
        </span>
      </div>

      <div className="flex flex-col gap-2.5 relative z-10 flex-grow justify-center py-4 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {inflow.map((item, index) => {
            const isPending = index === 0;
            const isVerified = item.status === 'verified';
            const isFailed = item.status === 'failed';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ 
                  opacity: isPending ? 0.6 : (isFailed ? 0.35 : 1),
                  scale: isFailed ? 0.96 : 1,
                  y: 0,
                  borderColor: isPending ? "rgb(228,228,231)" : (isFailed ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)")
                }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-2.5 bg-white border rounded-xl flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <div className="flex flex-col text-left gap-0.5">
                  <span className="text-[9.5px] font-black uppercase tracking-wide text-zinc-900">{item.name}</span>
                  <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{item.type}</span>
                  <span className="text-[8px] font-semibold text-zinc-500">{item.detail}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isPending ? (
                    <span className="text-[8px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 font-sans">
                      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" /> Check
                    </span>
                  ) : isVerified ? (
                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 font-sans">
                      <Check size={8} strokeWidth={3} /> Verified
                    </span>
                  ) : (
                    <span className="text-[8px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 font-sans">
                      Discarded
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200/60 text-center z-10">
        <div>
          <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-wider">Device ID</span>
          <span className="text-[9px] font-bold text-zinc-800 font-mono">Fingerprint</span>
        </div>
        <div>
          <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-wider">Geographic</span>
          <span className="text-[9px] font-bold text-zinc-800 font-mono">Verified IP</span>
        </div>
        <div>
          <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-wider">Behavioral</span>
          <span className="text-[9px] font-bold text-zinc-800 font-mono">Keystroke</span>
        </div>
      </div>
    </div>
  );
}
