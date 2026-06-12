"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  Loader2, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Instagram, 
  MessageCircle, 
  Mail, 
  PhoneCall, 
  MapPin 
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Container } from '@/components/primitives';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  details: string;
};

// Left cartoon outline drawing
function LeftCartoon() {
  return (
    <svg width="170" height="230" viewBox="0 0 170 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Table/Desk */}
      <path d="M 10,140 L 155,140" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60,140 L 45,210" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 120,140 L 135,210" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 90,140 L 90,210" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" />

      {/* Laptop */}
      <path d="M 105,140 L 150,140 M 115,140 L 140,118 L 162,118" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="122" y="123" width="22" height="12" rx="1.5" stroke="#0B5CFF" strokeWidth="1.5" />
      
      {/* Stool */}
      <ellipse cx="65" cy="180" rx="28" ry="7" fill="white" stroke="#0B5CFF" strokeWidth="2.5" />
      <path d="M 47,184 L 28,230" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 83,184 L 102,230" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 65,187 L 65,230" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" />

      {/* Character body & arms */}
      <path d="M 45,180 C 45,150 50,118 70,115" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 88,180 C 88,150 85,118 70,115" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Arms leaning on desk */}
      <path d="M 42,125 Q 65,145 92,125" stroke="#0B5CFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 52,118 Q 65,136 78,118" stroke="#0B5CFF" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Head & Hair */}
      <circle cx="68" cy="90" r="22" fill="white" stroke="#0B5CFF" strokeWidth="2.5" />
      <path d="M 47,85 C 47,68 89,68 89,85 C 80,75 56,75 47,85 Z" fill="#0B5CFF" />
      
      {/* Face details */}
      <path d="M 62,95 Q 68,100 74,95" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="62" cy="88" r="1.5" fill="#0B5CFF" />
      <circle cx="74" cy="88" r="1.5" fill="#0B5CFF" />
      <path d="M 48,105 Q 43,115 48,125" stroke="#0B5CFF" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Right cartoon outline drawing
function RightCartoon() {
  return (
    <svg width="170" height="230" viewBox="0 0 170 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Person body legs & torso */}
      <path d="M 85,215 L 85,145 L 68,110 M 85,145 L 102,110" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 72,215 H 98" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 72,215 L 72,225 H 80" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 98,215 L 98,225 H 106" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Torso outline */}
      <path d="M 70,110 L 85,72 L 100,110 Z" fill="white" stroke="#0B5CFF" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Arms holding keyboard */}
      <path d="M 75,85 L 60,95 L 70,120" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 95,85 L 105,95 L 95,120" stroke="#0B5CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Keyboard/Tray */}
      <rect x="42" y="112" width="56" height="10" rx="2" fill="white" stroke="#0B5CFF" strokeWidth="2" />
      <line x1="50" y1="117" x2="90" y2="117" stroke="#0B5CFF" strokeWidth="2" strokeDasharray="3,3" />

      {/* Head */}
      <circle cx="85" cy="46" r="18" fill="white" stroke="#0B5CFF" strokeWidth="2.5" />
      <path d="M 68,42 C 68,28 102,28 102,42 C 95,34 75,34 68,42 Z" fill="#0B5CFF" />
      
      {/* Face details */}
      <path d="M 79,50 Q 85,55 91,50" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="79" cy="43" r="1.5" fill="#0B5CFF" />
      <circle cx="91" cy="43" r="1.5" fill="#0B5CFF" />
      
      {/* Sparkles / Speed marks */}
      <line x1="42" y1="98" x2="36" y2="92" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="90" x2="48" y2="82" stroke="#0B5CFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Contact() {
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      details: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Your message has been sent successfully! Our team will connect with you shortly.');
    reset();
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden pb-16 selection:bg-[#5C8EFF]/20 font-sans">
      <Toaster richColors position="top-center" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1: OSOME-STYLE HERO & FORM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section 
        className="relative overflow-hidden min-h-[80vh] flex flex-col justify-center bg-white pt-24 pb-16 px-4 z-10 border-b border-zinc-100"
        style={{
          backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* ── Background radial glow centered behind the graphic ── */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,142,255,0.04),transparent_55%)] pointer-events-none" />

        <Container className="relative z-10 w-full flex-1 flex flex-col items-center max-w-6xl mx-auto">
          
          {/* Eyebrow */}
          <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest mb-3">
            EvoGlobalInsight • Contact us
          </span>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-serif font-normal text-zinc-950 tracking-tight mb-6 text-center leading-tight">
            Contact us
          </h1>
          
          {/* Subcopy */}
          <p className="text-zinc-500 text-[13.5px] sm:text-sm font-medium max-w-xl text-center leading-relaxed mb-12">
            Get in touch and ask us anything. The difference between quantitative surveys and focus groups, can you start a study from Madagascar, which research methodology our team prefers - we answer it all.
          </p>

          {/* Form flanking row layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2.4fr_1fr] gap-4 items-center justify-items-center relative">
          
          {/* Left Illustration */}
          <div className="hidden lg:block select-none opacity-90 hover:opacity-100 transition-opacity duration-300">
            <LeftCartoon />
          </div>

          {/* Form wrapper */}
          <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Your name *"
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-white border border-zinc-200 focus:border-[#0B5CFF] px-4.5 py-3.5 rounded-xl text-zinc-900 text-sm outline-none transition-all duration-300 font-medium"
                  />
                  {errors.name && <span className="mt-1 text-xs text-rose-500 block pl-1 font-semibold">{errors.name.message}</span>}
                </div>
                
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Email address *"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full bg-white border border-zinc-200 focus:border-[#0B5CFF] px-4.5 py-3.5 rounded-xl text-zinc-900 text-sm outline-none transition-all duration-300 font-medium"
                  />
                  {errors.email && <span className="mt-1 text-xs text-rose-500 block pl-1 font-semibold">{errors.email.message}</span>}
                </div>
              </div>

              {/* Row 2: Phone with Flag selector & Interested In */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Prefix select + Phone Input wrapper */}
                <div className="flex bg-white border border-zinc-200 rounded-xl overflow-hidden focus-within:border-[#0B5CFF] transition-all duration-300">
                  <select 
                    className="bg-zinc-50 border-r border-zinc-200 px-3 py-3.5 text-sm outline-none text-zinc-700 cursor-pointer font-medium"
                    onChange={(e) => setPhonePrefix(e.target.value)}
                    value={phonePrefix}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+39">🇮🇹 +39</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="999 9999999 *"
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full px-4 py-3.5 text-zinc-900 text-sm outline-none font-medium"
                  />
                </div>

                {/* Dropdown SELECT */}
                <div className="relative w-full">
                  <select
                    {...register("projectType", { required: "Selecting interested category is required" })}
                    className="w-full bg-white border border-zinc-200 focus:border-[#0B5CFF] px-4.5 py-3.5 rounded-xl text-zinc-900 text-sm outline-none transition-all duration-300 font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled selected>Interested in *</option>
                    <option value="Quantitative Surveys">Quantitative Surveys</option>
                    <option value="Qualitative Focus Groups">Qualitative Focus Groups</option>
                    <option value="B2B Expert Interviews">B2B Expert Interviews</option>
                    <option value="B2C Consumer Panels">B2C Consumer Panels</option>
                    <option value="Panelist Recruitment">Careers / Panelist Join</option>
                  </select>
                  <span className="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    <ChevronDown size={16} />
                  </span>
                  {errors.projectType && <span className="mt-1 text-xs text-rose-500 block pl-1 font-semibold">{errors.projectType.message}</span>}
                </div>
              </div>

              {/* Row 3: How can we help? */}
              <div className="relative w-full">
                <textarea
                  rows={4}
                  placeholder="How can we help? *"
                  {...register("details", { required: "Please specify your message details" })}
                  className="w-full bg-white border border-zinc-200 focus:border-[#0B5CFF] px-4.5 py-3.5 rounded-xl text-zinc-900 text-sm outline-none transition-all duration-300 font-medium resize-none"
                />
                {errors.details && <span className="mt-1 text-xs text-rose-500 block pl-1 font-semibold">{errors.details.message}</span>}
              </div>

              {/* Button & terms */}
              <div className="text-center pt-3 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 bg-[#0B5CFF] hover:bg-[#004BE6] text-white text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_12px_rgba(11,92,255,0.15)] flex items-center justify-center mx-auto cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed select-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin mr-2" />
                      SENDING MESSAGE...
                    </>
                  ) : (
                    "Send your message"
                  )}
                </button>
                
                <p className="text-[10px] text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  By clicking, you agree to our <a href="#" className="underline hover:text-zinc-600">Terms & Conditions</a>, <a href="#" className="underline hover:text-zinc-600">Privacy and Data Protection Policy</a>.
                </p>
              </div>

            </form>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block select-none opacity-90 hover:opacity-100 transition-opacity duration-300">
            <RightCartoon />
          </div>

        </div>
      </Container>
    </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2: GET IN TOUCH WITH EGI (MAP + CONTACT INFO)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-zinc-50/50 border-t border-zinc-150 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Eyebrow & Subtitle */}
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0B5CFF] block mb-2">
              GLOBAL OFFICE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-950 leading-tight">
              Get in touch with EGI
            </h2>
          </div>

          {/* Map + card wrapper */}
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-stretch">
            
            {/* Map iframe card */}
            <div className="min-h-[320px] rounded-3xl overflow-hidden border border-zinc-200 bg-white relative shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0664426543415!2d77.62002341482206!3d12.967591690858564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13fc546b528b%3A0xe7f9cbdf2e6d60a5!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1623485749284!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 opacity-90 transition-all duration-500"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Address Details Card */}
            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-zinc-200/50 shadow-sm flex flex-col justify-between">
              
              <div className="space-y-6">
                {/* Address block */}
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                    Address
                  </span>
                  <span className="text-zinc-900 font-bold text-sm leading-relaxed block">
                    EGI Workspace, Cyber City, Bangalore, India
                  </span>
                </div>

                {/* Email block */}
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                    Email
                  </span>
                  <a href="mailto:hello@evoglobalinsight.com" className="text-zinc-900 font-bold text-sm hover:text-[#0B5CFF] transition-colors">
                    hello@evoglobalinsight.com
                  </a>
                </div>

                {/* Phone block */}
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                    Phone
                  </span>
                  <a href="tel:+919999999999" className="text-zinc-900 font-bold text-sm hover:text-[#0B5CFF] transition-colors">
                    +91 99999 99999
                  </a>
                </div>
              </div>

              {/* Social icons row */}
              <div className="mt-8 flex gap-2">
                {[
                  { name: 'linkedin', href: '#', icon: Linkedin },
                  { name: 'twitter', href: '#', icon: Twitter },
                  { name: 'youtube', href: '#', icon: Youtube },
                  { name: 'instagram', href: '#', icon: Instagram },
                  { name: 'chat', href: '#', icon: MessageCircle }
                ].map((soc) => {
                  const IconComp = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.href}
                      className="grid h-9.5 w-9.5 place-items-center rounded-full bg-white border border-zinc-200 text-zinc-600 hover:border-[#0B5CFF] hover:text-[#0B5CFF] shadow-sm transition-all duration-300"
                    >
                      <IconComp size={15} />
                    </a>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
