import { Reveal, Section, SectionEyebrow } from '../primitives';
import Carousel from './Carousel';

const data = [
  {
    quote: 'EvoGlobalInsight delivered insights in two weeks that would have taken our internal team a quarter. The launch hit number one in its category.',
    name: 'Amelia Chen',
    role: 'VP Product, Lumen Audio',
    initials: 'AC',
    tint: 'var(--brand)',
  },
  {
    quote: "The most rigorous panel I've worked with in 15 years. Their methodology team doesn't just hand off data — they help us decide.",
    name: 'Marcus Doyle',
    role: 'Head of Insights, Northstar Bank',
    initials: 'MD',
    tint: 'var(--brand-dark)',
  },
  {
    quote: 'We replaced four vendors with EvoGlobalInsight. Faster, cleaner data, and a partner that actually understands our category.',
    name: 'Priya Raman',
    role: 'CMO, Brightleaf Health',
    initials: 'PR',
    tint: 'var(--brand)',
  },
];

export function Testimonials() {
  return (
    <Section>
      <Reveal><SectionEyebrow>Testimonials</SectionEyebrow></Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl">Trusted By Research Leaders At The World's Most <span className="text-swoosh">Ambitious Brands</span>.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex justify-center mt-12 w-full">
          <Carousel
            items={data.map((t, idx) => ({
              id: idx,
              quote: t.quote,
              name: t.name,
              role: t.role,
              initials: t.initials,
              tint: t.tint
            }))}
            baseWidth={880}
            height={420}
            autoplay
            autoplayDelay={2500}
            pauseOnHover
            loop
            round={false}
          />
        </div>
      </Reveal>
    </Section>
  );
}
