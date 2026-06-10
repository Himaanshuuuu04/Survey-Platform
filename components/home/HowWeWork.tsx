import { useRef } from 'react';
import { Target, Users, LineChart } from 'lucide-react';
import { Reveal, Section, SectionEyebrow, TimelineProgress } from '../primitives';

const steps = [
  { n: 1, icon: Target, title: 'Define', desc: 'Understand your research objective.' },
  { n: 2, icon: Users, title: 'Collect', desc: 'Reach the right audience globally.' },
  { n: 3, icon: LineChart, title: 'Deliver', desc: 'Actionable insights and recommendations.' },
];

export function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section id="how-we-work" className="bg-white">
      <Reveal><SectionEyebrow>How we work</SectionEyebrow></Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-2xl">From a sharp question to decisions you can ship — <span className="brand-gradient-text">in three moves</span>.</h2>
      </Reveal>

      <div ref={ref} className="relative mt-14">
        <div className="mb-10 px-3">
          <TimelineProgress targetRef={ref} />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-7">
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                    style={{ background: 'linear-gradient(135deg, var(--brand), var(--accent))' }}
                  >
                    <s.icon size={20} />
                  </div>
                  <span className="text-5xl font-extrabold text-[var(--line)]">0{s.n}</span>
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
