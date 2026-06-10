import { ArrowRight } from 'lucide-react';
import { Button, Container, Reveal } from '../primitives';
import { useAudience } from '../layout/AudienceContext';

export function FinalCTA() {
  const { audience } = useAudience();
  const isBrands = audience === 'brands';
  return (
    <section className="px-5 pb-20 pt-10 sm:px-8">
      <Container className="!px-0">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] px-8 py-20 text-center text-white sm:px-16"
            style={{ background: 'var(--brand)' }}
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />

            <h2 className="relative text-white">
              {isBrands ? 'Ready To Understand Your Market?' : 'Ready To Make Your Opinion Count?'}
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">
              {isBrands
                ? 'Talk to a research strategist and get a tailored proposal within 48 hours.'
                : 'Join our global panel and start earning rewards for sharing your perspective.'}
            </p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href="/contact"
                size="lg"
                className="!bg-white !text-[var(--ink)] !shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] hover:!shadow-[0_14px_32px_-8px_rgba(0,0,0,0.3)]"
              >
                {isBrands ? 'Start Your Research Project' : 'Join the Panel'}
                <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="outline" size="lg" className="!border-white/40 !bg-transparent !text-white hover:!border-white !shadow-none">
                Explore Services
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
