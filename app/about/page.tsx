"use client";
import { ShieldCheck, Target, Sparkles, HeartHandshake } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Reveal, Section, SectionEyebrow } from '@/components/primitives';

const values = [
  { icon: ShieldCheck, title: 'Integrity', desc: 'Methodology and data quality we’d stake our name on.', tint: 'var(--brand)' },
  { icon: Target, title: 'Accuracy', desc: 'Precision over speed when the answer matters.', tint: 'var(--accent)' },
  { icon: Sparkles, title: 'Innovation', desc: 'Always testing new methods, never reusing yesterday’s playbook.', tint: 'var(--coral)' },
  { icon: HeartHandshake, title: 'Client Success', desc: 'We win when your decision lands.', tint: 'var(--amber)' },
];

const team = [
  { name: 'Dr. Maya Okafor', role: 'Co-founder & CEO', tint: 'var(--brand)', initials: 'MO' },
  { name: 'Jonas Lindqvist', role: 'Co-founder & Head of Methodology', tint: 'var(--accent)', initials: 'JL' },
  { name: 'Sofia Marín', role: 'Chief Research Officer', tint: 'var(--coral)', initials: 'SM' },
  { name: 'Tariq Yusuf', role: 'VP, Global Panels', tint: 'var(--amber)', initials: 'TY' },
];

const dots: Array<[number, number]> = [
  [10, 30], [14, 26], [18, 32], [22, 28], [26, 34], [30, 30],
  [38, 28], [42, 32], [46, 30], [50, 34], [54, 30],
  [60, 26], [64, 32], [68, 28], [72, 34], [76, 30],
  [82, 38], [86, 42], [20, 48], [28, 52], [36, 48],
  [44, 56], [52, 50], [60, 58], [68, 52], [76, 58],
  [16, 42], [24, 40], [48, 44], [56, 46], [72, 48], [80, 52],
];
const hubs = [[24, 28], [50, 34], [70, 28], [60, 58], [38, 48]];

function WorldMap() {
  return (
    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-[var(--line)] bg-gradient-to-br from-white to-[var(--brand-soft)]">
      <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.5" fill="var(--ink)" opacity="0.18" />
        ))}
        {hubs.map(([x1, y1], i) =>
          hubs.slice(i + 1).map(([x2, y2], j) => (
            <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--brand)" strokeWidth="0.12" opacity="0.5" strokeDasharray="0.5 0.8" />
          ))
        )}
        {hubs.map(([x, y], i) => (
          <g key={`hub-${i}`}>
            <circle cx={x} cy={y} r="1.3" fill="var(--brand)">
              <animate attributeName="r" values="1.3;2.2;1.3" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="1;0.3;1" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
            <circle cx={x} cy={y} r="0.6" fill="var(--accent)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>We help organizations make decisions <span className="brand-gradient-text">with confidence</span>.</>}
      />
      <Section className="!pt-0">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
          <Reveal>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">Mission</div>
              <p className="mt-3 text-xl leading-relaxed text-[var(--ink)]">
                To replace gut-feel decisions with rigorous, human-centered evidence — so every product, campaign, and policy is shaped by the people it serves.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Vision</div>
              <p className="mt-3 text-xl leading-relaxed text-[var(--ink)]">
                A world where understanding people is the default, not the differentiator — and where every voice has a clear path to the decisions that affect it.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white">
        <Reveal><SectionEyebrow>Our values</SectionEyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="max-w-2xl">What we hold ourselves to, every project.</h2></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: v.tint }}>
                  <v.icon size={20} />
                </div>
                <h3 className="mt-5">{v.title}</h3>
                <p className="mt-2 text-sm">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal><SectionEyebrow>Leadership</SectionEyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="max-w-2xl">The people behind the practice.</h2></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.05}>
              <div className="rounded-3xl border border-[var(--line)] bg-white p-6 text-center">
                <div
                  className="mx-auto grid h-24 w-24 place-items-center rounded-full text-2xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${m.tint}, var(--accent))` }}
                >
                  {m.initials}
                </div>
                <div className="mt-5 font-semibold">{m.name}</div>
                <div className="text-sm text-[var(--ink-soft)]">{m.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <Reveal><SectionEyebrow>Global reach</SectionEyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="max-w-2xl">Active panels across 50+ countries.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <WorldMap />
          </div>
        </Reveal>
      </Section>
    </>
  );
}

