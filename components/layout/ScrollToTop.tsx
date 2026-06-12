"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force immediate scroll to top on route change to prevent starting from mid-page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as any,
    });

    // Refresh ScrollTrigger to ensure all calculations are correct for the new page layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
