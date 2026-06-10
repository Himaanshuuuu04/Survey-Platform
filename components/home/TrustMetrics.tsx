import { ShieldCheck, Lock, Award, Star, BadgeCheck, Globe2 } from 'lucide-react';
import { Container, Reveal } from '../primitives';

const badges = [
  { icon: ShieldCheck, label: 'ISO 27001', sub: 'Certified' },
  { icon: Lock, label: 'GDPR', sub: 'Compliant' },
  { icon: Award, label: 'ESOMAR', sub: 'Member' },
  { icon: Star, label: 'Clutch', sub: 'Top 10 Firm' },
  { icon: BadgeCheck, label: 'SOC 2', sub: 'Type II' },
  { icon: Globe2, label: '50+ Countries', sub: 'Global Reach' },
];

export function TrustMetrics() {
  return (
    <div className="border-t border-[var(--line)] py-10 sm:py-14" style={{ background: 'var(--bg-soft)' }}>
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5 opacity-60 transition-opacity hover:opacity-100">
                <b.icon size={22} strokeWidth={1.5} className="text-[var(--ink-soft)]" />
                <div>
                  <div className="text-sm font-bold uppercase tracking-wide text-[var(--ink)]">{b.label}</div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
