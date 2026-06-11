import { useRef } from 'react';
import { Target, Users, LineChart } from 'lucide-react';
import { Reveal, Section, SectionEyebrow, TimelineProgress } from '../primitives';
import ScrollStack, { ScrollStackItem } from './ScrollStack'
const BRAND = '#5C8EFF';

const steps = [
  { n: 1, icon: Target, title: 'Define', desc: 'We understand your survey objectives and design the right methodology to reach your audience.' },
  { n: 2, icon: Users, title: 'Market', desc: 'We market your survey to verified respondents across 50+ countries and 30+ languages.' },
  { n: 3, icon: LineChart, title: 'Deliver', desc: 'You receive clean data, actionable insights and strategic recommendations.' },
];

export function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section id="how-we-work" className="border-t border-[#E5E7EB] bg-[#F8FAFA]">
      <Reveal><SectionEyebrow>How we work</SectionEyebrow></Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-2xl">From Survey Brief To Actionable Data — <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide text-swoosh">In Three Moves</span>.</h2>
      </Reveal>

      <div ref={ref} className="relative ml-0 max-w-3xl mx-auto pl-6 sm:pl-10">
        <div className="absolute left-0 sm:left-2 top-4 bottom-4 w-1">
          <TimelineProgress targetRef={ref} vertical={true} />
        </div>
        
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={60} 
          itemScale={0.05} 
          itemStackDistance={25}
          rotationAmount={1.5}
          blurAmount={1.5}
          baseScale={0.9}
          className="w-full"
        >
          {steps.map((s, i) => (
            <ScrollStackItem
              key={s.n}
              itemClassName="border border-zinc-200/80 bg-white p-8 sm:p-12 rounded-[2.5rem] h-auto flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND} 0%, #3B82F6 100%)`,
                    }}
                  >
                    <s.icon size={24} className="stroke-[2]" />
                  </div>
                  <span className="text-5xl sm:text-6xl font-[900] tracking-tight text-zinc-200/80 select-none">
                    0{s.n}
                  </span>
                </div>
                <div className="mt-8">
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--brand,#5C8EFF)]">
                    Phase 0{s.n}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-[900] tracking-tight uppercase mt-2 text-zinc-950">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </Section>
  );
}

