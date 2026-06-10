"use client";
import { BarChart3, MessageSquare, Building2, Target, ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Button, Reveal, Section } from '@/components/primitives';

const blocks = [
  {
    eyebrow: 'Quantitative Research',
    title: 'Decisions backed by statistically significant data.',
    desc: 'Surveys, brand tracking, customer satisfaction, and product testing — fielded across robust, verified panels.',
    bullets: ['Surveys', 'Brand Tracking', 'Customer Satisfaction', 'Product Testing'],
    icon: BarChart3,
    tint: 'var(--brand)',
  },
  {
    eyebrow: 'Qualitative Research',
    title: 'Get inside the why behind every number.',
    desc: 'Focus groups, in-depth interviews, and ongoing community research moderated by experienced specialists.',
    bullets: ['Focus Groups', 'Interviews', 'Community Research'],
    icon: MessageSquare,
    tint: 'var(--accent)',
  },
  {
    eyebrow: 'B2B Research',
    title: 'Hard-to-reach professionals, surfaced and screened.',
    desc: 'Talk to the decision makers, executives, and industry experts that actually shape your category.',
    bullets: ['Decision Makers', 'Executives', 'Industry Professionals'],
    icon: Building2,
    tint: 'var(--coral)',
  },
  {
    eyebrow: 'Market Intelligence',
    title: 'See the market before it moves.',
    desc: 'Sizing, competitor analysis, and ongoing trend monitoring — synthesized into briefs you can ship.',
    bullets: ['Market Sizing', 'Competitor Analysis', 'Trend Monitoring'],
    icon: Target,
    tint: 'var(--amber)',
  },
];

function ServiceVisual({ tint, Icon }: { tint: string; Icon: any }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-6">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl" style={{ background: tint }} />
      <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full opacity-20 blur-2xl" style={{ background: 'var(--accent)' }} />
      <div className="relative h-full w-full">
        <div className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: tint }}>
          <Icon size={26} />
        </div>
        <div className="mt-6 space-y-3">
          {[68, 84, 52, 76].map((w, i) => (
            <div key={i} className="rounded-xl border border-[var(--line)] bg-white p-3">
              <div className="mb-2 h-2 w-12 rounded-full bg-[var(--line)]" />
              <div className="h-3 rounded-full bg-[var(--line)]" style={{ width: '100%' }}>
                <div className="h-3 rounded-full" style={{ width: `${w}%`, background: tint }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Research solutions built around <span className="brand-gradient-text">your goals</span>.</>}
        sub="Whether you’re launching a product, entering a market, or fine-tuning a brand — we’ll build the right study for the question in front of you."
      />
      <Section className="!pt-0">
        <div className="space-y-24">
          {blocks.map((b, i) => (
            <div key={b.title} className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: b.tint }}>{b.eyebrow}</div>
                <h2 className="mt-3">{b.title}</h2>
                <p className="mt-5 text-lg">{b.desc}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {b.bullets.map((bl) => (
                    <li key={bl} className="flex items-center gap-2 text-sm font-medium">
                      <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ background: b.tint }}>
                        <Check size={12} />
                      </span>
                      {bl}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/contact">
                    Discuss this service <ArrowRight size={16} />
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <ServiceVisual tint={b.tint} Icon={b.icon} />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <Reveal>
          <div className="rounded-3xl border border-[var(--line)] bg-white p-10 text-center sm:p-16">
            <h2>Ready for a tailored proposal?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg">Tell us about your objective, timeline, and audience. We’ll respond with a scoped plan within 48 hours.</p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" size="lg">Request Research Proposal <ArrowRight size={18} /></Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

