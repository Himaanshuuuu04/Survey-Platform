"use client";

import { Reveal, Counter } from '@/components/primitives';
import { AudienceRecruitmentPlayground } from './AudienceRecruitmentPlayground';
import { SurveyDistributionPlayground } from './SurveyDistributionPlayground';
import { DataValidationPlayground } from './DataValidationPlayground';
import { InsightDeliveryPlayground } from './InsightDeliveryPlayground';
import { DeliveringStatement } from './DeliveringStatement';
import { DecimalCounter } from './DecimalCounter';

export function CapabilitySection() {
  return (
    <section 
      className="bg-white border-b border-zinc-200 relative overflow-hidden py-24 sm:py-32" 
      id="services-capabilities"
    >
      {/* Subtle grid pattern overlay matching hero */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(92,142,255,0.02),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8">
        
        {/* Center Giant two-line Delivering Statement emerging from shade */}
        <div className="w-full relative overflow-hidden flex justify-center items-center py-4 select-none">
          <DeliveringStatement />
        </div>

        {/* Thin divider line */}
        <div className="h-[1px] bg-zinc-200/60 w-full mt-8 mb-12" />

        {/* Core Capability Panels */}
        <div className="space-y-20 sm:space-y-24">
          
          {/* Panel 01: Audience Recruitment */}
          <div className="relative z-10">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                <div className="lg:col-span-5 text-left flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4 w-fit">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                    01 — Audience Recruitment
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-[1000] uppercase tracking-tighter text-zinc-950 leading-[1.05]">
                    Precision target matching.
                  </h3>
                  <p className="mt-4 text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed max-w-md">
                    Access niche consumer panels, verified B2B decision makers, parents, students, healthcare workers, and custom profiles globally using granular demographic, firmographic, and behavioral selectors.
                  </p>

                  {/* Metrics grid */}
                  <div className="mt-8 pt-6 border-t border-zinc-200/50 grid grid-cols-3 gap-4">
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={250} suffix="K+" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Respondents</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={120} suffix="+" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Attributes</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={50} suffix="+" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Countries</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 relative">
                  <AudienceRecruitmentPlayground />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Panel 02: Survey Distribution */}
          <div className="relative z-10">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                <div className="lg:col-span-5 text-left flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4 w-fit">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                    02 — Survey Distribution
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-[1000] uppercase tracking-tighter text-zinc-950 leading-[1.05]">
                    Multi-route dynamic dispatch.
                  </h3>
                  <p className="mt-4 text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed max-w-md">
                    Deploy surveys across multiple digital channels dynamically. Our automated routing system dispatches API triggers, mobile intercepts, SMS alerts, and secure email campaigns in real-time.
                  </p>

                  {/* Metrics grid */}
                  <div className="mt-8 pt-6 border-t border-zinc-200/50 grid grid-cols-3 gap-4">
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={92} suffix="%" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Completion Rate</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={10} suffix="K+" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Daily Sends</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={4} />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Core Routes</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 relative">
                  <SurveyDistributionPlayground />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Panel 03: Data Validation */}
          <div className="relative z-10">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                <div className="lg:col-span-5 text-left flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4 w-fit">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                    03 — Data Validation
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-[1000] uppercase tracking-tighter text-zinc-950 leading-[1.05]">
                    Real-time quality shielding.
                  </h3>
                  <p className="mt-4 text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed max-w-md">
                    Neutralize fraudulent entries automatically. Our validator runs device fingerprint checks, geographical verification, behavior patterns, and timing logs to enforce a 99.7% data validation accuracy rate.
                  </p>

                  {/* Metrics grid */}
                  <div className="mt-8 pt-6 border-t border-zinc-200/50 grid grid-cols-3 gap-4">
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <DecimalCounter to={99.7} suffix="%" decimals={1} />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Accuracy Rate</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <DecimalCounter to={0.0} suffix="%" decimals={1} />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Duplicate Rate</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={10} suffix="ms" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Scan Speed</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 relative">
                  <DataValidationPlayground />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Panel 04: Insight Delivery */}
          <div className="relative z-10">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                <div className="lg:col-span-5 text-left flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4 w-fit">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                    04 — Insight Delivery
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-[1000] uppercase tracking-tighter text-zinc-950 leading-[1.05]">
                    Structured analysis readiness.
                  </h3>
                  <p className="mt-4 text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed max-w-md">
                    Receive research responses as clean, structured, and validated datasets. Our files integrate immediately into your analytics platforms and database pipelines, saving dozens of manual preparation hours.
                  </p>

                  {/* Metrics grid */}
                  <div className="mt-8 pt-6 border-t border-zinc-200/50 grid grid-cols-3 gap-4">
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <DecimalCounter to={1.6} suffix="M+" decimals={1} />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Synced Records</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">Real-Time</span>
                      <span className="block text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-0.5">Console Live</span>
                    </div>
                    <div>
                      <span className="block text-xl sm:text-2xl font-[1000] text-[#5B84FF] tracking-tight">
                        <Counter to={0} suffix="s" />
                      </span>
                      <span className="block text-[8px] font-black uppercase text-[#02E8F8] tracking-wider mt-0.5">Prep Time</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 relative">
                  <InsightDeliveryPlayground />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
