"use client";

import { Quote, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Reveal, Section, SectionEyebrow } from '../primitives';
import { motion } from 'motion/react';

const cases = [
  {
    company: "Lumen Audio",
    objective: "Global Product Launch Validation",
    metricValue: "92%",
    metricLabel: "Completion Rate",
    subMetric: "48,291 Responses Generated",
    quote: "EvoGlobalInsight delivered insights in two weeks that would have taken our internal team a quarter. The launch hit number one in its category.",
    name: "Amelia Chen",
    role: "VP Product, Lumen Audio",
    initials: "AC",
    themeColor: "#5C8EFF",
    visualType: "progress"
  },
  {
    company: "Northstar Bank",
    objective: "B2B Financial Sentiment Tracking",
    metricValue: "99.7%",
    metricLabel: "Fraud Detection Accuracy",
    subMetric: "50+ Countries Reached",
    quote: "The most rigorous panel I've worked with in 15 years. Their methodology team doesn't just hand off data — they help us decide.",
    name: "Marcus Doyle",
    role: "Head of Insights, Northstar Bank",
    initials: "MD",
    themeColor: "#02E8F8",
    visualType: "network"
  },
  {
    company: "Brightleaf Health",
    objective: "Healthcare Tracker Consolidation",
    metricValue: "60%",
    metricLabel: "Vendor Cost Reduction",
    subMetric: "250K+ Monthly Responses",
    quote: "We replaced four vendors with EvoGlobalInsight. Faster, cleaner data, and a partner that actually understands our category.",
    name: "Priya Raman",
    role: "CMO, Brightleaf Health",
    initials: "PR",
    themeColor: "#5C8EFF",
    visualType: "bar"
  }
];

