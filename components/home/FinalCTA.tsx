"use client";

import { ArrowRight } from 'lucide-react';
import { Container, Reveal } from '../primitives';
import Link from 'next/link';
import { motion } from 'motion/react';

export function FinalCTA() {
  return (
    <section className="w-full bg-[#05070F] text-white relative overflow-hidden py-24 lg:py-32 border-t border-zinc-900 z-10">
      {/* Background star-like particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/4 left-[8%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-[24%] w-1.5 h-1.5 bg-[#29D5FF] rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 left-[48%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[15%] right-[22%] w-1.5 h-1.5 bg-[#5B84FF] rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-[80%] right-[12%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Center-right radial glow centered behind the visual element */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 bg-[radial-gradient(circle_at_75%_50%,rgba(92,142,255,0.09),transparent_70%)] pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
          
          {/* Left Side: Headline, Supporting Text, and Button */}
          <div className="text-left flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-[1000] tracking-tight uppercase leading-[1.05] text-white">
                Let's Turn<br />
                Responses Into<br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#ffffff] font-black tracking-wide">
                  Real Decisions.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.05} className="mt-6">
              <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed max-w-lg">
                Talk to our research strategists and receive a tailored proposal within 48 hours.<br className="hidden sm:inline" />
                Access verified respondents, global audiences, and actionable insights.
              </p>
            </Reveal>

            <Reveal delay={0.10} className="mt-8">
              <div className="flex">
                <Link
                  href="/contact"
                  className="group relative inline-flex h-12.5 items-center justify-center rounded-xl bg-[#5C8EFF] px-8 text-xs font-black uppercase tracking-widest text-white shadow-[0_8px_30px_rgba(92,142,255,0.3)] transition-all duration-300 hover:bg-[#4a7de6] hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(92,142,255,0.45)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Research Project
                    <ArrowRight size={14} className="stroke-[2.5] transform group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Premium Wireframe/Orb visual */}
          <div className="flex items-center justify-center lg:justify-end">
            <Reveal delay={0.15}>
              <motion.div
                animate={{
                  y: [0, -12, 0]
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut'
                }}
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[380px] lg:h-[380px] relative select-none"
              >
                <svg viewBox="0 0 400 400" fill="none" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#29D5FF" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#5B84FF" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#05070F" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5B84FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#29D5FF" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="orbit-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#02E8F8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#5B84FF" stopOpacity="0.05" />
                    </linearGradient>
                    <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Core glowing orb */}
                  <circle cx="200" cy="200" r="100" fill="url(#core-glow)" filter="url(#glow-effect)" />

                  {/* Concentric Ellipses (Orbit Rings) */}
                  <ellipse cx="200" cy="200" rx="140" ry="48" stroke="url(#orbit-grad-1)" strokeWidth="1.5" transform="rotate(-15 200 200)" />
                  <ellipse cx="200" cy="200" rx="150" ry="60" stroke="url(#orbit-grad-2)" strokeWidth="1.5" transform="rotate(35 200 200)" />
                  <ellipse cx="200" cy="200" rx="160" ry="40" stroke="url(#orbit-grad-1)" strokeWidth="1.5" transform="rotate(-55 200 200)" />
                  
                  {/* Symmetrical Outer Cage */}
                  <circle cx="200" cy="200" r="130" stroke="rgba(91, 132, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Nodes Orbiting Rotated Paths */}
                  <g transform="rotate(-15 200 200)">
                    <circle r="4.5" fill="#02E8F8" filter="url(#glow-effect)">
                      <animateMotion 
                        dur="6.5s" 
                        repeatCount="indefinite"
                        path="M 60,200 A 140,48 0 1,0 340,200 A 140,48 0 1,0 60,200"
                      />
                    </circle>
                  </g>

                  <g transform="rotate(35 200 200)">
                    <circle r="5" fill="#5B84FF" filter="url(#glow-effect)">
                      <animateMotion 
                        dur="8.5s" 
                        repeatCount="indefinite"
                        path="M 50,200 A 150,60 0 1,0 350,200 A 150,60 0 1,0 50,200"
                      />
                    </circle>
                  </g>

                  <g transform="rotate(-55 200 200)">
                    <circle r="3.5" fill="#FFFFFF" filter="url(#glow-effect)">
                      <animateMotion 
                        dur="5.5s" 
                        repeatCount="indefinite"
                        path="M 40,200 A 160,40 0 1,0 360,200 A 160,40 0 1,0 40,200"
                      />
                    </circle>
                  </g>

                  {/* Plexus Nodes inside the core */}
                  <circle cx="200" cy="200" r="45" fill="rgba(91, 132, 255, 0.08)" stroke="#29D5FF" strokeWidth="1.2" />
                  <circle cx="200" cy="200" r="18" fill="rgba(2, 232, 248, 0.15)" />
                  <line x1="200" y1="155" x2="170" y2="215" stroke="#5B84FF" strokeWidth="1.2" opacity="0.4" />
                  <line x1="200" y1="155" x2="230" y2="215" stroke="#5B84FF" strokeWidth="1.2" opacity="0.4" />
                  <line x1="170" y1="215" x2="230" y2="215" stroke="#29D5FF" strokeWidth="1.2" opacity="0.4" />
                  <circle cx="200" cy="155" r="3" fill="#FFFFFF" />
                  <circle cx="170" cy="215" r="3" fill="#29D5FF" />
                  <circle cx="230" cy="215" r="3" fill="#02E8F8" />

                  {/* Floating ambient details */}
                  <circle cx="120" cy="80" r="1.5" fill="#FFFFFF" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="280" cy="90" r="2" fill="#29D5FF" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="5s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,-10;0,0" dur="6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="280" r="2" fill="#5B84FF" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="4s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </motion.div>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
