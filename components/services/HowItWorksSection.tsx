"use client";

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Send, Check, 
  SlidersHorizontal, Database, ShieldCheck, Target 
} from 'lucide-react';
import { Reveal } from '@/components/primitives';

// HOW IT WORKS STEPS DATA
const steps = [
  {
    num: "01",
    title: "Define Audience",
    desc: "Configure target profiles with demographical, regional, and industry selectors.",
    icon: SlidersHorizontal,
    color: "#DCE7FF", // Soft EGI Blue
    hoverTextDark: true
  },
  {
    num: "02",
    title: "Launch Survey",
    desc: "Deploy surveys across dispatch channels and platform links immediately.",
    icon: Send,
    color: "#F1E9FF", // Soft Violet
    hoverTextDark: true
  },
  {
    num: "03",
    title: "Collect Responses",
    desc: "Gather completions in real-time across devices and responsive screens.",
    icon: Database,
    color: "#E0EBFF", // Soft Royal Blue
    hoverTextDark: true
  },
  {
    num: "04",
    title: "Validate Data",
    desc: "Filter invalid responses using device logs and geo-verification checks.",
    icon: ShieldCheck,
    color: "#D2F4F7", // Soft EGI Cyan
    hoverTextDark: true
  },
  {
    num: "05",
    title: "Deliver Insights",
    desc: "Obtain clean, verified, and structured datasets ready for direct analysis.",
    icon: Target,
    color: "#D1FBF0", // Soft Teal
    hoverTextDark: true
  }
];

