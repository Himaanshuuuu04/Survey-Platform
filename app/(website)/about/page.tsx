"use client";

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, HelpCircle, AlertCircle, Cpu, ShieldCheck, ChevronLeft, ChevronRight, Target, Brain, ShieldAlert, Globe, ChevronDown, Clock, Users, Zap, Database } from 'lucide-react';
import { FinalCTA } from '@/components/home/FinalCTA';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── About Hero ─── */
function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const wordAboutRef = useRef<HTMLSpanElement>(null);
  const wordUsRef = useRef<HTMLSpanElement>(null);
  const centerImgRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        wordAboutRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.9 }
      )
        .fromTo(
          wordUsRef.current,
          { y: '100%' },
          { y: '0%', duration: 0.9 },
          '-=0.75'
        )
        .fromTo(
          labelRef.current?.querySelectorAll('.about-char') || [],
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, stagger: 0.015, duration: 0.35 },
          '-=0.6'
        )
        .fromTo(
          descRef.current?.querySelectorAll('.about-word') || [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.012, duration: 0.45 },
          '-=0.4'
        )
        .fromTo(
          centerImgRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=1.2'
        )
        .fromTo(
          centerImgRef.current?.querySelector('.about-hero-img-main__img') || [],
          { scale: 1.15 },
          { scale: 1, duration: 1.5 },
          '-=1.2'
        )
        .fromTo(
          rightBlockRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=1'
        )
        .fromTo(
          rightBlockRef.current?.querySelector('.about-hero-img-small__img') || [],
          { scale: 1.15 },
          { scale: 1, duration: 1.5 },
          '-=1.1'
        )
        .fromTo(
          rightBlockRef.current?.querySelector('.about-hero-philosophy__heading') || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.8'
        )
        .fromTo(
          rightBlockRef.current?.querySelector('.about-hero-philosophy__text') || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="about-hero-section"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="about-hero-inner">

        {/* ── LEFT: Giant stacked heading + label + description ── */}
        <div className="about-hero-left">
          <div className="about-hero-title-wrap">
            <h1 className="about-hero-title">
              <span className="about-hero-title__line" style={{ display: 'block', overflow: 'hidden', width: 'max-content' }}>
                <span ref={wordAboutRef} className="about-hero-title__word  pr-[0.08em]" style={{ display: 'block' }}>ABOUT</span>
              </span>
              <span className="about-hero-title__line" style={{ display: 'block', overflow: 'hidden', width: 'max-content' }}>
                <span ref={wordUsRef} className="about-hero-title__word about-hero-title--us  pr-[0.08em]" style={{ display: 'block' }}>US</span>
              </span>
            </h1>
          </div>

          <div ref={labelRef} className="about-hero-label">
            {"GLOBAL AUDIENCE INTELLIGENCE".split('').map((char, i) => (
              <span key={i} className="about-char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          <p ref={descRef} className="about-hero-desc">
            {"Methodological Precision: Gathering high-fidelity audience panels, executive cohorts, and verified respondents to guide strategic decisions with confidence."
              .split(' ')
              .map((word, i) => (
                <span key={i} className="about-word inline-block mr-1">
                  {word}
                </span>
              ))}
          </p>
        </div>

        {/* ── CENTER: Large premium image ── */}
        <div className="about-hero-center" ref={centerImgRef}>
          <div className="about-hero-img-main">
            <Image
              src="/about_hero_main.webp"
              alt="Executives reviewing research insights in a premium boardroom"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 540px"
              className="about-hero-img-main__img"
              priority
            />
          </div>
        </div>

        {/* ── RIGHT: Small image + Philosophy block ── */}
        <div className="about-hero-right" ref={rightBlockRef}>
          <div className="about-hero-img-small">
            <Image
              src="/about_philosophy_small.webp"
              alt="Calm professional workspace"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 480px"
              className="about-hero-img-small__img"
            />
          </div>
          <div className="about-hero-philosophy">
            <h3 className="about-hero-philosophy__heading">Our Philosophy</h3>
            <p className="about-hero-philosophy__text">
              At EGI, we believe research only creates value when it drives action. We eliminate assumptions by connecting strategy directly to verified audience feedback, enabling organizations to move forward with certainty.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}


/* ─── Story Pillar Cards Info ─── */
const storyPillars = [
  {
    num: "01",
    icon: AlertCircle,
    badge: "The Dilution of Truth",
    title: "Why Traditional Research is Failing",
    text: "The market research industry was built on a simple promise: to connect decision-makers with the voice of their customer. But over the last decade, that promise has been diluted by automated templates, synthetic data, and unverified panels. Fast results replaced rigorous methodology, leaving brands to navigate critical investments with flawed data."
  },
  {
    num: "02",
    icon: Cpu,
    badge: "The Restoration",
    title: "Precision Rebuilt From Scratch",
    text: "We founded EGI to restore precision. We rebuilt the research pipeline from the ground up—investing in direct API integrations with certified B2B cohorts, deploying active validation filters, and refusing to use automated shortcuts. Our focus is not on compiling sheer volume, but on ensuring that every single response is authenticated."
  },
  {
    num: "03",
    icon: ShieldCheck,
    badge: "Empirical Foundation",
    title: "Empowering Strategic Certainty",
    text: "Today, we partner with leading enterprises and consultancies who cannot afford to be wrong. By treating audience intelligence as a high-fidelity scientific pursuit rather than a high-volume commodity, we empower organizations to build strategy on empirical truth."
  }
];

function StoryCard({ item, index }: { item: typeof storyPillars[0]; index: number }) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.025)`;
    cardRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(92, 142, 255, 0.15), transparent 85%), rgba(255, 255, 255, 0.85)`;
    cardRef.current.style.boxShadow = '0 30px 60px rgba(92, 142, 255, 0.12)';
    cardRef.current.style.borderColor = 'rgba(92, 142, 255, 0.45)';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    cardRef.current.style.background = 'rgba(255, 255, 255, 0.7)';
    cardRef.current.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
    cardRef.current.style.borderColor = 'rgba(228, 228, 231, 0.6)'; // border-zinc-200/60
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col p-8 rounded-3xl border border-zinc-200/60 bg-white/70 backdrop-blur-md transition-all duration-300 ease-out select-none shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    >
      {/* Decorative top corner highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-light/10 to-transparent rounded-tr-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-200/50 flex items-center justify-center text-zinc-600 group-hover:bg-brand-soft group-hover:text-brand-dark group-hover:border-brand-light/30 transition-all duration-300 shadow-sm">
            <Icon size={18} strokeWidth={2.2} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-brand-dark transition-colors duration-300">
              {item.badge}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 font-bold block">
              [{item.num}]
            </span>
          </div>
        </div>

        {/* Pulsing Active indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100 group-hover:bg-brand-soft group-hover:border-brand-light/20 transition-all duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-brand-light animate-pulse transition-colors duration-300" />
          <span className="text-[9px] font-bold text-zinc-400 group-hover:text-brand-dark uppercase tracking-wider transition-colors duration-300">
            Active
          </span>
        </div>
      </div>

      {/* Card Body */}
      <h3 className="text-xl font-extrabold text-zinc-950 uppercase tracking-tight leading-snug mb-3.5 group-hover:text-brand-dark transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
        {item.text}
      </p>
    </motion.div>
  );
}

