"use client";

import { useRef, useEffect } from 'react';
import { useInView, useMotionValue, animate } from 'motion/react';

export function DecimalCounter({ to, suffix = '', decimals = 0, duration = 1.6 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = v.toFixed(decimals) + suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, to, suffix, decimals, duration, mv]);

  return <span ref={ref}>0.0{suffix}</span>;
}
