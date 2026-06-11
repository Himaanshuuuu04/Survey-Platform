import { ShieldCheck, Globe2, Zap, Brain } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';
import MagicBento from './MagicBento';

interface ProcessStep {
  n: number;
  orbGrad: string;
  title: string;
  desc: string;
}

const steps: ProcessStep[] = [
  {
    n: 1,
    orbGrad: 'from-[#5B84FF] to-[#29D5FF]',
    title: 'Survey Design',
    desc: 'Research objectives, questionnaire creation, and sampling strategy.'
  },
  {
    n: 2,
    orbGrad: 'from-[#29D5FF] to-[#2563EB]',
    title: 'Audience Recruitment',
    desc: 'Verified respondent sourcing, targeted outreach, and panel activation.'
  },
  {
    n: 3,
    orbGrad: 'from-[#3B82F6] to-[#02E8F8]',
    title: 'Data Collection',
    desc: 'Survey deployment, real-time response monitoring, and quality control.'
  },
  {
    n: 4,
    orbGrad: 'from-[#02E8F8] to-[#5B84FF]',
    title: 'Insight Delivery',
    desc: 'Deep data analysis, report generation, and actionable recommendations.'
  }
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGGElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined' || !pathRef.current || !rocketRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Explicitly set rocket's initial position at path progress 0 before creating animation
      gsap.set(rocketRef.current, {
        x: 0,
        y: 0,
        transformOrigin: "50% 50%",
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 0,
        },
        opacity: 1 // make it visible once positioned at start
      });

      // 2. Create ScrollTrigger animation
      gsap.to(rocketRef.current, {
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let nextStep = 1;
            if (p < 0.30) {
              nextStep = 1;
            } else if (p >= 0.30 && p < 0.63) {
              nextStep = 2;
            } else if (p >= 0.63 && p < 0.95) {
              nextStep = 3;
            } else {
              nextStep = 4;
            }
            setActiveStep((prev) => (prev !== nextStep ? nextStep : prev));
          },
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger once everything is fully loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      return () => {
        clearTimeout(t);
        ctx.revert();
      };
    } else {
      window.addEventListener('load', handleLoad);
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(t);
        ctx.revert();
      };
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      id="how-it-works" 
      className="border-t border-[#E5E7EB] bg-[#FAFAFA] relative overflow-hidden py-20 sm:py-28"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Extremely light blue radial glow to create depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(92,142,255,0.03),transparent_55%)] pointer-events-none" />

      {/* Giant faded step number in background */}
      <div className="absolute top-0 right-10 text-[20rem] sm:text-[28rem] lg:text-[36rem] font-[1000] text-zinc-950/2 tracking-tighter select-none pointer-events-none leading-none transition-all duration-1000 ease-in-out">
        0{activeStep || 1}
      </div>

      <Container>
        {/* HEADLINE AREA */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-end mb-16 relative z-10">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[9px] font-black tracking-widest uppercase text-[#5B84FF] mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#29D5FF] animate-pulse" />
                HOW IT WORKS &middot; 4 STEPS
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-[1000] tracking-tight uppercase leading-[0.95] text-zinc-950">
                THE<br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#111111] font-black tracking-wider">
                  PROCESS.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:max-w-md">
            <p className="text-base sm:text-lg text-zinc-500 font-medium leading-relaxed">
              From survey design to verified insights, our proven research workflow delivers reliable, high-quality data at scale.
            </p>
          </Reveal>
        </div>
        <div className="w-full">
          <Reveal delay={0.25}>
            <MagicBento
              theme="light"
              textAutoHide={true}
              enableSpotlight
              enableBorderGlow={true}              
              spotlightRadius={610}
              particleCount={0}
              glowColor="92, 142, 255"
              disableAnimations={false}
              cards={items.map((it, idx) => ({
                title: it.title,
                description: it.desc,
                icon: it.icon,
                tint: it.tint,
                className: idx === 0 || idx === 3 ? 'md:col-span-2 md:aspect-[8/3]' : 'md:col-span-1 md:aspect-[4/3]'
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
