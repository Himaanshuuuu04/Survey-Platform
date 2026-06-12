"use client";

import React from 'react';
import { Section, Container, Reveal, SectionEyebrow } from '@/components/primitives';
import MagicBento from '@/components/MagicBento';
import { Syne } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['800'],
});

const industriesData = [
  {
    title: 'Technology & Consumer Electronics',
    description: 'Launch products in saturated categories with confidence using global concept and pricing tests.',
    label: 'Tech'
  },
  {
    title: 'Finance & Fintech',
    description: 'Build multi-country expansion playbooks and track sentiment for digital banks and B2B financial services.',
    label: 'Finance'
  },
  {
    title: 'Healthcare',
    description: 'Reposition wellness brands, reach younger consumers, and consolidate healthcare trackers.',
    label: 'Health',
    useShuffle: true
  },
  {
    title: 'Retail & Consumer Goods',
    description: 'Optimize the omni-channel grocery experience, reduce cart abandonment, and increase basket sizes.',
    label: 'Retail',
    useShuffle: true
  },
  {
    title: 'Automotive',
    description: 'Decode the buyer journey across global markets to build unified, global dealership experiences.',
    label: 'Auto'
  },
  {
    title: 'Education',
    description: 'Design curriculums that improve completion rates in self-paced courses.',
    label: 'Education'
  },
  {
    title: 'Telecommunications',
    description: 'Access deep expertise to capture real market intelligence in highly competitive connectivity sectors.',
    label: 'Telecom'
  },
  {
    title: 'Travel & Entertainment',
    description: 'Reach global audiences and specific demographical brackets to uncover buying behaviors.',
    label: 'Travel'
  }
];

export function IndustriesWeServe() {
  return (
    <Section 
      className="bg-[var(--bg-soft)] text-[var(--ink)] relative overflow-hidden" 
      id="industries"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Background styling to match the site's light sections */}
      <div className="absolute inset-0  pointer-events-none" />
      <div className="absolute inset-0  pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Reveal>
            <SectionEyebrow>Industries We Serve</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mt-6 mb-6 ${syne.className}`}>
              Expertise Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B84FF] to-[#02E8F8]">Sectors</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[var(--ink-soft)] font-medium">
              We leverage category specialists who know your customer, your competitors, and the questions worth asking to build a custom approach for your industry.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="flex justify-center">
          <MagicBento 
            cards={industriesData}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableStars={true}
            enableTilt={true}
            enableMagnetism={true}
            glowColor="91, 132, 255"
            textAutoHide={false}
            theme="light"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
