"use client";

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Send, ShieldCheck, CheckSquare, Globe, SlidersHorizontal,
  ArrowRight, Check, Activity, Sparkles, BarChart3, Database, Target,
  ChevronLeft, ChevronRight
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
            className={`px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${item.active
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

// AUDIENCE REACH STATS
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

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);

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

          // Subtly shift background typography
          if (backgroundTextRef.current) {
            gsap.to(backgroundTextRef.current, {
              x: -index * 35,
              duration: 1.2,
              ease: 'power2.out'
            });
          }
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

  // Intercept scroll wheel inside viewport to snap cards
  useEffect(() => {
    const container = viewportRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollCooldown = 600; // time window to avoid multiple rapid trigger scroll signals

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 12) {
        const now = Date.now();
        if (now - lastScrollTime > scrollCooldown) {
          e.preventDefault();
          if (e.deltaY > 0) {
            setActiveIndex(prev => Math.min(prev + 1, steps.length - 1));
          } else {
            setActiveIndex(prev => Math.max(prev - 1, 0));
          }
          lastScrollTime = now;
        } else {
          e.preventDefault();
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  // Mobile swipe gestures
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        setActiveIndex(prev => Math.min(prev + 1, steps.length - 1));
      } else {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const handlePrev = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

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

      {/* SECTION 3: Global Reach & Panel Scale (Premium timeline in light theme) */}
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
                <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
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

      {/* SECTION 4: How It Works (GSAP Storytelling Carousel in light theme) */}
      <Section className="bg-white border-b border-zinc-200 overflow-hidden relative py-24 sm:py-32" id="services-how-it-works">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient radial glows */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(92,142,255,0.03),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(2,232,248,0.02),transparent_70%)] pointer-events-none" />

        {/* Giant background typography watermark */}
        <div 
          ref={backgroundTextRef}
          className="absolute top-[28%] left-[-10%] text-[10vw] font-[1000] uppercase tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(9,9,11,0.035)] pointer-events-none select-none leading-none z-0 font-sans whitespace-nowrap"
        >
          SURVEY LIFECYCLE • SURVEY LIFECYCLE • SURVEY LIFECYCLE
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_3.2fr] lg:gap-16 items-start">
            
            {/* Left Column: Title & Navigation */}
            <div className="text-left flex flex-col h-full justify-between lg:sticky lg:top-32">
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

              {/* Slider Navigation (Diagonal slash arrow control) - Raw chevrons matching reference style */}
              <Reveal delay={0.15}>
                <div className="flex items-center gap-3 mt-8 select-none">
                  {/* Left Chevron Button */}
                  <button 
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-950 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 bg-transparent border border-zinc-200 rounded-sm shadow-sm hover:bg-zinc-50 cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft size={20} strokeWidth={2} />
                  </button>

                  {/* Diagonal slash line */}
                  <div className="w-[1.5px] h-6 bg-zinc-300 rotate-[25deg] self-center" />

                  {/* Right Chevron Button */}
                  <button 
                    onClick={handleNext}
                    disabled={activeIndex === steps.length - 1}
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-950 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 bg-transparent border border-zinc-200 rounded-sm shadow-sm hover:bg-zinc-50 cursor-pointer"
                    aria-label="Next step"
                  >
                    <ChevronRight size={20} strokeWidth={2} />
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Horizontal Cards Slider (GSAP driven) */}
            <div 
              ref={viewportRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-8 pt-4 px-2"
            >
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
                      className={`snap-center flex-shrink-0 h-[420px] rounded-xl border p-8 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer relative w-[290px] sm:w-[325px] ${
                        isActive 
                          ? 'border-transparent shadow-[0_20px_40px_rgba(91,132,255,0.08)] z-10 scale-[1.01]' 
                          : 'border-zinc-800 bg-[#151824] hover:bg-[#1a1e2d] hover:border-zinc-700 z-0'
                      }`}
                      style={{
                        backgroundColor: isActive ? step.color : undefined,
                      }}
                    >
                      {/* Top Row: Number bracket */}
                      <span className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-500 ${
                        isActive 
                          ? 'text-zinc-950/50' 
                          : 'text-zinc-400'
                      }`}>
                        [{step.num}]
                      </span>

                      {/* Title */}
                      <div className="flex flex-col mt-4">
                        <h3 className={`text-2xl sm:text-3xl font-[1000] uppercase tracking-tighter transition-colors duration-500 leading-none whitespace-normal break-words mt-2 ${
                          isActive 
                            ? 'text-zinc-950' 
                            : 'text-white'
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      {/* MIDDLE: Unique Animated Visual State per Step */}
                      <div className="flex-grow flex items-center justify-center my-4 relative h-[120px]">
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
                      <p className={`text-[11.5px] sm:text-xs leading-relaxed font-semibold transition-colors duration-500 mt-auto ${
                        isActive 
                          ? 'text-zinc-950' 
                          : 'text-zinc-400'
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
