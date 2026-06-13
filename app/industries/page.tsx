import { IndustriesHero } from '@/components/industries/IndustriesHero';
import { StoryScrollSection } from '@/components/industries/StoryScrollSection';
import { IndustriesWeServe } from '@/components/industries/IndustriesWeServe';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Industries() {
  return (
    <>
      <IndustriesHero />
      <StoryScrollSection />
      <IndustriesWeServe />
      <FinalCTA 
        headline={<>Let&apos;s Turn<br/>Responses Into<br/><span className="text-transparent [-webkit-text-stroke:1.5px_#ffffff] font-black tracking-wide">Real Decisions.</span></>}
        buttonText="Start Your Research Project"
      />
    </>
  );
}
