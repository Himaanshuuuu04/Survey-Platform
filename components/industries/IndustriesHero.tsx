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
import CardSwap, { Card } from '@/components/CardSwap';
import Image from 'next/image';
import BlurText from '@/components/BlurText';

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
        className="relative overflow-y-visible lg:pt-10 lg:pb-0
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

              {/* Giant Redesigned Headline with BlurText animation */}
              <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                <BlurText
                  text="WE DECODE THE"
                  delay={500}
                  animateBy="words"
                  className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] font-[1000] tracking-tight uppercase leading-[1.05] text-[#0A0A0A]"
                />
                <BlurText
                  text="MARKET SEGMENTS"
                  delay={500}
                  animateBy="words"
                  className="font-fenwick text-[#111111] tracking-wide text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] uppercase leading-[1.05]"
                />
                <div className="flex flex-wrap items-center gap-x-3.5 leading-[1.05]">
                  <BlurText
                    text="THAT DRIVE"
                    delay={500}
                    animateBy="words"
                    className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] font-[1000] tracking-tight uppercase text-[#0A0A0A]"
                  />
                  <BlurText
                    text="INNOVATION."
                    delay={500}
                    animateBy="letters"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B84FF] to-[#02E8F8] font-black text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] tracking-tight uppercase"
                  />
                </div>
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

            {/* RIGHT COLUMN: Interactive Segment CardSwap Stack */}
            <motion.div
              variants={itemVariants}
              className="relative flex items-center justify-center lg:justify-end py-4 hidden lg:block"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.06),transparent_50%)] opacity-95 blur-3xl pointer-events-none" />

              <div className="w-[300px] h-[380px] sm:w-[330px] sm:h-[420px] lg:w-[500px] lg:h-[450px] relative mr-8">
                <CardSwap
                  width="100%"
                  height="100%"
                  cardDistance={24}
                  verticalDistance={24}
                  delay={2500}
                  skewAmount={4}
                  easing="elastic"
                >
                  {floatingSegments.map((seg, idx) => {
                    const imgMap: Record<string, string> = {
                      "Consumer Durables": "/industry_consumer_durables.webp",
                      "Financial Services": "/industry_financial_services.webp",
                      "Healthcare": "/industry_healthcare.webp",
                      "Tech, Media & Telecom": "/industry_tech_telecom.webp",
                      "Food & Beverage": "/industry_food_beverage.webp",
                      "Retail & Commerce": "/industry_retail_commerce.webp",
                    };
                    const imgPath = imgMap[seg.text] || "/about_hero_main.webp";

                    return (
                      <Card
                        key={idx}
                        className="!bg-white !border-zinc-200/60 w-full h-full rounded-[2rem] shadow-[0_16px_40px_rgba(0,0,0,0.08)] flex flex-col p-4 overflow-hidden"
                      >
                        {/* Image section */}
                        <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
                          <Image
                            src={imgPath}
                            alt={seg.text}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 360px"
                            priority={idx === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                          <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                            0{idx + 1}
                          </span>
                        </div>

                        {/* Text and branding info */}
                        <div className="pt-4 pb-2 px-1 flex flex-col justify-between items-start text-left h-[100px]">
                          <div>
                            <span className="text-[8.5px] font-black uppercase tracking-widest text-[#5C8EFF]">
                              Market Segment
                            </span>
                            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-zinc-950 mt-1 leading-tight">
                              {seg.text}
                            </h3>
                          </div>
                          <div className="w-full flex items-center justify-between pt-2.5 border-t border-zinc-100">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                              Audience Intelligence
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-wider text-[#5C8EFF] flex items-center gap-1">
                              Discover <ArrowRight size={10} strokeWidth={3} />
                            </span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>

                {/* Floating Metrics Badge 1 */}


                {/* Floating Metrics Badge 2 */}


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
                TRUSTED DATA,<br />
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
