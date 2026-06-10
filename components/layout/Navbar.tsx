"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../primitives';
import { useAudience } from './AudienceContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/industries', label: 'Industries' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
];

export function Navbar() {
  const pathname = usePathname();
  const { audience, setAudience } = useAudience();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${scrolled ? 'glass' : ''}`}>
          <Link href="/" className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--accent))' }}
            >
              <Sparkles size={18} />
            </div>
            <span className="font-bold tracking-tight">Pulselens</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const isActive = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex rounded-full border border-[var(--line)] bg-white p-1 text-xs font-semibold">
              {(['brands', 'participants'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    audience === a ? 'text-white' : 'text-[var(--ink-soft)]'
                  }`}
                  style={audience === a ? { background: 'var(--brand)' } : {}}
                >
                  {a === 'brands' ? 'For Brands' : 'For Participants'}
                </button>
              ))}
            </div>
            <Button href="/contact" size="md">Get a Proposal</Button>
          </div>

          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => {
                const isActive = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'bg-[var(--brand-soft)] text-[var(--brand)]' : 'text-[var(--ink-soft)] hover:bg-[var(--brand-soft)]'
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex rounded-full border border-[var(--line)] bg-white p-1 text-xs font-semibold">
                {(['brands', 'participants'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`flex-1 rounded-full px-3 py-1.5 ${audience === a ? 'text-white' : 'text-[var(--ink-soft)]'}`}
                    style={audience === a ? { background: 'var(--brand)' } : {}}
                  >
                    {a === 'brands' ? 'Brands' : 'Participants'}
                  </button>
                ))}
              </div>
              <Button href="/contact" className="mt-3">Get a Proposal</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
