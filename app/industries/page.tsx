"use client";
import { PageHero } from '@/components/common/PageHero';
import { StoryScrollSection } from '@/components/industries/StoryScrollSection';

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Research expertise across <span className="brand-gradient-text">industries</span>.</>}
        sub="Category specialists who know your customer, your competitors, and the questions worth asking."
      />
      <StoryScrollSection />
    </>
  );
}

