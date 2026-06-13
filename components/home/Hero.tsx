"use client";
import RotatingText from './RotatingText'
import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '../primitives';
import { useAudience } from '../layout/AudienceContext';
import { HeroVisual } from './HeroVisual';
import Link from 'next/link';
import { BarChart3, Target, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import CountUp from '../CountUp';
import LogoLoop from '../LogoLoop';

export function Hero() {
  const { audience } = useAudience();
  const isBrands = audience === 'brands';
  const containerRef = useRef<HTMLDivElement>(null);

  const logoItems = useMemo(() => [
    {
      node: (
        <div className="flex items-center gap-2 select-none">
          <span className="text-lg font-black tracking-tighter text-[#0A0A0A] shrink-0">nglcc</span>
          <span className="text-[7.5px] sm:text-[8.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-tight">
            National LGBT<br />Chamber of Commerce
          </span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-1.5 select-none">
          <div className="border border-[#0A0A0A] px-1 py-0.5 text-xs font-black tracking-tight text-[#0A0A0A] leading-none shrink-0">
            IAC
          </div>
          <span className="text-[7.5px] sm:text-[8.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-tight">
            Internet Advertising<br />Competition
          </span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 select-none">
          <span className="text-sm font-extrabold tracking-widest text-[#0A0A0A] shrink-0">VEGA</span>
          <span className="text-[7.5px] sm:text-[8.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-tight">
            Digital Awards<br />2025 Gold Winner
          </span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 select-none">
          <span className="text-sm font-black tracking-wider text-[#0A0A0A] shrink-0">NYX</span>
          <span className="text-[7.5px] sm:text-[8.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-tight">
            Grand Winner<br />Awards
          </span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 select-none">
          <div className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[8px] text-white font-extrabold shrink-0">M</div>
          <span className="text-sm font-bold tracking-wider text-[#0A0A0A] shrink-0">MUSE</span>
          <span className="text-[7.5px] sm:text-[8.5px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-tight">
            Creative Awards<br />Official Winner
          </span>
        </div>
      )
    }
  ], []);

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
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(92,142,255,0.04),transparent_55%)] pointer-events-none" />

      <motion.svg
        style={{ y: svgY }}
        className="absolute right-0 top-0 bottom-0 h-full w-[40%] hidden lg:block pointer-events-none z-0 opacity-25"
        viewBox="0 0 420 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="heroGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#02e8f8" />
          </linearGradient>
        </defs>

        <path
          d="M 420 0 L 120 0 C 80 120 40 240 40 360 C 40 500 120 620 200 700 C 280 780 420 840 420 900 V 0 Z"
          fill="url(#heroGradient)"
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
              <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-xl border border-zinc-200/60 bg-white/70 px-3 py-1.5 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8.5} className="fill-amber-500 stroke-none" />
                  ))}
                  <span className="ml-1 text-[8.5px] font-black text-zinc-800">4.9/5 Rating</span>
                </div>
                <span className="h-3.5 w-px bg-zinc-200" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Trusted by 500+ teams
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-[900] tracking-tight uppercase leading-[1.05] text-zinc-950">

                {isBrands ? (
                  <>
                    Reach Verified<br />
                    <span className=" inline-flex overflow-hidden vertical-align-middle pb-1">
                      <RotatingText
                        texts={['Respondents.', 'Audiences.', 'Professionals.', 'Consumers.', 'Experts']}
                        mainClassName="inline-flex font-black text-[#1FC5F7]"
                        staggerFrom="last"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-120%' }}
                        staggerDuration={0.020}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        rotationInterval={2500}
                        splitBy="characters"
                        auto
                        loop
                      />
                    </span>
                    <br />
                    Collect <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">Better Insights.</span>
                  </>
                ) : (
                  <>
                    Your Voice Shapes<br />
                    <span className="text-[var(--brand,#BE123C)] inline-flex overflow-hidden vertical-align-middle pb-1">
                      <RotatingText
                        texts={['Global', 'Future', "Tomorrow's", 'Everyday', 'Leading']}
                        mainClassName="inline-flex text-[var(--brand,#BE123C)] font-black"
                        staggerFrom="last"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-120%' }}
                        staggerDuration={0.020}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        rotationInterval={2500}
                        splitBy="characters"
                        auto
                        loop
                      />
                    </span><br />
                    Products. <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">Get Rewarded.</span>
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
                  className="group relative inline-flex h-10.5 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#02e8f8] px-5.5 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_6px_20px_-4px_rgba(92,142,255,0.25)] transition-all duration-300 hover:bg-[var(--brand-dark,#5c8eff)] hover:scale-[1.02] hover:shadow-[0_10px_24px_-4px_rgba(92,142,255,0.35)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book a Demo
                    <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
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
      </Container>

     

      {/* ── Bottom Section: Aligned Grayscale Trust Logos ── */}
      <Container className="relative z-10 w-full">
        <div className=" border-zinc-100 pt-12 w-full z-10">
          <p className="text-center text-lg font-black uppercase tracking-[0.25em] text-zinc-400 mb-8">
            Trusted by Leading Brands & Organizations
          </p>
          <LogoLoop
            logos={logoItems}
            speed={40}
            logoHeight={32}
            gap={64}
            fadeOut={true}
            pauseOnHover={true}
            className="opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-75"
          />
        </div>
      </Container>

      {/* Mobile background block */}
      <div
        className="absolute right-0 left-0 bottom-0 h-[28%] rounded-t-[2.5rem] lg:hidden -z-10 opacity-15"
        style={{ background: 'var(--brand, #5C8EFF)' }}
      />
    </section>
  );
}
