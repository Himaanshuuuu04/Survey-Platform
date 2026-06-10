"use client";
import { Hero } from '@/components/home/Hero';
import { TrustMetrics } from '@/components/home/TrustMetrics';
import { WhatWeDo } from '@/components/home/WhatWeDo';
import { HowWeWork } from '@/components/home/HowWeWork';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { IndustriesMarquee } from '@/components/home/IndustriesMarquee';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <WhatWeDo />
      <HowWeWork />
      <WhyChooseUs />
      <IndustriesMarquee />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

