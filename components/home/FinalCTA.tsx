import { ArrowRight } from 'lucide-react';
import { Button, Container, GradientBlob, Reveal } from '../primitives';
import { useAudience } from '../layout/AudienceContext';

export function FinalCTA() {
  const { audience } = useAudience();
  const isBrands = audience === 'brands';
  return (
    <section className="px-5 pb-20 pt-10 sm:px-8">
      <Container className="!px-0">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center text-white sm:px-16"
            style={{ background: 'linear-gradient(135deg, var(--brand), #1f2bb5 60%, var(--accent))' }}
          >
            <GradientBlob className="left-10 top-0 h-72 w-72 opacity-40" from="rgba(255,255,255,0.5)" to="transparent" />
            <GradientBlob className="bottom-0 right-10 h-72 w-72 opacity-40" from="rgba(255,255,255,0.5)" to="transparent" />
            <h2 className="relative text-white">
              {isBrands ? 'Ready to Understand Your Market?' : 'Ready to make your opinion count?'}
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
                className="!bg-white !text-[var(--ink)] hover:!shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]"
              >
                {isBrands ? 'Start Your Research Project' : 'Join the Panel'}
                <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="outline" size="lg" className="!border-white/40 !bg-transparent !text-white hover:!border-white">
                Explore Services
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
