"use client";

import { motion } from 'motion/react';
import { 
  Users, Send, ShieldCheck, CheckSquare, Globe, SlidersHorizontal, 
  ArrowRight, Check, Activity, Sparkles, BarChart3, Database, Target
} from 'lucide-react';
import { ServicesHero } from '@/components/services/ServicesHero';
import { Button, Reveal, Section, Container, Counter } from '@/components/primitives';

// BENTO CARDS DATA
const bentoCards = [
  {
    title: "Audience Recruitment",
    desc: "Pinpoint your exact target market. Access niche consumer panels, verified B2B decision makers, parents, students, healthcare workers, and custom profiles globally using granular demographic, firmographic, and behavioral selectors.",
    tag: "Audience targeting",
    span: "lg:col-span-2",
    icon: Users,
    glow: "bg-[radial-gradient(circle_at_20%_20%,rgba(92,142,255,0.15),transparent_50%)]",
    visual: (
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
        {[
          { label: "B2B Decision Makers", active: true },
          { label: "Niche Consumers", active: true },
          { label: "Healthcare Pro", active: true },
          { label: "Active Parents", active: true },
          { label: "Global Students", active: false },
          { label: "SMB Owners", active: true }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className={`px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
              item.active 
                ? "bg-white border-[#5B84FF]/30 text-[#5B84FF] shadow-[0_2px_8px_rgba(91,132,255,0.08)]" 
                : "bg-white border-zinc-200 text-zinc-400"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-[#02E8F8]" : "bg-zinc-300"}`} />
            {item.label}
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Survey Distribution",
    desc: "Deploy surveys across multiple digital routes dynamically. Our automated routing system dispatch link triggers, mobile-optimized modules, and email sends in real-time.",
    tag: "Multi-Route Dispatch",
    span: "lg:col-span-1",
    icon: Send,
    glow: "bg-[radial-gradient(circle_at_80%_20%,rgba(92,142,255,0.15),transparent_50%)]",
    visual: (
      <div className="mt-6 flex flex-col gap-2.5 w-full">
        {[
          { type: "Panel API", route: "Direct API dispatch", val: "Active" },
          { type: "Link Router", route: "Dynamic routing URL", val: "Active" },
          { type: "Email Dispatch", route: "Secure invitation sends", val: "Ready" }
        ].map((item, idx) => (
          <div key={idx} className="p-3 bg-white rounded-xl border border-zinc-200/80 flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black text-zinc-950 uppercase tracking-wider">{item.type}</span>
              <span className="text-[8px] text-zinc-400 font-semibold">{item.route}</span>
            </div>
            <span className="text-[9px] font-black uppercase text-[#5B84FF] bg-[#5B84FF]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#02E8F8] animate-pulse" />
              {item.val}
            </span>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Data Validation",
    desc: "Neutralize fraudulent entries automatically. Our validator runs device fingerprint checks, geographical verification, and timing logs to enforce a 99.7% data validation accuracy rate.",
    tag: "Fraud validation",
    span: "lg:col-span-1",
    icon: ShieldCheck,
    glow: "bg-[radial-gradient(circle_at_20%_80%,rgba(92,142,255,0.15),transparent_50%)]",
    visual: (
      <div className="mt-6 p-4 bg-white rounded-2xl border border-zinc-200/80 shadow-sm flex flex-col gap-2 w-full text-left">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Quality Shield</span>
          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">PASS</span>
        </div>
        <div className="space-y-1.5 mt-1">
          <div className="flex items-center justify-between text-[8px] font-black uppercase text-zinc-700">
            <span>Device Fingerprint</span>
            <span className="text-zinc-950 font-extrabold text-[9px]">Unique</span>
          </div>
          <div className="flex items-center justify-between text-[8px] font-black uppercase text-zinc-700">
            <span>Location Check</span>
            <span className="text-zinc-950 font-extrabold text-[9px]">Verified</span>
          </div>
          <div className="flex items-center justify-between text-[8px] font-black uppercase text-zinc-700">
            <span>Bot Protection</span>
            <span className="text-zinc-950 font-extrabold text-[9px]">Secure</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Insight Delivery",
    desc: "Receive raw research responses as clean, structured, and validated datasets. Our files integrate immediately into your analytics platforms, saving dozens of manual preparation hours.",
    tag: "Data Deliveries",
    span: "lg:col-span-2",
    icon: CheckSquare,
    glow: "bg-[radial-gradient(circle_at_80%_80%,rgba(92,142,255,0.15),transparent_50%)]",
    visual: (
      <div className="mt-6 flex flex-col gap-3 w-full text-left">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
          <span>Target Completed</span>
          <span className="text-zinc-950">92%</span>
        </div>
        <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            whileInView={{ width: "92%" }} 
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#5B84FF] to-[#02E8F8]" 
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="p-2 border border-zinc-100 rounded-xl text-center bg-zinc-50/50">
            <span className="block text-[10px] font-black text-zinc-950">1,250</span>
            <span className="text-[7px] text-zinc-400 uppercase font-black tracking-wider">Completed</span>
          </div>
          <div className="p-2 border border-zinc-100 rounded-xl text-center bg-zinc-50/50">
            <span className="block text-[10px] font-black text-[#5B84FF]">0</span>
            <span className="text-[7px] text-zinc-400 uppercase font-black tracking-wider">Duplicates</span>
          </div>
          <div className="p-2 border border-zinc-100 rounded-xl text-center bg-zinc-50/50">
            <span className="block text-[10px] font-black text-emerald-600">99.7%</span>
            <span className="text-[7px] text-zinc-400 uppercase font-black tracking-wider">Validity</span>
          </div>
        </div>
      </div>
    )
  }
];

// HOW IT WORKS STEPS DATA
const steps = [
  {
    num: "01",
    title: "Define Audience",
    desc: "Configure target profiles with demographical, regional, and industry selectors.",
    icon: SlidersHorizontal,
    color: "#5B84FF"
  },
  {
    num: "02",
    title: "Launch Survey",
    desc: "Deploy surveys across dispatch channels and platform links immediately.",
    icon: Send,
    color: "#7C3AED"
  },
  {
    num: "03",
    title: "Collect Responses",
    desc: "Gather completions in real-time across devices and responsive screens.",
    icon: Database,
    color: "#2563EB"
  },
  {
    num: "04",
    title: "Validate Data",
    desc: "Filter invalid responses using device logs and geo-verification checks.",
    icon: ShieldCheck,
    color: "#02E8F8"
  },
  {
    num: "05",
    title: "Deliver Insights",
    desc: "Obtain clean, verified, and structured datasets ready for direct analysis.",
    icon: Target,
    color: "#00F5D4"
  }
];

// AUDIENCE REACH STATS
const stats = [
  {
    num: 250,
    suffix: "K+",
    label: "Verified Respondents",
    desc: "Pre-screened active panel members worldwide ready for survey dispatch."
  },
  {
    num: 50,
    suffix: "+",
    label: "Countries",
    desc: "Global reach ensuring representative sampling in both major and localized regions."
  },
  {
    num: 120,
    suffix: "+",
    label: "Targeting Attributes",
    desc: "Granular profile filters for pin-point audience matching and research accuracy."
  },
  {
    num: 92,
    suffix: "%",
    label: "Completion Rate",
    desc: "Industry-leading participant retention ensuring research projects conclude on time."
  }
];

export default function Services() {
  return (
    <>
      {/* Services Hero Section */}
      <ServicesHero />

      {/* SECTION 2: What We Provide (Bento Grid) */}
      <Section className="bg-white border-b border-zinc-200" id="services-what-we-provide">
        <div className="max-w-2xl text-left mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4">
              <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
              OUR CAPABILITIES
            </div>
          </Reveal>
          <Reveal delay={0.05} className="mt-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
              CAPABILITIES FOR<br />
              <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                SURVEY OPERATIONS.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-4">
            <p className="text-zinc-500 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
              An end-to-end platform built for high-performance survey operations, audience targeting, and validated response collection.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bentoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={idx} delay={idx * 0.05} className={`${card.span}`}>
                <div className="h-full p-8 rounded-[2rem] border border-zinc-200 bg-[#FAFAFA] shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:translate-y-[-2px] hover:bg-white transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                  {/* Visual Hover Glow */}
                  <div className={`absolute inset-0 ${card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="relative z-10 text-left">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center text-[#5B84FF] shadow-sm group-hover:border-[#5B84FF]/25 group-hover:shadow-[0_4px_16px_rgba(91,132,255,0.1)] transition-all duration-300">
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    
                    <h3 className="mt-6 text-lg sm:text-xl font-extrabold text-zinc-950 uppercase tracking-tight flex items-center gap-1.5">
                      {card.title}
                    </h3>
                    
                    <p className="mt-3 text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="relative z-10 w-full mt-6">
                    {card.visual}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SECTION 3: How It Works (Premium process timeline with animation) */}
      <Section className="bg-[#050816] text-white border-b border-zinc-900/60 overflow-hidden relative" id="services-how-it-works">
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(228,228,231,0.15) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Background radial blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.05),transparent_60%)] pointer-events-none" />

        <div className="relative z-10">
          <div className="max-w-2xl text-left mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4">
                <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
                THE PROCESS
              </div>
            </Reveal>
            <Reveal delay={0.05} className="mt-2">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-white">
                HOW THE SURVEY<br />
                <span className="text-transparent [-webkit-text-stroke:1.2px_#ffffff] font-black tracking-wide">
                  LIFECYCLE WORKS.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-4">
              <p className="text-zinc-400 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
                Our platform orchestrates every stage of the dispatch, collection, and validation lifecycle automatically.
              </p>
            </Reveal>
          </div>

          {/* Connected Horizontal Timeline Journey */}
          <div className="relative w-full">
            {/* Background connection channel (Desktop only) */}
            <div className="hidden lg:block absolute top-[48px] left-[48px] right-[48px] h-[1px] bg-white/10 pointer-events-none">
              {/* Glowing active progress line/particle */}
              <motion.div 
                initial={{ left: "-20%" }}
                animate={{ left: "120%" }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-[80px] bg-gradient-to-r from-transparent via-[#5B84FF] to-transparent shadow-[0_0_10px_rgba(91,132,255,0.5)]"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="p-8 rounded-[2.25rem] border border-white/5 bg-[#0D0E12]/55 hover:bg-[#111319]/80 shadow-[0_4px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),_0_0_30px_rgba(91,132,255,0.08)] hover:translate-y-[-4px] transition-all duration-300 text-left relative group overflow-hidden">
                      {/* Top colored border gradient */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[2.25rem] transition-all duration-300 group-hover:h-[3.5px]" 
                        style={{ 
                          background: `linear-gradient(90deg, ${step.color}60, ${step.color})` 
                        }} 
                      />

                      {/* Visual Hover Radial Glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,142,255,0.06),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Faded background giant step number */}
                      <div className="absolute bottom-[-15px] right-4 text-[6.5rem] font-[1000] leading-none opacity-[0.02] group-hover:opacity-[0.05] text-white pointer-events-none select-none font-sans transition-all duration-500">
                        {step.num}
                      </div>

                      {/* Header Row: Circle Step Number */}
                      <div className="flex items-center justify-between relative z-10">
                        <div 
                          className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 group-hover:scale-105"
                          style={{ 
                            borderColor: `${step.color}25`, 
                            color: step.color,
                            backgroundColor: `${step.color}05`
                          }}
                        >
                          {step.num}
                        </div>
                      </div>

                      {/* Icon with subtle color background */}
                      <div 
                        className="w-11 h-11 rounded-2xl flex items-center justify-center mt-8 relative z-10 transition-all duration-300 group-hover:scale-105"
                        style={{ 
                          backgroundColor: `${step.color}08`, 
                          border: `1px solid ${step.color}20`, 
                          color: step.color 
                        }}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                      </div>

                      <h3 className="mt-6 text-base font-[900] uppercase text-white tracking-tight relative z-10">
                        {step.title}
                      </h3>
                      
                      <p className="mt-3 text-zinc-400 font-medium text-xs sm:text-[12.5px] leading-relaxed relative z-10">
                        {step.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4: Audience Reach (Stats + Globe Vector Diagram) */}
      <Section className="bg-white border-b border-zinc-200" id="services-audience-reach">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-center">
          
          {/* Left Column: Metric Grids */}
          <div className="text-left flex flex-col justify-center">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4 self-start">
                <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
                GLOBAL ENGAGEMENT
              </div>
            </Reveal>
            <Reveal delay={0.05} className="mt-2">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
                GLOBAL REACH &<br />
                <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                  PANEL SCALE.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-4">
              <p className="text-zinc-500 font-medium text-sm sm:text-base leading-relaxed max-w-lg">
                Access representable panels across key global demographics and localized professional groups instantly.
              </p>
            </Reveal>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 mt-8">
              {stats.map((stat, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="p-5 bg-[#FAFAFA] rounded-3xl border border-zinc-200/60 text-left shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:bg-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.03)] hover:translate-y-[-1px] transition-all duration-300">
                    <span className="text-4xl font-extrabold text-zinc-950 tracking-tight block font-sans">
                      <Counter to={stat.num} suffix={stat.suffix} />
                    </span>
                    <span className="block mt-1.5 text-[9px] font-black uppercase text-[#5B84FF] tracking-wider">
                      {stat.label}
                    </span>
                    <p className="mt-2 text-[11px] text-zinc-400 font-medium leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Globe/Network Visualization */}
          <Reveal delay={0.1} className="relative flex items-center justify-center">
            {/* Radial Glow backing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.06),transparent_60%)] blur-2xl pointer-events-none" />

            <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] relative select-none will-change-transform">
              <svg viewBox="0 0 400 400" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#02E8F8" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#5C8EFF" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="globe-grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5C8EFF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Globe radial backplate */}
                <circle cx="200" cy="200" r="140" fill="url(#globe-glow)" />

                {/* Outer wireframe shell */}
                <circle cx="200" cy="200" r="140" stroke="url(#globe-grid-grad)" strokeWidth="0.8" opacity="0.4" />
                <circle cx="200" cy="200" r="105" stroke="url(#globe-grid-grad)" strokeWidth="0.6" opacity="0.3" />

                {/* Grid Lines (Longitude and Latitude Ellipses) */}
                <ellipse cx="200" cy="200" rx="140" ry="45" stroke="url(#globe-grid-grad)" strokeWidth="0.75" opacity="0.3" />
                <ellipse cx="200" cy="200" rx="45" ry="140" stroke="url(#globe-grid-grad)" strokeWidth="0.75" opacity="0.3" />
                <ellipse cx="200" cy="200" rx="140" ry="90" stroke="url(#globe-grid-grad)" strokeWidth="0.5" opacity="0.2" />
                <ellipse cx="200" cy="200" rx="90" ry="140" stroke="url(#globe-grid-grad)" strokeWidth="0.5" opacity="0.2" />

                {/* Angled grid lines */}
                <ellipse cx="200" cy="200" rx="140" ry="45" stroke="url(#globe-grid-grad)" strokeWidth="0.5" opacity="0.25" transform="rotate(30 200 200)" />
                <ellipse cx="200" cy="200" rx="140" ry="45" stroke="url(#globe-grid-grad)" strokeWidth="0.5" opacity="0.25" transform="rotate(-30 200 200)" />

                {/* Active Panel Network Pins (Blinking location nodes) */}
                {/* Pin 1: North America */}
                <circle cx="120" cy="140" r="4.5" fill="#5C8EFF" />
                <circle cx="120" cy="140" r="9" stroke="#5C8EFF" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="5;10;5" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                </circle>

                {/* Pin 2: Europe */}
                <circle cx="230" cy="120" r="4.5" fill="#02E8F8" />
                <circle cx="230" cy="120" r="9" stroke="#02E8F8" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="5;11;5" dur="2.9s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.9s" repeatCount="indefinite" />
                </circle>

                {/* Pin 3: Asia */}
                <circle cx="310" cy="170" r="4.5" fill="#5C8EFF" />
                <circle cx="310" cy="170" r="9" stroke="#5C8EFF" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="5;10;5" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
                </circle>

                {/* Pin 4: South America */}
                <circle cx="150" cy="270" r="4.5" fill="#02E8F8" />
                <circle cx="150" cy="270" r="9" stroke="#02E8F8" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="5;10;5" dur="3.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="3.2s" repeatCount="indefinite" />
                </circle>

                {/* Pin 5: Oceania */}
                <circle cx="320" cy="280" r="4.5" fill="#5C8EFF" />
                <circle cx="320" cy="280" r="9" stroke="#5C8EFF" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="5;11;5" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.8s" repeatCount="indefinite" />
                </circle>

                {/* Connecting Network vector lines between pins */}
                <path d="M 120,140 Q 170,110 230,120" stroke="#5C8EFF" strokeWidth="0.75" fill="none" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 230,120 Q 270,135 310,170" stroke="#5C8EFF" strokeWidth="0.75" fill="none" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 310,170 Q 230,220 150,270" stroke="#02E8F8" strokeWidth="0.75" fill="none" strokeDasharray="3 3" opacity="0.3" />
                <path d="M 150,270 Q 240,290 320,280" stroke="#5C8EFF" strokeWidth="0.75" fill="none" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 120,140 Q 130,210 150,270" stroke="#02E8F8" strokeWidth="0.75" fill="none" strokeDasharray="3 3" opacity="0.3" />

                {/* Transmitting Signal particles on globe lines */}
                <circle r="2" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="0.5">
                  <animateMotion dur="4.2s" repeatCount="indefinite" path="M 120,140 Q 170,110 230,120" />
                </circle>
                <circle r="2" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="0.5">
                  <animateMotion dur="5s" repeatCount="indefinite" path="M 230,120 Q 270,135 310,170" />
                </circle>
                <circle r="2" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="0.5">
                  <animateMotion dur="4.6s" repeatCount="indefinite" path="M 150,270 Q 240,290 320,280" />
                </circle>
              </svg>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 5: CTA (Dark Section matching new footer) */}
      <section className="bg-[#0A0B0E] text-white relative overflow-hidden py-24 sm:py-32 border-t border-zinc-800/60 z-10">
        {/* Subtle radial glow backing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.06),transparent_60%)] pointer-events-none" />

        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(228,228,231,0.15) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[9px] font-black tracking-widest uppercase text-[#5B84FF] shadow-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
              GET STARTED TODAY
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight max-w-3xl">
              READY TO REACH<br />
              <span className="text-transparent [-webkit-text-stroke:1px_#ffffff] font-black tracking-wide">
                THE RIGHT AUDIENCE?
              </span>
            </h2>
            
            <p className="mt-6 text-zinc-400 font-medium text-sm sm:text-base max-w-xl leading-relaxed">
              Launch your next survey with verified respondents across global markets. Collect reliable insight data with 99.7% accuracy.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button 
                href="/contact" 
                size="lg" 
                className="shadow-[0_8px_24px_-8px_rgba(92,142,255,0.4)] bg-[#5B84FF] text-white hover:bg-white hover:text-zinc-950 transition-all duration-300"
              >
                Launch Your Survey <ArrowRight size={16} className="ml-1.5 inline-block" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
