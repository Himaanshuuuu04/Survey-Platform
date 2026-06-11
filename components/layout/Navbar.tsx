"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAudience } from './AudienceContext';
import { motion } from 'motion/react';
import { EGILogo } from './EGILogo';
import PillNav from './PillNav';

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

  const navItems = useMemo(() => [
    ...links.map((l) => ({
      label: l.label,
      href: l.to,
    })),
    audience === 'brands' ? {
      label: 'For Participants',
      href: '#participants',
      isActive: false,
      onClick: (e: React.MouseEvent<any>) => {
        e.preventDefault();
        setAudience('participants');
      },
    } : {
      label: 'For Brands',
      href: '#brands',
      isActive: false,
      onClick: (e: React.MouseEvent<any>) => {
        e.preventDefault();
        setAudience('brands');
      },
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ], [audience]);


  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={mounted ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
      className="sticky top-0 z-50 transition-all duration-300 w-full backdrop-blur-sm  shadow-[0_2px_20px_rgba(0,0,0,0.02)]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center">
        <PillNav
          logo="/logo.webp"
          logoAlt="EvoGlobalInsight Logo"
          items={navItems}
          activeHref={pathname}
          baseColor="#5C8EFF"
          pillColor="white"
          hoveredPillTextColor="white"
          pillTextColor="#0A0A0A"
          wrapperClassName="relative top-0 left-0 w-full md:w-auto md:left-auto flex items-center justify-between md:justify-center"
          className="w-full justify-between md:justify-center"
          initialLoadAnimation={true}
        />
      </div>
    </motion.header>
  );
}


