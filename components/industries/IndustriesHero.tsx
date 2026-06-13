"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Globe2, 
  ArrowRight, 
  Brain, 
  Target, 
  Handshake, 
  Award,
  ChevronDown
} from 'lucide-react';
import { Container, Reveal, Button, GlassCard, Counter, GradientBlob } from '../primitives';

export function IndustriesHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  } as const;

  // Floating Segment Orbit details
  const floatingSegments = [
    { text: "Consumer Durables", r: 165, angle: 0, color: "text-[#5B84FF] border-[#5B84FF]/20" },
    { text: "Financial Services", r: 165, angle: 60, color: "text-[#7C3AED] border-[#7C3AED]/20" },
    { text: "Healthcare", r: 165, angle: 120, color: "text-[#02E8F8] border-[#02E8F8]/20" },
    { text: "Tech, Media & Telecom", r: 165, angle: 180, color: "text-[#5B84FF] border-[#5B84FF]/20" },
    { text: "Food & Beverage", r: 165, angle: 240, color: "text-[#7C3AED] border-[#7C3AED]/20" },
    { text: "Retail & Commerce", r: 165, angle: 300, color: "text-[#02E8F8] border-[#02E8F8]/20" },
  ];

  return (
    <div className="w-full">
      {/* ── PART 1: TOP HERO COLUMN GRID ── */}
      <section
        className="relative overflow-hidden lg:pt-10 lg:pb-0
         sm:pt-20 sm:pb-24  bg-white z-10"
        style={{
          backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* <GradientBlob className="-top-32 -left-32 h-96 w-96" />
        <GradientBlob className="-top-32 -right-32 h-96 w-96" from="var(--accent)" to="var(--brand)" /> */}
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(92,142,255,0.03),transparent_55%)] pointer-events-none" />

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            variants={containerVariants}
            className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          >
            {/* LEFT COLUMN: Headings, Supporting Copy and CTA Buttons */}
            <div className="text-left flex flex-col justify-center">
              
              {/* Small Label */}
              <motion.div variants={itemVariants} className="mb-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[9px] font-black tracking-widest uppercase text-[#5B84FF] shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                  Market Segments &bull; Global Expertise
                </div>
              </motion.div>

              {/* Giant Redesigned Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] font-[1000] tracking-tight uppercase leading-[1.05] text-[#0A0A0A]">
                  WE DECODE THE<br />
                  <span className="text-transparent [-webkit-text-stroke:1.3px_#111111] font-black tracking-wide">
                    MARKET SEGMENTS
                  </span><br />
                  THAT DRIVE{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B84FF] to-[#02E8F8] font-black">
                    INNOVATION.
                  </span>
                </h1>
              </motion.div>

              {/* Sub-headline */}
             

              {/* Supporting Copy */}
              <motion.div variants={itemVariants}>
                <p className="mt-4 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed max-w-xl">
                  Our innovative research solutions illuminate the path forward, guiding you towards untapped opportunities and empowering you to navigate the ever-evolving landscape of your industry.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
                <Button 
                  href="/contact" 
                  size="lg" 
                  className="w-full sm:w-auto shadow-[0_8px_24px_-8px_rgba(92,142,255,0.3)] hover:translate-y-[-2px] hover:shadow-[0_14px_32px_-8px_rgba(92,142,255,0.4)] transition-all duration-300"
                >
                  Start Your Research Project
                </Button>
                <Button 
                  href="#approach" 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-1.5"
                >
                  Explore Our Approach
                  <ChevronDown size={16} />
                </Button>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: Interactive Segment Orbit map */}
            <motion.div
              variants={itemVariants}
              className="relative flex items-center justify-center lg:justify-end py-6"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.06),transparent_50%)] opacity-95 blur-3xl pointer-events-none" />

              {/* Interactive Segment SVG Canvas */}
              <div className="w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] relative select-none will-change-transform">
                <svg viewBox="0 0 500 500" fill="none" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#02E8F8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#5C8EFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="orbit-line" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5C8EFF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Orbit Background Rings */}
                  <circle cx="250" cy="250" r="165" stroke="url(#orbit-line)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="250" cy="250" r="110" stroke="url(#orbit-line)" strokeWidth="1" opacity="0.4" />
                  
                  {/* Outer Orbit Rotation animation */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  >
                    {/* Ring Accents */}
                    <circle cx="250" cy="85" r="3" fill="#5C8EFF" />
                    <circle cx="415" cy="250" r="3" fill="#02E8F8" />
                    <circle cx="250" cy="415" r="3" fill="#5C8EFF" />
                    <circle cx="85" cy="250" r="3" fill="#02E8F8" />
                  </motion.g>

                  {/* Core hub glow */}
                  <circle cx="250" cy="250" r="70" fill="url(#hub-glow)" filter="url(#glow-effect)" opacity="0.85" />
                  
                  {/* Solid central node */}
                  <circle cx="250" cy="250" r="32" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="8" />
                  <circle cx="250" cy="250" r="12" fill="#02E8F8" />
                  <text x="250" y="300" textAnchor="middle" className="text-[10px] font-black uppercase tracking-[0.2em] fill-zinc-950 font-sans">GMS HUB</text>

                  {/* Nodes & Connected Lines */}
                  {floatingSegments.map((seg, idx) => {
                    const rad = (seg.angle * Math.PI) / 180;
                    const x = Number((250 + seg.r * Math.cos(rad)).toFixed(4));
                    const y = Number((250 + seg.r * Math.sin(rad)).toFixed(4));

                    return (
                      <g key={idx}>
                        {/* Line to center */}
                        <line x1="250" y1="250" x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
                        
                        {/* Node handle */}
                        <motion.circle
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#5C8EFF"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, delay: idx * 0.4, repeat: Infinity }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Overlaid HTML labels positioned absolutely using math matching the SVG angles */}
                {floatingSegments.map((seg, idx) => {
                  const rad = (seg.angle * Math.PI) / 180;
                  // Map center 250px to percentage: (x / 500) * 100
                  const xPct = (((250 + seg.r * Math.cos(rad)) / 500) * 100).toFixed(4);
                  const yPct = (((250 + seg.r * Math.sin(rad)) / 500) * 100).toFixed(4);

                  return (
                    <motion.div
                      key={idx}
                      style={{ 
                        left: `${xPct}%`, 
                        top: `${yPct}%`,
                        transform: 'translate(-50%, -50%)' 
                      }}
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: idx * 0.6,
                        ease: "easeInOut"
                      }}
                      className={`absolute px-2.5 py-1.5 rounded-xl border bg-white/95 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center gap-1.5 select-none ${seg.color}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#02E8F8]" />
                      {seg.text}
                    </motion.div>
                  );
                })}

                {/* Floating Metrics Badge 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute top-[3%] left-[-5%] bg-white/95 backdrop-blur-sm border border-zinc-200 shadow-sm px-3 py-2 rounded-[1.25rem] flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 flex items-center justify-center text-[#5C8EFF]">
                    <Award size={10} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-zinc-950 leading-none">96%</span>
                    <span className="text-[6.5px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">Repeated Business</span>
                  </div>
                </motion.div>

                {/* Floating Metrics Badge 2 */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute bottom-[3%] right-[-5%] bg-white/95 backdrop-blur-sm border border-zinc-200 shadow-sm px-3 py-2 rounded-[1.25rem] flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 flex items-center justify-center text-[#5C8EFF]">
                    <Globe2 size={10} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-zinc-950 leading-none">97+</span>
                    <span className="text-[6.5px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">Industries Spanned</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── PART 2: DISCOVER THE IMPACT OF INSIGHTS (METRICS SECTION) ── */}
      <section
        className="border-b border-[#E5E7EB] py-14 sm:py-20 relative bg-white"
        style={{
          backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] items-center">
            {/* Side descriptive text */}
            <Reveal className="max-w-md">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[9px] font-black tracking-widest uppercase text-[#5B84FF] mb-4 shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5C8EFF]" />
                Impact of Insights
              </div>
              <h2 className="text-3xl font-[900] tracking-tight uppercase leading-none text-zinc-950 mb-4">
                TRUSTED DATA,<br/>
                PROVEN RESULTS.
              </h2>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                Our market research expertise provides reliable data trusted by top consultancies, financial institutions, and leading research firms worldwide.
              </p>
            </Reveal>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  value: 96, 
                  suffix: '%', 
                  label: 'Repeated Business', 
                  desc: 'Our clients return for future projects, a testament to our quality service.',
                  icon: Users,
                  color: '#5C8EFF'
                },
                { 
                  value: 97, 
                  suffix: '+', 
                  label: 'Extensive Reach', 
                  desc: 'We offer insights across diverse sectors, with research spanning over 97+ industries.',
                  icon: Globe2,
                  color: '#7C3AED'
                },
                { 
                  value: 100, 
                  suffix: '%', 
                  label: 'Reliable Data', 
                  desc: 'Count on our expert market research to deliver accurate and trustworthy insights.',
                  icon: ShieldCheck,
                  color: '#2563EB'
                },
                { 
                  value: 7, 
                  suffix: '+', 
                  label: 'Quality Assurance', 
                  desc: 'Our rigorous 5-step quality check process, ensuring top-notch results.',
                  icon: Award,
                  color: '#02E8F8'
                }
              ].map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <Reveal key={m.label} delay={idx * 0.05}>
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 hover:border-[#5C8EFF]/40 hover:shadow-[0_12px_24px_rgba(92,142,255,0.05)] hover:-translate-y-1 group flex flex-col justify-between h-full">
                      {/* Top indicator stripe */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#5C8EFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                      <div className="flex items-start justify-between">
                        {/* Value & Suffix */}
                        <div>
                          <span className="text-3xl sm:text-4xl font-[1000] tracking-tight text-zinc-950 leading-none">
                            <Counter to={m.value} suffix={m.suffix} />
                          </span>
                          <h4 className="mt-2 text-xs font-black uppercase tracking-wider text-zinc-950">
                            {m.label}
                          </h4>
                        </div>

                        {/* Icon */}
                        <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#5C8EFF] group-hover:bg-[#5C8EFF] group-hover:text-white transition-colors duration-300">
                          <IconComponent size={16} strokeWidth={2.5} />
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-zinc-500 font-medium leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
