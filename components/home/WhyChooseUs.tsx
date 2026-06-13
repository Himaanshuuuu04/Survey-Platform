"use client";

import { useRef, useState, useEffect } from 'react';
import { Reveal, Section, Container } from '../primitives';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface ProcessStep {
  n: number;
  orbGrad: string;
  title: string;
  desc: string;
}

const steps: ProcessStep[] = [
  {
    n: 1,
    orbGrad: 'from-[#5B84FF] to-[#29D5FF]',
    title: 'Survey Design',
    desc: 'Research objectives, questionnaire creation, and sampling strategy.'
  },
  {
    n: 2,
    orbGrad: 'from-[#29D5FF] to-[#2563EB]',
    title: 'Audience Recruitment',
    desc: 'Verified respondent sourcing, targeted outreach, and panel activation.'
  },
  {
    n: 3,
    orbGrad: 'from-[#3B82F6] to-[#02E8F8]',
    title: 'Data Collection',
    desc: 'Survey deployment, real-time response monitoring, and quality control.'
  },
  {
    n: 4,
    orbGrad: 'from-[#02E8F8] to-[#5B84FF]',
    title: 'Insight Delivery',
    desc: 'Deep data analysis, report generation, and actionable recommendations.'
  }
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGGElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined' || !pathRef.current || !rocketRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Explicitly set rocket's initial position at path progress 0 before creating animation
      gsap.set(rocketRef.current, {
        x: 0,
        y: 0,
        transformOrigin: "50% 50%",
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 0,
        },
        opacity: 1 // make it visible once positioned at start
      });

      // 2. Create ScrollTrigger animation
      gsap.to(rocketRef.current, {
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let nextStep = 1;
            if (p < 0.30) {
              nextStep = 1;
            } else if (p >= 0.30 && p < 0.63) {
              nextStep = 2;
            } else if (p >= 0.63 && p < 0.95) {
              nextStep = 3;
            } else {
              nextStep = 4;
            }
            setActiveStep((prev) => (prev !== nextStep ? nextStep : prev));
          },
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger once everything is fully loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      return () => {
        clearTimeout(t);
        ctx.revert();
      };
    } else {
      window.addEventListener('load', handleLoad);
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(t);
        ctx.revert();
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className=" bg-white relative overflow-hidden py-20 sm:py-28"
      style={{
       backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Extremely light blue radial glow to create depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(92,142,255,0.03),transparent_55%)] pointer-events-none" />

      {/* Giant faded step number in background */}
      <div className="absolute top-0 right-10 text-[20rem] sm:text-[28rem] lg:text-[36rem] font-[1000] text-zinc-950/10 tracking-tighter select-none pointer-events-none leading-none transition-all duration-1000 ease-in-out">
        0{activeStep || 1}
      </div>

      <Container>
        {/* HEADLINE AREA */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-end mb-16 relative z-10">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[9px] font-black tracking-widest uppercase text-[#5B84FF] mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#29D5FF] animate-pulse" />
                HOW IT WORKS &middot; 4 STEPS
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-[1000] tracking-tight uppercase leading-[0.95] text-zinc-950">
                THE<br />
                <span className="font-fenwick text-[#111111] tracking-wider">
                  PROCESS.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:max-w-md">
            <p className="text-base sm:text-lg text-zinc-500 font-medium leading-relaxed">
              From survey design to verified insights, our proven research workflow delivers reliable, high-quality data at scale.
            </p>
          </Reveal>
        </div>

        {/* ANIMATED PATH & ROCKET (Hidden on mobile for better scaling, layout defaults to stack) */}
        <div className="relative w-full hidden lg:block overflow-visible mb-6 z-10 px-4 mt-30">
          <svg viewBox="0 0 1000 120" fill="none" className="w-full overflow-visible">
            {/* Curved background line */}
            <path
              ref={pathRef}
              d="M 125,70 C 200,95 300,45 375,70 C 450,95 550,45 625,70 C 700,95 800,45 875,70"
              stroke="#E4E4E7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />

            {/* Step Indicators (Milestone Dots) */}
            <circle cx="125" cy="70" r={activeStep >= 1 ? 6 : 4} className={`transition-all duration-500 ${activeStep >= 1 ? 'fill-[#29D5FF]' : 'fill-zinc-950/20'}`} style={activeStep >= 1 ? { filter: 'drop-shadow(0 0 4px #29D5FF)' } : {}} />
            <circle cx="375" cy="70" r={activeStep >= 2 ? 6 : 4} className={`transition-all duration-500 ${activeStep >= 2 ? 'fill-[#29D5FF]' : 'fill-zinc-950/20'}`} style={activeStep >= 2 ? { filter: 'drop-shadow(0 0 4px #29D5FF)' } : {}} />
            <circle cx="625" cy="70" r={activeStep >= 3 ? 6 : 4} className={`transition-all duration-500 ${activeStep >= 3 ? 'fill-[#29D5FF]' : 'fill-zinc-950/20'}`} style={activeStep >= 3 ? { filter: 'drop-shadow(0 0 4px #29D5FF)' } : {}} />
            <circle cx="875" cy="70" r={activeStep >= 4 ? 6 : 4} className={`transition-all duration-500 ${activeStep >= 4 ? 'fill-[#29D5FF]' : 'fill-zinc-950/20'}`} style={activeStep >= 4 ? { filter: 'drop-shadow(0 0 4px #29D5FF)' } : {}} />

            {/* Custom SVG Rocket */}
            <g ref={rocketRef} style={{ opacity: 0 }}>
              {/* Rocket Nose Points Forward (Positive X direction) */}
              {/* Flame */}
              <path d="M -12,0 L -22,6 L -18,0 L -22,-6 Z" fill="orange" />
              {/* Fins */}
              <path d="M -8,5 L -14,10 L -4,5 Z" fill="#5B84FF" />
              <path d="M -8,-5 L -14,-10 L -4,-5 Z" fill="#5B84FF" />
              {/* Body */}
              <path d="M -10,-5 L 6,-5 C 12,-5 16,0 16,0 C 16,0 12,5 6,5 L -10,5 Z" fill="#FFFFFF" stroke="#5B84FF" strokeWidth="1.5" />
              {/* Window */}
              <circle cx="0" cy="0" r="2.5" fill="#111111" />
              <circle cx="0" cy="0" r="1.2" fill="#29D5FF" />
            </g>
          </svg>
        </div>

        {/* PROCESS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, idx) => {
            const isActive = activeStep >= step.n;
            return (
              <Reveal key={step.n} delay={idx * 0.08}>
                <div
                  className={`relative flex flex-col h-full bg-white border rounded-[2rem] p-8 transition-all duration-500 ease-out group ${isActive
                      ? 'border-[#5B84FF]/60 shadow-[0_20px_45px_rgba(91,132,255,0.12)] scale-[1.03] -translate-y-2'
                      : 'border-zinc-200/80 shadow-sm hover:-translate-y-1 hover:shadow-md'
                    }`}
                >
                  {/* Large faded step number in background */}
                  <div className={`absolute top-4 right-6 text-7xl font-[1000] select-none pointer-events-none transition-colors duration-500 ${isActive ? 'text-blue-50/70' : 'text-zinc-100'
                    }`}>
                    0{step.n}
                  </div>

                  {/* Gradient Orb */}
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${step.orbGrad} shadow-lg mb-8 transition-transform duration-500 ${isActive ? 'scale-110' : ''
                    }`} />

                  {/* Step Label */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#5B84FF] font-sans">
                    STEP 0{step.n}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-[#111111] mt-2 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed mt-3.5">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
