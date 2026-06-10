import { ShieldCheck, Globe2, Zap, Brain } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';

const items = [
  { icon: ShieldCheck, title: 'Verified Respondents', desc: 'Triple-verified panels with bot detection and identity checks.', tint: 'var(--brand)' },
  { icon: Globe2, title: 'Global Reach', desc: 'Active panels in 50+ countries across 30+ languages.', tint: 'var(--accent)' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Most studies fielded and analyzed within 7 business days.', tint: 'var(--coral)' },
  { icon: Brain, title: 'Research Expertise', desc: 'PhD-led methodology team with 15+ years of experience.', tint: 'var(--amber)' },
];

export function WhyChooseUs() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><SectionEyebrow>Why companies choose us</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2>Insight you can <span className="brand-gradient-text">stake a decision on</span>.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg">We obsess over data quality, methodology, and turnaround so you can move with confidence.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div
                className={`group relative h-full rounded-3xl border border-[var(--line)] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(11,16,32,0.18)] ${
                  i % 3 === 0 ? 'sm:translate-y-6' : ''
                }`}
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `color-mix(in srgb, ${it.tint} 18%, white)`, color: it.tint }}
                >
                  <it.icon size={20} />
                </div>
                <h3 className="mt-5">{it.title}</h3>
                <p className="mt-2 text-sm">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
