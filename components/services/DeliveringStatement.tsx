"use client";

import { motion } from 'motion/react';

export function DeliveringStatement() {
  const line1 = Array.from("WHAT WE");
  const line2 = Array.from("DELIVER.");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-down-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .float-letter-odd {
          animation: float-up-down 2.8s ease-in-out infinite;
        }
        .float-letter-even {
          animation: float-down-up 2.8s ease-in-out infinite;
        }
      `}} />
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03,
            }
          }
        }}
        className="text-[14.5vw] sm:text-[11.5vw] lg:text-[10vw] font-[1000] tracking-tighter uppercase leading-[0.9] text-center select-none font-sans flex flex-col items-center justify-center py-6"
      >
        <div className="flex justify-center items-center gap-[0.03em] text-zinc-950">
          {line1.map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: 45, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -5 }}
              className="inline-block origin-bottom cursor-default hover:text-[#5B84FF] transition-colors duration-200"
            >
              {letter === " " ? (
                "\u00A0"
              ) : (
                <span 
                  className={`inline-block ${index % 2 === 0 ? 'float-letter-even' : 'float-letter-odd'}`}
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {letter}
                </span>
              )}
            </motion.span>
          ))}
        </div>
        <div className="flex justify-center items-center gap-[0.03em] font-fenwick text-[#111111] tracking-wide mt-2">
          {line2.map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: 45, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -5 }}
              className="inline-block origin-bottom cursor-default hover:text-[#5B84FF] transition-colors duration-200"
            >
              {letter === " " ? (
                "\u00A0"
              ) : (
                <span 
                  className={`inline-block ${index % 2 === 0 ? 'float-letter-even' : 'float-letter-odd'}`}
                  style={{ animationDelay: `${(index + line1.length) * 0.12}s` }}
                >
                  {letter}
                </span>
              )}
            </motion.span>
          ))}
        </div>
      </motion.h2>
    </>
  );
}
