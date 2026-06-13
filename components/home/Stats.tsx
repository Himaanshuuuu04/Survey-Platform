"use client";
import { Container } from "../primitives";
import CountUp from "../CountUp";

export default function Stats() {
      return (
              <div className="w-full bg-gradient-to-br from-[#3b82f6] to-[#02e8f8] py-12 sm:py-16 z-20 mt-20 lg:mt-10">
                <Container>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 items-center text-center">
                    {[
                      { val: 250, suffix: 'K+', desc: 'Responses Generated' },
                      { val: 500, suffix: '+', desc: 'Campaigns Delivered' },
                      { val: 92, suffix: '%', desc: 'Completion Rate' },
                      { val: 99.7, suffix: '%', desc: 'Fraud Detection Accuracy' }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-[950] tracking-tight text-white leading-none inline-flex items-baseline justify-center">
                          <CountUp to={stat.val} duration={2} separator="," />
                          <span>{stat.suffix}</span>
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-blue-100/90 mt-3 leading-tight max-w-[150px]">
                          {stat.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
      )
}