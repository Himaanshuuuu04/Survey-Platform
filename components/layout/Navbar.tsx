"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAudience } from './AudienceContext';
import { motion } from 'motion/react';
import { EGILogo } from './EGILogo';
import { StaggeredMenu } from '../StaggeredMenu';

const BRAND = '#5C8EFF';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/industries', label: 'Industries' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
];

export function Navbar() {
  const pathname = usePathname();
  const { audience, setAudience } = useAudience();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Industries', ariaLabel: 'Learn about our industries', link: '/industries' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Insights', ariaLabel: 'Read our insights', link: '/insights' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Email', link: 'mailto:hello@evoglobalinsight.com' }
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
        className={`sticky top-0 z-50 transition-all duration-300 w-full hidden lg:block ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <EGILogo size={52} />
            </Link>

            {/* Desktop nav with sliding cursor highlight */}
            <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHoveredLink(null)}>
              {links.map((l) => {
                const isActive = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
                return (
                  <div
                    key={l.to}
                    className="relative py-1"
                    onMouseEnter={() => setHoveredLink(l.to)}
                  >
                    <Link
                      href={l.to}
                      className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? 'text-[#0A0A0A] font-semibold'
                          : 'text-[#525252] hover:text-[#0A0A0A]'
                      }`}
                    >
                      {l.label}
                    </Link>
                    {hoveredLink === l.to && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded-full bg-zinc-100/50 z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop actions with smooth sliding toggle */}
            <div className="hidden items-center gap-5 lg:flex">
              <div className="relative flex rounded-full border border-zinc-200/80 bg-zinc-100/30 p-1 text-[11px] font-bold uppercase tracking-wider">
                {(['brands', 'participants'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`relative z-10 rounded-full px-4 py-1.5 transition-colors duration-300 ${
                      audience === a ? 'text-white shadow-sm' : 'text-zinc-650 hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="relative z-10">
                      {a === 'brands' ? 'For Brands' : 'For Participants'}
                    </span>
                    {audience === a && (
                      <motion.div
                        layoutId="audiencePill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: BRAND }}
                        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#5C8EFF] hover:scale-[1.02] shadow-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navbar (StaggeredMenu) */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#0A0A0A"
          openMenuButtonColor="#0A0A0A"
          changeMenuColorOnOpen={false}
          colors={['#0A0A0A', '#5C8EFF']}
          logo={<EGILogo size={52} />}
          accentColor="#5C8EFF"
          isFixed={true}
          audienceContent={
            <div className="flex rounded-full border border-zinc-200/80 bg-zinc-100/30 p-1 text-[11px] font-bold uppercase tracking-wider w-full">
              {(['brands', 'participants'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`flex-1 rounded-full px-3 py-1.5 transition-all duration-200 cursor-pointer ${
                    audience === a ? 'text-white shadow-sm' : 'text-zinc-650'
                  }`}
                  style={audience === a ? { background: BRAND } : {}}
                >
                  {a === 'brands' ? 'Brands' : 'Participants'}
                </button>
              ))}
            </div>
          }
        />
      </div>

      {/* Mobile Spacer to prevent overlap by the fixed menu */}
      <div className="h-[84px] lg:hidden" />
    </>
  );
}
