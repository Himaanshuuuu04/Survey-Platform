"use client";
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, useInView, useMotionValue, animate } from 'motion/react';
import { 
  Mail, Phone, MapPin, ChevronDown, ArrowRight, Check, ShieldCheck, 
  Clock, Rocket, Globe, Sparkles 
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button, Container, Reveal, Counter } from '@/components/primitives';

type FormValues = {
  name: string;
  company: string;
  email: string;
  country: string;
  projectType: string;
  message: string;
};

// Custom decimal counter helper for percentages
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative block text-left">
      <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">{label}</div>
      {children}
      {error && <div className="mt-1.5 text-[10px] font-bold text-[#EF4444]">{error}</div>}
    </div>
  );
}

const inputCls =
  'w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm outline-none transition-all duration-300 placeholder:text-zinc-400 focus:border-[#5C8EFF] focus:ring-4 focus:ring-[#5C8EFF]/8 focus:shadow-[0_4px_20px_rgba(92,142,255,0.08)] hover:border-zinc-300 text-zinc-900 font-medium';

const faqs = [
  { q: 'How quickly can a project be fielded?', a: 'Most quantitative studies launch within 5 business days; qualitative within 7-10 depending on recruit difficulty.' },
  { q: 'Do you handle international panels?', a: 'Yes — we maintain active, verified panels in 50+ countries across 30+ languages.' },
  { q: 'What does a typical engagement cost?', a: 'Pricing depends on sample size, methodology, and markets. Most projects fall between $15K–$120K.' },
  { q: 'Can we white-label deliverables?', a: 'Absolutely. Many enterprise clients embed our research into their own dashboards and brand templates.' },
  { q: 'How do you ensure data quality?', a: 'Triple-verification on respondents, real-time bot detection, and a dedicated QC team that hand-checks every dataset.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div 
            key={f.q} 
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen 
                ? 'bg-slate-50/70 border-[#5C8EFF]/20 shadow-[0_4px_16px_rgba(92,142,255,0.02)] scale-[1.01]' 
                : 'border-zinc-200/60 bg-white hover:bg-zinc-50/40 hover:border-zinc-300 opacity-80 hover:opacity-100'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-sm tracking-tight text-zinc-900 group"
            >
              <span className={`transition-colors duration-300 ${isOpen ? 'text-zinc-950 font-black' : 'text-zinc-800'}`}>
                {f.q}
              </span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 text-zinc-400 group-hover:text-zinc-800 ${isOpen ? 'rotate-180 text-zinc-800' : ''}`} 
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <p className="px-5 pb-5 text-zinc-500 text-xs sm:text-[12.5px] font-medium leading-relaxed border-t border-zinc-100/50 pt-3">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Thanks ${values.name.split(' ')[0]} — we'll be in touch within 24 hours.`);
    reset();
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const nameInput = formRef.current.querySelector('input[name="name"]') as HTMLInputElement;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      
      {/* ── REDESIGNED HERO SECTION ── */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-20 bg-[#FAFAFA] border-b border-zinc-200 z-10">
        
        {/* Dynamic Data-Inspired Visualization behind typography */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-85">
          <svg viewBox="0 0 1000 400" fill="none" className="w-full h-full max-w-[1200px] overflow-visible">
            <defs>
              <radialGradient id="cyan-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#02E8F8" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#5C8EFF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5C8EFF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5C8EFF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#02E8F8" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Glowing background shapes */}
            <circle cx="500" cy="200" r="220" fill="url(#cyan-glow)" filter="blur(20px)" />
            <circle cx="320" cy="180" r="160" fill="url(#blue-glow)" filter="blur(15px)" />
            <circle cx="680" cy="220" r="160" fill="url(#blue-glow)" filter="blur(15px)" />
          </svg>
        </div>

        {/* Hero Copy */}
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            
            {/* Eyebrow badge */}
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[9px] font-black tracking-widest uppercase text-[#5B84FF] shadow-[0_2px_8px_rgba(0,0,0,0.01)] mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#02E8F8] animate-pulse" />
                RESEARCH PLATFORM &bull; SLA DIRECTORY
              </div>
            </Reveal>

            {/* Premium Headline */}
            <Reveal delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-[1000] tracking-tight uppercase leading-[1.05] text-zinc-950">
                BUILD YOUR NEXT<br />
                STUDY WITH<br />
                <span className="text-transparent [-webkit-text-stroke:1.3px_#111111] font-black tracking-wide">
                  CONFIDENCE.
                </span>
              </h1>
            </Reveal>

            {/* Sub copy */}
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-lg text-zinc-550 font-medium text-sm sm:text-base leading-relaxed text-zinc-550">
                Turn your quantitative and qualitative questions into verified insights. Connect directly with our dispatch engineering team below.
              </p>
            </Reveal>
            
          </div>
        </Container>
      </section>

      {/* ── TRUST METRICS SECTION ── */}
      <section className="relative z-20 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-5 sm:px-8">
          {[
            { label: "Verified Respondents", count: 250, suffix: "K+", desc: "Pre-screened active panel", color: "text-[#5C8EFF]" },
            { label: "Global Scope", count: 50, suffix: "+", desc: "Representative markets", color: "text-[#7C3AED]" },
            { label: "Validation Accuracy", count: 99.7, suffix: "%", desc: "Device & fingerprint screening", color: "text-[#2563EB]", decimal: true },
            { label: "Completion Rate", count: 92, suffix: "%", desc: "High engagement retention", color: "text-[#02E8F8]" }
          ].map((stat, sIdx) => (
            <Reveal key={stat.label} delay={sIdx * 0.06}>
              <div className="p-6 bg-white border border-zinc-200/70 rounded-3xl relative overflow-hidden group hover:translate-y-[-2px] hover:shadow-[0_12px_24px_rgba(92,142,255,0.03)] transition-all duration-300 text-left">
                {/* Visual top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-zinc-100 group-hover:bg-[#5C8EFF] transition-colors duration-300" />
                
                {/* Value counter */}
                <div className="text-2xl sm:text-3xl font-[1000] text-zinc-950 tracking-tight font-sans leading-none">
                  {stat.decimal ? (
                    <DecimalCounter to={stat.count} suffix={stat.suffix} decimals={1} />
                  ) : (
                    <Counter to={stat.count} suffix={stat.suffix} />
                  )}
                </div>

                {/* Info labels */}
                <span className="block text-[8.5px] font-black uppercase text-[#5C8EFF] tracking-wider mt-2.5">
                  {stat.label}
                </span>
                <p className="text-[11px] text-zinc-400 font-semibold mt-1 leading-snug">
                  {stat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CORE FORM & CREDIBILITY SECTION ── */}
      <section className="py-16 sm:py-24 bg-white relative z-10" id="contact-core-content">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.26fr_1fr] items-start">
            
            {/* LEFT COLUMN: Minimal Enterprise Form */}
            <Reveal>
              <form 
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)} 
                className="rounded-3xl border border-zinc-200/80 bg-[#FAFAFA]/40 p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.005)]"
              >
                <div className="flex flex-col text-left mb-8 pb-4 border-b border-zinc-150">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#5C8EFF]">STUDY BUILDER DISPATCH</span>
                  <h3 className="text-xl sm:text-2xl font-[900] uppercase text-zinc-950 tracking-tight mt-1">Study Specifications</h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" error={errors.name?.message}>
                    <input 
                      {...register('name', { required: 'Required' })} 
                      className={inputCls} 
                      placeholder="Jane Doe" 
                    />
                  </Field>
                  
                  <Field label="Company" error={errors.company?.message}>
                    <input 
                      {...register('company', { required: 'Required' })} 
                      className={inputCls} 
                      placeholder="Acme Inc." 
                    />
                  </Field>
                  
                  <Field label="Email Address" error={errors.email?.message}>
                    <input 
                      type="email" 
                      {...register('email', { required: 'Required' })} 
                      className={inputCls} 
                      placeholder="jane@acme.com" 
                    />
                  </Field>
                  
                  <Field label="Target Country" error={errors.country?.message}>
                    <input 
                      {...register('country', { required: 'Required' })} 
                      className={inputCls} 
                      placeholder="United States" 
                    />
                  </Field>
                  
                  <div className="sm:col-span-2">
                    <Field label="Project Focus" error={errors.projectType?.message}>
                      <div className="relative">
                        <select 
                          {...register('projectType', { required: 'Required' })} 
                          className={`${inputCls} appearance-none pr-10`}
                        >
                          <option value="">Choose focus…</option>
                          <option>Quantitative Research</option>
                          <option>Qualitative Research</option>
                          <option>B2B Cohort Recruit</option>
                          <option>Market Intelligence & Audit</option>
                          <option>Not sure yet</option>
                        </select>
                        <ChevronDown size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      </div>
                    </Field>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Field label="Research objectives & audience details" error={errors.message?.message}>
                      <textarea
                        {...register('message', { required: 'Required' })}
                        rows={5}
                        className={`${inputCls} resize-none`}
                        placeholder="Detail your research goals, target participant profile, sample size constraints, and study timeline..."
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-150 flex flex-wrap items-center justify-between gap-4 text-left">
                  <p className="text-[11px] text-zinc-400 font-semibold max-w-xs leading-normal">
                    Lead strategist responds within 24 hours. Fully GDPR, CCPA, and ISO 20252 compliant operations.
                  </p>
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="shadow-[0_8px_20px_-8px_rgba(92,142,255,0.4)]"
                  >
                    {isSubmitting ? 'Dispatching...' : 'Dispatch Study'} <ArrowRight size={15} className="ml-1.5 inline-block" />
                  </Button>
                </div>
              </form>
            </Reveal>

            {/* RIGHT COLUMN: Credibility SLA Dashboard & SaaS FAQs */}
            <div className="space-y-8 text-left">
              
              {/* Credibility SLA Panel */}
              <Reveal>
                <div className="rounded-3xl border border-zinc-200/80 bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.005)] relative overflow-hidden group">
                  
                  {/* Glowing Top line indicator */}
                  <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-[#5C8EFF]" />

                  {/* Panel Header */}
                  <div className="flex justify-between items-start pb-4 border-b border-zinc-150 mb-6">
                    <div>
                      <span className="text-[9px] font-black uppercase text-[#5C8EFF] tracking-wider">PLATFORM PERFORMANCE PROFILE</span>
                      <h4 className="text-zinc-950 font-[900] text-lg uppercase tracking-tight mt-0.5">Operational Benchmarks</h4>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-600 text-[8.5px] font-black uppercase tracking-wider font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ONLINE
                    </div>
                  </div>

                  {/* Operational SLAs Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "SLA Response", value: "<24 Hours", desc: "Guaranteed initial review", icon: Clock, color: "text-[#5C8EFF]" },
                      { label: "Average Launch", value: "5 Days", desc: "Typical quant fielding speed", icon: Rocket, color: "text-[#7C3AED]" },
                      { label: "Active Scope", value: "50+ Markets", desc: "Global representative coverage", icon: Globe, color: "text-[#2563EB]" },
                      { label: "Validation SLA", value: "99.7%", desc: "Data validation accuracy", icon: ShieldCheck, color: "text-[#02E8F8]" }
                    ].map((sla, idx) => {
                      const SlaIcon = sla.icon;
                      return (
                        <div 
                          key={sla.label} 
                          className="p-4 rounded-2xl border border-zinc-150 bg-[#FAFAFA]/40 hover:bg-[#FAFAFA] transition-all duration-300 flex flex-col items-start text-left"
                        >
                          <div className={`p-1.5 rounded-xl bg-white border border-zinc-100 ${sla.color}`}>
                            <SlaIcon size={14} />
                          </div>
                          <span className="text-[8px] font-black uppercase text-zinc-400 tracking-wider mt-3">{sla.label}</span>
                          <span className="text-base font-black text-zinc-950 mt-0.5">{sla.value}</span>
                          <span className="text-[10px] text-zinc-400 font-semibold mt-0.5 leading-snug">{sla.desc}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Direct Contact Links drawer */}
                  <div className="mt-8 pt-6 border-t border-zinc-150 flex flex-col gap-3">
                    <span className="text-[8.5px] font-black uppercase text-zinc-400 tracking-widest">Communications Hub</span>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { icon: Mail, label: 'Email', val: 'hello@evoglobalinsight.com', href: 'mailto:hello@evoglobalinsight.com' },
                        { icon: Phone, label: 'Phone', val: '+1 (415) 555-0142', href: 'tel:+14155550142' },
                        { icon: MapPin, label: 'Office', val: 'San Francisco, CA', href: 'https://maps.google.com' }
                      ].map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <a 
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:bg-[#5C8EFF]/5 hover:border-[#5C8EFF]/20 flex items-center gap-2 group/link transition-all duration-300"
                          >
                            <div className="text-[#5C8EFF] group-hover/link:scale-105 transition-transform duration-300">
                              <ItemIcon size={12} />
                            </div>
                            <div className="text-left leading-none">
                              <span className="block text-[7.5px] font-black uppercase text-zinc-400 tracking-wide">{item.label}</span>
                              <span className="text-[9.5px] font-bold text-zinc-800 block mt-0.5 truncate max-w-[80px]">{item.val}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </Reveal>

              {/* SaaS Accordion FAQ */}
              <Reveal>
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 px-1 text-[10px] font-black uppercase tracking-widest text-[#5C8EFF]">
                    <Sparkles size={11} /> Platform FAQ
                  </div>
                  <FAQ />
                </div>
              </Reveal>

            </div>

          </div>
        </Container>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section className="bg-white border-t border-zinc-200 relative overflow-hidden py-20 sm:py-24 z-10 text-center">
        {/* Subtle grid pattern overlay matching hero */}
        <div
          className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(24,24,27,0.08) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.02),transparent_70%)] pointer-events-none" />

        <Container className="relative z-10 flex flex-col items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-[1000] tracking-tight uppercase leading-[1.08] text-zinc-950">
              READY TO LAUNCH<br />
              <span className="text-transparent [-webkit-text-stroke:1.2px_#111111] font-black tracking-wide">
                YOUR NEXT STUDY?
              </span>
            </h2>
            
            <p className="mt-4 text-zinc-500 font-medium text-xs sm:text-sm max-w-md leading-relaxed mx-auto font-medium">
              Partner with EvoGlobalInsight to dispatch surveys, verify cohorts, and deliver clean research data on schedule.
            </p>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={scrollToForm} 
                size="lg" 
                className="shadow-[0_8px_24px_-8px_rgba(92,142,255,0.35)]"
              >
                Launch Study Now <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
