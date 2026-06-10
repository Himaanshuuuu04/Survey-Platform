"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { PageHero } from '@/components/common/PageHero';
import { Button, Container, Reveal } from '@/components/primitives';

type FormValues = {
  name: string;
  company: string;
  email: string;
  country: string;
  projectType: string;
  message: string;
};

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
    <label className="relative block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs" style={{ color: 'var(--coral)' }}>{error}</div>}
    </label>
  );
}

const inputCls =
  'w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]';

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
    <div className="rounded-3xl border border-[var(--line)] bg-white p-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`overflow-hidden rounded-2xl ${isOpen ? 'bg-[var(--brand-soft)]' : ''}`}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold"
            >
              <span>{f.q}</span>
              <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-5 pb-4 text-sm">{f.a}</p>
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

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Thanks ${values.name.split(' ')[0]} — we'll be in touch within 48 hours.`);
    reset();
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <PageHero
        eyebrow="Contact"
        title={<>Let’s talk about your <span className="brand-gradient-text">research needs</span>.</>}
        sub="Send us a few details and a strategist will respond within one business day."
      />
      <Container className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[var(--line)] bg-white p-7 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input {...register('name', { required: 'Required' })} className={inputCls} placeholder="Jane Doe" />
                </Field>
                <Field label="Company" error={errors.company?.message}>
                  <input {...register('company', { required: 'Required' })} className={inputCls} placeholder="Acme Inc." />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input type="email" {...register('email', { required: 'Required' })} className={inputCls} placeholder="jane@acme.com" />
                </Field>
                <Field label="Country" error={errors.country?.message}>
                  <input {...register('country', { required: 'Required' })} className={inputCls} placeholder="United States" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Project type" error={errors.projectType?.message}>
                    <div className="relative">
                      <select {...register('projectType', { required: 'Required' })} className={`${inputCls} appearance-none pr-10`}>
                        <option value="">Choose one…</option>
                        <option>Quantitative Research</option>
                        <option>Qualitative Research</option>
                        <option>B2B Research</option>
                        <option>Market Intelligence</option>
                        <option>Not sure yet</option>
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]" />
                    </div>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message" error={errors.message?.message}>
                    <textarea
                      {...register('message', { required: 'Required' })}
                      rows={5}
                      className={inputCls}
                      placeholder="Tell us about your objective, timeline, and target audience…"
                    />
                  </Field>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs">We respond within one business day. GDPR &amp; CCPA compliant.</p>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send Message'} <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          </Reveal>

          <div className="space-y-5">
            {[
              { icon: Mail, label: 'Email', val: 'hello@pulselens.com', tint: 'var(--brand)' },
              { icon: Phone, label: 'Phone', val: '+1 (415) 555-0142', tint: 'var(--accent)' },
              { icon: MapPin, label: 'Office', val: '548 Market Street, San Francisco, CA', tint: 'var(--coral)' },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-3xl border border-[var(--line)] bg-white p-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: c.tint }}>
                    <c.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">{c.label}</div>
                    <div className="font-semibold">{c.val}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div>
                <div className="mb-3 flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                  <Check size={14} /> Frequently asked
                </div>
                <FAQ />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}

