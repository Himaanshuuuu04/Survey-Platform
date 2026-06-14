"use client";

import { useRef } from 'react';
import { Target, Users, LineChart } from 'lucide-react';
import { Reveal, SectionEyebrow, TimelineProgress, Container } from '../primitives';
import ScrollStack, { ScrollStackItem } from './ScrollStack'
const BRAND = '#5C8EFF';

const steps = [
  {
    n: 1,
    icon: Target,
    title: 'Define',
    label: 'Research Strategy',
    metric: '48 hrs',
    metricLabel: 'Project Kickoff',
    tags: ['Strategy', 'Planning', 'Audience'],
    desc: 'Align objectives, audience segments and research methodology before launch. Every study begins with a validated framework designed to maximize response quality.',
  },
  {
    n: 2,
    icon: Users,
    title: 'Market',
    label: 'Global Reach',
    metric: '50+',
    metricLabel: 'Countries Covered',
    tags: ['Targeting', 'Global', 'Verified'],
    desc: 'Distribute surveys through verified respondent networks across global markets. Precision targeting ensures the right participants answer every question.',
  },
  {
    n: 3,
    icon: LineChart,
    title: 'Deliver',
    label: 'Actionable Insights',
    metric: '95%',
    metricLabel: 'Data Quality Score',
    tags: ['Analytics', 'Insights', 'Reports'],
    desc: 'Receive structured datasets, executive-ready reports and strategic recommendations that transform responses into business decisions.',
  },
];

export function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="how-we-work" className="border-t border-[#E5E7EB] bg-[#F8FAFA] py-10 sm:py-16 lg:pb-0 relative overflow-x-clip min-h-[80vh] flex flex-col justify-center bg-white pt-8 lg:pt-12 pb-6 z-10"
style={{
  backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
}}>
      <Container>
        <Reveal><SectionEyebrow>How we work</SectionEyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl">From Survey Brief To Actionable Data — <span className="font-fenwick text-[#111111] tracking-wide text-swoosh">In Three Moves</span>.</h2>
        </Reveal>

        <div ref={ref} className="relative mt-14 max-w-3xl mx-auto">
          {/* <div className="mb-10 px-3">
          <TimelineProgress targetRef={ref} />
        </div> */}

          <ScrollStack
            useWindowScroll={true}
            itemDistance={60}
            itemScale={0.05}
            itemStackDistance={25}
            rotationAmount={1.5}
            blurAmount={0}
            baseScale={0.9}
            className="w-full"
          >
            {steps.map((s, i) => (
              <ScrollStackItem
                key={s.n}
                itemClassName="
                  relative
                  overflow-hidden
                  rounded-[1.75rem] md:rounded-[2.5rem]
                  border border-white/70
                  bg-white/95 md:bg-white/90
                  md:backdrop-blur-xl
                  p-5 md:p-8
                  shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]
                  h-auto  md:h-80
                "
              >
                {/* Background Glow */}
                <div className="absolute right-0 top-0 h-40 w-40 pointer-events-none">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#5C8EFF]/20 to-[#02E8F8]/20 blur-3xl" />
                </div>

                <div className="relative">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4 sm:gap-6">
                    <div className="flex gap-3 sm:gap-5 flex-1">
                      {/* Icon */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] blur-xl opacity-30" />

                        <div
                          className="relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-xl sm:rounded-2xl text-white shadow-lg"
                          style={{
                            background:
                              'linear-gradient(135deg,#5C8EFF 0%,#02E8F8 100%)',
                          }}
                        >
                          <s.icon size={20} className="sm:w-6 sm:h-6" />
                        </div>
                      </div>

                      {/* Title Block */}
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#5C8EFF]">
                          Phase 0{s.n}
                        </div>

                        <h3 className="mt-0.5 text-xl sm:text-2xl font-black text-zinc-950">
                          {s.title}
                        </h3>

                        <p className="text-[10px] sm:text-sm font-semibold text-zinc-500 uppercase tracking-wide">
                          {s.label}
                        </p>
                      </div>
                    </div>

                    {/* Step Number */}
                    <span className="text-4xl sm:text-6xl font-black leading-none bg-gradient-to-br from-[#5C8EFF]/30 to-[#02E8F8]/30 bg-clip-text text-transparent select-none">
                      0{s.n}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 sm:mt-6 text-xs sm:text-[15px] leading-relaxed sm:leading-7 text-zinc-600">
                    {s.desc}
                  </p>

                  {/* Bottom Row */}
                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-between gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full
                            border
                            border-[#5C8EFF]/10
                            bg-gradient-to-r
                            from-[#5C8EFF]/10
                            to-[#02E8F8]/10
                            px-2.5
                            py-0.5
                            sm:px-3
                            sm:py-1
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            text-zinc-700
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metric */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-black bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] bg-clip-text text-transparent leading-none">
                          {s.metric}
                        </div>

                        <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                          {s.metricLabel}
                        </div>
                      </div>

                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-zinc-100 bg-zinc-50">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-zinc-500 sm:w-4 sm:h-4"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7H17V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </Container>
    </section>
  );
}

