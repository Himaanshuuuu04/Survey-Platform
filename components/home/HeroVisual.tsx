"use client";

import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, TrendingUp, Users, Check } from 'lucide-react';

export function HeroVisual() {
  // Float animations configuration to add depth
  const floatTransition = (duration: number, delay: number): any => ({
    duration: duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay
  });

  return (
    <div className="relative mx-auto w-full max-w-[430px] lg:max-w-none pt-4 pb-8 px-2">
      {/* Background radial glow behind dashboard mockups */}
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(14,107,99,0.07),transparent_50%)] opacity-95 blur-3xl pointer-events-none" />

      {/* 1. Main Dashboard Mockup Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06),0_16px_32px_-20px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-500 hover:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.1)]"
      >
        {/* Dashboard Content */}
        <div className="space-y-4">
          {/* Top Quick Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-[#FBFBFC] border border-zinc-200/50 p-2.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-colors hover:bg-zinc-50">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400">Total Responses</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-black tracking-tight text-zinc-950">48,291</span>
                <span className="text-[8px] font-bold text-emerald-600 flex items-center leading-none">
                  <TrendingUp size={7} className="mr-0.5" /> +12.4%
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-[#FBFBFC] border border-zinc-200/50 p-2.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-colors hover:bg-zinc-50">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400">Completion</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base font-black tracking-tight text-zinc-950">92.4%</span>
                <span className="text-[8px] font-semibold text-zinc-500">avg</span>
              </div>
            </div>
            <div className="rounded-xl bg-[#FBFBFC] border border-zinc-200/50 p-2.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-colors hover:bg-zinc-50">
              <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400">Audit Status</span>
              <div className="flex items-baseline mt-1">
                <span className="text-[9px] font-black uppercase text-[#0E6B63] bg-[#0E6B63]/10 px-1.5 py-0.5 rounded tracking-wide shadow-sm border border-[#0E6B63]/10">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* SVG Performance Chart */}
          <div className="rounded-xl bg-zinc-50/50 border border-zinc-150 p-3 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-zinc-400">
                Responses Stream (Last 24h)
              </span>
              <span className="text-[8px] font-black text-[#0E6B63] bg-white border border-zinc-100 px-1.5 py-0.5 rounded shadow-sm">
                +1,420 responses/hr
              </span>
            </div>
            <div className="h-20 w-full relative">
              <svg className="h-full w-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E6B63" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#0E6B63" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="3,3" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="3,3" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="3,3" />

                {/* Custom target benchmark line */}
                <line x1="0" y1="45" x2="400" y2="45" stroke="#0E6B63" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />

                {/* Area Fill */}
                <path
                  d="M0,120 L0,95 C30,90 50,60 90,75 C130,90 150,30 190,45 C230,60 250,15 290,20 C330,25 360,65 400,55 L400,120 Z"
                  fill="url(#chartGrad)"
                />
                {/* Line */}
                <path
                  d="M0,95 C30,90 50,60 90,75 C130,90 150,30 190,45 C230,60 250,15 290,20 C330,25 360,65 400,55"
                  fill="none"
                  stroke="#0E6B63"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Highlight Point Glow & Center */}
                <circle cx="290" cy="20" r="6" fill="#0E6B63" opacity="0.15" />
                <circle cx="290" cy="20" r="3.5" fill="#FFFFFF" stroke="#0E6B63" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* Demographic Breakdown */}
          <div className="space-y-1.5">
            <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400">
              High-Fidelity Respondent Target
            </span>
            <div className="space-y-1.5">
              {[
                { role: 'Software Developers', pct: 42, width: '42%' },
                { role: 'Product Managers', pct: 31, width: '31%' },
                { role: 'UX Designers', pct: 18, width: '18%' }
              ].map((item) => (
                <div key={item.role} className="flex items-center justify-between text-[10px] font-semibold text-zinc-700">
                  <div className="w-1/3 text-zinc-600 truncate">{item.role}</div>
                  <div className="w-1/2 bg-zinc-100 h-1.5 rounded-full overflow-hidden mx-3 shadow-inner">
                    <div className="bg-[#0E6B63] h-full rounded-full transition-all duration-500 shadow-sm" style={{ width: item.width }} />
                  </div>
                  <div className="w-10 text-right text-zinc-950 font-bold">{item.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Floating UI Cards */}
      {/* Card 1: 92% Completion Rate */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
        transition={{
          opacity: { delay: 0.3, duration: 0.6 },
          x: { delay: 0.3, duration: 0.6 },
          y: floatTransition(5.5, 0.2)
        }}
        className="absolute -top-2 right-2 z-25 bg-white/95 backdrop-blur-md border border-zinc-200 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] rounded-xl px-2.5 py-1.5 flex items-center gap-2 hover:shadow-[0_16px_32px_rgba(0,0,0,0.09)] hover:scale-[1.03] transition-all duration-300"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
          <Check size={10} strokeWidth={3.5} />
        </div>
        <div>
          <span className="block text-[7px] font-bold uppercase tracking-wider text-zinc-400 leading-none">Avg Completion</span>
          <span className="text-[10.5px] font-black text-zinc-950">92% Completion Rate</span>
        </div>
      </motion.div>

      {/* Card 2: Bot Detection Active */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 4, 0] }}
        transition={{
          opacity: { delay: 0.45, duration: 0.6 },
          x: { delay: 0.45, duration: 0.6 },
          y: floatTransition(6, 0.5)
        }}
        className="absolute top-[44%] -left-2 lg:-left-4 z-25 bg-white/95 backdrop-blur-md border border-zinc-200 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] rounded-xl px-2.5 py-1.5 flex items-center gap-2 hover:shadow-[0_16px_32px_rgba(0,0,0,0.09)] hover:scale-[1.03] transition-all duration-300"
      >
        <div className="w-5 h-5 rounded-full bg-[#0E6B63]/10 border border-[#0E6B63]/20 flex items-center justify-center text-[#0E6B63] shadow-sm">
          <ShieldCheck size={10} strokeWidth={3} />
        </div>
        <div>
          <span className="block text-[7px] font-bold uppercase tracking-wider text-zinc-400 leading-none">Security Engine</span>
          <span className="text-[10.5px] font-black text-zinc-950">Bot Detection Active</span>
        </div>
      </motion.div>

      {/* Card 3: Verified Respondents */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.6 },
          x: { delay: 0.6, duration: 0.6 },
          y: floatTransition(6.5, 0.8)
        }}
        className="absolute top-[22%] -right-14 lg:-right-18 z-25 bg-white/95 backdrop-blur-md border border-zinc-200 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] rounded-xl px-2.5 py-1.5 flex items-center gap-2 hover:shadow-[0_16px_32px_rgba(0,0,0,0.09)] hover:scale-[1.03] transition-all duration-300"
      >
        <div className="w-5 h-5 rounded-full bg-[#0E6B63]/10 border border-[#0E6B63]/20 flex items-center justify-center text-[#0E6B63] shadow-sm">
          <Users size={10} strokeWidth={3} />
        </div>
        <div>
          <span className="block text-[7px] font-bold uppercase tracking-wider text-zinc-400 leading-none">Audience Quality</span>
          <span className="text-[10.5px] font-black text-zinc-950">Verified Respondents</span>
        </div>
      </motion.div>

      {/* Card 4: 250K+ Responses */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 3, 0] }}
        transition={{
          opacity: { delay: 0.75, duration: 0.6 },
          y: floatTransition(5, 1.2)
        }}
        className="absolute bottom-1 -right-2 z-25 bg-white/95 backdrop-blur-md border border-zinc-200 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] rounded-xl px-2.5 py-1.5 flex items-center gap-2 hover:shadow-[0_16px_32px_rgba(0,0,0,0.09)] hover:scale-[1.03] transition-all duration-300"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
          <TrendingUp size={10} strokeWidth={3} />
        </div>
        <div>
          <span className="block text-[7px] font-bold uppercase tracking-wider text-zinc-400 leading-none">Platform Scale</span>
          <span className="text-[10.5px] font-black text-zinc-950">250K+ Responses</span>
        </div>
      </motion.div>

      {/* 3. Floating Testimonial Over Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -3, 0] }}
        transition={{
          opacity: { delay: 0.9, duration: 0.8 },
          y: floatTransition(7, 0)
        }}
        className="absolute -bottom-6 -left-2 lg:-left-6 z-30 max-w-[280px] rounded-2xl border border-white/60 bg-white/80 backdrop-blur-lg p-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1),0_8px_16px_-8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[0_36px_60px_rgba(0,0,0,0.14)] transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {/* Styled SVG Avatar */}
            <svg className="w-8.5 h-8.5 rounded-full border border-zinc-200/60 shadow-sm" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="url(#avatar-grad)" />
              <defs>
                <linearGradient id="avatar-grad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#0E6B63" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#0E6B63" stopOpacity={0.85} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="40" r="18" fill="#FFFFFF" />
              <path d="M22,80 C22,62 34,55 50,55 C66,55 78,62 78,80 Z" fill="#FFFFFF" />
            </svg>
            <div>
              <span className="block text-[11px] font-black text-zinc-950">Sarah Jenkins</span>
              <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-500">VP of Product</span>
            </div>
          </div>
          {/* Company logo mock (VeloCare) */}
          <div className="flex items-center text-[9px] tracking-tighter">
            <span className="font-extrabold text-[#0E6B63]">Velo</span>
            <span className="font-semibold text-zinc-800">Care</span>
          </div>
        </div>

        <p className="mt-2.5 text-[10.5px] font-semibold leading-relaxed text-zinc-800">
          “Pulselens helped us target our niche demographics and scale responses overnight.”
        </p>

        {/* Verified customer badge */}
        <div className="mt-2.5 flex items-center justify-between border-t border-zinc-100/60 pt-2">
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 border border-emerald-100/50 shadow-inner">
            <CheckCircle2 size={9} className="text-emerald-600 animate-pulse" strokeWidth={3.5} />
            <span className="text-[7px] font-bold text-emerald-800 uppercase tracking-wider">Verified Customer</span>
          </div>
          <span className="text-[8px] font-semibold text-zinc-400">Enterprise Panel</span>
        </div>
      </motion.div>
    </div>
  );
}
