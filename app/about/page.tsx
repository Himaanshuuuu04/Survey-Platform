"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FinalCTA } from '@/components/home/FinalCTA';

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
      <FinalCTA />
    </>
  );
}
