import { Container, Counter, Reveal } from '../primitives';

const stats = [
  { value: 50, suffix: '+', label: 'Countries Covered' },
  { value: 5_000_000, suffix: '+', label: 'Survey Responses' },
  { value: 100, suffix: '+', label: 'Research Projects' },
  { value: 95, suffix: '%', label: 'Client Retention' },
];

export function TrustMetrics() {
  return (
    <div className="relative -mt-10">
      <Container>
        <div className="glass grid grid-cols-2 gap-4 rounded-3xl p-6 sm:grid-cols-4 sm:p-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--ink)' }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