/* ─── Our Story Section ─── */
function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const assumptionsRef = useRef<HTMLSpanElement>(null);
  const assumptionsLineRef = useRef<HTMLSpanElement>(null);
  const evidenceRef = useRef<HTMLSpanElement>(null);
  const evidenceGradientRef = useRef<HTMLSpanElement>(null);
  const evidenceUnderlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Scroll text highlight interaction
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "center 30%",
        scrub: 0.8,
      }
    });

    // Animate "assumptions" striking out
    tl.to(assumptionsRef.current, {
      color: '#a1a1aa', // zinc-400
      duration: 1,
    }, 0);
    tl.fromTo(assumptionsLineRef.current,
      { width: '0%' },
      { width: '100%', duration: 0.8 },
      0
    );

    // Animate "evidence" lighting up and growing underline
    tl.to(evidenceRef.current,
      { opacity: 0, duration: 0.5 },
      0.4
    );
    tl.to(evidenceGradientRef.current,
      { opacity: 1, duration: 0.5 },
      0.4
    );
    tl.fromTo(evidenceUnderlineRef.current,
      { width: '0%' },
      { width: '100%', duration: 0.8 },
      0.4
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 border-t border-zinc-100 bg-[#FAF9F6]/30 relative overflow-hidden z-10"
      style={{
        backgroundImage: 'radial-gradient(rgba(92,142,255,0.02) 1.2px, transparent 1.2px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Soft radial backdrop glowing effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(92,142,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Row 0 Cell 0: Eyebrow + Large editorial heading + statement (No border/bg, centered) */}
          <div className="flex flex-col justify-center items-center text-center p-6 h-full">
            <div className="flex flex-col items-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-zinc-500 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                OUR STORY
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-[1000] uppercase tracking-tight text-zinc-950 font-sans leading-[0.95] mt-4">
                BUILT FOR<br />
                BETTER<br />
                DECISIONS.
              </h2>
            </div>

            <p className="mt-8 text-xl sm:text-2xl font-serif text-zinc-800 leading-relaxed max-w-md">
              We help organizations replace{' '}
              <span ref={assumptionsRef} className="relative inline-block font-semibold transition-colors duration-300">
                assumptions
                <span ref={assumptionsLineRef} className="absolute top-1/2 left-0 h-[2px] bg-[#a1a1aa] w-0" />
              </span>{' '}
              with{' '}
              <span className="relative inline-block font-bold">
                <span ref={evidenceRef} className="transition-colors duration-300">evidence</span>
                <span ref={evidenceGradientRef} className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-light bg-clip-text text-transparent opacity-0 font-bold font-serif">evidence</span>
                <span ref={evidenceUnderlineRef} className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-dark to-brand-light w-0" />
              </span>
              .
            </p>
          </div>

          {/* Remaining three cells: Card 1, Card 2, Card 3 */}
          {storyPillars.map((item, idx) => (
            <StoryCard key={idx} item={item} index={idx} />
          ))}

        </div>


      </div>
    </section>
  );
}

/* ─── Team Card Component ─── */
interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  initials: string;
  gradColor: string;
  icon: any;
  kpi: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Marcus Chen",
    role: "Audience Strategy",
    expertise: "Panel profiling, B2B cohort matching, target group design.",
    initials: "MC",
    gradColor: "#5B84FF",
    icon: Target,
    kpi: "98.2% Match Rate",
    skills: ["Panel Matching", "Segment Sourcing", "B2B Cohorts"]
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "Behavioral Research",
    expertise: "Cognitive biases, customer choice modeling, focus studies.",
    initials: "SJ",
    gradColor: "#7C3AED",
    icon: Brain,
    kpi: "150+ Focus Groups",
    skills: ["Choice Modeling", "Cognitive Bias", "UX Panels"]
  },
  {
    name: "Elena Rostova",
    role: "Data Validation",
    expertise: "Validation algorithms, device integrity auditing, fraud block.",
    initials: "ER",
    gradColor: "#2563EB",
    icon: ShieldAlert,
    kpi: "0% Fraud Threshold",
    skills: ["Validation Algorithms", "Device Audits", "IP Checks"]
  },
  {
    name: "David Kojo",
    role: "Panel Operations",
    expertise: "Global recruitment, panelist retention, quality assurance.",
    initials: "DK",
    gradColor: "#02E8F8",
    icon: Globe,
    kpi: "50+ Regions Active",
    skills: ["Global Sourcing", "Panelist Sourcing", "QA Audits"]
  }
];

