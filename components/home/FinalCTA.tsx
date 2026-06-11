"use client";

import { ArrowRight } from 'lucide-react';
import { Container, Reveal } from '../primitives';
import Link from 'next/link';
import { motion } from 'motion/react';

export function FinalCTA() {
  return (
    <section className="w-full bg-[#05070F] text-white relative overflow-hidden py-16 lg:py-24 border-t border-zinc-900 z-10">
      {/* Background star-like particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/4 left-[8%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-[24%] w-1.5 h-1.5 bg-[#29D5FF] rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 left-[48%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[15%] right-[22%] w-1.5 h-1.5 bg-[#5B84FF] rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-[80%] right-[12%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Center-right radial glow centered behind the visual element */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 bg-[radial-gradient(circle_at_75%_50%,rgba(92,142,255,0.12),transparent_65%)] pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-center justify-between">
          
          {/* Left Side: Headline, Supporting Text, and Button */}
          <div className="text-left flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-[1000] tracking-tight uppercase leading-[1.05] !text-white">
                Let's Turn<br />
                Responses Into<br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#ffffff] font-black tracking-wide">
                  Real Decisions.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.05} className="mt-5">
              <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed max-w-lg">
                Talk to our research strategists and receive a tailored proposal within 48 hours.<br className="hidden sm:inline" />
                Access verified respondents, global audiences, and actionable insights.
              </p>
            </Reveal>

            <Reveal delay={0.10} className="mt-8">
              <div className="flex">
                <Link
                  href="/contact"
                  className="group relative inline-flex h-12.5 items-center justify-center rounded-xl bg-[#5C8EFF] px-8 text-xs font-black uppercase tracking-widest text-white shadow-[0_8px_30px_rgba(92,142,255,0.25)] border border-[#5C8EFF]/20 transition-all duration-300 hover:bg-[#4a7de6] hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(92,142,255,0.55)] hover:border-[#02E8F8]/40 overflow-hidden"
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

          {/* Right Side: Premium Wireframe Global Data Network Visual */}
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
                className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] relative select-none"
              >
                <svg viewBox="0 0 400 400" fill="none" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Stronger blue/cyan glow gradients */}
                    <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#02E8F8" stopOpacity="0.5" />
                      <stop offset="45%" stopColor="#5B84FF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#05070F" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5B84FF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Core glowing orb background */}
                  <circle cx="200" cy="200" r="120" fill="url(#core-glow)" filter="url(#glow-effect)" />

                  {/* ── Global Data Network Wireframe Grid Lines ── */}
                  {/* Outer sphere boundary */}
                  <circle cx="200" cy="200" r="140" stroke="url(#grid-grad)" strokeWidth="1.5" opacity="0.6" />
                  
                  {/* Latitudinal Ellipses */}
                  <ellipse cx="200" cy="200" rx="140" ry="40" stroke="url(#grid-grad)" strokeWidth="1.2" opacity="0.4" />
                  <ellipse cx="200" cy="200" rx="140" ry="85" stroke="url(#grid-grad)" strokeWidth="1.2" opacity="0.4" />
                  
                  {/* Longitudinal Ellipses */}
                  <ellipse cx="200" cy="200" rx="40" ry="140" stroke="url(#grid-grad)" strokeWidth="1.2" opacity="0.4" />
                  <ellipse cx="200" cy="200" rx="85" ry="140" stroke="url(#grid-grad)" strokeWidth="1.2" opacity="0.4" />
                  
                  {/* Central Axes */}
                  <line x1="200" y1="60" x2="200" y2="340" stroke="url(#grid-grad)" strokeWidth="1.2" opacity="0.3" />
                  <line x1="60" y1="200" x2="340" y2="200" stroke="url(#grid-grad)" strokeWidth="1.2" opacity="0.3" />

                  {/* ── Connected Data Nodes (Intersections) ── */}
                  {/* Pulsing glow highlights behind key nodes */}
                  <circle cx="200" cy="200" r="10" fill="#02E8F8" opacity="0.3" filter="url(#glow-effect)">
                    <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="120" cy="120" r="8" fill="#5B84FF" opacity="0.3" filter="url(#glow-effect)">
                    <animate attributeName="r" values="4;12;4" dur="4.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="4.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="280" cy="120" r="8" fill="#5B84FF" opacity="0.3" filter="url(#glow-effect)">
                    <animate attributeName="r" values="4;12;4" dur="3.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3.6s" repeatCount="indefinite" />
                  </circle>

                  {/* Connected node network line traces */}
                  <line x1="120" y1="120" x2="200" y2="200" stroke="#02E8F8" strokeWidth="1.2" opacity="0.5" />
                  <line x1="280" y1="120" x2="200" y2="200" stroke="#02E8F8" strokeWidth="1.2" opacity="0.5" />
                  <line x1="120" y1="280" x2="200" y2="200" stroke="#02E8F8" strokeWidth="1.2" opacity="0.5" />
                  <line x1="280" y1="280" x2="200" y2="200" stroke="#02E8F8" strokeWidth="1.2" opacity="0.5" />

                  <line x1="60" y1="200" x2="120" y2="120" stroke="#5B84FF" strokeWidth="1" opacity="0.3" />
                  <line x1="340" y1="200" x2="280" y2="120" stroke="#5B84FF" strokeWidth="1" opacity="0.3" />
                  <line x1="60" y1="200" x2="120" y2="280" stroke="#5B84FF" strokeWidth="1" opacity="0.3" />
                  <line x1="340" y1="200" x2="280" y2="280" stroke="#5B84FF" strokeWidth="1" opacity="0.3" />

                  {/* Main Node Dots */}
                  <circle cx="200" cy="200" r="4.5" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1.5" />
                  <circle cx="120" cy="120" r="4" fill="#02E8F8" />
                  <circle cx="280" cy="120" r="4" fill="#02E8F8" />
                  <circle cx="120" cy="280" r="4" fill="#02E8F8" />
                  <circle cx="280" cy="280" r="4" fill="#02E8F8" />
                  <circle cx="200" cy="60" r="3.5" fill="#5B84FF" />
                  <circle cx="200" cy="340" r="3.5" fill="#5B84FF" />
                  <circle cx="60" cy="200" r="3.5" fill="#5B84FF" />
                  <circle cx="340" cy="200" r="3.5" fill="#5B84FF" />

                  {/* ── Orbiting Data Packets (Motion Paths) ── */}
                  {/* Latitudinal Orbiting Node */}
                  <circle r="4.5" fill="#FFFFFF" filter="url(#glow-effect)">
                    <animateMotion 
                      dur="5s" 
                      repeatCount="indefinite"
                      path="M 60,200 A 140,40 0 1,0 340,200 A 140,40 0 1,0 60,200"
                    />
                  </circle>

                  {/* Longitudinal Orbiting Node */}
                  <circle r="4" fill="#02E8F8" filter="url(#glow-effect)">
                    <animateMotion 
                      dur="7.2s" 
                      repeatCount="indefinite"
                      path="M 200,60 A 40,140 0 1,0 200,340 A 40,140 0 1,0 200,60"
                    />
                  </circle>

                  {/* Diagonal Orbiting Node */}
                  <g transform="rotate(35 200 200)">
                    <circle r="4" fill="#29D5FF" filter="url(#glow-effect)">
                      <animateMotion 
                        dur="6.2s" 
                        repeatCount="indefinite"
                        path="M 50,200 A 150,60 0 1,0 350,200 A 150,60 0 1,0 50,200"
                      />
                    </circle>
                  </g>

                  {/* ── Ambient floating data points (dust) ── */}
                  <circle cx="110" cy="90" r="1.5" fill="#FFFFFF" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="290" cy="80" r="2" fill="#02E8F8" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="5s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,-12;0,0" dur="6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="90" cy="290" r="2" fill="#5B84FF" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,-10;0,0" dur="4s" repeatCount="indefinite" />
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
