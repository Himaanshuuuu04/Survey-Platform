"use client";

import { motion } from 'motion/react';
import { Reveal, Section, Counter } from '@/components/primitives';
import { Users, Globe, SlidersHorizontal, CheckSquare } from 'lucide-react';

const stats = [
  {
    num: 250,
    suffix: "K+",
    label: "Verified Respondents",
    desc: "Pre-screened active panel members worldwide ready for survey dispatch.",
    icon: Users,
    color: "#5B84FF"
  },
  {
    num: 50,
    suffix: "+",
    label: "Countries",
    desc: "Global reach ensuring representative sampling in both major and localized regions.",
    icon: Globe,
    color: "#7C3AED"
  },
  {
    num: 120,
    suffix: "+",
    label: "Targeting Attributes",
    desc: "Granular profile filters for pin-point audience matching and research accuracy.",
    icon: SlidersHorizontal,
    color: "#2563EB"
  },
  {
    num: 92,
    suffix: "%",
    label: "Completion Rate",
    desc: "Industry-leading participant retention ensuring research projects conclude on time.",
    icon: CheckSquare,
    color: "#02E8F8"
  }
];

export function GlobalReachSection() {
  return (
    <Section className="bg-white border-b border-zinc-200 overflow-hidden relative" id="services-audience-reach">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Background radial blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-2xl text-left mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4">
              <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
              GLOBAL ENGAGEMENT
            </div>
          </Reveal>
          <Reveal delay={0.05} className="mt-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
              GLOBAL REACH &<br />
              <span className="font-fenwick text-[#111111] tracking-wide">
                PANEL SCALE.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-4">
            <p className="text-zinc-500 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
              Access representable panels across key global demographics and localized professional groups instantly.
            </p>
          </Reveal>
        </div>

        {/* Connected Horizontal Timeline Journey */}
        <div className="relative w-full">
          {/* Background connection channel (Desktop only) */}
          <div className="hidden lg:block absolute top-[48px] left-[48px] right-[48px] h-[1px] bg-zinc-200/80 pointer-events-none">
            {/* Glowing active progress line/particle */}
            <motion.div
              initial={{ left: "-20%" }}
              animate={{ left: "120%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-[80px] bg-gradient-to-r from-transparent via-[#5B84FF] to-transparent shadow-[0_0_10px_rgba(91,132,255,0.3)]"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="p-8 rounded-[2.25rem] border border-zinc-200/60 bg-[#FAFAFA] hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:shadow-[0_20px_40px_rgba(92,142,255,0.05),_0_0_24px_rgba(92,142,255,0.02)] hover:translate-y-[-4px] transition-all duration-300 text-left relative group overflow-hidden">
                    {/* Top colored border gradient */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[2.25rem] transition-all duration-300 group-hover:h-[3.5px]"
                      style={{
                        background: `linear-gradient(90deg, ${stat.color}40, ${stat.color})`
                      }}
                    />

                    {/* Visual Hover Radial Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle_at_50%_0%, ${stat.color}04, transparent 50%)`
                      }}
                    />

                    {/* Faded background giant step number (Hover counter) */}
                    <div 
                      className="absolute bottom-[-15px] right-4 text-[6.5rem] font-[1000] leading-none opacity-[0.14] group-hover:opacity-[0.38] pointer-events-none select-none font-sans transition-all duration-500"
                      style={{ color: stat.color }}
                    >
                      0{idx + 1}
                    </div>

                    {/* Header Row: Circle Step Number */}
                    <div className="flex items-center justify-between relative z-10">
                      <div
                        className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 group-hover:scale-105"
                        style={{
                          borderColor: `${stat.color}35`,
                          color: stat.color,
                          backgroundColor: `${stat.color}08`
                        }}
                      >
                        0{idx + 1}
                      </div>
                    </div>

                    {/* Icon with subtle color background */}
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mt-8 relative z-10 transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${stat.color}08`,
                        border: `1px solid ${stat.color}25`,
                        color: stat.color
                      }}
                    >
                      <Icon size={18} strokeWidth={2.5} />
                    </div>

                    <h3 className="mt-6 text-2xl sm:text-3xl font-[900] uppercase text-zinc-950 tracking-tight relative z-10 font-sans">
                      <Counter to={stat.num} suffix={stat.suffix} />
                    </h3>

                    <span 
                      className="block mt-1.5 text-[9px] font-black uppercase tracking-wider relative z-10"
                      style={{ color: stat.color }}
                    >
                      {stat.label}
                    </span>

                    <p className="mt-3 text-zinc-500 font-medium text-xs sm:text-[12.5px] leading-relaxed relative z-10">
                      {stat.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
