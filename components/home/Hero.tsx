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
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
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
      className="relative overflow-hidden min-h-[85vh] flex flex-col justify-center bg-white pt-10 lg:pt-16 pb-8 z-10"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* ── Background radial glow centered behind the video card ── */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(14,107,99,0.05),transparent_55%)] pointer-events-none" />

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
          fill="#0E6B63"
        />
      </motion.svg>

      <Container className="relative z-10 w-full flex-1 flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          variants={containerVariants}
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          {/* ── Left Column: Value Prop + CTAs + Trust Metrics ── */}
          <div className="relative py-4 lg:py-10">
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-[900] tracking-tight uppercase leading-[1.02] text-zinc-950">
                {isBrands ? (
                  <>
                    Survey Marketing <span className="text-swoosh text-zinc-950">Platform</span> For Enterprise Brands.
                  </>
                ) : (
                  <>
                    Your Voice Shapes <span className="text-swoosh text-zinc-950">Global</span> Products.
                  </>
                )}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mt-5 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed max-w-md">
                {isBrands ? (
                  "Field your surveys to premium respondent panels, bypass bot detection, and collect verified insights to guide your next strategic move."
                ) : (
                  "Join our elite panel of respondents. Share your perspective on global brands, participate in corporate surveys, and earn rewards for sharing your valuable insights."
                )}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex h-11 items-center justify-center rounded-full bg-[#0E6B63] px-6 text-xs font-bold uppercase tracking-widest text-white shadow-[0_8px_20px_-4px_rgba(14,107,99,0.22)] transition-all duration-300 hover:bg-[#0a4d47] hover:scale-[1.02] hover:shadow-[0_12px_25px_-4px_rgba(14,107,99,0.3)]"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-xs font-bold uppercase tracking-widest text-zinc-800 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-50"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>

            {/* Credibility badges strip */}
            <motion.div variants={itemVariants}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-100 pt-6 max-w-md">
                {[
                  { value: '250K+', label: 'Responses' },
                  { value: '500+', label: 'Campaigns' },
                  { value: '92%', label: 'Completion Rate' }
                ].map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-950">{m.value}</span>
                    <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400 leading-snug">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Testimonial Visual with scroll parallax ── */}
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
        style={{ background: '#0E6B63' }}
      />
    </section>
  );
}
