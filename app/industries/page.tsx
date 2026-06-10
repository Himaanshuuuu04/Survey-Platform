"use client";
import { Cpu, HeartPulse, Landmark, ShoppingBag, GraduationCap, Car, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHero } from '@/components/common/PageHero';
import { Reveal, Section } from '@/components/primitives';

const industries = [
  { icon: Cpu, title: 'Technology', desc: 'Product feedback and adoption studies.', tint: 'var(--brand)', span: 'sm:row-span-2' },
  { icon: HeartPulse, title: 'Healthcare', desc: 'Patient and provider research.', tint: 'var(--coral)' },
  { icon: Landmark, title: 'Finance', desc: 'Consumer and institutional insights.', tint: 'var(--accent)' },
  { icon: ShoppingBag, title: 'Retail', desc: 'Shopping behavior analysis.', tint: 'var(--amber)', span: 'sm:row-span-2' },
  { icon: GraduationCap, title: 'Education', desc: 'Student and institutional research.', tint: 'var(--brand)' },
  { icon: Car, title: 'Automotive', desc: 'Buyer journey and preference studies.', tint: 'var(--accent)' },
];

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Research expertise across <span className="brand-gradient-text">industries</span>.</>}
        sub="Category specialists who know your customer, your competitors, and the questions worth asking."
      />
      <Section className="!pt-0">
        <div className="grid auto-rows-[14rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05} className={it.span ?? ''}>
              <motion.a
                href="#"
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-7"
              >
                <div
                  className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ background: it.tint }}
                />
                <div className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: it.tint }}>
                  <it.icon size={24} />
                </div>
                <div>
                  <h3>{it.title}</h3>
                  <p className="mt-2 text-sm">{it.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: it.tint }}>
                    Explore <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

