import { ShieldCheck, Globe2, Zap, Brain } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';
import MagicBento from './MagicBento';

const BRAND = '#5C8EFF';

const items = [
  { icon: ShieldCheck, title: 'Verified Respondents', desc: 'Triple-verified panels with bot detection and identity checks for clean data.', tint: BRAND },
  { icon: Globe2, title: 'Global Reach', desc: 'Active panels in 50+ countries across 30+ languages for any target audience.', tint: BRAND },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Most surveys fielded and results delivered within 7 business days.', tint: BRAND },
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
        <div className="w-full">
          <Reveal delay={0.25}>
            <MagicBento
              theme="light"
              textAutoHide={true}
              enableSpotlight
              enableBorderGlow={true}              
              spotlightRadius={610}
              particleCount={0}
              glowColor="92, 142, 255"
              disableAnimations={false}
              cards={items.map((it, idx) => ({
                title: it.title,
                description: it.desc,
                icon: it.icon,
                tint: it.tint,
                className: idx === 0 || idx === 3 ? 'md:col-span-2 md:aspect-[8/3]' : 'md:col-span-1 md:aspect-[4/3]'
              }))}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
