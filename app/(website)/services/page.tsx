"use client";

import { ServicesHero } from '@/components/services/ServicesHero';
import { CapabilitySection } from '@/components/services/CapabilitySection';
import { GlobalReachSection } from '@/components/services/GlobalReachSection';
import { HowItWorksSection } from '@/components/services/HowItWorksSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Services() {
  return (
    <>
      <ServicesHero />
      <CapabilitySection />
      <GlobalReachSection />
      <HowItWorksSection />
      <FinalCTA />
    </>
  );
}
