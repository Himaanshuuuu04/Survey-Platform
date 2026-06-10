import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Container } from '../primitives';
import { EGILogo } from './EGILogo';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--line)]" style={{ background: 'var(--bg-soft)' }}>
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="group flex items-center">
              <EGILogo size={56} />
            </Link>
            <p className="mt-4 max-w-sm text-sm">
              Global market research and audience intelligence helping brands decide with confidence.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--ink-soft)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', items: ['Services', 'Industries', 'Case Studies', 'Insights'] },
            { title: 'Company', items: ['About', 'Careers', 'Press', 'Contact'] },
            { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'GDPR'] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">{col.title}</div>
              <ul className="mt-4 space-y-3 text-sm">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)]">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:flex-row">
          <span>© 2026 EvoGlobalInsight, Inc. All rights reserved.</span>
          <span>Made with care for better decisions.</span>
        </div>
      </Container>
    </footer>
  );
}
