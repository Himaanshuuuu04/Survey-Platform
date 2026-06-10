import { motion } from 'motion/react';
import { Cpu, HeartPulse, Landmark, ShoppingCart, GraduationCap, Car } from 'lucide-react';
import { Container, Reveal, SectionEyebrow } from '../primitives';

const items = [
  { icon: Cpu, label: 'Technology' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Landmark, label: 'Finance' },
  { icon: ShoppingCart, label: 'Consumer Goods' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Car, label: 'Automotive' },
];

export function IndustriesMarquee() {
  const loop = [...items, ...items];
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--line)]" style={{ background: 'var(--bg-soft)' }}>
      <Container>
        <Reveal><SectionEyebrow>Featured industries</SectionEyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl">Deep Expertise Across The Categories That <span className="text-swoosh">Move The World</span>.</h2>
        </Reveal>
      </Container>
      <div className="mt-10 overflow-hidden marquee-fade">
        <motion.div
          className="flex gap-5 px-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((it, i) => (
            <div
              key={i}
              className="flex min-w-[220px] items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-5 py-4 transition-shadow hover:shadow-md"
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}
              >
                <it.icon size={18} />
              </div>
              <span className="font-semibold">{it.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
