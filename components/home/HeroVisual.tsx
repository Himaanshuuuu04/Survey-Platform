import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Image from 'next/image';

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
      {/* Main Video Testimonial Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-white p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.18)] transition-all hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.25)]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-zinc-900">
          {/* Background image representing the client video still */}
          <Image
            src="/client-testimonial.png"
            alt="Client Testimonial"
            fill
            sizes="(max-w-7xl) 500px, 100vw"
            priority
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Video Status Overlays */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10 pointer-events-none">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              LIVE TESTIMONIAL
            </div>

            {/* Time Stamp */}
            <div className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/90">
              00:48 / 02:15
            </div>
          </div>

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-15">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#115E59] shadow-lg transition-colors duration-300 hover:bg-white"
              aria-label="Play testimonial video"
            >
              <Play size={24} fill="currentColor" className="ml-1" />
            </motion.button>
          </div>

          {/* Subtitle / Caption bar */}
          <div className="absolute inset-x-4 bottom-4 z-10">
            <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-4 text-white">
              <p className="text-[11px] font-semibold tracking-wider text-teal-300 uppercase">
                Sarah Jenkins • VP of Brand at VeloCare
              </p>
              <p className="mt-1 text-[13px] font-medium leading-relaxed text-zinc-100 sm:text-sm">
                “With Pulselens, we marketed our survey to the exact target audience and doubled our response rate in 48 hours.”
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
