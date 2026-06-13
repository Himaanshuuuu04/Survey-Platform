"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Play, ArrowRight } from "lucide-react";

export function StoryScrollSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const words = ["INSIGHT", "DATA", "AUDIENCE", "RESEARCH", "GROWTH"];
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!triggerRef.current || !pinRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop & large tablet: Full pinning animation
      // Set initial states
      gsap.set(wordRefs.current[0], { scale: 1.2, opacity: 0, y: 50 });
      gsap.set(wordRefs.current.slice(1), { opacity: 0, y: 100 });
      
      gsap.set(headlineRef.current, { opacity: 0, y: 40 });
      gsap.set(columnsRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: pinRef.current,
        },
      });

      // 1. Initial Entry
      tl.to(wordRefs.current[0], { scale: 1, opacity: 1, y: 0, duration: 2 }, 0)
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 2 }, 0)
        .to(columnsRef.current, { opacity: 1, y: 0, duration: 2 }, 0.5)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 2 }, 0);

      // Provide a brief pause to read
      tl.to({}, { duration: 1 });

      // 2. Transitions through words
      for (let i = 1; i < words.length; i++) {
        tl.to(wordRefs.current[i - 1], { opacity: 0, y: -100, duration: 1.5 }, `stage${i}`)
          .to(wordRefs.current[i], { opacity: 1, y: 0, duration: 1.5 }, `stage${i}`);
        
        // Pause after each transition
        tl.to({}, { duration: 1 });
      }

      // 3. Final State with GROWTH
      tl.to(wordRefs.current[words.length - 1], { scale: 1.1, opacity: 1, duration: 2 }, "final")
        .to(headlineRef.current, { scale: 0.95, duration: 2 }, "final");
        
      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile & tablet: simplified scroll without pinning, stagger items on entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
        },
      });
      
      tl.from(headlineRef.current, { y: 40, opacity: 0, duration: 0.8 })
        .from(
          ".mobile-word",
          {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(columnsRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
        
      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert(); // clean up matchMedia
    };
  }, []);

  return (
    <div ref={triggerRef} className="w-full ">
      <section 
        ref={pinRef} 
        className="relative bg-white text-[#050505] min-h-screen lg:h-screen w-full overflow-hidden font-sans flex items-center py-16 lg:py-24 bg-[var(--bg-soft)] text-[var(--ink)] relative overflow-hidden" 
        id="industries"
      >
        {/* Main Content Layout */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-[80px] xl:px-[120px] flex flex-col items-center justify-center text-center gap-6 h-full">
          
          {/* Editorial Content */}
          <div className="w-full flex flex-col items-center justify-center">
            <h2 
              ref={headlineRef}
              className="font-[900] leading-[1.05] tracking-tight whitespace-pre-wrap text-[#050505]"
              style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
            >
              {`Real opinions.\nReal consumers.\nReal market intelligence.`}
            </h2>

            {/* DESKTOP WORDS */}
            <div className="hidden lg:flex relative w-full my-12 md:my-16 lg:h-[200px] items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              {words.map((word, index) => (
                <span
                  key={word}
                  ref={(el) => {
                    wordRefs.current[index] = el;
                  }}
                  className="absolute font-black uppercase bg-gradient-to-br from-[#3b82f6] to-[#02e8f8] bg-clip-text text-transparent tracking-tighter text-center w-full"
                  style={{ 
                    fontSize: "clamp(80px, 13vw, 180px)",
                    lineHeight: 1,
                    opacity: index === 0 ? 1 : 0, // default visible class for GSAP to manipulate
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* MOBILE WORDS */}
            <div className="flex lg:hidden flex-col items-center gap-3 my-10 pointer-events-none select-none z-0">
              {words.map((word) => (
                <span
                  key={word}
                  className="mobile-word font-black uppercase bg-gradient-to-br from-[#3b82f6] to-[#02e8f8] bg-clip-text text-transparent tracking-tight"
                  style={{
                    fontSize: "clamp(40px, 12vw, 72px)",
                    lineHeight: 1,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            <div ref={columnsRef} className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-6 lg:mt-8">
              <p className="text-lg lg:text-[15px] leading-relaxed text-[#525252] sm:w-1/2 font-medium">
                We connect brands with verified consumers to gather authentic feedback, uncover buying behavior, and validate business decisions with confidence.
              </p>
              <p className="text-lg lg:text-[15px] leading-relaxed text-[#525252] sm:w-1/2 font-medium">
                Our research methodology combines targeted audiences, advanced screening, and actionable insights to help organizations make smarter strategic decisions.
              </p>
            </div>

            <div ref={ctaRef} className="mt-8 lg:mt-12">
              <button className="group relative inline-flex items-center gap-4 text-xl lg:text-2xl hover:tracking-wide transition-all duration-500 py-2 rounded-full p-4 border-1 border-black text-black hover:bg-gradient-to-br from-[#3b82f6] to-[#02e8f8] ">
                Start Your Research 
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-3 w-6 h-6 lg:w-8 lg:h-8" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
