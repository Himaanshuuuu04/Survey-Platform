import { ArrowRight, Calendar } from 'lucide-react';
import { Button, Container, GradientBlob, Reveal } from '../primitives';
import { useAudience } from '../layout/AudienceContext';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  const { audience } = useAudience();
  const isBrands = audience === 'brands';

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <GradientBlob className="-top-40 -left-40 h-[36rem] w-[36rem]" />
      <GradientBlob className="-bottom-32 -right-32 h-[30rem] w-[30rem]" from="var(--accent)" to="var(--brand)" />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'var(--accent)' }} />
                {isBrands ? 'Trusted by 100+ research teams' : 'Join 5M+ participants worldwide'}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1>
                {isBrands ? (
                  <>Understand People.<br /><span className="brand-gradient-text">Make Better Decisions.</span></>
                ) : (
                  <>Share Your Voice.<br /><span className="brand-gradient-text">Shape What's Next.</span></>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg">
                {isBrands
                  ? 'Global market research, audience intelligence, and survey solutions that help brands discover what customers actually think.'
                  : 'Get paid for your opinion. Help the world’s best brands build products you’ll actually love.'}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/contact" size="lg">
                  {isBrands ? 'Request a Proposal' : 'Become a Participant'}
                  <ArrowRight size={18} />
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  <Calendar size={16} />
                  Schedule a Consultation
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-5 text-xs text-[var(--ink-soft)]">
                <div className="flex -space-x-2">
                  {['#3D5AFE', '#3DDC97', '#FF6B6B', '#FFB547'].map((c) => (
                    <div key={c} className="h-7 w-7 rounded-full border-2 border-white" style={{ background: c }} />
                  ))}
                </div>
                <span>Loved by teams at Nestle, Mastercard, Spotify and 100+ more</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} y={40}>
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
