"use client";

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Container } from '../primitives';
import { EGILogo } from './EGILogo';

function LinkedinIcon({ size = 24, ...props }: React.ComponentProps<'svg'> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#05070F] text-zinc-400 border-t border-zinc-800/80 relative overflow-hidden z-10">
      {/* Soft blue glow behind the footer content */}
      <div className="absolute left-1/4 bottom-0 w-[500px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(92,142,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <Container className="pt-10 pb-8 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          
          {/* LEFT COLUMN: Brand */}
          <div className="flex flex-col text-left">
            <Link href="/" className="group inline-flex filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300 self-start">
              <EGILogo size={24} />
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-zinc-400 font-medium">
              Global market research and audience intelligence helping brands make confident decisions.
            </p>
            {/* Social Links */}
            <div className="mt-5 flex gap-3">
              {[
                { Icon: LinkedinIcon, href: '#' },
                { Icon: Mail, href: 'mailto:hello@evoglobalinsight.com' }
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  className="grid h-8.5 w-8.5 place-items-center rounded-lg border border-zinc-800 bg-[#080C1B] text-zinc-400 transition-all duration-300 hover:border-[#5C8EFF] hover:text-white hover:-translate-y-0.5"
                >
                  <soc.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: PRODUCT */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">Product</div>
            <ul className="mt-5 space-y-2.5 text-xs">
              {[
                { label: 'Services', href: '/services' },
                { label: 'Industries', href: '/industries' },
                { label: 'Insights', href: '/insights' }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER RIGHT: COMPANY */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">Company</div>
            <ul className="mt-5 space-y-2.5 text-xs">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '#' }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: CONTACT */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">Contact</div>
            <ul className="mt-5 space-y-2.5 text-xs">
              <li>
                <a href="mailto:hello@evoglobalinsight.com" className="hover:text-white transition-colors duration-200 block break-all font-medium">
                  hello@evoglobalinsight.com
                </a>
              </li>
              <li className="text-zinc-400">
                +91 XXXXX XXXXX
              </li>
              <li className="text-zinc-400">
                India
              </li>
            </ul>
          </div>

        </div>

        {/* Thin Trust Row - Below footer columns */}
        <div className="mt-10 py-3 border-y border-zinc-900/60 flex flex-wrap items-center justify-between gap-4 text-xs relative z-10">
          {[
            { val: '250K+', label: 'Responses Generated' },
            { val: '500+', label: 'Campaigns Delivered' },
            { val: '50+', label: 'Countries Reached' },
            { val: '99.7%', label: 'Fraud Detection Accuracy' }
          ].map((m, idx) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="font-extrabold text-[#5C8EFF] text-xs leading-none">{m.val}</span>
              <span className="text-zinc-500 font-bold tracking-wider text-[8.5px] uppercase leading-none">{m.label}</span>
              {idx < 3 && <span className="hidden md:inline text-zinc-850 ml-2">|</span>}
            </div>
          ))}
        </div>

        {/* Bottom copyright row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-[10px] text-zinc-500 sm:flex-row">
          <span>© 2026 EvoGlobalInsight</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>

      </Container>
    </footer>
  );
}
