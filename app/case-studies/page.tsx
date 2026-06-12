"use client";
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Reveal, Section } from '@/components/primitives';
import { FinalCTA } from '@/components/home/FinalCTA';

const studies = [
  {
    tag: 'Consumer Electronics',
    title: 'Launching a category-leading wireless audio brand.',
    challenge: 'Launch a new product in a saturated category.',
    solution: 'Global consumer study across 8 markets with concept and pricing tests.',
    outcome: '+38% pre-order conversion and #1 in category at launch.',
    tint: 'var(--brand)',
  },
  {
    tag: 'Fintech Startup',
    title: 'Multi-country expansion playbook for a digital bank.',
    challenge: 'Identify priority markets for expansion.',
    solution: 'Multi-country survey + qualitative interviews with switchers.',
    outcome: '2.1x customer acquisition in selected launch markets.',
    tint: 'var(--accent)',
  },
  {
    tag: 'Healthcare',
    title: 'Repositioning a 50-year-old wellness brand.',
    challenge: 'Reach younger consumers without alienating loyalists.',
    solution: 'Segmentation + brand tracker across 6 quarters.',
    outcome: '+22pt unaided awareness in the 25-34 segment.',
    tint: 'var(--coral)',
  },
  {
    tag: 'Retail',
    title: 'Optimizing the omni-channel grocery experience.',
    challenge: 'Reduce cart abandonment in pickup ordering.',
    solution: 'Behavioral analytics + diary studies with active shoppers.',
    outcome: '-17% abandonment, +9% basket size.',
    tint: 'var(--amber)',
  },
  {
    tag: 'Automotive',
    title: 'EV buyer journey decoded across 12 markets.',
    challenge: 'Build a unified buyer journey for a new EV lineup.',
    solution: '12-market quantitative + 60 in-depth interviews.',
    outcome: 'Refreshed dealer experience adopted globally.',
    tint: 'var(--brand)',
  },
  {
    tag: 'Education',
    title: 'Designing a curriculum students actually love.',
    challenge: 'Improve completion rates in self-paced courses.',
    solution: 'Mixed-methods study with 4,200 learners worldwide.',
    outcome: '+31% course completion rate.',
    tint: 'var(--accent)',
  },
];

export default function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={<>Research that drives <span className="brand-gradient-text">business decisions</span>.</>}
        sub="A selection of recent engagements — hover any card to see the full breakdown."
      />
      <Section className="!pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative h-[22rem] overflow-hidden rounded-3xl border border-[var(--line)] bg-white"
              >
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${s.tint}22, transparent 60%)` }} />
                <div className="relative flex h-full flex-col justify-between p-7">
                  <div>
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: s.tint }}>
                      {s.tag}
                    </span>
                    <h3 className="mt-5 leading-snug">{s.title}</h3>
                  </div>
                  <motion.div
                    variants={{ rest: { y: 0, opacity: 1 }, hover: { y: -8, opacity: 1 } }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="space-y-2 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div><span className="font-semibold text-[var(--ink)]">Challenge:</span> {s.challenge}</div>
                      <div><span className="font-semibold text-[var(--ink)]">Solution:</span> {s.solution}</div>
                      <div><span className="font-semibold text-[var(--ink)]">Outcome:</span> {s.outcome}</div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: s.tint }}>
                      Read the story <ArrowUpRight size={16} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>
      <FinalCTA />
    </>
  );
}

