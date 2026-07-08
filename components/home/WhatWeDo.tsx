"use client";

import { motion } from 'motion/react';
import { Reveal, SectionEyebrow, Container } from '../primitives';

interface CardItem {
  value: string;
  title: string;
  desc: string;
  type: 'dark' | 'blue' | 'white';
}

const items: CardItem[] = [
  {
    value: '1.8M+',
    title: 'Responses Generated',
    desc: 'Verified Respondent Network',
    type: 'dark'
  },
  {
    value: '500+',
    title: 'Campaigns Delivered',
    desc: 'Across Global Markets',
    type: 'blue'
  },
  {
    value: '92%',
    title: 'Completion Rate',
    desc: 'Industry Leading Engagement',
    type: 'white'
  },
  {
    value: '50+',
    title: 'Countries Reached',
    desc: 'Multi-Language Panels',
    type: 'dark'
  },
  {
    value: '99.7%',
    title: 'Fraud Detection Accuracy',
    desc: 'Verified Insights',
    type: 'blue'
  }
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-[#FAFAFA] overflow-visible relative py-10 sm:py-16">
      {/* Subtle background radial glow to create depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,132,255,0.03)_0%,transparent_70%)] pointer-events-none " />
      <Container>

      {/* Heading Area */}
      
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <Reveal>
          <SectionEyebrow>What we do</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.05} className="mt-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950 text-balance">
            Survey Solutions<br />
            That Turn Questions<br />
            Into <span className="font-fenwick text-[#111111] tracking-wide text-swoosh">Clear Answers</span>.
          </h2>
        </Reveal>
      </div>

      {/* Layered Overlapping Cards Composition */}
      <div className="relative z-20 flex flex-col items-center justify-center sm:flex-row sm:items-stretch max-w-6xl mx-auto px-4 pb-12 overflow-visible">
        {items.map((it, i) => {
          let cardStyle = '';
          let valueStyle = '';
          let titleStyle = '';
          let descStyle = '';
          let shadowColor = '';

          if (it.type === 'dark') {
            cardStyle = 'bg-[#111111] border border-zinc-800 text-white';
            valueStyle = 'text-white';
            titleStyle = 'text-zinc-400';
            descStyle = 'text-zinc-500';
            shadowColor = 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]';
          } else if (it.type === 'blue') {
            cardStyle = 'bg-gradient-to-br from-[#5B84FF] to-[#29D5FF] text-white border border-[#5B84FF]/25';
            valueStyle = 'text-white';
            titleStyle = 'text-blue-100';
            descStyle = 'text-blue-200';
            shadowColor = 'shadow-[0_25px_60px_-15px_rgba(91,132,255,0.25)]';
          } else {
            // White Center Card
            cardStyle = 'bg-white border border-zinc-200/90 text-zinc-950';
            valueStyle = 'text-zinc-950';
            titleStyle = 'text-zinc-500';
            descStyle = 'text-zinc-400';
            shadowColor = 'shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)]';
          }

          // Symmetrical z-index (Center card 3 is top-most)
          const zIndex = i === 2 ? 30 : (i === 1 || i === 3) ? 20 : 10;

          // Rotations for the overlapping fan-out composition
          const rotateAngle = i === 0 ? -8 : i === 1 ? -4 : i === 2 ? 0 : i === 3 ? 4 : 8;

          return (
            <motion.div
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 60, rotate: rotateAngle - 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotateAngle }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 15,
                delay: i * 0.08
              }}
              whileHover={{
                scale: 1.05,
                rotate: rotateAngle * 0.4,
                y: -14,
                zIndex: 40,
                transition: { type: 'spring', stiffness: 200, damping: 12 }
              }}
              style={{ zIndex }}
              className={`relative w-[230px] h-[290px] lg:w-[250px] lg:h-[310px] cursor-pointer transition-shadow duration-300 ${
                i > 0 ? '-mt-16 sm:mt-0 sm:ml-[-24px] lg:ml-[-32px]' : ''
              }`}
            >
              {/* Floating animation wrapper */}
              <div
                className={`w-full h-full flex flex-col justify-between p-6 lg:p-7 rounded-2xl will-change-transform ${shadowColor} ${cardStyle}`}
                style={{
                  '--float-y': '-10px',
                  animation: `float ${4.5 + i * 0.7}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                } as React.CSSProperties}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div 
                    className={`h-1.5 w-6 rounded-full ${
                      it.type === 'dark' ? 'bg-zinc-700' : it.type === 'blue' ? 'bg-blue-100/40' : 'bg-zinc-200'
                    }`} 
                  />
                  <div className={`text-[8.5px] font-black uppercase tracking-widest ${
                    it.type === 'dark' ? 'text-zinc-600' : it.type === 'blue' ? 'text-blue-100/40' : 'text-zinc-300'
                  }`}>
                    EGI OUTCOME
                  </div>
                </div>

                {/* Center Content: Stat Value & Label */}
                <div className="my-auto">
                  <div className={`text-4xl lg:text-5xl font-[950] tracking-tighter leading-none ${valueStyle}`}>
                    {it.value}
                  </div>
                  <div className={`text-xs lg:text-sm font-extrabold uppercase tracking-widest mt-3 leading-snug ${titleStyle}`}>
                    {it.title}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="border-t border-current/10 pt-4 mt-auto">
                  <div className={`text-[10px] lg:text-[11px] font-bold tracking-normal ${descStyle}`}>
                    {it.desc}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      </Container>
    </section>
  );
}
