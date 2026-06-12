"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Check, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Container } from '@/components/primitives';

type FormValues = {
  name: string;
  company: string;
  email: string;
  country: string;
  projectType: string;
  timeline: string;
  sampleSize: string;
  details: string;
};

// Custom Floating Label Input Component
interface FloatingInputProps {
  label: string;
  name: keyof FormValues;
  register: any;
  required?: string | boolean;
  type?: string;
  error?: string;
}

function FloatingInput({ label, name, register, required, type = 'text', error }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full mb-6">
      <input
        type={type}
        {...register(name, {
          required,
          onChange: (e: any) => setValue(e.target.value)
        })}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-zinc-200 px-1 py-3.5 text-zinc-950 text-sm outline-none transition-all duration-300 focus:border-[#5C8EFF] font-medium z-10 relative"
      />
      <label
        className={`absolute left-1 transition-all duration-300 pointer-events-none text-xs font-bold uppercase tracking-wider ${
          focused || value ? 'top-[-8px] text-[10px] text-[#5C8EFF]' : 'top-4 text-zinc-400'
        }`}
      >
        {label}
      </label>
      {/* Bottom border draw animation */}
      <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#5C8EFF] transition-all duration-500 origin-left ${focused ? 'w-full scale-x-100' : 'w-0 scale-x-0'}`} />
      {error && <span className="mt-1.5 text-[10px] font-bold text-rose-500 block pl-1">{error}</span>}
    </div>
  );
}

// Custom Floating Label Select Component
interface FloatingSelectProps {
  label: string;
  name: keyof FormValues;
  register: any;
  required?: string | boolean;
  options: string[];
  error?: string;
}

function FloatingSelect({ label, name, register, required, options, error }: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full mb-6">
      <select
        {...register(name, {
          required,
          onChange: (e: any) => setValue(e.target.value)
        })}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-zinc-200 px-1 py-3.5 text-zinc-950 text-sm outline-none transition-all duration-300 focus:border-[#5C8EFF] font-medium z-10 relative appearance-none cursor-pointer"
      >
        <option value="" disabled className="text-zinc-400"></option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-zinc-900 bg-white">
            {opt}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-1 transition-all duration-300 pointer-events-none text-xs font-bold uppercase tracking-wider ${
          focused || value ? 'top-[-8px] text-[10px] text-[#5C8EFF]' : 'top-4 text-zinc-400'
        }`}
      >
        {label}
      </label>
      <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#5C8EFF] transition-all duration-500 origin-left ${focused ? 'w-full scale-x-100' : 'w-0 scale-x-0'}`} />
      {/* Select Down Arrow Icon */}
      <span className="absolute right-2 top-4 pointer-events-none text-zinc-400">
        <ChevronDown size={16} />
      </span>
      {error && <span className="mt-1.5 text-[10px] font-bold text-rose-500 block pl-1">{error}</span>}
    </div>
  );
}

// Custom Floating Label Textarea Component
interface FloatingTextareaProps {
  label: string;
  name: keyof FormValues;
  register: any;
  required?: string | boolean;
  error?: string;
}

function FloatingTextarea({ label, name, register, required, error }: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full mb-6">
      <textarea
        rows={4}
        {...register(name, {
          required,
          onChange: (e: any) => setValue(e.target.value)
        })}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-zinc-200 px-1 py-3.5 text-zinc-950 text-sm outline-none transition-all duration-300 focus:border-[#5C8EFF] font-medium z-10 relative resize-none"
      />
      <label
        className={`absolute left-1 transition-all duration-300 pointer-events-none text-xs font-bold uppercase tracking-wider ${
          focused || value ? 'top-[-8px] text-[10px] text-[#5C8EFF]' : 'top-4 text-zinc-400'
        }`}
      >
        {label}
      </label>
      <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#5C8EFF] transition-all duration-500 origin-left ${focused ? 'w-full scale-x-100' : 'w-0 scale-x-0'}`} />
      {error && <span className="mt-1.5 text-[10px] font-bold text-rose-500 block pl-1">{error}</span>}
    </div>
  );
}

