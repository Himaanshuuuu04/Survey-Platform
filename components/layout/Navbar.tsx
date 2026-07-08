"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAudience } from './AudienceContext';
import { motion, AnimatePresence } from 'motion/react';
import { EGILogo } from './EGILogo';
import { StaggeredMenu } from '../StaggeredMenu';

const BRAND = '#5C8EFF';

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
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const isDarkPage = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/user-dashboard");
    if (isDarkPage) {
      document.body.style.backgroundColor = "#09090b";
      document.body.style.backgroundImage = "none";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.backgroundImage = "radial-gradient(#E4E4E7 1.2px, transparent 1.2px)";
    }
  }, [pathname]);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Industries', ariaLabel: 'Learn about our industries', link: '/industries' },
    { label: 'Case Studies', ariaLabel: 'View our case studies', link: '/case-studies' },
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
        initial={{ opacity: 0, y: -15 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        className="sticky top-0 z-50 w-full pointer-events-none hidden lg:block"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div
            className={`relative mx-auto flex items-center justify-between px-4 xl:px-6 py-1 pointer-events-auto rounded-full border border-zinc-200 dark:border-zinc-800/60 bg-white/45 dark:bg-zinc-950/45 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.5)] max-w-7xl transition-all duration-300`}
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2 relative z-10 transition-transform duration-300 hover:scale-102">
              <EGILogo size={36} iconOnly={true} /> 
              <span className="font-sans text-sm xl:text-lg font-lg tracking-tight text-zinc-950 dark:text-white select-none whitespace-nowrap">
                Evo<span className="text-brand uppercase">Global</span>Insight
              </span>
            </Link>

            {/* Desktop nav with active sliding glass pill and cursor tracking */}
            <nav className="relative z-10 flex items-center gap-0.5 xl:gap-1.5">
              {links.map((l) => {
                const isActive = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
                return (
                  <div
                    key={l.to}
                    className="relative py-1 flex items-center justify-center cursor-pointer group"
                  >
                    <Link
                      href={l.to}
                      className={`relative z-10 px-2.5 xl:px-4.5 py-1 text-[11px] xl:text-xs font-semibold tracking-wider transition-colors duration-300 ${
                        isActive
                          ? 'text-zinc-950 dark:text-white font-bold'
                          : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                      }`}
                    >
                      {l.label}
                    </Link>

                    {/* Active Navigation Glass Pill (Slides dynamically) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-zinc-850 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)] backdrop-blur-sm z-0 "
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                       
                      />
                    )}

                    {/* Hover Navigation cursor tracker (Fade-in CSS capsule, completely lag-free) */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-full bg-zinc-950/5 dark:bg-white/5 border border-zinc-950/5 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-0" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA (Portal Button + Contact Button) */}
            <div className="relative z-10 flex items-center gap-2 xl:gap-4.5">
              <Link
                href="/login"
                className="px-2.5 xl:px-4 py-1.5 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-[#5C8EFF] transition-colors border border-zinc-200 dark:border-zinc-800 rounded-full bg-white/50 dark:bg-zinc-900/50 hover:border-[#5C8EFF]/30 backdrop-blur-sm shadow-xs whitespace-nowrap"
              >
                Participant Portal
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] px-3 xl:px-4.5 py-1.5 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(92,142,255,0.25)] hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(92,142,255,0.4)] transition-all duration-300 whitespace-nowrap"
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
          colors={['#0A0A0A', 'var(--brand)']}
          logo={
            <Link href="/" className="flex items-center gap-2 select-none pointer-events-auto">
              <EGILogo size={32} iconOnly={true} />
              <span className="font-sans text-lg font-black tracking-tight text-zinc-950 dark:text-white">
                Evo<span className="text-brand uppercase">Global</span>Insight
              </span>
            </Link>
          }
          accentColor="var(--brand)"
          isFixed={true}
          audienceContent={
            <Link
              href="/login"
              className="flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2.5 text-xs font-bold uppercase tracking-wider w-full text-center text-zinc-800 shadow-xs"
            >
              Participant Portal
            </Link>
          }
        />
      </div>

      {/* Mobile Spacer to prevent overlap by the fixed menu */}
      <div className="h-[84px] lg:hidden" />
    </>
  );
}
