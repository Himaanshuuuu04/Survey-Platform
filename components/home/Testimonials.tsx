import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';

const data = [
  {
    quote: 'Pulselens delivered insights in two weeks that would have taken our internal team a quarter. The launch hit number one in its category.',
    name: 'Amelia Chen',
    role: 'VP Product, Lumen Audio',
    initials: 'AC',
    tint: 'var(--brand)',
  },
  {
    quote: 'The most rigorous panel I’ve worked with in 15 years. Their methodology team doesn’t just hand off data — they help us decide.',
    name: 'Marcus Doyle',
    role: 'Head of Insights, Northstar Bank',
    initials: 'MD',
    tint: 'var(--accent)',
  },
  {
    quote: 'We replaced four vendors with Pulselens. Faster, cleaner data, and a partner that actually understands our category.',
    name: 'Priya Raman',
    role: 'CMO, Brightleaf Health',
    initials: 'PR',
    tint: 'var(--coral)',
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = data[i];
  return (
    <Section className="bg-white">
      <Reveal><SectionEyebrow>Testimonials</SectionEyebrow></Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl">Trusted by research leaders at the world’s most ambitious brands.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-gradient-to-br from-[var(--brand-soft)] to-white p-8 sm:p-14">
          <Quote className="absolute right-8 top-8 opacity-10" size={120} />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <p className="max-w-3xl text-2xl font-medium leading-snug text-[var(--ink)] sm:text-3xl">
                “{t.quote}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="grid h-14 w-14 place-items-center rounded-full font-bold text-white"
                  style={{ background: t.tint }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-[var(--ink-soft)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all ${idx === i ? 'w-8 bg-[var(--ink)]' : 'w-2 bg-[var(--line)]'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setI((i - 1 + data.length) % data.length)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-white hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setI((i + 1) % data.length)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-white hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
