import { ShieldCheck, Globe2, Zap, Brain } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';

const BRAND = '#115E59';

const items = [
  { icon: ShieldCheck, title: 'Verified Respondents', desc: 'Triple-verified panels with bot detection and identity checks for clean data.', tint: BRAND },
  { icon: Globe2, title: 'Global Reach', desc: 'Active panels in 50+ countries across 30+ languages for any target audience.', tint: '#0F4C45' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Most surveys fielded and results delivered within 7 business days.', tint: '#0A0A0A' },
  { icon: Brain, title: 'Survey Expertise', desc: 'PhD-led methodology team designing surveys that get reliable, actionable results.', tint: BRAND },
];

export function WhyChooseUs() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><SectionEyebrow>Why companies choose us</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2>Survey Data You Can <span className="text-swoosh">Stake A Decision</span> On.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg">We obsess over respondent quality, survey design, and data integrity so your marketing surveys deliver real business value.</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div
                className={`group relative h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.12)] ${i % 3 === 0 ? 'sm:translate-y-6' : ''}`}
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `color-mix(in srgb, ${it.tint} 10%, white)`, color: it.tint }}
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
