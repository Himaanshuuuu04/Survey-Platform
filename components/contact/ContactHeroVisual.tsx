"use client";

import { motion } from 'motion/react';
import { useState } from 'react';

export function ContactHeroVisual({ mouseX, mouseY, heroRect }: {
  mouseX: any;
  mouseY: any;
  heroRect: DOMRect | null;
}) {
  const [activeBubble, setActiveBubble] = useState<number | null>(null);

  // Compute slight tilt based on cursor
  const calculateTilt = () => {
    if (!heroRect || typeof mouseX.get !== 'function') return { rx: 0, ry: 0 };
    const mx = mouseX.get();
    const my = mouseY.get();
    const cx = heroRect.left + heroRect.width / 2;
    const cy = heroRect.top + heroRect.height / 2;
    
    const rx = -((my - cy) / heroRect.height) * 6;
    const ry = ((mx - cx) / heroRect.width) * 6;
    return { rx, ry };
  };

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useState(() => {
    const unsubscribeX = mouseX.onChange(() => {
      setTilt(calculateTilt());
    });
    return () => unsubscribeX;
  });

  return (
    <div 
      className="relative mx-auto w-full max-w-[480px] lg:max-w-none pt-4 pb-8 px-2 select-none"
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
    >
      {/* Background Soft Glow */}
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.06),transparent_50%)] opacity-95 blur-3xl pointer-events-none" />

      {/* Main Glass Visual Wrapper */}
      <motion.div
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          transformPerspective: 1000
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.03)] backdrop-blur-md hover:shadow-[0_36px_72px_rgba(92,142,255,0.08)] transition-all duration-500"
      >
        <svg 
          viewBox="0 0 500 380" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto overflow-visible"
        >
          {/* Definitions for gradients and styles */}
          <defs>
            <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5C8EFF" />
              <stop offset="100%" stopColor="#02E8F8" />
            </linearGradient>
            <linearGradient id="consultant-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="bubble-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5C8EFF" />
              <stop offset="100%" stopColor="#4A7CE6" />
            </linearGradient>
            <linearGradient id="avatar-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FECDD3" />
              <stop offset="100%" stopColor="#FDA4AF" />
            </linearGradient>
            <linearGradient id="background-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            
            {/* Animating dash offset for communication loops */}
            <style>
              {`
                .animated-loop {
                  stroke-dasharray: 6, 6;
                  animation: dash-flow 25s linear infinite;
                }
                @keyframes dash-flow {
                  to {
                    stroke-dashoffset: -1000;
                  }
                }
              `}
            </style>
          </defs>

          {/* Central Background Glow Circle */}
          <circle cx="250" cy="190" r="180" fill="url(#background-glow)" />

          {/* Dotted Communication Curves */}
          <path 
            d="M 170,220 C 130,130 370,120 330,220" 
            stroke="#E2E8F0" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M 170,220 C 130,130 370,120 330,220" 
            stroke="#5C8EFF" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.65"
            className="animated-loop" 
          />

          <path 
            d="M 350,260 C 320,330 180,330 150,260" 
            stroke="#E2E8F0" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M 350,260 C 320,330 180,330 150,260" 
            stroke="#02E8F8" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.65"
            className="animated-loop" 
          />

          {/* ====================================================
              OPERATOR / CONSULTANT (Left side, centered)
              ==================================================== */}
          <g transform="translate(110, 110)">
            {/* Desk Surface (Behind Laptop/Consultant) */}
            <path d="M 0,150 L 160,150" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

            {/* Consultant Body */}
            {/* Torso */}
            <path d="M 30,150 L 50,110 L 110,110 L 130,150 Z" fill="url(#consultant-suit)" />
            {/* Collar & Tie */}
            <path d="M 70,110 L 80,125 L 90,110 Z" fill="#FFFFFF" />
            <path d="M 78,125 L 80,140 L 82,125 Z" fill="#5C8EFF" />
            
            {/* Neck */}
            <rect x="74" y="94" width="12" height="16" fill="#F87171" rx="2" opacity="0.85" />
            
            {/* Face/Head */}
            <rect x="65" y="44" width="30" height="52" fill="#FCA5A5" rx="15" />
            {/* Hair */}
            <path d="M 64,54 C 64,40 96,40 96,54 C 91,48 73,48 64,54 Z" fill="#1E293B" />
            {/* Smile / Lips */}
            <path d="M 77,82 Q 80,85 83,82" stroke="#B91C1C" strokeWidth="1.5" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="74" cy="68" r="1.5" fill="#1E293B" />
            <circle cx="86" cy="68" r="1.5" fill="#1E293B" />

            {/* Headset */}
            <path d="M 62,65 Q 80,38 98,65" stroke="#475569" strokeWidth="3.5" fill="none" />
            {/* Ear cups */}
            <rect x="59" y="60" width="6" height="12" fill="#5C8EFF" rx="3" />
            <rect x="95" y="60" width="6" height="12" fill="#5C8EFF" rx="3" />
            {/* Mic arm */}
            <path d="M 62,70 C 62,84 76,86 78,86" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="78" cy="86" r="2" fill="#5C8EFF" />

            {/* Laptop Mockup */}
            <g transform="translate(90, 106)">
              {/* Laptop base */}
              <path d="M 0,44 L 60,44 L 54,49 L 6,49 Z" fill="#E2E8F0" />
              <path d="M 6,49 L 54,49" stroke="#CBD5E1" strokeWidth="1" />
              {/* Laptop Screen */}
              <path d="M 10,44 L 2,12 L 42,12 L 50,44 Z" fill="#F1F5F9" />
              <path d="M 10,44 L 2,12 L 42,12 L 50,44 Z" stroke="#E2E8F0" strokeWidth="1.5" />
              {/* Brand Logo on Laptop Back */}
              <circle cx="22" cy="27" r="4.5" fill="#5C8EFF" opacity="0.3" />
              <path d="M 20,27 L 24,27" stroke="#5C8EFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            </g>
          </g>

          {/* ====================================================
              CLIENT / CUSTOMER (Right side, lower)
              ==================================================== */}
          <g transform="translate(300, 200)">
            {/* Body */}
            {/* Dress/Shirt */}
            <path d="M 25,120 L 45,75 C 50,75 80,75 85,75 L 105,120 Z" fill="#F43F5E" />
            {/* Neck */}
            <rect x="60" y="62" width="10" height="14" fill="#FBCFE8" rx="2" />
            {/* Face/Head */}
            <rect x="50" y="16" width="30" height="48" fill="#FDE2E4" rx="14" />
            {/* Hair (Long Blonde Hair) */}
            <path d="M 44,28 C 42,6 88,6 86,28 C 86,50 96,70 94,90 C 86,85 86,75 86,60 L 44,60 C 44,75 42,85 36,90 C 34,70 44,50 44,28 Z" fill="#FCD34D" />
            {/* Eyes */}
            <circle cx="59" cy="38" r="1.5" fill="#1E293B" />
            <circle cx="71" cy="38" r="1.5" fill="#1E293B" />
            {/* Smile */}
            <path d="M 62,50 Q 65,53 68,50" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />

            {/* Hand holding phone */}
            <path d="M 82,75 L 86,52 L 76,52 Z" fill="#FBCFE8" />
            {/* Phone */}
            <rect x="74" y="44" width="5" height="12" fill="#1E293B" rx="1.5" transform="rotate(-15, 74, 44)" />
          </g>

          {/* ====================================================
              DYNAMIC SPEECH BUBBLES
              ==================================================== */}
          
          {/* Bubble 1: Operator Speaks (Top Center-Left) */}
          <g 
            className="cursor-pointer"
            onClick={() => setActiveBubble(1)}
            onMouseEnter={() => setActiveBubble(1)}
          >
            {/* Glowing Aura when hovered */}
            <circle cx="210" cy="95" r="38" fill="#5C8EFF" opacity={activeBubble === 1 ? 0.08 : 0} className="transition-opacity duration-300" />
            
            {/* Chat Bubble BG */}
            <rect x="150" y="65" width="120" height="56" rx="20" fill="url(#bubble-blue)" />
            {/* Tail */}
            <path d="M 180,120 L 190,132 L 200,120 Z" fill="#4A7CE6" />
            
            {/* Interactive content inside bubble */}
            {activeBubble === 1 ? (
              <text x="210" y="97" fill="#FFFFFF" fontSize="9.5" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
                HOW CAN WE HELP?
              </text>
            ) : (
              <g transform="translate(192, 88)">
                <circle cx="6" cy="5" r="2.5" fill="#FFFFFF" />
                <circle cx="18" cy="5" r="2.5" fill="#FFFFFF" />
                <circle cx="30" cy="5" r="2.5" fill="#FFFFFF" />
              </g>
            )}
          </g>

          {/* Bubble 2: Client Speaks (Right Center-Low) */}
          <g 
            className="cursor-pointer"
            onClick={() => setActiveBubble(2)}
            onMouseEnter={() => setActiveBubble(2)}
          >
            {/* Glowing Aura when hovered */}
            <circle cx="340" cy="170" r="38" fill="#5C8EFF" opacity={activeBubble === 2 ? 0.08 : 0} className="transition-opacity duration-300" />

            {/* Chat Bubble BG */}
            <rect x="280" y="140" width="120" height="56" rx="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Tail */}
            <path d="M 330,195 L 340,207 L 350,195 Z" fill="#FFFFFF" />
            <path d="M 330,195 L 340,207 L 350,195" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Interactive content inside bubble */}
            {activeBubble === 2 ? (
              <text x="340" y="172" fill="#0F172A" fontSize="9.5" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
                START A STUDY!
              </text>
            ) : (
              <g transform="translate(322, 163)">
                <circle cx="6" cy="5" r="2.5" fill="#5C8EFF" />
                <circle cx="18" cy="5" r="2.5" fill="#5C8EFF" />
                <circle cx="30" cy="5" r="2.5" fill="#5C8EFF" />
              </g>
            )}
          </g>

          {/* Bubble 3: System Match Connection (Left Center-Low) */}
          <g 
            className="cursor-pointer"
            onClick={() => setActiveBubble(3)}
            onMouseEnter={() => setActiveBubble(3)}
          >
            {/* Glowing Aura when hovered */}
            <circle cx="120" cy="220" r="38" fill="#02E8F8" opacity={activeBubble === 3 ? 0.08 : 0} className="transition-opacity duration-300" />

            {/* Chat Bubble BG */}
            <rect x="60" y="190" width="120" height="56" rx="20" fill="#0F172A" />
            {/* Tail */}
            <path d="M 130,246 L 140,258 L 150,246 Z" fill="#0F172A" />

            {/* Interactive content inside bubble */}
            {activeBubble === 3 ? (
              <text x="120" y="222" fill="#02E8F8" fontSize="9.5" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
                IN 24 HOURS.
              </text>
            ) : (
              <g transform="translate(102, 213)">
                <circle cx="6" cy="5" r="2.5" fill="#02E8F8" />
                <circle cx="18" cy="5" r="2.5" fill="#02E8F8" />
                <circle cx="30" cy="5" r="2.5" fill="#02E8F8" />
              </g>
            )}
          </g>
        </svg>

        {/* Small UI Help Prompt */}
        <div className="text-center mt-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <span>Click/Hover bubbles to start communication flow</span>
        </div>
      </motion.div>
    </div>
  );
}
