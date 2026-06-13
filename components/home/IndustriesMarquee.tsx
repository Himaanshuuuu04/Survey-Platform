"use client";

import { Cpu, HeartPulse, Landmark, ShoppingCart, GraduationCap, Car, ShoppingBag, Radio, Plane, Film } from 'lucide-react';
import { Container, Reveal } from '../primitives';
import { motion } from 'motion/react';

const items = [
  { icon: HeartPulse, label: 'Healthcare', outlined: true },
  { icon: Landmark, label: 'Finance', outlined: false },
  { icon: ShoppingCart, label: 'Consumer Goods', outlined: true },
  { icon: GraduationCap, label: 'Education', outlined: false },
  { icon: Car, label: 'Automotive', outlined: true },
  { icon: Cpu, label: 'Technology', outlined: false },
  { icon: ShoppingBag, label: 'Retail', outlined: true },
  { icon: Radio, label: 'Telecommunications', outlined: false },
  { icon: Plane, label: 'Travel', outlined: true },
  { icon: Film, label: 'Entertainment', outlined: false },
];

export function IndustriesMarquee() {
  return (
    <section className="pt-20 pb-0  relative overflow-hidden bg-white"
     style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}>
      
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

      {/* SECTION 2: Infinite Marquee (Framer Motion, Smooth Scroll, Pause on Hover) */}
      <div 
        className="relative flex w-full items-center overflow-hidden py-12 border-y border-zinc-150 z-30 bg-white dark:bg-zinc-950"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <motion.div
          className="flex w-max flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 50, // Adjust duration for scroll speed (larger is slower)
          }}
        >
          {/* We map over an array of 2 to duplicate the items block for the perfect infinite loop */}
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex flex-nowrap items-center px-4">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center mx-8 md:mx-12 gap-5 md:gap-7">
                    {/* Icon Container */}
                   
                    {/* Giant Typography */}
                    <span
                      className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter lowercase text-nowrap ${
                        item.outlined 
                          ? "text-transparent" 
                          : "text-brand dark:text-zinc-50"
                      }`}
                      style={
                        item.outlined
                          ? { WebkitTextStroke: "1.67px black" }
                          : {}
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      

      {/* SECTION 4: Elegant Compact Statistics Banner (py-14 sm:py-20) */}
     

    </section>
  );
}