function TeamCard({ member, offset, isActive }: { member: TeamMember; offset: number; isActive: boolean }) {
  const Icon = member.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    cardRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(92, 142, 255, 0.10), transparent 85%), rgba(255, 255, 255, 0.9)`;
    cardRef.current.style.boxShadow = `0 30px 60px rgba(92, 142, 255, 0.08)`;
    cardRef.current.style.borderColor = `rgba(92, 142, 255, 0.35)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    cardRef.current.style.background = 'rgba(255, 255, 255, 0.7)';
    cardRef.current.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
    cardRef.current.style.borderColor = 'rgba(228, 228, 231, 0.6)'; // border-zinc-200
  };

  // Stack styling based on offset (responsive support)
  const isTransitioningBack = offset === teamMembers.length - 1;
  const xVal = isTransitioningBack ? [-240, 80] : offset * 35;
  const yVal = isTransitioningBack ? [0, 40] : offset * 15;
  const rotateVal = isTransitioningBack ? [-12, 8] : offset * 3;
  const scaleVal = isTransitioningBack ? [0.95, 0.76] : 1 - offset * 0.08;
  const opacityVal = isTransitioningBack ? [0.5, 0.3] : 1 - offset * 0.25;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 30 - offset * 10 }}
      animate={{
        x: xVal,
        y: yVal,
        scale: scaleVal,
        rotate: rotateVal,
        opacity: opacityVal,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="absolute inset-0 w-full h-full rounded-3xl border border-zinc-200 bg-white/70 backdrop-blur-md select-none flex flex-col justify-between p-8 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    >
      {/* Glow Mesh Background */}
      <div className="absolute inset-0 z-0 bg-[#FAF9F6] overflow-hidden">
        {/* Animated grid lines pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(9,9,11,0.04) 1.2px, transparent 1.2px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Color Gradient mesh overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${member.gradColor}, transparent 65%)`
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/90 to-transparent z-10" />

        {/* Initials avatar in center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <span className="text-[7rem] font-[1000] tracking-tighter text-zinc-950/[0.02] transition-all duration-500">
            {member.initials}
          </span>
        </div>
      </div>

      {/* Card Header Info */}
      <div className="relative z-20 flex items-start justify-between">
        <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-200/50 flex items-center justify-center text-zinc-600 shadow-sm">
          <Icon size={18} strokeWidth={2.2} />
        </div>

        {/* KPI Badge */}
        <div className="px-3 py-1 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-sm shadow-sm">
          <span className="text-[10px] font-black tracking-widest text-[#0B5CFF] uppercase block">
            {member.kpi}
          </span>
        </div>
      </div>

      {/* Card Body & Details */}
      <div className="relative z-20 flex flex-col text-left mt-auto">
        <span className="text-[10px] font-black tracking-widest text-[#0B5CFF] uppercase block mb-1">
          {member.role}
        </span>
        <h3 className="text-2xl font-black text-zinc-950 tracking-tight uppercase leading-none mb-3">
          {member.name}
        </h3>

        <p className="text-zinc-500 text-xs font-semibold leading-relaxed mb-6">
          {member.expertise}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="px-2.5 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-[9px] font-bold text-zinc-500 uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Team Showcase Section ─── */
function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const getCardIndexOffset = (index: number) => {
    const diff = index - activeIndex;
    if (diff < 0) {
      return diff + teamMembers.length;
    }
    return diff;
  };

  return (
    <div className="w-full">
      <section
        ref={sectionRef}
        className="w-full bg-[#FAF9F6]/30 text-zinc-950 relative overflow-hidden py-20 border-t border-zinc-100 z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(92,142,255,0.02) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Background radial soft light overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(92,142,255,0.02),transparent_60%)] pointer-events-none" />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center min-h-[60vh]">

            {/* Left Column: Title + Controls */}
            <div className="flex flex-col text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm px-3 py-1.5 text-[10px] font-black tracking-widest uppercase text-[#0B5CFF] shadow-sm mb-5 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B5CFF] animate-pulse" />
                OUR TEAM &middot; LEADERSHIP
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-zinc-950 leading-tight">
                THE PEOPLE<br />
                BEHIND THE<br />
                <span className="font-fenwick text-[#18181b] tracking-wide">
                  INSIGHTS.
                </span>
              </h2>

              <p className="text-zinc-500 text-base sm:text-lg leading-relaxed mt-6 max-w-md">
                Meet the architects of EvoGlobalInsight. Our strategists, validation engineers, and global operational managers treat audience intelligence as a high-fidelity scientific pursuit.
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-10 w-full">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:text-zinc-950 hover:border-[#0B5CFF]/30 transition-all duration-300 flex items-center justify-center text-zinc-500 shadow-sm cursor-pointer"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:text-zinc-950 hover:border-[#0B5CFF]/30 transition-all duration-300 flex items-center justify-center text-zinc-500 shadow-sm cursor-pointer"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>

                {/* Active index dot indicator */}
                <div className="hidden lg:flex gap-2 ml-4">
                  {teamMembers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#0B5CFF]' : 'w-1.5 bg-zinc-200 hover:bg-zinc-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D stacked deck carousel */}
            <div className="relative w-full h-[520px] flex items-center justify-center lg:justify-start pl-0 lg:pl-10 mt-12 lg:mt-0">
              <div className="relative w-[320px] sm:w-[360px] h-[460px]">
                {teamMembers.map((member, i) => {
                  const offset = getCardIndexOffset(i);
                  return (
                    <TeamCard
                      key={i}
                      member={member}
                      offset={offset}
                      isActive={offset === 0}
                    />
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FAQ Section ─── */
interface FAQSpec {
  label: string;
  value: string;
  icon: any;
}

interface FAQItem {
  num: string;
  category: string;
  question: string;
  answer: string;
  specs: FAQSpec[];
}

const faqItems: FAQItem[] = [
  {
    num: "01",
    category: "TIMELINE & LAUNCH",
    question: "How quickly can a study launch?",
    answer: "Most consumer research projects can launch within 24 hours of final questionnaire approval. For complex, highly targeted B2B cohorts or custom international panels, initial feasibility matching and verification checks typically require 48 to 72 hours.",
    specs: [
      { label: "Launch Window", value: "< 24 Hours", icon: Zap },
      { label: "B2B / Custom Feasibility", value: "48 - 72 Hours", icon: Clock }
    ]
  },
  {
    num: "02",
    category: "AUDIENCE & TARGETING",
    question: "What audiences can be targeted?",
    answer: "We support targeting across 50+ countries. Our segments range from general consumer demographics to highly specialized cohorts, including C-suite B2B decision-makers, software developers, medical professionals, and niche buyer personas.",
    specs: [
      { label: "Global Reach", value: "50+ Countries", icon: Globe },
      { label: "Target Segments", value: "B2B & Consumers", icon: Users }
    ]
  },
  {
    num: "03",
    category: "DATA INTEGRITY",
    question: "How is response quality validated?",
    answer: "Every response runs through our multi-layered validation suite. This includes checking for duplicate fingerprints, testing IP addresses for VPN/proxy usage, monitoring answer speed-running, tracking keystroke dynamics, and auditing qualitative inputs for coherence.",
    specs: [
      { label: "Validation Engine", value: "Multi-layered", icon: ShieldCheck },
      { label: "Identity Integrity", value: "100% Verified", icon: Brain }
    ]
  },
  {
    num: "04",
    category: "GLOBAL CAPABILITIES",
    question: "Do you support international research?",
    answer: "Yes, our capabilities span North America, Europe, APAC, and Latin America. We provide native translation services, localized survey interfaces, and coordinate with regional study managers to maintain cultural relevance and data alignment.",
    specs: [
      { label: "Regional Panels", value: "4 Major Continents", icon: Globe },
      { label: "Localization Support", value: "Native Translation", icon: Cpu }
    ]
  },
  {
    num: "05",
    category: "DELIVERY & INTEGRATION",
    question: "Can datasets be white-labelled?",
    answer: "Absolutely. We supply datasets in all standard structures, including SPSS, CSV, and JSON. Visual report deliverables, presentation decks, and dashboard reporting views can be fully white-labelled to reflect your brand's style guide.",
    specs: [
      { label: "Dataset Formats", value: "SPSS, CSV, JSON", icon: Database },
      { label: "Brand Control", value: "Full White-label", icon: Target }
    ]
  }
];

function FAQAccordionItem({
  item,
  isOpen,
  onClick
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isOpen) {
      itemRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(11, 92, 255, 0.04), transparent 85%), rgba(11, 92, 255, 0.01)`;
      itemRef.current.style.borderColor = 'rgba(11, 92, 255, 0.3)';
    } else {
      itemRef.current.style.background = `radial-gradient(180px circle at ${x}px ${y}px, rgba(11, 92, 255, 0.05), transparent 80%), rgba(255, 255, 255, 0.5)`;
      itemRef.current.style.borderColor = 'rgba(212, 212, 216, 0.8)';
    }
  };

  const handleMouseLeave = () => {
    if (!itemRef.current) return;
    if (isOpen) {
      itemRef.current.style.background = 'rgba(11, 92, 255, 0.01)';
      itemRef.current.style.borderColor = 'rgba(11, 92, 255, 0.15)';
    } else {
      itemRef.current.style.background = 'rgba(255, 255, 255, 0.5)';
      itemRef.current.style.borderColor = 'rgba(228, 228, 231, 0.6)';
    }
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden text-left ${isOpen
        ? 'border-[#0B5CFF]/15 bg-[#0B5CFF]/[0.01] shadow-[0_8px_30px_rgba(11,92,255,0.03)]'
        : 'border-zinc-200/60 bg-white/50 hover:bg-white hover:shadow-sm'
        }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 px-6 sm:px-8 text-left cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-4 sm:gap-5 pr-4">
          <span className={`text-xs font-mono font-bold tracking-wider shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#0B5CFF]' : 'text-zinc-400'
            }`}>
            {item.num}
          </span>
          <span className={`text-base font-bold transition-colors duration-300 ${isOpen ? 'text-zinc-950 font-black' : 'text-zinc-800'
            }`}>
            {item.question}
          </span>
        </div>

        {/* Toggle Icon */}
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
          ? 'border-[#0B5CFF]/25 bg-[#0B5CFF]/5 text-[#0B5CFF] rotate-180'
          : 'border-zinc-200 bg-white text-zinc-400'
          }`}>
          <ChevronDown size={16} className="stroke-[2.5]" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, ease: 'linear' }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15, ease: 'linear' }
              }
            }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-6 px-6 sm:px-8 border-t border-zinc-100/80">
              <p className="text-zinc-500 font-medium leading-relaxed text-sm sm:text-base mb-5">
                {item.answer}
              </p>

              {/* Nested Spec/Metric Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                {item.specs.map((spec, specIdx) => {
                  const SpecIcon = spec.icon;
                  return (
                    <div
                      key={specIdx}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl border border-zinc-150/70 bg-zinc-50/50 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B5CFF]/10 text-[#0B5CFF] flex items-center justify-center shrink-0">
                        <SpecIcon size={15} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block leading-none mb-1">
                          {spec.label}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-zinc-800 uppercase tracking-wide leading-none">
                          {spec.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden z-10 border-t border-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">

          {/* LEFT: Sticky Header & Callout */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-zinc-500 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B5CFF] animate-pulse" />
                FAQ
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[1000] uppercase tracking-tight text-zinc-950 font-sans leading-none mt-4">
                COMMON<br />
                QUESTIONS.
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base font-medium leading-relaxed mt-5 max-w-md">
                Have questions about our process, audience panels, data validation, or custom integrations? Find direct answers here, or connect with a research specialist.
              </p>
            </div>

            {/* Floating Callout Panel for Support Status */}
            <div className="relative rounded-2xl border border-zinc-150 bg-white/80 backdrop-blur-md p-6 shadow-sm overflow-hidden flex flex-col gap-4 mt-2 max-w-md group/status">
              {/* Soft pulse glow background */}
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover/status:bg-emerald-500/15 transition-colors duration-500" />

              <div className="flex items-center gap-3">
                {/* Pulsing indicator dot */}
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest leading-none">
                  Specialists Online
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wide">
                  Real-time Support Active
                </h4>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                  Our research strategists are currently active. Get expert guidance for custom sample targets, pricing configurations, or complex study feasibility checks.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-black text-[#0B5CFF] uppercase tracking-wider hover:underline w-fit pt-2 group/link"
              >
                Connect with a strategist
                <ArrowRight size={12} className="stroke-[2.5] transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>

          {/* RIGHT: Accordion list */}
          <div className="flex flex-col gap-4 w-full">
            {faqItems.map((item, idx) => (
              <FAQAccordionItem
                key={idx}
                item={item}
                isOpen={activeIndex === idx}
                onClick={() => toggleIndex(idx)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function About() {
  return (
    <>
      <AboutHero />
      <OurStorySection />
      <TeamSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
