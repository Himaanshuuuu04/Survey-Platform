"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Users, Globe2, ArrowRight } from 'lucide-react';
import { Container, Reveal, Button } from '../primitives';

export function ServicesHero() {
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
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  } as const;

  // Badge Float Animations
  const floatTransition = (duration: number, delay: number): any => ({
    duration: duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay
  });

  return (
    <section
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 border-b border-[#E5E7EB] bg-[#FAFAFA] z-10"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Background subtle blue radial glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(92,142,255,0.04),transparent_55%)] pointer-events-none" />

      <Container className="relative z-10 w-full">
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
                SERVICES &bull; AUDIENCE PLATFORM
              </div>
            </motion.div>

            {/* Giant Outlined Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-[1000] tracking-tight uppercase leading-[1.05] text-zinc-950">
                REACH VERIFIED<br />
                AUDIENCES FOR<br />
                BETTER<br />
                <span className="text-transparent [-webkit-text-stroke:1.3px_#111111] font-black tracking-wide">
                  DECISIONS.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.div variants={itemVariants}>
              <p className="mt-5 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed max-w-lg">
                From targeted audience recruitment to survey distribution and response validation, we help organizations collect reliable insights at scale.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <Button 
                href="/contact" 
                size="lg" 
                className="w-full sm:w-auto shadow-[0_8px_24px_-8px_rgba(92,142,255,0.3)] hover:translate-y-[-2px] hover:shadow-[0_14px_32px_-8px_rgba(92,142,255,0.4)] transition-all duration-300"
              >
                Start Your Research
              </Button>
              <Button 
                href="#services-solutions" 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto hover:translate-y-[-2px] transition-all duration-300"
              >
                View Solutions
              </Button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Survey Audience & Respondent Acquisition Platform Visualization */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center lg:justify-end py-6"
          >
            {/* Visual background gradient glow */}
            <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.08),transparent_50%)] opacity-95 blur-3xl pointer-events-none" />

            {/* Main Survey Intelligence Diagram Canvas */}
            <div className="w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] xl:w-[540px] xl:h-[540px] relative select-none will-change-transform">
              <svg viewBox="0 0 500 500" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  {/* Refined Central Node Glows */}
                  <radialGradient id="center-glow-refined" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#02E8F8" stopOpacity="0.85" />
                    <stop offset="40%" stopColor="#5C8EFF" stopOpacity="0.45" />
                    <stop offset="80%" stopColor="#5C8EFF" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Connection Line Gradients */}
                  <linearGradient id="conn-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5C8EFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.1" />
                  </linearGradient>

                  {/* Glass-like Ring Gradients */}
                  <linearGradient id="glass-ring-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#5C8EFF" stopOpacity="0.15" />
                  </linearGradient>

                  <filter id="svg-blur-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Central radial glow behind Audience Network Core */}
                <circle cx="250" cy="220" r="160" fill="url(#center-glow-refined)" filter="url(#svg-blur-glow)" opacity="0.95" />

                {/* Concentric glass-like orbital rings */}
                <circle cx="250" cy="220" r="180" stroke="url(#conn-line-grad)" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.18" />
                <circle cx="250" cy="220" r="140" stroke="url(#conn-line-grad)" strokeWidth="1" opacity="0.32" />
                <circle cx="250" cy="220" r="100" stroke="url(#conn-line-grad)" strokeWidth="0.8" opacity="0.25" />
                <circle cx="250" cy="220" r="60" stroke="url(#conn-line-grad)" strokeWidth="0.5" opacity="0.2" />

                {/* 3D Spherical Ellipses for Depth */}
                <ellipse cx="250" cy="220" rx="180" ry="60" stroke="url(#conn-line-grad)" strokeWidth="1" opacity="0.25" />
                <ellipse cx="250" cy="220" rx="60" ry="180" stroke="url(#conn-line-grad)" strokeWidth="1" opacity="0.25" />
                <ellipse cx="250" cy="220" rx="180" ry="60" stroke="url(#conn-line-grad)" strokeWidth="0.8" opacity="0.15" transform="rotate(45 250 220)" />
                <ellipse cx="250" cy="220" rx="180" ry="60" stroke="url(#conn-line-grad)" strokeWidth="0.8" opacity="0.15" transform="rotate(-45 250 220)" />

                {/* Elegant Curved Connecting Paths (Beziers) from 6 Respondent Nodes to Audience Network */}
                <path id="path-consumers" d="M 250,80 Q 285,140 250,220" stroke="url(#conn-line-grad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path id="path-professionals" d="M 371,150 Q 340,200 250,220" stroke="url(#conn-line-grad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path id="path-healthcare" d="M 371,290 Q 310,270 250,220" stroke="url(#conn-line-grad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path id="path-parents" d="M 250,360 Q 215,300 250,220" stroke="url(#conn-line-grad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path id="path-business" d="M 129,290 Q 190,270 250,220" stroke="url(#conn-line-grad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path id="path-students" d="M 129,150 Q 160,200 250,220" stroke="url(#conn-line-grad)" strokeWidth="1.5" fill="none" opacity="0.5" />

                {/* Vertical Central Downflow Channel: Hub to Bottom Workflow Journey */}
                <path id="path-downflow" d="M 250,220 L 250,470" stroke="url(#conn-line-grad)" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.45" />

                {/* ── Metric Badge Connector Lines (Dashed layout anchors) ── */}
                {/* Badge 1 (Top-Left): Connects Students (129, 150) to (25, 35) */}
                <line x1="129" y1="150" x2="25" y2="35" stroke="#D1D5DB" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="25" cy="35" r="3.5" fill="#5C8EFF" />

                {/* Badge 2 (Top-Right): Connects Professionals (371, 150) to (470, 70) */}
                <line x1="371" y1="150" x2="470" y2="70" stroke="#D1D5DB" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="470" cy="70" r="3.5" fill="#02E8F8" />

                {/* Badge 3 (Bottom-Left): Connects Business (129, 290) to (25, 400) */}
                <line x1="129" y1="290" x2="25" y2="400" stroke="#D1D5DB" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="25" cy="400" r="3.5" fill="#02E8F8" />

                {/* Badge 4 (Bottom-Right): Connects Healthcare (371, 290) to (470, 400) */}
                <line x1="371" y1="290" x2="470" y2="400" stroke="#D1D5DB" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="470" cy="400" r="3.5" fill="#5C8EFF" />

                {/* Central Audience Network Hub (Glow, Glass Rings & Platform Core) */}
                {/* Layer 1: Glowing glass ring backdrop */}
                <motion.circle
                  cx="250"
                  cy="220"
                  r="48"
                  fill="url(#glass-ring-grad)"
                  stroke="#5C8EFF"
                  strokeWidth={1.5}
                  strokeOpacity={0.35}
                  filter="url(#svg-blur-glow)"
                  animate={{
                    scale: [1, 1.05, 1],
                    strokeOpacity: [0.35, 0.55, 0.35]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: "250px 220px" }}
                />
                
                {/* Layer 2: Mid Glow Circle */}
                <motion.circle
                  cx="250"
                  cy="220"
                  r="38"
                  fill="#FFFFFF"
                  fillOpacity={0.12}
                  stroke="#5C8EFF"
                  strokeWidth={1}
                  strokeOpacity={0.3}
                  animate={{
                    scale: [1, 1.07, 1],
                    strokeOpacity: [0.3, 0.45, 0.3]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: "250px 220px" }}
                />

                {/* Layer 3: Core pulse glow */}
                <motion.circle
                  cx="250"
                  cy="220"
                  r="28"
                  fill="#5C8EFF"
                  opacity={0.18}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.18, 0.28, 0.18]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: "250px 220px" }}
                />
                
                {/* Layer 4: Solid core platform hub */}
                <circle cx="250" cy="220" r="12" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="6" />
                <circle cx="250" cy="220" r="4.5" fill="#02E8F8" />
                
                {/* Text Label (Platform Centric: Verified Panel) */}
                <text x="250" y="282" textAnchor="middle" className="text-[10.5px] font-black uppercase tracking-widest fill-zinc-950 font-sans">Verified Panel</text>

                {/* 6 Respondent Segment Nodes with spring entries */}
                {/* 1. Consumers */}
                <motion.circle
                  cx="250"
                  cy="80"
                  r="7"
                  fill="#5C8EFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "250px 80px" }}
                />
                <circle cx="250" cy="80" r="13" stroke="#5C8EFF" strokeWidth="1" opacity="0.25">
                  <animate attributeName="r" values="9;15;9" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="64" textAnchor="middle" className="text-[8.5px] font-black uppercase tracking-wider fill-zinc-800 font-sans">Consumers</text>

                {/* 2. Professionals */}
                <motion.circle
                  cx="371"
                  cy="150"
                  r="7"
                  fill="#5C8EFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "371px 150px" }}
                />
                <circle cx="371" cy="150" r="13" stroke="#5C8EFF" strokeWidth="1" opacity="0.25">
                  <animate attributeName="r" values="9;15;9" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="385" y="153" textAnchor="start" className="text-[8.5px] font-black uppercase tracking-wider fill-zinc-800 font-sans">Professionals</text>

                {/* 3. Healthcare Workers */}
                <motion.circle
                  cx="371"
                  cy="290"
                  r="7"
                  fill="#5C8EFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "371px 290px" }}
                />
                <circle cx="371" cy="290" r="13" stroke="#5C8EFF" strokeWidth="1" opacity="0.25">
                  <animate attributeName="r" values="9;15;9" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <text x="385" y="293" textAnchor="start" className="text-[8.5px] font-black uppercase tracking-wider fill-zinc-800 font-sans">Healthcare</text>

                {/* 4. Parents */}
                <motion.circle
                  cx="250"
                  cy="360"
                  r="7"
                  fill="#5C8EFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "250px 360px" }}
                />
                <circle cx="250" cy="360" r="13" stroke="#5C8EFF" strokeWidth="1" opacity="0.25">
                  <animate attributeName="r" values="9;15;9" dur="3.1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="3.1s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="378" textAnchor="middle" className="text-[8.5px] font-black uppercase tracking-wider fill-zinc-800 font-sans">Parents</text>

                {/* 5. Business Owners */}
                <motion.circle
                  cx="129"
                  cy="290"
                  r="7"
                  fill="#5C8EFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "129px 290px" }}
                />
                <circle cx="129" cy="290" r="13" stroke="#5C8EFF" strokeWidth="1" opacity="0.25">
                  <animate attributeName="r" values="9;15;9" dur="3.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="3.3s" repeatCount="indefinite" />
                </circle>
                <text x="115" y="293" textAnchor="end" className="text-[8.5px] font-black uppercase tracking-wider fill-zinc-800 font-sans">SMB Owners</text>

                {/* 6. Students */}
                <motion.circle
                  cx="129"
                  cy="150"
                  r="7"
                  fill="#5C8EFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                  style={{ transformOrigin: "129px 150px" }}
                />
                <circle cx="129" cy="150" r="13" stroke="#5C8EFF" strokeWidth="1" opacity="0.25">
                  <animate attributeName="r" values="9;15;9" dur="2.7s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <text x="115" y="153" textAnchor="end" className="text-[8.5px] font-black uppercase tracking-wider fill-zinc-800 font-sans">Students</text>

                {/* Flowing Response Particles: Respondent Nodes ➔ Central Platform */}
                <circle r="3.2" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1.2">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 250,80 Q 285,140 250,220" />
                </circle>
                <circle r="3.2" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="1.2">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path="M 371,150 Q 340,200 250,220" />
                </circle>
                <circle r="3.2" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1.2">
                  <animateMotion dur="2.4s" repeatCount="indefinite" path="M 371,290 Q 310,270 250,220" />
                </circle>
                <circle r="3.2" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="1.2">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path="M 250,360 Q 215,300 250,220" />
                </circle>
                <circle r="3.2" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1.2">
                  <animateMotion dur="2.3s" repeatCount="indefinite" path="M 129,290 Q 190,270 250,220" />
                </circle>
                <circle r="3.2" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="1.2">
                  <animateMotion dur="2.7s" repeatCount="indefinite" path="M 129,150 Q 160,200 250,220" />
                </circle>

                {/* Continuous Downflow Particles: Hub ➔ Bottom Pipeline journey */}
                <circle r="3.5" fill="#FFFFFF" stroke="#5B84FF" strokeWidth="1.5">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 250,220 L 250,470" />
                </circle>
                <circle r="3.5" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1.5">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 250,220 L 250,470" begin="1.25s" />
                </circle>

                {/* Slow Orbital Orbiting Particles (Secondary platform details) */}
                <circle cx="250" cy="120" r="1.5" fill="#5C8EFF" opacity="0.65">
                  <animateTransform attributeName="transform" type="rotate" from="0 250 220" to="360 250 220" dur="11s" repeatCount="indefinite" />
                </circle>
                <circle cx="250" cy="320" r="1.5" fill="#02E8F8" opacity="0.65">
                  <animateTransform attributeName="transform" type="rotate" from="360 250 220" to="0 250 220" dur="13s" repeatCount="indefinite" />
                </circle>

                {/* ── 5-Step process journey strip at the bottom (Connected workflow timeline) ── */}
                <g transform="translate(0, 0)">
                  {/* Thick background pipeline channel */}
                  <line x1="55" y1="470" x2="445" y2="470" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                  
                  {/* Glowing active progress line */}
                  <line x1="55" y1="470" x2="445" y2="470" stroke="url(#conn-line-grad)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

                  {/* Timeline Journey Particles (Respondents ➔ Insights) */}
                  <circle r="3" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="1">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M 55,470 L 445,470" />
                  </circle>
                  <circle r="3" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1" opacity="0.8">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M 55,470 L 445,470" begin="2.25s" />
                  </circle>
                  
                  {/* Hub Collection Downflow Particles merging into timeline toward insights */}
                  <circle r="2.8" fill="#FFFFFF" stroke="#02E8F8" strokeWidth="1">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 250,470 L 445,470" />
                  </circle>

                  {/* Journey nodes (Step indicator circles with nested indicators) */}
                  {/* Step 1: Verified Respondents */}
                  <circle cx="55" cy="470" r="6" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="3" />
                  <circle cx="55" cy="470" r="2.2" fill="#5C8EFF" />
                  <text x="55" y="440" textAnchor="middle" className="text-[8px] font-extrabold uppercase fill-zinc-400 tracking-wider">Verified</text>
                  <text x="55" y="452" textAnchor="middle" className="text-[10px] font-black uppercase fill-zinc-700 tracking-wider">Respondents</text>
                  
                  {/* Step 2: Survey Distribution */}
                  <circle cx="153" cy="470" r="6" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="3" />
                  <circle cx="153" cy="470" r="2.2" fill="#5C8EFF" />
                  <text x="153" y="440" textAnchor="middle" className="text-[8px] font-extrabold uppercase fill-zinc-400 tracking-wider">Survey</text>
                  <text x="153" y="452" textAnchor="middle" className="text-[10px] font-black uppercase fill-zinc-700 tracking-wider">Distribution</text>
                  
                  {/* Step 3: Response Collection */}
                  <circle cx="250" cy="470" r="6" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="3" />
                  <circle cx="250" cy="470" r="2.2" fill="#5C8EFF" />
                  <text x="250" y="440" textAnchor="middle" className="text-[8px] font-extrabold uppercase fill-zinc-400 tracking-wider">Response</text>
                  <text x="250" y="452" textAnchor="middle" className="text-[10px] font-black uppercase fill-zinc-700 tracking-wider">Collection</text>
                  
                  {/* Step 4: Data Validation */}
                  <circle cx="348" cy="470" r="6" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="3" />
                  <circle cx="348" cy="470" r="2.2" fill="#5C8EFF" />
                  <text x="348" y="440" textAnchor="middle" className="text-[8px] font-extrabold uppercase fill-zinc-400 tracking-wider">Data</text>
                  <text x="348" y="452" textAnchor="middle" className="text-[10px] font-black uppercase fill-zinc-700 tracking-wider">Validation</text>
                  
                  {/* Step 5: Actionable Insights */}
                  <circle cx="445" cy="470" r="8.5" fill="#02E8F8" stroke="#5C8EFF" strokeWidth="1.5" />
                  <circle cx="445" cy="470" r="14" stroke="#02E8F8" strokeWidth="1.2" opacity="0.3">
                    <animate attributeName="r" values="9;16;9" dur="3.2s" repeatCount="indefinite" />
                  </circle>
                  <text x="445" y="440" textAnchor="middle" className="text-[8px] font-black uppercase fill-[#5B84FF] tracking-wider">Actionable</text>
                  <text x="445" y="452" textAnchor="middle" className="text-[10.5px] font-black uppercase fill-zinc-950 tracking-wider font-extrabold">Insights</text>
                </g>
              </svg>

              {/* Floating Data Badges */}
              {/* Top-Left: 99.7% Fraud Accuracy (Connected to Students node at 129, 150) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={floatTransition(5, 0.1)}
                className="absolute top-[2%] left-[2%] z-20 bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-[0_12px_24px_rgba(0,0,0,0.04)] px-3 py-1.8 rounded-[1.25rem] flex items-center gap-2.5 will-change-transform"
              >
                <div className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 flex items-center justify-center text-[#5C8EFF]">
                  <ShieldCheck size={10} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-zinc-950 leading-none">99.7%</span>
                  <span className="text-[7.5px] font-extrabold text-zinc-400 uppercase tracking-wider leading-none mt-0.5 whitespace-nowrap">Fraud Detection Accuracy</span>
                </div>
              </motion.div>

              {/* Top-Right: 50+ Countries Reached (Connected to Professionals node at 371, 150) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={floatTransition(5.6, 0.4)}
                className="absolute top-[10%] right-[2%] z-20 bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-[0_12px_24px_rgba(0,0,0,0.04)] px-3 py-1.8 rounded-[1.25rem] flex items-center gap-2.5 will-change-transform"
              >
                <div className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 flex items-center justify-center text-[#5C8EFF]">
                  <Globe2 size={10} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-zinc-950 leading-none">50+</span>
                  <span className="text-[7.5px] font-extrabold text-zinc-400 uppercase tracking-wider leading-none mt-0.5 whitespace-nowrap">Countries Reached</span>
                </div>
              </motion.div>

              {/* Bottom-Left: 92% Completion Rate (Connected to Business node at 129, 290) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={floatTransition(6.2, 0.8)}
                className="absolute bottom-[18%] left-[2%] z-20 bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-[0_12px_24px_rgba(0,0,0,0.04)] px-3 py-1.8 rounded-[1.25rem] flex items-center gap-2.5 will-change-transform"
              >
                <div className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 flex items-center justify-center text-[#5C8EFF]">
                  <Check size={10} strokeWidth={3.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-zinc-950 leading-none">92%</span>
                  <span className="text-[7.5px] font-extrabold text-zinc-400 uppercase tracking-wider leading-none mt-0.5 whitespace-nowrap">Completion Rate</span>
                </div>
              </motion.div>

              {/* Bottom-Right: 250K+ Respondents (Connected to Healthcare node at 371, 290) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={floatTransition(4.8, 1.2)}
                className="absolute bottom-[18%] right-[2%] z-20 bg-white/95 backdrop-blur-md border border-zinc-200/80 shadow-[0_12px_24px_rgba(0,0,0,0.04)] px-3 py-1.8 rounded-[1.25rem] flex items-center gap-2.5 will-change-transform"
              >
                <div className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 flex items-center justify-center text-[#5C8EFF]">
                  <Users size={10} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-zinc-950 leading-none">250K+</span>
                  <span className="text-[7.5px] font-extrabold text-zinc-400 uppercase tracking-wider leading-none mt-0.5 whitespace-nowrap">Verified Respondents</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