export default function Contact() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      country: '',
      projectType: '',
      timeline: '',
      sampleSize: '',
      details: ''
    }
  });

  // Track cursor position for the spotlight overlay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onSubmit = async (values: FormValues) => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Your market research request has been logged successfully! Our team will connect in 1 business day.');
    reset();
  };

  // Floating Cards Configuration
  const floatingCards = [
    {
      url: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=260&auto=format&fit=crop",
      title: "Focus Groups",
      desc: "Moderated discussions",
      className: "left-[4%] top-[12%] rotate-[-4deg] hidden xl:flex",
      delay: 0
    },
    {
      url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=260&auto=format&fit=crop",
      title: "In-depth Interviews",
      desc: "Executive conversations",
      className: "left-[2%] top-[45%] rotate-[3deg] hidden lg:flex",
      delay: 1.2
    },
    {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=260&auto=format&fit=crop",
      title: "Data Integrity",
      desc: "AI scrubbing checks",
      className: "left-[5%] bottom-[15%] rotate-[-2deg] hidden xl:flex",
      delay: 0.6
    },
    {
      url: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=260&auto=format&fit=crop",
      title: "B2B Executives",
      desc: "Niche cohort target",
      className: "right-[5%] bottom-[15%] rotate-[2deg] hidden xl:flex",
      delay: 0.8
    },
    {
      url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=260&auto=format&fit=crop",
      title: "Consumer Panels",
      desc: "Global insights pool",
      className: "right-[2%] top-[45%] rotate-[-3deg] hidden lg:flex",
      delay: 1.8
    },
    {
      url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=260&auto=format&fit=crop",
      title: "Analysts Alignment",
      desc: "Study launch setup",
      className: "right-[4%] top-[12%] rotate-[4deg] hidden xl:flex",
      delay: 0.4
    }
  ];

  const faqs = [
    {
      q: "How does EGI verify its research panel respondents?",
      a: "We run multi-stage identity verification checks including LinkedIn authentication, corporate email confirmation, digital fingerprinting, and pattern matching. Every respondent undergoes validation checks before being admitted to our core study cohorts."
    },
    {
      q: "What is your typical project turnaround time?",
      a: "Standard surveys and focus groups are launched within 5 business days. Rapid response polls can be activated in as little as 24 hours, while complex custom international studies typically run over 2 to 3 weeks."
    },
    {
      q: "Do you support international research across multiple languages?",
      a: "Yes. EGI has an active respondent panel spanning over 50 countries. We handle local translation, cultural localization of survey prompts, and coordinate native-speaking moderators for focus groups and interviews."
    },
    {
      q: "How do you ensure data quality and combat fraud?",
      a: "Our verification engine uses real-time behavioral analysis to filter out speeders, straight-liners, and automated script bots. Any responses flagged by our quality rules are quarantined and replaced at no extra cost."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-zinc-900 overflow-x-hidden pt-32 pb-16 selection:bg-[#5C8EFF]/20 font-sans">
      <Toaster richColors position="top-center" />

      {/* ── Spotlight Cursor Tracking Effect ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, rgba(92, 142, 255, 0.08), transparent 80%)`
        }}
      />

      {/* ── Blueprint Dot-Grid Canvas Background ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(rgba(24, 24, 27, 0.05) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1: FULL SCREEN HERO & FLOATING CARDS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center py-12 z-10">
        
        {/* Floating Perimeter Cards */}
        {floatingCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: card.delay },
              scale: { duration: 0.8, delay: card.delay },
              y: {
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: card.delay
              }
            }}
            className={`absolute w-[180px] bg-white border border-zinc-200/70 p-2.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(92,142,255,0.05)] transition-all duration-300 hover:scale-[1.03] z-10 flex-col items-stretch ${card.className}`}
          >
            <div className="w-full h-[110px] rounded-xl overflow-hidden mb-2.5 bg-zinc-100">
              <img src={card.url} alt={card.title} className="w-full h-full object-cover select-none" />
            </div>
            <div className="px-1 pb-1">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-950 leading-tight">{card.title}</h4>
              <p className="text-[8.5px] text-zinc-500 font-medium leading-normal mt-0.5">{card.desc}</p>
            </div>
          </motion.div>
        ))}

        <Container className="text-center relative z-10 flex flex-col items-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[9px] font-extrabold tracking-wider uppercase text-zinc-500 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5C8EFF]" />
            EGI Collaboration Hub
          </motion.div>

          {/* Central Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[5.5rem] font-[900] tracking-tight leading-[0.95] text-zinc-950 uppercase mb-8 max-w-4xl text-center select-none"
          >
            READY TO<br />
            LAUNCH YOUR<br />
            <span className="text-transparent [-webkit-text-stroke:1.8px_#0A0A0A] font-[900] tracking-tight">
              NEXT STUDY?
            </span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-500 text-sm sm:text-base font-medium max-w-xl mb-10 leading-relaxed text-center"
          >
            Tell us about your audience, objectives, timeline, and research requirements. Our team responds with a comprehensive execution proposal within one business day.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 bg-[#5C8EFF] hover:bg-[#4b7ce6] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              START YOUR PROJECT
            </button>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-zinc-200 hover:border-zinc-950 bg-white hover:bg-zinc-50/50 text-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
            >
              SCHEDULE A CALL
            </a>
          </motion.div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2: SPLIT CONTACT FORM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={formSectionRef}
        className="relative py-20 sm:py-28 border-t border-zinc-200/60 bg-white z-10"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            
            {/* Left Column: Title & Description */}
            <div className="flex flex-col justify-start">
              <div className="sticky top-40">
                <span className="text-xs font-black tracking-widest text-[#5C8EFF] uppercase mb-4 block">
                  Project Configuration
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-[900] tracking-tight leading-[0.95] text-zinc-950 uppercase mb-6">
                  START YOUR<br />
                  <span className="text-transparent [-webkit-text-stroke:1.5px_#0A0A0A] font-[900]">
                    PROJECT.
                  </span>
                </h2>
                <p className="text-zinc-500 text-sm sm:text-base font-medium leading-relaxed max-w-md">
                  Specify your research goals, target audience pool, expected sample size, and timeline constraints. Our research operations panel review team will analyze your project needs and build a custom fielding strategy.
                </p>
                <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col gap-4 max-w-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 text-[#5C8EFF] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className="text-xs font-bold text-zinc-800">Operational response under 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 text-[#5C8EFF] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className="text-xs font-bold text-zinc-800">Verified participant sampling models</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5C8EFF]/10 text-[#5C8EFF] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className="text-xs font-bold text-zinc-800">Secure real-time dashboard tracking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Form */}
            <div className="bg-zinc-50/50 border border-zinc-200/60 p-8 sm:p-12 rounded-3xl shadow-sm relative overflow-hidden">
              
              {/* Subtle top bar accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#5C8EFF]" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FloatingInput
                    label="Full Name"
                    name="name"
                    register={register}
                    required="Name is required"
                    error={errors.name?.message}
                  />
                  <FloatingInput
                    label="Company Name"
                    name="company"
                    register={register}
                    required="Company is required"
                    error={errors.company?.message}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FloatingInput
                    label="Business Email"
                    name="email"
                    type="email"
                    register={register}
                    required="Email is required"
                    error={errors.email?.message}
                  />
                  <FloatingInput
                    label="Target Country"
                    name="country"
                    register={register}
                    required="Country is required"
                    error={errors.country?.message}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FloatingSelect
                    label="Project Type"
                    name="projectType"
                    register={register}
                    required="Project type is required"
                    options={[
                      "Quantitative Surveys",
                      "Qualitative Focus Groups",
                      "B2B Expert Interviews",
                      "B2C Consumer Mapping",
                      "B2B Enterprise Cohorts"
                    ]}
                    error={errors.projectType?.message}
                  />
                  <FloatingSelect
                    label="Timeline Constraint"
                    name="timeline"
                    register={register}
                    required="Timeline is required"
                    options={[
                      "Immediate (< 2 weeks)",
                      "1 Month",
                      "2-3 Months",
                      "Ongoing Long-term Research"
                    ]}
                    error={errors.timeline?.message}
                  />
                </div>

                <FloatingSelect
                  label="Target Sample Size"
                  name="sampleSize"
                  register={register}
                  required="Sample size is required"
                  options={[
                    "Qualitative (Under 50 participants)",
                    "N = 100 - 500",
                    "N = 500 - 1,000",
                    "N = 1,000+",
                    "Custom Large Cohort"
                  ]}
                  error={errors.sampleSize?.message}
                />

                <FloatingTextarea
                  label="Project Requirements & Details"
                  name="details"
                  register={register}
                  required="Project details are required"
                  error={errors.details?.message}
                />

                <div className="pt-4 text-left">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex h-12 items-center justify-center rounded-xl bg-zinc-950 hover:bg-[#5C8EFF] px-8 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed select-none"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          LAUNCHING...
                        </>
                      ) : (
                        <>
                          LAUNCH REQUEST
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4: FAQ
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-200/60 bg-white z-10">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-[#5C8EFF] uppercase mb-3 block">
              Information Desk
            </span>
            <h2 className="text-3xl sm:text-5xl font-[900] tracking-tight leading-tight text-zinc-950 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-2 group cursor-pointer"
                >
                  <span className="text-zinc-950 font-black text-sm sm:text-base tracking-tight uppercase group-hover:text-[#5C8EFF] transition-colors duration-300">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaqIdx === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-zinc-400 group-hover:text-zinc-950 flex-shrink-0 ml-4"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIdx === idx ? 'auto' : 0,
                    opacity: openFaqIdx === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 pb-4 text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
