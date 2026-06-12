"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Target, Sparkles, HeartHandshake } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '@/components/primitives';

const values = [
  { icon: ShieldCheck, title: 'Integrity', desc: "Methodology and data quality we'd stake our name on.", tint: 'var(--brand)' },
  { icon: Target, title: 'Accuracy', desc: 'Precision over speed when the answer matters.', tint: 'var(--accent)' },
  { icon: Sparkles, title: 'Innovation', desc: "Always testing new methods, never reusing yesterday's playbook.", tint: 'var(--coral)' },
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

/* ─── About Hero ─── */
function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const wordAboutRef = useRef<HTMLSpanElement>(null);
  const wordUsRef = useRef<HTMLSpanElement>(null);
  const centerImgRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        wordAboutRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.9 }
      )
        .fromTo(
          wordUsRef.current,
          { y: '100%' },
          { y: '0%', duration: 0.9 },
          '-=0.75'
        )
        .fromTo(
          labelRef.current?.querySelectorAll('.about-char') || [],
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, stagger: 0.015, duration: 0.35 },
          '-=0.6'
        )
        .fromTo(
          descRef.current?.querySelectorAll('.about-word') || [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.012, duration: 0.45 },
          '-=0.4'
        )
        .fromTo(
          centerImgRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=1.2'
        )
        .fromTo(
          centerImgRef.current?.querySelector('.about-hero-img-main__img') || [],
          { scale: 1.15 },
          { scale: 1, duration: 1.5 },
          '-=1.2'
        )
        .fromTo(
          rightBlockRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=1'
        )
        .fromTo(
          rightBlockRef.current?.querySelector('.about-hero-img-small__img') || [],
          { scale: 1.15 },
          { scale: 1, duration: 1.5 },
          '-=1.1'
        )
        .fromTo(
          rightBlockRef.current?.querySelector('.about-hero-philosophy__heading') || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.8'
        )
        .fromTo(
          rightBlockRef.current?.querySelector('.about-hero-philosophy__text') || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="about-hero-section"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="about-hero-inner">

        {/* ── LEFT: Giant stacked heading + label + description ── */}
        <div className="about-hero-left">
          <div className="about-hero-title-wrap">
            <h1 className="about-hero-title">
              <span className="about-hero-title__line" style={{ display: 'block', overflow: 'hidden', width: 'max-content' }}>
                <span ref={wordAboutRef} className="about-hero-title__word" style={{ display: 'block' }}>ABOUT</span>
              </span>
              <span className="about-hero-title__line" style={{ display: 'block', overflow: 'hidden', width: 'max-content' }}>
                <span ref={wordUsRef} className="about-hero-title__word about-hero-title--us" style={{ display: 'block' }}>US</span>
              </span>
            </h1>
          </div>

          <div ref={labelRef} className="about-hero-label">
            {"GLOBAL AUDIENCE INTELLIGENCE".split('').map((char, i) => (
              <span key={i} className="about-char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          <p ref={descRef} className="about-hero-desc">
            {"Methodological Precision: Gathering high-fidelity audience panels, executive cohorts, and verified respondents to guide strategic decisions with confidence."
              .split(' ')
              .map((word, i) => (
                <span key={i} className="about-word inline-block mr-1">
                  {word}
                </span>
              ))}
          </p>
        </div>

        {/* ── CENTER: Large premium image ── */}
        <div className="about-hero-center" ref={centerImgRef}>
          <div className="about-hero-img-main">
            <Image
              src="/about_hero_main.png"
              alt="Executives reviewing research insights in a premium boardroom"
              fill
              className="about-hero-img-main__img"
              priority
            />
          </div>
        </div>

        {/* ── RIGHT: Small image + Philosophy block ── */}
        <div className="about-hero-right" ref={rightBlockRef}>
          <div className="about-hero-img-small">
            <Image
              src="/about_philosophy_small.png"
              alt="Calm professional workspace"
              fill
              className="about-hero-img-small__img"
            />
          </div>
          <div className="about-hero-philosophy">
            <h3 className="about-hero-philosophy__heading">Our Philosophy</h3>
            <p className="about-hero-philosophy__text">
              At EGI, we believe research only creates value when it drives action. We eliminate assumptions by connecting strategy directly to verified audience feedback, enabling organizations to move forward with certainty.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />

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
