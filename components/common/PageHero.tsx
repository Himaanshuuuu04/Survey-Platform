import { ReactNode } from 'react';
import { Container, GradientBlob, Reveal, SectionEyebrow } from '../primitives';

export function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24 bg-[var(--bg-soft)] text-[var(--ink)]" 
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}>
     
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><SectionEyebrow>{eyebrow}</SectionEyebrow></Reveal>
          <Reveal delay={0.05}><h1>{title}</h1></Reveal>
          {sub && (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg">{sub}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.15}><div className="mt-8 flex justify-center">{children}</div></Reveal>}
        </div>
      </Container>
    </section>
  );
}
