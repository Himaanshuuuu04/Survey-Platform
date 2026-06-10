import { motion } from 'motion/react';
import { Play, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[450px] lg:max-w-none">
      {/* Visual background glow behind card */}
      <div className="absolute -inset-4 rounded-[2.5rem] bg-[#0E6B63]/5 opacity-30 blur-2xl pointer-events-none" />

      {/* Main Video Testimonial Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.2rem] border border-zinc-100 bg-white p-2.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.16)] hover:translate-y-[-2px]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] bg-zinc-950">
          {/* Background image representing the client video still */}
          <Image
            src="/client-testimonial.png"
            alt="Client Testimonial Video Preview"
            fill
            sizes="(max-w-7xl) 520px, 100vw"
            priority
            className="object-cover object-center transition-transform duration-700 ease-out"
          />

          {/* Video Overlays */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 z-10 pointer-events-none">
            {/* Verified Respondent Tag */}
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm border border-emerald-400/20">
              <CheckCircle2 size={10} strokeWidth={3.5} />
              <span>Verified Respondent</span>
            </div>

            {/* Time Stamp overlay */}
            <div className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white/90">
              00:48 / 02:15
            </div>
          </div>

          {/* Center Glass Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-15">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#0E6B63] shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl"
              aria-label="Play testimonial video"
            >
              <Play size={22} fill="currentColor" className="ml-1" />
            </motion.button>
          </div>

          {/* Subtitle / Caption bar with soft glassmorphism overlay */}
          <div className="absolute inset-x-4 bottom-4 z-10">
            <div className="rounded-2xl border border-white/20 bg-white/40 backdrop-blur-md p-4 text-zinc-950 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-wider text-[#0E6B63] uppercase">
                  Sarah Jenkins
                </span>
                <span className="text-[9px] font-bold text-zinc-600 bg-white/80 border border-zinc-200/50 rounded px-2 py-0.5 uppercase tracking-widest">
                  VeloCare VP
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold leading-relaxed text-zinc-900">
                “With Pulselens, we marketed our survey to the exact audience and doubled our response rate in 48 hours.”
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
