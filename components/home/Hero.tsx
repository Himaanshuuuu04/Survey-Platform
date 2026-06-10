import { Container, Reveal } from '../primitives';
import { useAudience } from '../layout/AudienceContext';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  const { audience } = useAudience();
  const isBrands = audience === 'brands';

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-white pt-6 lg:pt-12">
      {/* ── THE BIG TEAL SHAPE — custom curved SVG path from reference image ── */}
      <svg
        className="absolute right-0 top-0 bottom-0 h-full w-[46%] hidden lg:block pointer-events-none z-0"
        viewBox="0 0 460 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 460 0 L 140 0 C 90 80 50 160 50 260 C 50 450 150 580 250 680 C 330 760 460 820 460 880 Z"
          fill="#115E59"
        />
      </svg>

      <Container className="relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* ── Left: Headline + CTA ── */}
          <div className="relative py-8 lg:py-16">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-[900] tracking-tight uppercase leading-[0.95] text-[#0A0A0A]">
                {isBrands ? (
                  <>
                    Survey Marketing <span className="text-swoosh">Agency</span> For Companies In The Making.
                  </>
                ) : (
                  <>
                    Your Voice Shapes What <span className="text-swoosh">Comes</span> Next.
                  </>
                )}
              </h1>
            </Reveal>
          </div>

          {/* ── Right: Visual (floats on top of the teal shape) ── */}
          <Reveal delay={0.15} y={30}>
            <div className="relative lg:py-8">
              <HeroVisual />
            </div>
          </Reveal>
        </div>

        {/* ── Bottom: Trust Badges / Award Logos ── */}
        <div className="mt-12 border-t border-zinc-100 pt-10 pb-8 hidden md:block z-10">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-40 grayscale transition-all duration-300 hover:opacity-60">
            {/* nglcc */}
            <div className="flex items-center gap-1">
              <span className="text-lg font-black tracking-tighter text-[#0A0A0A]">nglcc</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                National LGBT<br />Chamber of Commerce
              </span>
            </div>

            {/* IAC */}
            <div className="flex items-center gap-1.5">
              <div className="border border-[#0A0A0A] px-1 py-0.5 text-xs font-black tracking-tight text-[#0A0A0A]">
                IAC
              </div>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Internet Advertising<br />Competition
              </span>
            </div>

            {/* VEGA */}
            <div className="flex items-center gap-1">
              <span className="text-sm font-extrabold tracking-widest text-[#0A0A0A]">VEGA</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Digital Awards<br />2025 Gold Winner
              </span>
            </div>

            {/* NYX */}
            <div className="flex items-center gap-1">
              <span className="text-sm font-black tracking-wider text-[#0A0A0A]">NYX</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Grand Winner<br />Awards
              </span>
            </div>

            {/* MUSE */}
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[8px] text-white font-extrabold">M</div>
              <span className="text-sm font-bold tracking-wider text-[#0A0A0A]">MUSE</span>
              <span className="text-[7px] uppercase font-bold tracking-widest text-[#0A0A0A]/70 leading-none">
                Creative Awards<br />Official Winner
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile: teal block at bottom */}
      <div
        className="absolute right-0 left-0 bottom-0 h-[32%] rounded-t-[2rem] lg:hidden -z-10"
        style={{ background: '#115E59' }}
      />
    </section>
  );
}
