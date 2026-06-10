import { BarChart3, MessageSquare, Building2, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal, Section, SectionEyebrow } from '../primitives';

const items = [
  { icon: BarChart3, title: 'Quantitative Research', desc: 'Large-scale surveys and statistical analysis.', tint: 'var(--brand)' },
  { icon: MessageSquare, title: 'Qualitative Research', desc: 'Interviews, discussions and behavioral insights.', tint: 'var(--accent)' },
  { icon: Building2, title: 'B2B Audience Research', desc: 'Decision makers, professionals and niche industries.', tint: 'var(--coral)' },
  { icon: ShoppingBag, title: 'Consumer Intelligence', desc: 'Understand customer needs, trends and preferences.', tint: 'var(--amber)' },
];

export function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal><SectionEyebrow>What we do</SectionEyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2>Research solutions that turn questions into <span className="brand-gradient-text">clear answers</span>.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="text-lg">From global panels to deep-dive interviews — we cover the full spectrum of human insight, all under one roof.</p>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-7 transition-shadow hover:shadow-[0_30px_70px_-30px_rgba(11,16,32,0.25)]"
            >
              <div
                className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: it.tint }}
              />
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: it.tint }}>
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
