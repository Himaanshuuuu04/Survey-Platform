import { ShieldCheck, Globe2, Zap, Brain } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';

const BRAND = '#5C8EFF';

const items = [
  { 
    icon: ShieldCheck, 
    title: 'Verified Respondents', 
    metric: '99.7% Fraud Detection Accuracy',
    desc: 'Triple-verified panels with bot detection and identity checks for clean data.', 
    tint: BRAND 
  },
  { 
    icon: Globe2, 
    title: 'Global Reach', 
    metric: '50+ Countries Included',
    desc: 'Active panels in 50+ countries across 30+ languages for any target audience.', 
    tint: BRAND 
  },
  { 
    icon: Zap, 
    title: 'Fast Turnaround', 
    metric: 'Average Delivery in 7 Days',
    desc: 'Most surveys fielded and results delivered within 7 business days.', 
    tint: BRAND 
  },
  { 
    icon: Brain, 
    title: 'Survey Expertise', 
    metric: '10+ Years Research Experience',
    desc: 'PhD-led methodology team designing surveys that get reliable, actionable results.', 
    tint: BRAND 
  },
];

export function WhyChooseUs() {
  return (
    <Section className="!pt-10 sm:!pt-14">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><SectionEyebrow>Why companies choose us</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance leading-[1.15]">
              Survey Data You Can<br className="hidden sm:inline" /> <span className="text-swoosh">Stake A Decision</span> On.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg">
              We obsess over respondent quality, survey design, and data integrity so your marketing surveys deliver real business value.
            </p>
          </Reveal>
        </div>
        
        <div className="relative">
          {/* Subtle blue gradient glow behind the card grid to create depth */}
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(92,142,255,0.06)_0%,transparent_65%)] blur-3xl" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.05}>
                <div
                  className={`group relative h-full rounded-2xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(92,142,255,0.12)] hover:border-[#5C8EFF]/35 ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#5C8EFF]/15 bg-[#EFF6FF] text-[#5C8EFF] transition-colors group-hover:bg-[#5C8EFF] group-hover:text-white"
                  >
                    <it.icon size={26} strokeWidth={2} />
                  </div>
                  
                  <h3 className="mt-6 text-xl font-extrabold text-zinc-950 tracking-tight leading-snug">{it.title}</h3>
                  
                  {/* Credibility Metric Highlight */}
                  <div className="mt-2 text-xs font-black uppercase tracking-wider text-[#5C8EFF] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                    {it.metric}
                  </div>
                  
                  <p className="mt-3.5 text-sm text-zinc-500 leading-relaxed font-medium">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
