"use client";

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, animate } from 'motion/react';
import {
  Users, Send, ShieldCheck, CheckSquare, Globe, SlidersHorizontal,
  ArrowRight, Check, Activity, Sparkles, BarChart3, Database, Target,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { ServicesHero } from '@/components/services/ServicesHero';
import { Button, Reveal, Section, Container, Counter } from '@/components/primitives';
import { FinalCTA } from '@/components/home/FinalCTA';

// PLAYGROUND 1: AUDIENCE RECRUITMENT
function AudienceRecruitmentPlayground() {
  const floatingChips = [
    { text: "B2B Tech Buyers", x: "-35%", y: "-25%", delay: 0, color: "text-[#5B84FF] border-[#5B84FF]/20" },
    { text: "Healthcare Pro", x: "32%", y: "-35%", delay: 0.5, color: "text-[#2563EB] border-[#2563EB]/20" },
    { text: "SMB Owners", x: "-38%", y: "25%", delay: 1, color: "text-[#7C3AED] border-[#7C3AED]/20" },
    { text: "Active Parents", x: "35%", y: "20%", delay: 1.5, color: "text-[#02E8F8] border-[#02E8F8]/20" },
    { text: "Global Students", x: "2%", y: "-42%", delay: 2, color: "text-[#5B84FF] border-[#5B84FF]/20" },
    { text: "Niche Consumers", x: "-2%", y: "42%", delay: 2.5, color: "text-[#7C3AED] border-[#7C3AED]/20" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex items-center justify-center p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[14%] aspect-square rounded-full border border-dashed border-zinc-200" />
        <div className="w-[34%] aspect-square rounded-full border border-dashed border-zinc-200/80 absolute" />
        <div className="w-[58%] aspect-square rounded-full border border-dashed border-zinc-200/60 absolute" />
        <div className="w-[82%] aspect-square rounded-full border border-dashed border-zinc-200/40 absolute" />
      </div>

      {/* Crosshairs lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 to-transparent" />
        <div className="h-[85%] w-[1px] bg-gradient-to-b from-transparent via-zinc-200/80 to-transparent absolute" />
      </div>

      {/* Pulse radar scanner effect */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] aspect-square rounded-full bg-[conic-gradient(from_0deg,rgba(91,132,255,0.06),transparent_40%)] pointer-events-none origin-center"
      />

      {/* Target Center Node */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-5 rounded-full bg-[#5B84FF] flex items-center justify-center relative shadow-[0_0_15px_rgba(91,132,255,0.4)]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="absolute -inset-3 rounded-full border border-[#5B84FF]/30 animate-ping" />
        </motion.div>
      </div>

      {/* Floating demographic tag chips */}
      {floatingChips.map((chip, idx) => (
        <motion.div
          key={idx}
          style={{ x: chip.x, y: chip.y }}
          animate={{
            y: [`calc(${chip.y} - 8px)`, `calc(${chip.y} + 8px)`, `calc(${chip.y} - 8px)`],
            x: [`calc(${chip.x} - 6px)`, `calc(${chip.x} + 6px)`, `calc(${chip.x} - 6px)`]
          }}
          transition={{
            duration: 5 + idx,
            repeat: Infinity,
            delay: chip.delay,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.08, zIndex: 30 }}
          className={`absolute px-3.5 py-2 rounded-2xl border bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-2 transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(91,132,255,0.15)] select-none ${chip.color}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#02E8F8]" />
          {chip.text}
        </motion.div>
      ))}
    </div>
  );
}

// PLAYGROUND 2: SURVEY DISTRIBUTION
function SurveyDistributionPlayground() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex items-center justify-center p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,132,255,0.03),transparent_70%)] pointer-events-none" />

      {/* SVG Path lines for connections */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B84FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Connection curve lines */}
        <path d="M 200 150 Q 110 110 60 70" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 200 150 Q 290 110 340 70" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 200 150 Q 110 190 60 230" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 200 150 Q 290 190 340 230" stroke="url(#gradient1)" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Native animated flowing particles */}
        <circle r="4" fill="#02E8F8" filter="url(#glow)">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 200 150 Q 110 110 60 70" />
        </circle>
        <circle r="4" fill="#5B84FF" filter="url(#glow)">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 200 150 Q 290 110 340 70" />
        </circle>
        <circle r="4" fill="#5B84FF" filter="url(#glow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M 200 150 Q 110 190 60 230" />
        </circle>
        <circle r="4" fill="#02E8F8" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 200 150 Q 290 190 340 230" />
        </circle>
      </svg>

      {/* Central Hub Node */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ boxShadow: ["0 0 15px rgba(91,132,255,0.2)", "0 0 30px rgba(91,132,255,0.4)", "0 0 15px rgba(91,132,255,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center shadow-lg"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#02E8F8] animate-pulse absolute top-2 right-2" />
          <Send size={20} className="text-[#5B84FF]" />
          <span className="text-[7px] font-black uppercase text-zinc-400 tracking-wider mt-1.5">CORE</span>
        </motion.div>
      </div>

      {/* Channel Nodes */}
      <div className="absolute top-[35px] left-[20px] sm:left-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">Panel API</span>
          <span className="text-[7.5px] font-medium text-zinc-400">Direct integration</span>
          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Connected
          </span>
        </motion.div>
      </div>

      <div className="absolute top-[35px] right-[20px] sm:right-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">SMS Link</span>
          <span className="text-[7.5px] font-medium text-zinc-400">Mobile direct</span>
          <span className="text-[8px] font-bold text-[#5B84FF] bg-[#5B84FF]/5 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#02E8F8] animate-pulse" /> Active
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-[35px] left-[20px] sm:left-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">Email Send</span>
          <span className="text-[7.5px] font-medium text-zinc-400">Secure templates</span>
          <span className="text-[8px] font-bold text-[#5B84FF] bg-[#5B84FF]/5 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#02E8F8] animate-pulse" /> Transmitting
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-[35px] right-[20px] sm:right-[35px] z-10">
        <motion.div 
          whileHover={{ y: -2 }}
          className="px-3.5 py-2.5 bg-white border border-zinc-200/80 rounded-2xl flex flex-col items-start gap-0.5 text-left shadow-sm min-w-[110px]"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-950">Mobile App</span>
          <span className="text-[7.5px] font-medium text-zinc-400">In-app intercept</span>
          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Connected
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// PLAYGROUND 3: DATA VALIDATION
function DataValidationPlayground() {
  const [inflow, setInflow] = useState<Array<{ id: number; name: string; type: string; status: 'pending' | 'verified' | 'failed'; detail: string }>>([
    { id: 1, name: "Response #9821", type: "VPN Proxy Check", status: 'pending', detail: "Analyzing IP reputation..." },
    { id: 2, name: "Response #9822", type: "B2B Tech Cohort", status: 'verified', detail: "Valid fingerprint match" },
    { id: 3, name: "Response #9823", type: "Speedrunner Match", status: 'failed', detail: "Completed in 14s (threshold 120s)" },
    { id: 4, name: "Response #9824", type: "Healthcare Cohort", status: 'verified', detail: "Unique device record verified" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInflow(prev => {
        const next = [...prev];
        const first = next.shift()!;
        const newId = first.id + 4;
        const randomType = Math.random() > 0.5 
          ? (Math.random() > 0.5 ? "B2B Tech Cohort" : "Consumer Panel")
          : (Math.random() > 0.5 ? "VPN Proxy Check" : "Speedrunner Match");
        
        let status: 'pending' | 'verified' | 'failed' = 'pending';
        let detail = "Analyzing...";
        if (randomType.includes("Cohort") || randomType.includes("Panel")) {
          status = 'verified';
          detail = "Unique device record verified";
        } else if (randomType.includes("VPN")) {
          status = 'failed';
          detail = "Residential proxy mismatch";
        } else {
          status = 'failed';
          detail = "Completed in under 15 seconds";
        }

        const newItem = {
          id: newId,
          name: `Response #${newId + 9800}`,
          type: randomType,
          status,
          detail
        };
        return [...next, newItem];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex flex-col justify-between p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60 z-10">
        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Validation Shield Feed</span>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-mono">
          99.7% ACCURACY
        </span>
      </div>



      <div className="flex flex-col gap-2.5 relative z-10 flex-grow justify-center py-4 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {inflow.map((item, index) => {
            const isPending = index === 0;
            const isVerified = item.status === 'verified';
            const isFailed = item.status === 'failed';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ 
                  opacity: isPending ? 0.6 : (isFailed ? 0.35 : 1),
                  scale: isFailed ? 0.96 : 1,
                  y: 0,
                  borderColor: isPending ? "rgb(228,228,231)" : (isFailed ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)")
                }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-2.5 bg-white border rounded-xl flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <div className="flex flex-col text-left gap-0.5">
                  <span className="text-[9.5px] font-black uppercase tracking-wide text-zinc-900">{item.name}</span>
                  <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{item.type}</span>
                  <span className="text-[8px] font-semibold text-zinc-500">{item.detail}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isPending ? (
                    <span className="text-[8px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 font-sans">
                      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" /> Check
                    </span>
                  ) : isVerified ? (
                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 font-sans">
                      <Check size={8} strokeWidth={3} /> Verified
                    </span>
                  ) : (
                    <span className="text-[8px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 font-sans">
                      Discarded
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200/60 text-center z-10">
        <div>
          <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-wider">Device ID</span>
          <span className="text-[9px] font-bold text-zinc-800 font-mono">Fingerprint</span>
        </div>
        <div>
          <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-wider">Geographic</span>
          <span className="text-[9px] font-bold text-zinc-800 font-mono">Verified IP</span>
        </div>
        <div>
          <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-wider">Behavioral</span>
          <span className="text-[9px] font-bold text-zinc-800 font-mono">Keystroke</span>
        </div>
      </div>
    </div>
  );
}

// PLAYGROUND 4: INSIGHT DELIVERY
function InsightDeliveryPlayground() {
  const [activeTab, setActiveTab] = useState<'b2b' | 'consumers' | 'healthcare'>('b2b');

  const data = {
    b2b: [
      { label: "US Tech Leaders", value: 92, count: "480 completed" },
      { label: "EU IT Managers", value: 85, count: "390 completed" },
      { label: "APAC Developers", value: 78, count: "380 completed" }
    ],
    consumers: [
      { label: "Premium Shoppers", value: 95, count: "620 completed" },
      { label: "Active Parents", value: 88, count: "510 completed" },
      { label: "Suburban Families", value: 91, count: "550 completed" }
    ],
    healthcare: [
      { label: "Primary Care MDs", value: 86, count: "120 completed" },
      { label: "Clinical Specialists", value: 80, count: "95 completed" },
      { label: "Nursing Directors", value: 89, count: "140 completed" }
    ]
  };

  return (
    <div className="relative w-full aspect-[4/3] max-w-[550px] mx-auto bg-slate-50/40 rounded-3xl border border-zinc-200/50 overflow-hidden flex flex-col justify-between p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
      <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60 z-10">
        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Live Metrics Console</span>
        <div className="flex gap-1 bg-zinc-200/60 p-1 rounded-xl">
          {(['b2b', 'consumers', 'healthcare'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 rounded-lg text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-white text-zinc-900 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10 flex-grow justify-center py-4">
        {data[activeTab].map((item, idx) => (
          <div key={idx} className="flex flex-col text-left gap-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-zinc-700">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B84FF]" />
                {item.label}
              </span>
              <span className="font-mono text-zinc-900 text-[11px] font-black">{item.value}% Valid</span>
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="h-3 bg-zinc-100/90 rounded-full flex-grow overflow-hidden border border-zinc-200/40">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#5B84FF] to-[#02E8F8]"
                />
              </div>
              <span className="text-[9px] font-bold text-zinc-400 min-w-[70px] text-right font-mono uppercase tracking-tight">{item.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-zinc-200/60 text-center z-10">
        <div className="bg-white border border-zinc-100 rounded-2xl p-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.005)]">
          <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-tight">Total Sync</span>
          <span className="text-sm font-black text-zinc-950 font-mono tracking-tight">1.6M+</span>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.005)]">
          <span className="block text-[8px] font-black text-[#5B84FF] uppercase tracking-widest leading-tight">Validity</span>
          <span className="text-sm font-black text-emerald-600 font-mono tracking-tight">99.7%</span>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.005)]">
          <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-tight">Duplicates</span>
          <span className="text-sm font-black text-zinc-950 font-mono tracking-tight">0.0%</span>
        </div>
      </div>
    </div>
  );
}

// HOW IT WORKS STEPS DATA
const steps = [
  {
    num: "01",
    title: "Define Audience",
    desc: "Configure target profiles with demographical, regional, and industry selectors.",
    icon: SlidersHorizontal,
    color: "#DCE7FF", // Soft EGI Blue
    hoverTextDark: true
  },
  {
    num: "02",
    title: "Launch Survey",
    desc: "Deploy surveys across dispatch channels and platform links immediately.",
    icon: Send,
    color: "#F1E9FF", // Soft Violet
    hoverTextDark: true
  },
  {
    num: "03",
    title: "Collect Responses",
    desc: "Gather completions in real-time across devices and responsive screens.",
    icon: Database,
    color: "#E0EBFF", // Soft Royal Blue
    hoverTextDark: true
  },
  {
    num: "04",
    title: "Validate Data",
    desc: "Filter invalid responses using device logs and geo-verification checks.",
    icon: ShieldCheck,
    color: "#D2F4F7", // Soft EGI Cyan
    hoverTextDark: true
  },
  {
    num: "05",
    title: "Deliver Insights",
    desc: "Obtain clean, verified, and structured datasets ready for direct analysis.",
    icon: Target,
    color: "#D1FBF0", // Soft Teal
    hoverTextDark: true
  }
];

// AUDIENCE REACH STATS
const stats = [
  {
    num: 250,
    suffix: "K+",
    label: "Verified Respondents",
    desc: "Pre-screened active panel members worldwide ready for survey dispatch.",
    icon: Users,
    color: "#5B84FF"
  },
  {
    num: 50,
    suffix: "+",
    label: "Countries",
    desc: "Global reach ensuring representative sampling in both major and localized regions.",
    icon: Globe,
    color: "#7C3AED"
  },
  {
    num: 120,
    suffix: "+",
    label: "Targeting Attributes",
    desc: "Granular profile filters for pin-point audience matching and research accuracy.",
    icon: SlidersHorizontal,
    color: "#2563EB"
  },
  {
    num: 92,
    suffix: "%",
    label: "Completion Rate",
    desc: "Industry-leading participant retention ensuring research projects conclude on time.",
    icon: CheckSquare,
    color: "#02E8F8"
  }
];

// HELPER COMPONENT: Real-time response counter for Step 3
function LiveCounter({ isActive, isHovered, hoverTextDark }: { isActive: boolean; isHovered: boolean; hoverTextDark: boolean }) {
  const [count, setCount] = useState(14820);
  useEffect(() => {
    if (!isActive) {
      setCount(14820);
      return;
    }
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 80);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={`text-left p-4 rounded-2xl border transition-all duration-500 ${
      isHovered 
        ? (hoverTextDark ? 'bg-zinc-950/10 border-zinc-950/10' : 'bg-white/10 border-white/10') 
        : 'bg-zinc-50 border-zinc-100'
    }`}>
      <span className={`block text-[7px] font-black uppercase tracking-widest ${
        isHovered 
          ? (hoverTextDark ? 'text-zinc-950/60' : 'text-white/60') 
          : 'text-zinc-400'
      }`}>
        LIVE INGESTION TRACKER
      </span>
      <span className={`text-2xl font-[1000] tracking-tight block mt-0.5 font-mono leading-none ${
        isHovered 
          ? (hoverTextDark ? 'text-zinc-950' : 'text-white') 
          : 'text-zinc-950'
      }`}>
        {count.toLocaleString()}
      </span>
      <span className={`text-[8.5px] font-bold mt-2 flex items-center gap-1.5 ${
        isHovered 
          ? (hoverTextDark ? 'text-zinc-950/80' : 'text-white/80') 
          : 'text-[#2563EB]'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Stream Active
      </span>
    </div>
  );
}

// HELPER COMPONENT: Simulated VPN proxy and verified entries filter for Step 4
function ValidationFeed({ isActive, isHovered, hoverTextDark }: { isActive: boolean; isHovered: boolean; hoverTextDark: boolean }) {
  const [items, setItems] = useState([
    { id: "#3819", type: "Proxy IP", valid: false, show: true },
    { id: "#3820", type: "Verified", valid: true, show: true },
    { id: "#3821", type: "Speed Run", valid: false, show: true },
    { id: "#3822", type: "Verified", valid: true, show: true }
  ]);

  useEffect(() => {
    if (!isActive) {
      setItems([
        { id: "#3819", type: "Proxy IP", valid: false, show: true },
        { id: "#3820", type: "Verified", valid: true, show: true },
        { id: "#3821", type: "Speed Run", valid: false, show: true },
        { id: "#3822", type: "Verified", valid: true, show: true }
      ]);
      return;
    }
    const timer = setTimeout(() => {
      setItems(prev => prev.map(item => item.valid ? item : { ...item, show: false }));
    }, 1400);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="space-y-1.5 max-w-[260px] w-full">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          animate={{
            opacity: item.show ? 1 : 0.15,
            scale: item.show ? 1 : 0.95,
          }}
          transition={{ duration: 0.4 }}
          className={`p-2 rounded-xl border flex items-center justify-between transition-colors duration-500 ${
            isHovered 
              ? (hoverTextDark ? 'bg-zinc-950/10 border-zinc-950/10' : 'bg-white/10 border-white/10') 
              : 'bg-zinc-50 border-zinc-100'
          }`}
        >
          <span className={`text-[8.5px] font-bold font-mono leading-none ${
            isHovered 
              ? (hoverTextDark ? 'text-zinc-950' : 'text-white') 
              : 'text-zinc-700'
          }`}>{item.id}</span>
          
          <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider ${
            item.valid 
              ? (isHovered && !hoverTextDark ? 'bg-emerald-500/20 text-white' : 'bg-emerald-50 text-emerald-600') 
              : (isHovered && !hoverTextDark ? 'bg-red-500/20 text-white' : 'bg-red-50 text-red-600')
          }`}>
            {item.valid ? 'Verified' : item.type}
          </span>
        </motion.div>
      ))}
    </div>
  );
}



function DeliveringStatement() {
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
        <div className="flex justify-center items-center gap-[0.03em] text-transparent [-webkit-text-stroke:1.3px_#111111] sm:[-webkit-text-stroke:2px_#111111] tracking-wide mt-2">
          {line2.map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: 45, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -5 }}
              className="inline-block origin-bottom cursor-default hover:[-webkit-text-stroke-color:#5B84FF] transition-colors duration-200"
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

function DecimalCounter({ to, suffix = '', decimals = 0, duration = 1.6 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = v.toFixed(decimals) + suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, to, suffix, decimals, duration, mv]);

  return <span ref={ref}>0.0{suffix}</span>;
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress targeting the Section 4 container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Calculate card number parallax translation offset
  const numberParallax = useTransform(scrollYProgress, [0, 1], [-25, 25]);



  // Floating particles local state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; driftX: number }>>([]);
  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 80 + 10, // percentage (avoid edge clipping)
      size: Math.random() * 5 + 3, // size in px
      duration: Math.random() * 15 + 15, // seconds
      delay: Math.random() * 5,
      driftX: Math.random() * 30 - 15
    }));
    setParticles(generated);
  }, []);

  const updateCarousel = (index: number) => {
    if (viewportRef.current && trackRef.current) {
      const viewportWidth = viewportRef.current.offsetWidth;
      const cards = trackRef.current.children;
      if (cards.length > 0) {
        const activeCard = cards[index] as HTMLElement;
        if (activeCard) {
          const cardWidth = activeCard.offsetWidth;
          const cardLeft = activeCard.offsetLeft;
          // Calculate dynamic offset to center the active card in the viewport
          const x = (viewportWidth / 2) - (cardWidth / 2) - cardLeft;
          
          gsap.to(trackRef.current, {
            x: x,
            duration: 0.8,
            ease: 'power3.out'
          });
        }
      }
    }
  };

  // Run carousel updates on activeIndex change
  useEffect(() => {
    updateCarousel(activeIndex);
  }, [activeIndex]);

  // Handle window resizing and layout mount
  useEffect(() => {
    const handleResize = () => updateCarousel(activeIndex);
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => updateCarousel(activeIndex), 150);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeIndex]);
  const handlePrev = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <>
      {/* Services Hero Section */}
      <ServicesHero />

      {/* SECTION 2: What We Provide (Immersive Storytelling) */}
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

      {/* SECTION 3: Global Reach & Panel Scale (Premium timeline in light theme) */}
      <Section className="bg-white border-b border-zinc-200 overflow-hidden relative" id="services-audience-reach">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Background radial blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.03),transparent_60%)] pointer-events-none" />

        <div className="relative z-10">
          <div className="max-w-2xl text-left mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4">
                <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
                GLOBAL ENGAGEMENT
              </div>
            </Reveal>
            <Reveal delay={0.05} className="mt-2">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
                GLOBAL REACH &<br />
                <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                  PANEL SCALE.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-4">
              <p className="text-zinc-500 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
                Access representable panels across key global demographics and localized professional groups instantly.
              </p>
            </Reveal>
          </div>

          {/* Connected Horizontal Timeline Journey */}
          <div className="relative w-full">
            {/* Background connection channel (Desktop only) */}
            <div className="hidden lg:block absolute top-[48px] left-[48px] right-[48px] h-[1px] bg-zinc-200/80 pointer-events-none">
              {/* Glowing active progress line/particle */}
              <motion.div
                initial={{ left: "-20%" }}
                animate={{ left: "120%" }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-[80px] bg-gradient-to-r from-transparent via-[#5B84FF] to-transparent shadow-[0_0_10px_rgba(91,132,255,0.3)]"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="p-8 rounded-[2.25rem] border border-zinc-200/60 bg-[#FAFAFA] hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.005)] hover:shadow-[0_20px_40px_rgba(92,142,255,0.05),_0_0_24px_rgba(92,142,255,0.02)] hover:translate-y-[-4px] transition-all duration-300 text-left relative group overflow-hidden">
                      {/* Top colored border gradient */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[2.25rem] transition-all duration-300 group-hover:h-[3.5px]"
                        style={{
                          background: `linear-gradient(90deg, ${stat.color}40, ${stat.color})`
                        }}
                      />

                      {/* Visual Hover Radial Glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle_at_50%_0%, ${stat.color}04, transparent 50%)`
                        }}
                      />

                      {/* Faded background giant step number (Hover counter) */}
                      <div 
                        className="absolute bottom-[-15px] right-4 text-[6.5rem] font-[1000] leading-none opacity-[0.14] group-hover:opacity-[0.38] pointer-events-none select-none font-sans transition-all duration-500"
                        style={{ color: stat.color }}
                      >
                        0{idx + 1}
                      </div>

                      {/* Header Row: Circle Step Number */}
                      <div className="flex items-center justify-between relative z-10">
                        <div
                          className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 group-hover:scale-105"
                          style={{
                            borderColor: `${stat.color}35`,
                            color: stat.color,
                            backgroundColor: `${stat.color}08`
                          }}
                        >
                          0{idx + 1}
                        </div>
                      </div>

                      {/* Icon with subtle color background */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center mt-8 relative z-10 transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${stat.color}08`,
                          border: `1px solid ${stat.color}25`,
                          color: stat.color
                        }}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                      </div>

                      <h3 className="mt-6 text-2xl sm:text-3xl font-[900] uppercase text-zinc-950 tracking-tight relative z-10 font-sans">
                        <Counter to={stat.num} suffix={stat.suffix} />
                      </h3>

                      <span 
                        className="block mt-1.5 text-[9px] font-black uppercase tracking-wider relative z-10"
                        style={{ color: stat.color }}
                      >
                        {stat.label}
                      </span>

                      <p className="mt-3 text-zinc-500 font-medium text-xs sm:text-[12.5px] leading-relaxed relative z-10">
                        {stat.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4: How It Works (GSAP Storytelling Carousel in light theme) */}
      <section 
        ref={sectionRef}
        className="bg-white border-b border-zinc-200 overflow-hidden relative py-24 sm:py-32" 
        id="services-how-it-works"
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient radial glows & gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(92,142,255,0.02),transparent_70%)] pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(2,232,248,0.015),transparent_70%)] pointer-events-none z-0" />

        {/* Floating Ambient Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#5B84FF]/20 pointer-events-none z-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, p.driftX, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_3.2fr] lg:gap-16 items-start">
            
            {/* Left Column: Title & Navigation */}
            <div className="text-left flex flex-col h-full justify-between lg:sticky lg:top-32 relative z-10">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-[#5B84FF] shadow-sm mb-4">
                    <span className="h-1 w-1 rounded-full bg-[#02E8F8] animate-pulse" />
                    THE WORKFLOW
                  </div>
                </Reveal>
                <Reveal delay={0.05} className="mt-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-[900] tracking-tight uppercase leading-[1.08] text-zinc-950">
                    SURVEY<br />
                    <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                      LIFECYCLE.
                    </span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1} className="mt-4">
                  <p className="text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed max-w-xs">
                    Our platform orchestrates every stage of the dispatch, collection, and validation lifecycle automatically.
                  </p>
                </Reveal>
              </div>

              {/* Slider Navigation - Raw chevrons matching reference style */}
              <Reveal delay={0.15}>
                <div className="flex items-center gap-4 mt-8 select-none">
                  {/* Left Chevron Button */}
                  <button 
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-950 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 bg-transparent border border-zinc-200 rounded-md shadow-sm hover:bg-zinc-50 cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft size={24} strokeWidth={2} />
                  </button>

                  {/* Diagonal slash line */}
                  <div className="w-[1.5px] h-8 bg-zinc-300 rotate-[25deg] self-center" />

                  {/* Right Chevron Button */}
                  <button 
                    onClick={handleNext}
                    disabled={activeIndex === steps.length - 1}
                    className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-zinc-950 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 active:scale-95 bg-transparent border border-zinc-200 rounded-md shadow-sm hover:bg-zinc-50 cursor-pointer"
                    aria-label="Next step"
                  >
                    <ChevronRight size={24} strokeWidth={2} />
                  </button>
                </div>
              </Reveal>
            </div>

            <div 
              ref={viewportRef}
              className="relative w-full overflow-hidden select-none pb-8 pt-4 px-2"
            >
              {/* Progress timeline bar connecting stages */}
              <div className="relative w-full h-[2.5px] bg-zinc-100 mb-12 z-10 rounded-full">
                {/* Active progress segment */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5B84FF] to-[#02E8F8]"
                  animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* Stage node dots */}
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {steps.map((_, dotIdx) => (
                    <div 
                      key={dotIdx} 
                      className={`w-2 h-2 rounded-full -translate-y-[2.75px] transition-all duration-500 ${
                        dotIdx <= activeIndex ? 'bg-[#5B84FF] scale-125 shadow-[0_0_8px_rgba(91,132,255,0.4)]' : 'bg-zinc-200'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              <div 
                ref={trackRef}
                className="flex gap-8 items-center w-max transition-all duration-300 ease-out"
                style={{ willChange: 'transform' }}
              >
                {steps.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`snap-center flex-shrink-0 h-[420px] rounded-xl border p-8 flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer relative w-[290px] sm:w-[325px] overflow-hidden ${
                        isActive 
                          ? 'border-zinc-950/15 shadow-[0_24px_50px_rgba(91,132,255,0.12)] z-10 scale-[1.04]' 
                          : 'border-zinc-200/50 bg-gradient-to-tr from-white/40 to-white/80 backdrop-blur-md hover:bg-white/95 hover:border-zinc-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] text-zinc-900 z-0'
                      }`}
                      style={{
                        backgroundColor: isActive ? step.color : undefined,
                      }}
                    >
                      {/* Subtly animated active card glow pulse */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(91,132,255,0.15),transparent_70%)] pointer-events-none"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      {/* Giant background cropped number with parallax */}
                      <motion.div 
                        style={{ x: numberParallax }}
                        className={`absolute -bottom-10 -right-4 text-[11rem] font-[1000] leading-none select-none pointer-events-none z-0 font-sans tracking-tighter transition-colors duration-500 ${
                          isActive 
                            ? 'text-zinc-950/[0.035]' 
                            : 'text-zinc-950/[0.022]'
                        }`}
                      >
                        {step.num}
                      </motion.div>

                      {/* Top Row: Number bracket */}
                      <span className={`relative z-10 text-[11px] font-mono font-bold tracking-wider transition-colors duration-500 ${
                        isActive 
                          ? 'text-zinc-950/50' 
                          : 'text-zinc-400'
                      }`}>
                        [{step.num}]
                      </span>

                      {/* Title */}
                      <div className="relative z-10 flex flex-col mt-4">
                        <h3 className={`text-2xl sm:text-3xl font-[1000] uppercase tracking-tighter transition-colors duration-500 leading-none whitespace-normal break-words mt-2 ${
                          isActive 
                            ? 'text-zinc-950' 
                            : 'text-zinc-900'
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      {/* MIDDLE: Unique Animated Visual State per Step */}
                      <div className="relative z-10 flex-grow flex items-center justify-center my-4 h-[120px]">
                        <AnimatePresence mode="wait">
                          {isActive ? (
                            <motion.div
                              key="animation"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                              className="w-full flex justify-center items-center"
                            >
                              {/* Step 1: Define Audience */}
                              {idx === 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2 justify-start max-w-[260px] h-[100px] overflow-hidden content-start">
                                  {["B2B Tech Buyers", "Age 25-45", "Location: US/UK", "IT Managers", "Developers", "Income > $100K"].map((chip, chipIdx) => (
                                    <motion.div
                                      key={chipIdx}
                                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      transition={{ delay: chipIdx * 0.08, duration: 0.3 }}
                                      className="px-2.5 py-0.5 rounded-full border text-[8px] font-black uppercase tracking-wider bg-white/60 border-zinc-950/15 text-zinc-950"
                                    >
                                      {chip}
                                    </motion.div>
                                  ))}
                                </div>
                              )}

                              {/* Step 2: Launch Survey */}
                              {idx === 1 && (
                                <div className="relative w-full h-[100px] flex items-center justify-center overflow-hidden">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center relative z-10 bg-zinc-950 text-white shadow-sm">
                                    <Send size={12} strokeWidth={2.5} />
                                  </div>
                                  {[1, 2, 3].map((ring) => (
                                    <motion.div
                                      key={ring}
                                      animate={{
                                        scale: [1, 2.5],
                                        opacity: [0.5, 0]
                                      }}
                                      transition={{
                                        duration: 2.2,
                                        repeat: Infinity,
                                        delay: ring * 0.7,
                                        ease: "easeOut"
                                      }}
                                      className="absolute w-8 h-8 rounded-full border pointer-events-none border-zinc-950/20"
                                    />
                                  ))}
                                </div>
                              )}

                              {/* Step 3: Collect Responses */}
                              {idx === 2 && (
                                <LiveCounter isActive={isActive} isHovered={isActive} hoverTextDark={true} />
                              )}

                              {/* Step 4: Validate Data */}
                              {idx === 3 && (
                                <ValidationFeed isActive={isActive} isHovered={isActive} hoverTextDark={true} />
                              )}

                              {/* Step 5: Deliver Insights */}
                              {idx === 4 && (
                                <div className="h-[100px] flex items-end gap-3 justify-center overflow-hidden w-full">
                                  {[40, 75, 92].map((height, barIdx) => (
                                    <div key={barIdx} className="flex flex-col items-center">
                                      <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}px` }}
                                        transition={{ duration: 0.8, delay: barIdx * 0.15, ease: "easeOut" }}
                                        className="w-6 rounded-t-lg bg-zinc-950"
                                      />
                                      <span className="text-[8px] font-mono font-bold mt-1.5 text-zinc-950">{height}%</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <motion.span
                              key="plus"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="text-3xl font-light text-zinc-600/70 select-none"
                            >
                              +
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bottom: Description */}
                      <p className={`relative z-10 text-[11.5px] sm:text-xs leading-relaxed font-semibold transition-colors duration-500 mt-auto ${
                        isActive 
                          ? 'text-zinc-950' 
                          : 'text-zinc-500'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