// HELPER COMPONENT: Real-time response counter for Step 3
function LiveCounter({ isActive, isHovered, hoverTextDark }: { isActive: boolean; isHovered: boolean; hoverTextDark: boolean }) {
  const [count, setCount] = useState(14820);
  useEffect(() => {
    if (!isActive) {
      setCount(14820);
      return;
    }
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 80);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={`text-left p-4 rounded-2xl border transition-all duration-500 ${
      isHovered 
        ? (hoverTextDark ? 'bg-zinc-950/10 border-zinc-950/10' : 'bg-white/10 border-white/10') 
        : 'bg-zinc-50 border-zinc-100'
    }`}>
      <span className={`block text-[7px] font-black uppercase tracking-widest ${
        isHovered 
          ? (hoverTextDark ? 'text-zinc-950/60' : 'text-white/60') 
          : 'text-zinc-400'
      }`}>
        LIVE INGESTION TRACKER
      </span>
      <span className={`text-2xl font-[1000] tracking-tight block mt-0.5 font-mono leading-none ${
        isHovered 
          ? (hoverTextDark ? 'text-zinc-950' : 'text-white') 
          : 'text-zinc-950'
      }`}>
        {count.toLocaleString()}
      </span>
      <span className={`text-[8.5px] font-bold mt-2 flex items-center gap-1.5 ${
        isHovered 
          ? (hoverTextDark ? 'text-zinc-950/80' : 'text-white/80') 
          : 'text-[#2563EB]'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Stream Active
      </span>
    </div>
  );
}

// HELPER COMPONENT: Simulated VPN proxy and verified entries filter for Step 4
function ValidationFeed({ isActive, isHovered, hoverTextDark }: { isActive: boolean; isHovered: boolean; hoverTextDark: boolean }) {
  const [items, setItems] = useState([
    { id: "#3819", type: "Proxy IP", valid: false, show: true },
    { id: "#3820", type: "Verified", valid: true, show: true },
    { id: "#3821", type: "Speed Run", valid: false, show: true },
    { id: "#3822", type: "Verified", valid: true, show: true }
  ]);

  useEffect(() => {
    if (!isActive) {
      setItems([
        { id: "#3819", type: "Proxy IP", valid: false, show: true },
        { id: "#3820", type: "Verified", valid: true, show: true },
        { id: "#3821", type: "Speed Run", valid: false, show: true },
        { id: "#3822", type: "Verified", valid: true, show: true }
      ]);
      return;
    }
    const timer = setTimeout(() => {
      setItems(prev => prev.map(item => item.valid ? item : { ...item, show: false }));
    }, 1400);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="space-y-1.5 max-w-[260px] w-full">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          animate={{
            opacity: item.show ? 1 : 0.15,
            scale: item.show ? 1 : 0.95,
          }}
          transition={{ duration: 0.4 }}
          className={`p-2 rounded-xl border flex items-center justify-between transition-colors duration-500 ${
            isHovered 
              ? (hoverTextDark ? 'bg-zinc-950/10 border-zinc-950/10' : 'bg-white/10 border-white/10') 
              : 'bg-zinc-50 border-zinc-100'
          }`}
        >
          <span className={`text-[8.5px] font-bold font-mono leading-none ${
            isHovered 
              ? (hoverTextDark ? 'text-zinc-950' : 'text-white') 
              : 'text-zinc-700'
          }`}>{item.id}</span>
          
          <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider ${
            item.valid 
              ? (isHovered && !hoverTextDark ? 'bg-emerald-500/20 text-white' : 'bg-emerald-50 text-emerald-600') 
              : (isHovered && !hoverTextDark ? 'bg-red-500/20 text-white' : 'bg-red-50 text-red-600')
          }`}>
            {item.valid ? 'Verified' : item.type}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress targeting the Section 4 container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Calculate card number parallax translation offset
  const numberParallax = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  // Floating particles local state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; driftX: number }>>([]);
  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 80 + 10, // percentage (avoid edge clipping)
      size: Math.random() * 5 + 3, // size in px
      duration: Math.random() * 15 + 15, // seconds
      delay: Math.random() * 5,
      driftX: Math.random() * 30 - 15
    }));
    setParticles(generated);
  }, []);

  const updateCarousel = (index: number) => {
    if (viewportRef.current && trackRef.current) {
      const viewportWidth = viewportRef.current.offsetWidth;
      const cards = trackRef.current.children;
      if (cards.length > 0) {
        const activeCard = cards[index] as HTMLElement;
        if (activeCard) {
          const cardWidth = activeCard.offsetWidth;
          const cardLeft = activeCard.offsetLeft;
          // Calculate dynamic offset to center the active card in the viewport
          const x = (viewportWidth / 2) - (cardWidth / 2) - cardLeft;
          
          gsap.to(trackRef.current, {
            x: x,
            duration: 0.8,
            ease: 'power3.out'
          });
        }
      }
    }
  };

  // Run carousel updates on activeIndex change
  useEffect(() => {
    updateCarousel(activeIndex);
  }, [activeIndex]);

  // Handle window resizing and layout mount
  useEffect(() => {
    const handleResize = () => updateCarousel(activeIndex);
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => updateCarousel(activeIndex), 150);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-white border-b border-zinc-200 overflow-hidden relative py-24 sm:py-32" 
      id="services-how-it-works"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient radial glows & gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(92,142,255,0.02),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(2,232,248,0.015),transparent_70%)] pointer-events-none z-0" />

      {/* Floating Ambient Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#5B84FF]/20 pointer-events-none z-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.driftX, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_3.2fr] lg:gap-16 items-start">
          
          {/* Left Column: Title & Navigation */}
          <div className="text-left flex flex-col h-full justify-between lg:sticky lg:top-32 relative z-10">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4">
                  <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
                  THE WORKFLOW
                </div>
              </Reveal>
              <Reveal delay={0.05} className="mt-2">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
                  SURVEY<br />
                  <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                    LIFECYCLE.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-4">
                <p className="text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed max-w-xs">
                  Our platform orchestrates every stage of the dispatch, collection, and validation lifecycle automatically.
                </p>
              </Reveal>
            </div>

            {/* Slider Navigation - Raw chevrons matching reference style */}
            <Reveal delay={0.15}>
              <div className="flex items-center gap-4 mt-8 select-none">
                {/* Left Chevron Button */}
                <button 
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-950 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 bg-transparent border border-zinc-200 rounded-md shadow-sm hover:bg-zinc-50 cursor-pointer"
                  aria-label="Previous step"
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>

                {/* Diagonal slash line */}
                <div className="w-[1.5px] h-8 bg-zinc-300 rotate-[25deg] self-center" />

                {/* Right Chevron Button */}
                <button 
                  onClick={handleNext}
                  disabled={activeIndex === steps.length - 1}
                  className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-950 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 bg-transparent border border-zinc-200 rounded-md shadow-sm hover:bg-zinc-50 cursor-pointer"
                  aria-label="Next step"
                >
                  <ChevronRight size={24} strokeWidth={2} />
                </button>
              </div>
            </Reveal>
          </div>

          <div 
            ref={viewportRef}
            className="relative w-full overflow-hidden select-none pb-8 pt-4 px-2"
          >
            {/* Progress timeline bar connecting stages */}
            <div className="relative w-full h-[2.5px] bg-zinc-100 mb-12 z-10 rounded-full">
              {/* Active progress segment */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5B84FF] to-[#02E8F8]"
                animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Stage node dots */}
              <div className="absolute inset-0 flex justify-between pointer-events-none">
                {steps.map((_, dotIdx) => (
                  <div 
                    key={dotIdx} 
                    className={`w-2 h-2 rounded-full -translate-y-[2.75px] transition-all duration-500 ${
                      dotIdx <= activeIndex ? 'bg-[#5B84FF] scale-125 shadow-[0_0_8px_rgba(91,132,255,0.4)]' : 'bg-zinc-200'
                    }`} 
                  />
                ))}
              </div>
            </div>

            <div 
              ref={trackRef}
              className="flex gap-8 items-center w-max transition-all duration-300 ease-out"
              style={{ willChange: 'transform' }}
            >
              {steps.map((step, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`snap-center flex-shrink-0 h-[420px] rounded-xl border p-8 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer relative w-[290px] sm:w-[325px] overflow-hidden ${
                      isActive 
                        ? 'border-zinc-950/15 shadow-[0_24px_50px_rgba(91,132,255,0.12)] z-10 scale-[1.04]' 
                        : 'border-zinc-200/50 bg-gradient-to-tr from-white/40 to-white/80 backdrop-blur-md hover:bg-white/95 hover:border-zinc-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] text-zinc-900 z-0'
                    }`}
                    style={{
                      backgroundColor: isActive ? step.color : undefined,
                    }}
                  >
                    {/* Subtly animated active card glow pulse */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(91,132,255,0.15),transparent_70%)] pointer-events-none"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}

                    {/* Giant background cropped number with parallax */}
                    <motion.div 
                      style={{ x: numberParallax }}
                      className={`absolute -bottom-10 -right-4 text-[11rem] font-[1000] leading-none select-none pointer-events-none z-0 font-sans tracking-tighter transition-colors duration-500 ${
                        isActive 
                          ? 'text-zinc-950/[0.035]' 
                          : 'text-zinc-950/[0.022]'
                      }`}
                    >
                      {step.num}
                    </motion.div>

                    {/* Top Row: Number bracket */}
                    <span className={`relative z-10 text-[11px] font-mono font-bold tracking-wider transition-colors duration-500 ${
                      isActive 
                        ? 'text-zinc-950/50' 
                        : 'text-zinc-400'
                    }`}>
                      [{step.num}]
                    </span>

                    {/* Title */}
                    <div className="relative z-10 flex flex-col mt-4">
                      <h3 className={`text-2xl sm:text-3xl font-[1000] uppercase tracking-tighter transition-colors duration-500 leading-none whitespace-normal break-words mt-2 ${
                        isActive 
                          ? 'text-zinc-950' 
                          : 'text-zinc-900'
                      }`}>
                        {step.title}
                      </h3>
                    </div>

                    {/* MIDDLE: Unique Animated Visual State per Step */}
                    <div className="relative z-10 flex-grow flex items-center justify-center my-4 h-[120px]">
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.div
                            key="animation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="w-full flex justify-center items-center"
                          >
                            {/* Step 1: Define Audience */}
                            {idx === 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2 justify-start max-w-[260px] h-[100px] overflow-hidden content-start">
                                {["B2B Tech Buyers", "Age 25-45", "Location: US/UK", "IT Managers", "Developers", "Income > $100K"].map((chip, chipIdx) => (
                                  <motion.div
                                    key={chipIdx}
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: chipIdx * 0.08, duration: 0.3 }}
                                    className="px-2.5 py-0.5 rounded-full border text-[8px] font-black uppercase tracking-wider bg-white/60 border-zinc-950/15 text-zinc-950"
                                  >
                                    {chip}
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Step 2: Launch Survey */}
                            {idx === 1 && (
                              <div className="relative w-full h-[100px] flex items-center justify-center overflow-hidden">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center relative z-10 bg-zinc-950 text-white shadow-sm">
                                  <Send size={12} strokeWidth={2.5} />
                                </div>
                                {[1, 2, 3].map((ring) => (
                                  <motion.div
                                    key={ring}
                                    animate={{
                                      scale: [1, 2.5],
                                      opacity: [0.5, 0]
                                    }}
                                    transition={{
                                      duration: 2.2,
                                      repeat: Infinity,
                                      delay: ring * 0.7,
                                      ease: "easeOut"
                                    }}
                                    className="absolute w-8 h-8 rounded-full border pointer-events-none border-zinc-950/20"
                                  />
                                ))}
                              </div>
                            )}

                            {/* Step 3: Collect Responses */}
                            {idx === 2 && (
                              <LiveCounter isActive={isActive} isHovered={isActive} hoverTextDark={true} />
                            )}

                            {/* Step 4: Validate Data */}
                            {idx === 3 && (
                              <ValidationFeed isActive={isActive} isHovered={isActive} hoverTextDark={true} />
                            )}

                            {/* Step 5: Deliver Insights */}
                            {idx === 4 && (
                              <div className="h-[100px] flex items-end gap-3 justify-center overflow-hidden w-full">
                                {[40, 75, 92].map((height, barIdx) => (
                                  <div key={barIdx} className="flex flex-col items-center">
                                    <motion.div
                                      initial={{ height: 0 }}
                                      animate={{ height: `${height}px` }}
                                      transition={{ duration: 0.8, delay: barIdx * 0.15, ease: "easeOut" }}
                                      className="w-6 rounded-t-lg bg-zinc-950"
                                    />
                                    <span className="text-[8px] font-mono font-bold mt-1.5 text-zinc-950">{height}%</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <motion.span
                            key="plus"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-3xl font-light text-zinc-600/70 select-none"
                          >
                            +
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom: Description */}
                    <p className={`relative z-10 text-[11.5px] sm:text-xs leading-relaxed font-semibold transition-colors duration-500 mt-auto ${
                      isActive 
                        ? 'text-zinc-950' 
                        : 'text-zinc-500'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
