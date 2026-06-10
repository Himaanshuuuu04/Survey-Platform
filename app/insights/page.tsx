"use client";
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Container, Reveal } from '@/components/primitives';

const categories = ['All', 'Market Research', 'Consumer Behavior', 'Brand Strategy', 'Industry Trends'] as const;

const posts = [
  { cat: 'Market Research', title: 'How to size a market when the category doesn’t exist yet', read: '7 min', tint: 'var(--brand)', h: 'h-72' },
  { cat: 'Consumer Behavior', title: 'The post-loyalty consumer: what 5,000 shoppers told us', read: '5 min', tint: 'var(--coral)', h: 'h-60' },
  { cat: 'Brand Strategy', title: 'Tracking brand health without drowning in dashboards', read: '6 min', tint: 'var(--accent)', h: 'h-80' },
  { cat: 'Industry Trends', title: 'AI in research: where it helps, where it hurts', read: '8 min', tint: 'var(--amber)', h: 'h-64' },
  { cat: 'Consumer Behavior', title: 'Why your Gen Z segment is probably three segments', read: '4 min', tint: 'var(--brand)', h: 'h-72' },
  { cat: 'Market Research', title: 'A practical guide to concept testing in 2026', read: '9 min', tint: 'var(--accent)', h: 'h-60' },
  { cat: 'Brand Strategy', title: 'Naming, but with data: a repeatable process', read: '6 min', tint: 'var(--coral)', h: 'h-72' },
  { cat: 'Industry Trends', title: 'The state of mobile-first research worldwide', read: '5 min', tint: 'var(--amber)', h: 'h-64' },
];

export default function Insights() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const list = useMemo(() => (active === 'All' ? posts : posts.filter((p) => p.cat === active)), [active]);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Ideas, frameworks, and findings <span className="brand-gradient-text">worth reading</span>.</>}
        sub="Tactical pieces from our methodology team and a regular pulse on what we’re seeing across global panels."
      />
      <div className="sticky top-20 z-30 -mt-6 pb-6">
        <Container>
          <div className="glass flex gap-1 overflow-x-auto rounded-full p-1.5 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active === c ? 'text-white' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
                style={active === c ? { background: 'var(--brand)' } : {}}
              >
                {c}
              </button>
            ))}
          </div>
        </Container>
      </div>
      <Container className="pb-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={(i % 6) * 0.05}>
              <motion.a
                href="#"
                whileHover={{ y: -4 }}
                className="group mb-5 block overflow-hidden rounded-3xl border border-[var(--line)] bg-white break-inside-avoid"
              >
                <div className={`${p.h} relative overflow-hidden`}>
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.tint}, color-mix(in srgb, ${p.tint} 30%, white))` }} />
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 60%)' }} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--ink)]">{p.cat}</span>
                </div>
                <div className="p-5">
                  <h3 className="leading-snug group-hover:text-[var(--brand)]">{p.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--ink-soft)]">
                    <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {p.read} read</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}

