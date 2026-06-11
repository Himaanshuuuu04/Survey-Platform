"use client";

import { Cpu, HeartPulse, Landmark, ShoppingCart, GraduationCap, Car, ShoppingBag, Radio, Plane, Film } from 'lucide-react';
import { Container, Reveal } from '../primitives';

const items = [
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Landmark, label: 'Finance' },
  { icon: ShoppingCart, label: 'Consumer Goods' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Car, label: 'Automotive' },
  { icon: Cpu, label: 'Technology' },
  { icon: ShoppingBag, label: 'Retail' },
  { icon: Radio, label: 'Telecommunications' },
  { icon: Plane, label: 'Travel' },
  { icon: Film, label: 'Entertainment' },
];

export function IndustriesMarquee() {
  // Duplicate the list of items to ensure a seamless, infinite loop
  const loop = [...items, ...items];

  return (
    <section className="pt-20 pb-0 border-t border-[var(--line)] relative overflow-hidden bg-white">
      
      {/* SECTION 1: Top Area */}
      <Container className="relative z-20">
        {/* Top Center Small Label */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
            FEATURED INDUSTRIES
          </span>
        </div>
        
        {/* Large Bold Headline Left-Aligned (roughly 40% width) */}
        <div className="w-full md:w-[45%] text-left mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
            DEEP EXPERTISE ACROSS<br />
            THE CATEGORIES THAT<br />
            <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide text-swoosh">MOVE THE WORLD</span>.
          </h2>
        </div>
      </Container>

      {/* SECTION 3: Floating Mascot ABOVE the Moving Marquee */}
      <div className="relative w-full overflow-visible z-30">
        <div className="mascot-walk-container">
          <div className="mascot-bob-container">
            
            {/* Speech Bubble */}
            <div className="relative bg-[#0A0A0A] text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-zinc-800/80 flex items-center justify-center mb-1.5">
              <span className="text-[var(--brand-light,#02E8F8)] font-black mr-1">EGI:</span> VERIFIED INSIGHTS AHEAD
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A0A0A] rotate-45 border-r border-b border-zinc-800/80" />
            </div>
            
            {/* Mascot SVG (100% Flat vector inline SVG with transparent background) */}
            <div className="mascot-flip-container">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="object-contain">
                  <defs>
                    <linearGradient id="robot-head-grad" x1="10" y1="8" x2="46" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#EFF6FF" />
                    </linearGradient>
                    <linearGradient id="robot-body-grad" x1="16" y1="38" x2="40" y2="50" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#5C8EFF" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  {/* Side Headsets */}
                  <rect x="6" y="17" width="4" height="10" rx="2" fill="#2563EB" />
                  <rect x="46" y="17" width="4" height="10" rx="2" fill="#2563EB" />
                  
                  {/* Antenna */}
                  <path d="M28 8V3" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="28" cy="2" r="2" fill="#02E8F8" filter="url(#glow)" />
                  
                  {/* Head */}
                  <rect x="10" y="8" width="36" height="28" rx="14" fill="url(#robot-head-grad)" stroke="#5C8EFF" strokeWidth="2" />
                  
                  {/* Screen */}
                  <rect x="14" y="12" width="28" height="20" rx="10" fill="#0A0A0A" />
                  
                  {/* Glowing Eyes */}
                  <circle cx="21" cy="21" r="2" fill="#02E8F8" filter="url(#glow)" />
                  <circle cx="35" cy="21" r="2" fill="#02E8F8" filter="url(#glow)" />
                  
                  {/* Mouth/Smile */}
                  <path d="M25 26C26 27.5 30 27.5 31 26" stroke="#02E8F8" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Body */}
                  <path d="M18 36C18 36 18 48 28 48C38 48 38 36 38 36" fill="url(#robot-head-grad)" stroke="#5C8EFF" strokeWidth="2" />
                  
                  {/* Glowing Chest Plate */}
                  <rect x="23" y="39" width="10" height="5" rx="2.5" fill="#0A0A0A" />
                  <circle cx="28" cy="41.5" r="1.5" fill="#02E8F8" filter="url(#glow)" />

                  {/* Floating glow/jet */}
                  <ellipse cx="28" cy="52" rx="6" ry="1.5" fill="#02E8F8" opacity="0.7" filter="url(#glow)" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: Infinite Marquee (RIGHT TO LEFT, pause on hover) */}
      <div className="overflow-hidden marquee-fade relative z-20 w-full mb-6 border-y border-zinc-150 py-4 bg-zinc-50/30">
        <div className="marquee-track-r2l">
          {loop.map((it, i) => (
            <div
              key={i}
              className="flex min-w-[220px] items-center gap-3.5 bg-white border border-zinc-200/80 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(92,142,255,0.04)] hover:border-[var(--brand,#5C8EFF)]/30 group"
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-lg transition-colors group-hover:bg-[var(--brand,#5C8EFF)] group-hover:text-white"
                style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
              >
                <it.icon size={18} />
              </div>
              <span className="font-semibold text-zinc-700 transition-colors group-hover:text-zinc-950">{it.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3.5: Trusted Companies Row (Grayscale, elegant spacing) */}
      <div className="w-full pt-6 pb-10 bg-white relative z-20">
        <Container>
          <p className="text-center text-[8.5px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-6">
            TRUSTED BY RESEARCH LEADERS AT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-35 grayscale contrast-125 transition-all duration-300 hover:opacity-55">
            {/* nglcc */}
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tighter text-[#0A0A0A]">nglcc</span>
              <span className="text-[6.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                National LGBT<br />Chamber of Commerce
              </span>
            </div>

            {/* IAC */}
            <div className="flex items-center gap-1.5">
              <div className="border border-[#0A0A0A] px-1 py-0.5 text-[9px] font-black tracking-tight text-[#0A0A0A] leading-none">
                IAC
              </div>
              <span className="text-[6.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Internet Advertising<br />Competition
              </span>
            </div>

            {/* VEGA */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-widest text-[#0A0A0A]">VEGA</span>
              <span className="text-[6.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Digital Awards<br />2025 Gold Winner
              </span>
            </div>

            {/* NYX */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-[#0A0A0A]">NYX</span>
              <span className="text-[6.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Grand Winner<br />Awards
              </span>
            </div>

            {/* MUSE */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[7px] text-white font-extrabold">M</div>
              <span className="text-xs font-bold tracking-wider text-[#0A0A0A]">MUSE</span>
              <span className="text-[6.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Creative Awards<br />Official Winner
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* SECTION 4: Elegant Compact Statistics Banner (py-14 sm:py-20) */}
      <div className="w-full bg-[var(--brand,#5C8EFF)] py-14 sm:py-20 relative z-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 items-center text-center">
            {[
              { val: '250K+', desc: 'Responses Generated' },
              { val: '500+', desc: 'Campaigns Delivered' },
              { val: '92%', desc: 'Completion Rate' },
              { val: '99.7%', desc: 'Fraud Detection Accuracy' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-[950] tracking-tight text-[#0A0A0A] leading-none">
                  {stat.val}
                </span>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0A0A0A]/70 mt-3 leading-tight max-w-[150px]">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

    </section>
  );
}
