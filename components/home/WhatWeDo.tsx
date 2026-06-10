import { BarChart3, MessageSquare, Building2, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal, Section, SectionEyebrow } from '../primitives';

const BRAND = '#5C8EFF';

const items = [
  { icon: BarChart3, title: 'Survey Design & Distribution', desc: 'End-to-end survey creation, distribution, and data collection at global scale.', tint: BRAND },
  { icon: MessageSquare, title: 'Survey Marketing', desc: 'Targeted outreach campaigns that drive high-quality survey responses.', tint: BRAND },
  { icon: Building2, title: 'B2B Panel Access', desc: 'Reach decision makers, executives and professionals across niche industries.', tint: BRAND },
  { icon: ShoppingBag, title: 'Consumer Insights', desc: 'Understand customer needs, market trends and purchase behavior at scale.', tint: BRAND },
];

export function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal><SectionEyebrow>What we do</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2>Survey Solutions That Turn Questions Into <span className="text-swoosh">Clear Answers</span>.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="text-lg">From survey design to respondent recruitment — we market your surveys to the right audience and deliver actionable insights.</p>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.12)]"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: `color-mix(in srgb, ${it.tint} 10%, white)`, color: it.tint }}
              >
                <it.icon size={22} />
              </div>
              <h3 className="mt-5">{it.title}</h3>
              <p className="mt-2 text-sm">{it.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: it.tint }}>
                Learn more <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
