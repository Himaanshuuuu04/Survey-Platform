"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../primitives';
import { useAudience } from '../layout/AudienceContext';
import { HeroVisual } from './HeroVisual';
import Link from 'next/link';

export function Hero() {
  const { audience } = useAudience();
  const isBrands = audience === 'brands';
  const containerRef = useRef<HTMLDivElement>(null);

  // Mounted state prevents Next.js SSR layout flash and coordinates animation timing
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Global scrollY is much more stable on page refresh than ref bounds offsets
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 500], [0, 45]);
  const svgY = useTransform(scrollY, [0, 500], [0, -35]);

  // Framer Motion Orchestrated Stagger Variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden min-h-[80vh] flex flex-col justify-center bg-white pt-8 lg:pt-12 pb-6 z-10"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* ── Background radial glow centered behind the graphic ── */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(14,107,99,0.04),transparent_55%)] pointer-events-none" />

      {/* ── Custom curved background shape (reduced dominance, high-end accent) ── */}
      <motion.svg
        style={{ y: svgY }}
        className="absolute right-0 top-0 bottom-0 h-full w-[40%] hidden lg:block pointer-events-none z-0 opacity-15"
        viewBox="0 0 420 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 420 0 L 120 0 C 80 120 40 240 40 360 C 40 500 120 620 200 700 C 280 780 420 840 420 900 V 0 Z"
          fill="var(--brand, #0E6B63)"
        />
      </motion.svg>

      <Container className="relative z-10 w-full flex-1 flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          variants={containerVariants}
          className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
        >
          {/* ── Left Column: Value Prop + CTAs + Trust Metrics ── */}
          <div className="relative py-2 lg:py-6">
            
            {/* ── Trust Bar above headline ── */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-zinc-200/60 bg-white/70 px-3 py-1.5 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Trusted by 500+ research teams
                </span>
                <span className="h-3 w-px bg-zinc-200 hidden sm:inline-block" />
                <div className="flex items-center gap-3 text-[9px] font-black tracking-widest text-zinc-400">
                  <span>STRIPE</span>
                  <span>VERCEL</span>
                  <span>LINEAR</span>
                  <span>RAMP</span>
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] xl:text-[2.75rem] font-[900] tracking-tight uppercase leading-[1.05] text-zinc-950">
                {isBrands ? (
                  <>
                    Reach Verified <span className="text-[var(--brand,#0E6B63)]">Respondents.</span> Collect Better Insights.
                  </>
                ) : (
                  <>
                    Your Voice Shapes <span className="text-[var(--brand,#BE123C)]">Global</span> Products. Get Rewarded.
                  </>
                )}
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.div variants={itemVariants}>
              <p className="mt-4 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed max-w-md">
                {isBrands ? (
                  "Field your surveys to premium respondent panels, bypass bot detection with verified identity matches, and collect high-quality insights to guide your next strategic move."
                ) : (
                  "Join our elite panel of verified respondents. Share your perspective on global brands, participate in corporate surveys, and earn rewards for sharing your valuable insights."
                )}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants}>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  href="/contact"
                  className="group relative inline-flex h-10.5 items-center justify-center rounded-xl bg-[var(--brand,#0E6B63)] px-5.5 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_6px_20px_-4px_rgba(14,107,99,0.25)] transition-all duration-300 hover:bg-[var(--brand-dark,#0a4d47)] hover:scale-[1.02] hover:shadow-[0_10px_24px_-4px_rgba(14,107,99,0.35)]"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex h-10.5 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5.5 text-[11px] font-black uppercase tracking-widest text-zinc-800 transition-all duration-300 hover:border-zinc-950 hover:bg-zinc-50/50 hover:scale-[1.02]"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>

            {/* Premium Metrics Cards Block */}
            <motion.div variants={itemVariants}>
              <div className="mt-8 border-t border-zinc-100 pt-6 max-w-md">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { value: '250K+', label: 'Responses Generated' },
                    { value: '500+', label: 'Campaigns Delivered' },
                    { value: '92%', label: 'Avg Completion Rate' },
                    { value: '99.7%', label: 'Fraud Detection Accuracy' }
                  ].map((m) => (
                    <div 
                      key={m.label} 
                      className="relative overflow-hidden rounded-xl border border-zinc-200/50 bg-gradient-to-b from-white to-zinc-50/50 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[var(--brand,#0E6B63)]/40 hover:shadow-[0_8px_16px_rgba(14,107,99,0.04)] hover:-translate-y-0.5 group"
                    >
                      {/* Top accent border visible on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--brand,#0E6B63)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="block text-lg sm:text-xl font-black tracking-tight text-zinc-950">
                        {m.value}
                      </span>
                      <span className="mt-0.5 block text-[8px] font-extrabold uppercase tracking-wider text-zinc-400 leading-snug">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Interactive Dashboard visual with scroll parallax ── */}
          <motion.div 
            variants={itemVariants}
            style={{ y: visualY }} 
            className="relative lg:py-8 z-10"
          >
            <HeroVisual />
          </motion.div>
        </motion.div>

        {/* ── Bottom Section: Aligned Grayscale Trust Logos ── */}
        <div className="mt-16 lg:mt-24 border-t border-zinc-100 pt-12 w-full z-10">
          <p className="text-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
            Trusted by Leading Brands & Organizations
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16 opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-75">
            {/* nglcc */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tighter text-[#0A0A0A]">nglcc</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                National LGBT<br />Chamber of Commerce
              </span>
            </div>

            {/* IAC */}
            <div className="flex items-center gap-1.5">
              <div className="border border-[#0A0A0A] px-1 py-0.5 text-xs font-black tracking-tight text-[#0A0A0A] leading-none">
                IAC
              </div>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Internet Advertising<br />Competition
              </span>
            </div>

            {/* VEGA */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-widest text-[#0A0A0A]">VEGA</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Digital Awards<br />2025 Gold Winner
              </span>
            </div>

            {/* NYX */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-wider text-[#0A0A0A]">NYX</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Grand Winner<br />Awards
              </span>
            </div>

            {/* MUSE */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[8px] text-white font-extrabold">M</div>
              <span className="text-sm font-bold tracking-wider text-[#0A0A0A]">MUSE</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Creative Awards<br />Official Winner
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile background block */}
      <div
        className="absolute right-0 left-0 bottom-0 h-[28%] rounded-t-[2.5rem] lg:hidden -z-10 opacity-15"
        style={{ background: 'var(--brand, #0E6B63)' }}
      />
    </section>
  );
}
