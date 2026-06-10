import { useRef } from 'react';
import { Target, Users, LineChart } from 'lucide-react';
import { Reveal, Section, SectionEyebrow, TimelineProgress } from '../primitives';

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
        <h2 className="max-w-2xl">From Survey Brief To Actionable Data — <span className="text-swoosh">In Three Moves</span>.</h2>
      </Reveal>

      <div ref={ref} className="relative mt-14">
        <div className="mb-10 px-3">
          <TimelineProgress targetRef={ref} />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-[#E5E7EB] bg-white p-7">
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl text-white"
                    style={{ background: BRAND }}
                  >
                    <s.icon size={20} />
                  </div>
                  <span className="text-5xl font-extrabold text-[#E5E7EB]">0{s.n}</span>
                </div>
                <h3 className="mt-5">Step {s.n} — {s.title}</h3>
                <p className="mt-2 text-sm">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
