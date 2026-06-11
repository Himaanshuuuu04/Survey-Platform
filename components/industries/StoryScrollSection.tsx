"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Play, ArrowRight } from "lucide-react";

export function StoryScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const words = ["INSIGHT", "DATA", "AUDIENCE", "RESEARCH", "GROWTH"];
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

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
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Initial Entry
      tl.to(wordRefs.current[0], { scale: 1, opacity: 0.05, y: 0, duration: 2 }, 0)
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 2 }, 0)
        .to(columnsRef.current, { opacity: 1, y: 0, duration: 2 }, 0.5)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 2 }, 0);

      // Provide a brief pause to read
      tl.to({}, { duration: 1 });

      // 2. Transitions through words
      for (let i = 1; i < words.length; i++) {
        tl.to(wordRefs.current[i - 1], { opacity: 0, y: -100, duration: 1.5 }, `stage${i}`)
          .to(wordRefs.current[i], { opacity: 0.05, y: 0, duration: 1.5 }, `stage${i}`);
        
        // Pause after each transition
        tl.to({}, { duration: 1 });
      }

      // 3. Final State with GROWTH
      tl.to(wordRefs.current[words.length - 1], { scale: 1.1, opacity: 0.05, duration: 2 }, "final")
        .to(headlineRef.current, { scale: 0.95, duration: 2 }, "final");
        
      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile & small tablet: simplified scroll without pinning
      gsap.set(wordRefs.current[0], { opacity: 0.05, scale: 1 });
      gsap.set(wordRefs.current.slice(1), { opacity: 0 }); // Hide other words
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: true,
        },
      });
      
      tl.from(headlineRef.current, { y: 30, opacity: 0, duration: 1 })
        .from(columnsRef.current, { y: 20, opacity: 0, duration: 1 }, "-=0.5")
        .from(ctaRef.current, { opacity: 0, duration: 1 });
        
      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert(); // clean up matchMedia
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#FFFFFF] text-[#050505] h-full w-full overflow-hidden font-sans flex items-center py-24"
    >
      {/* Background Giant Words */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        {words.map((word, index) => (
          <span
            key={word}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="absolute font-black uppercase text-[#050505] tracking-tighter text-center w-full"
            style={{ 
              fontSize: "clamp(100px, 20vw, 280px)",
              lineHeight: 1,
              opacity: index === 0 ? 0.05 : 0, // default visible class for GSAP to manipulate
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-[80px] xl:px-[120px] flex flex-col items-center justify-center text-center gap-12 h-full">
        
        {/* Right Side: Editorial Content */}
        <div className="w-full flex flex-col items-center justify-center">
          <h2 
            ref={headlineRef}
            className="font-[900] leading-[0.9] tracking-tight whitespace-pre-wrap text-[#050505]"
            style={{ fontSize: "clamp(50px, 8vw, 100px) " }}
          >
            {`Real opinions.\nReal consumers.\nReal market intelligence.`}
          </h2>

          <div ref={columnsRef} className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-12 lg:mt-20">
            <p className="text-lg lg:text-[22px] leading-relaxed text-[#525252] sm:w-1/2 font-medium">
              We connect brands with verified consumers to gather authentic feedback, uncover buying behavior, and validate business decisions with confidence.
            </p>
            <p className="text-lg lg:text-[22px] leading-relaxed text-[#525252] sm:w-1/2 font-medium">
              Our research methodology combines targeted audiences, advanced screening, and actionable insights to help organizations make smarter strategic decisions.
            </p>
          </div>

          <div ref={ctaRef} className="mt-12 lg:mt-20">
            <button className="group relative inline-flex items-center gap-4 text-xl lg:text-2xl font-bold hover:tracking-wide transition-all duration-500 py-2 text-[#050505]">
              Start Your Research 
              <ArrowRight className="transition-transform duration-500 group-hover:translate-x-3 w-6 h-6 lg:w-8 lg:h-8" />
              <div className="absolute bottom-0 left-0 h-[2px] bg-[#5A31FF] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