export function Testimonials() {
  return (
    <Section id="research-impact" className="border-t border-[#E5E7EB] bg-[#F8FAFA]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Headings, Label and Supporting Copy */}
        <div className="lg:sticky lg:top-28 text-left">
          <Reveal>
            <SectionEyebrow>Research Impact</SectionEyebrow>
          </Reveal>
          
          <Reveal delay={0.05} className="mt-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[2.75rem] font-[1000] tracking-tight uppercase leading-[1.05] text-zinc-950">
              Data-Driven Proof.<br />
              <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                Verified Results.
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.10} className="mt-6">
            <p className="text-zinc-500 text-sm sm:text-base font-medium leading-relaxed max-w-md">
              We help ambitious research leaders reach global audiences, consolidate vendor costs, and collect clean survey data with maximum methodology support.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#5C8EFF]">
              <span className="flex h-2 w-2 rounded-full bg-[#02E8F8] animate-pulse" />
              Outcome-Based Case Studies
            </div>
          </Reveal>
        </div>

        {/* RIGHT COLUMN: Outcome Cards */}
        <div className="flex flex-col gap-6">
          {cases.map((c, idx) => (
            <Reveal key={c.company} delay={idx * 0.08}>
              <div className="relative group bg-white border border-zinc-200/80 rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(92,142,255,0.06)] hover:border-zinc-300 hover:-translate-y-1 flex flex-col sm:flex-row gap-6 sm:items-center justify-between overflow-hidden">
                
                {/* Accent Top Lip on Hover */}
                <div 
                  className="absolute top-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${c.themeColor}, #02E8F8)`
                  }}
                />

                {/* Left Side of Card: Info, Quote, Persona */}
                <div className="flex-1 flex flex-col justify-between gap-5 text-left">
                  <div>
                    {/* Header: Company Name & Objective */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-widest uppercase text-zinc-400 font-sans">
                        {c.company}
                      </span>
                      <span className="text-[10px] font-bold text-[#5C8EFF] bg-blue-50/50 px-2.5 py-1 rounded-full border border-blue-100/50">
                        {c.objective}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="mt-4 text-[13px] sm:text-[14px] text-zinc-600 font-medium leading-relaxed italic relative pl-4 border-l-2 border-zinc-100 group-hover:border-[#5C8EFF]/30 transition-colors duration-300">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                  </div>

                  {/* Person Details */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="grid h-8 w-8 place-items-center rounded-full font-bold text-white text-[11px]"
                      style={{
                        background: `linear-gradient(135deg, ${c.themeColor} 0%, #3B82F6 100%)`
                      }}
                    >
                      {c.initials}
                    </div>
                    <div>
                      <h4 className="text-[12px] font-extrabold text-zinc-900 leading-tight">
                        {c.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-bold leading-tight uppercase tracking-wider">
                        {c.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side of Card: Visual Metric Widget */}
                <div 
                  className="w-full sm:w-[170px] flex sm:flex-col items-center justify-between sm:justify-center p-5 rounded-2xl bg-zinc-50 border border-zinc-100/80 group-hover:bg-white group-hover:border-zinc-200 transition-colors duration-300 gap-4"
                >
                  {/* Dynamic Custom SVG Visual */}
                  <div className="flex items-center justify-center">
                    {c.visualType === "progress" && (
                      <div className="relative flex items-center justify-center">
                        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-zinc-200/60"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 0.92 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="text-[#5C8EFF]"
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-black text-zinc-800 tracking-tight">92%</span>
                      </div>
                    )}

                    {c.visualType === "network" && (
                      <svg className="w-14 h-14" viewBox="0 0 40 40" fill="none">
                        {/* Connected lines */}
                        <motion.line
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.1 }}
                          x1="8" y1="8" x2="32" y2="8" stroke="#5C8EFF" strokeWidth="1.2" opacity="0.3"
                        />
                        <motion.line
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 }}
                          x1="32" y1="8" x2="32" y2="32" stroke="#02E8F8" strokeWidth="1.2" opacity="0.3"
                        />
                        <motion.line
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                          x1="32" y1="32" x2="8" y2="32" stroke="#5C8EFF" strokeWidth="1.2" opacity="0.3"
                        />
                        <motion.line
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.4 }}
                          x1="8" y1="32" x2="8" y2="8" stroke="#02E8F8" strokeWidth="1.2" opacity="0.3"
                        />
                        <motion.line
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.5 }}
                          x1="8" y1="8" x2="32" y2="32" stroke="#02E8F8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"
                        />
                        <motion.line
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.6 }}
                          x1="32" y1="8" x2="8" y2="32" stroke="#5C8EFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"
                        />
                        {/* Node Dots */}
                        <circle cx="8" cy="8" r="3.5" fill="#5C8EFF" />
                        <circle cx="32" cy="8" r="3.5" fill="#02E8F8" />
                        <circle cx="32" cy="32" r="3.5" fill="#5C8EFF" />
                        <circle cx="8" cy="32" r="3.5" fill="#02E8F8" />
                        <circle cx="20" cy="20" r="4.5" fill="#FFFFFF" stroke="#5C8EFF" strokeWidth="1.5" />
                      </svg>
                    )}

                    {c.visualType === "bar" && (
                      <svg className="w-14 h-14" viewBox="0 0 40 40" fill="none">
                        {/* Axis */}
                        <line x1="8" y1="32" x2="34" y2="32" stroke="#E2E8F0" strokeWidth="1.5" />
                        <line x1="8" y1="8" x2="8" y2="32" stroke="#E2E8F0" strokeWidth="1.5" />
                        
                        {/* Bar 1 (Standard cost reference) */}
                        <motion.rect
                          initial={{ height: 0, y: 32 }}
                          whileInView={{ height: 20, y: 12 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          x="13" y="12" width="6" height="20" rx="1.5" fill="#E2E8F0"
                        />
                        
                        {/* Bar 2 (60% reduced cost) */}
                        <motion.rect
                          initial={{ height: 0, y: 32 }}
                          whileInView={{ height: 8, y: 24 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          x="23" y="24" width="6" height="8" rx="1.5" fill="#5C8EFF"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Main Metric Text */}
                  <div className="text-right sm:text-center">
                    <span className="block text-2xl font-[1000] text-zinc-900 leading-none">
                      {c.metricValue}
                    </span>
                    <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none mt-1.5 whitespace-nowrap">
                      {c.metricLabel}
                    </span>
                    <span className="block text-[8.5px] font-semibold text-zinc-500 mt-2 whitespace-nowrap">
                      {c.subMetric}
                    </span>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </Section>
  );
}
