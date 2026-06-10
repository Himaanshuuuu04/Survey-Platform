"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAudience } from './AudienceContext';

const BRAND = '#115E59';

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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg text-white text-sm font-black"
              style={{ background: BRAND }}
            >
              P
            </div>
            <span className="text-lg font-extrabold tracking-tight">Pulselens</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const isActive = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors ${isActive
                    ? 'text-[#0A0A0A] font-semibold'
                    : 'text-[#525252] hover:text-[#0A0A0A]'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex rounded-full border border-[#E5E7EB] p-0.5 text-xs font-semibold">
              {(['brands', 'participants'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`rounded-full px-3.5 py-1.5 transition-all duration-200 ${audience === a
                    ? 'text-white shadow-sm'
                    : 'text-[#525252] hover:text-[#0A0A0A]'
                  }`}
                  style={audience === a ? { background: BRAND } : {}}
                >
                  {a === 'brands' ? 'For Brands' : 'For Participants'}
                </button>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300"
              style={{ background: BRAND }}
            >
              Contact
            </Link>
          </div>

          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#E5E7EB] pb-5 lg:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {links.map((l) => {
                const isActive = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                      ? 'font-semibold text-[#0A0A0A]'
                      : 'text-[#525252] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="mt-3 flex rounded-full border border-[#E5E7EB] p-0.5 text-xs font-semibold">
                {(['brands', 'participants'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`flex-1 rounded-full px-3 py-1.5 ${audience === a ? 'text-white' : 'text-[#525252]'}`}
                    style={audience === a ? { background: BRAND } : {}}
                  >
                    {a === 'brands' ? 'Brands' : 'Participants'}
                  </button>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: BRAND }}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
