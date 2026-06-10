"use client";

import { ReactNode, ButtonHTMLAttributes, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, animate, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.95] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  size?: 'md' | 'lg';
};

export function Button({ children, variant = 'primary', href, size = 'md', className = '', ...rest }: BtnProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform';
  const sizes = size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm';
  const styles =
    variant === 'primary'
      ? 'text-white shadow-[0_10px_30px_-10px_var(--brand)] hover:translate-y-[-2px] hover:shadow-[0_18px_40px_-12px_var(--brand)]'
      : variant === 'outline'
      ? 'border border-[var(--line)] bg-white hover:border-[var(--brand)] hover:text-[var(--brand)]'
      : 'hover:bg-[var(--brand-soft)]';
  const style = variant === 'primary' ? { background: 'var(--brand)' } : {};
  const content = (
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  );
  if (href) {
    return (
      <Link href={href} className={`${base} ${sizes} ${styles} ${className}`} style={style as any}>
        {content}
      </Link>
    );
  }
  return (
    <button className={`${base} ${sizes} ${styles} ${className}`} style={style as any} {...rest}>
      {content}
    </button>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 24px 60px -20px rgba(61,90,254,0.25)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`glass rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatNumber(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, suffix, duration, mv]);
  return <span ref={ref}>0{suffix}</span>;
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + 'M';
  if (n >= 1_000) return Math.round(n / 100) / 10 + 'K';
  return Math.round(n).toString();
}

export function GradientBlob({ className = '', from = 'var(--brand)', to = 'var(--accent)' }: { className?: string; from?: string; to?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-50 ${className}`}
      style={{ background: `radial-gradient(circle at 30% 30%, ${from}, transparent 60%), radial-gradient(circle at 70% 70%, ${to}, transparent 60%)` }}
    />
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[var(--ink-soft)]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
      {children}
    </div>
  );
}

export function TimelineProgress({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 80%', 'end 30%'] });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div className="relative h-1.5 w-full rounded-full bg-[var(--line)]">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width, background: 'linear-gradient(90deg, var(--brand), var(--accent))' }}
      />
    </div>
  );
}
