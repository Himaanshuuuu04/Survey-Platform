"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Coins, Gift, ShieldCheck, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlurText from "@/components/BlurText";
import TextType from "@/components/TextType";

function ReferralSignUp() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || undefined;

  return (
    <SignUp 
      path="/register"
      routing="path"
      signInUrl="/login"
      unsafeMetadata={refCode ? { referredByCode: refCode } : undefined}
      appearance={{
        elements: {
          logoBox: "hidden",
          card: "bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-xl rounded-3xl w-full p-2",
          headerTitle: "text-zinc-900 font-bold text-xl",
          headerSubtitle: "text-zinc-500 text-sm mt-1",
          socialButtonsBlockButton: "bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold rounded-xl py-2.5 transition-all shadow-sm",
          socialButtonsBlockButtonText: "text-zinc-700 font-semibold text-xs",
          dividerLine: "bg-zinc-200",
          dividerText: "text-zinc-400 font-bold text-[10px] uppercase tracking-wider",
          formButtonPrimary: "bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-[#5C8EFF]/10 hover:scale-[1.01] active:scale-100 transition-all",
          formFieldLabel: "text-zinc-500 font-bold text-[10px] uppercase tracking-wider",
          formFieldInput: "bg-white border border-zinc-200 focus:border-[#5C8EFF] focus:ring-1 focus:ring-[#5C8EFF] text-zinc-900 rounded-xl py-2.5 px-3.5 text-sm transition-all",
          footerActionText: "text-zinc-500 text-xs font-medium",
          footerActionLink: "text-[#5C8EFF] hover:text-[#5C8EFF]/80 font-bold transition-colors text-xs",
          identityPreviewText: "text-zinc-800 font-medium",
          identityPreviewEditButtonIcon: "text-[#5C8EFF]",
          formResendCodeLink: "text-[#5C8EFF] hover:text-[#5C8EFF]/80 font-bold",
          formFieldInputShowHideButton: "text-zinc-400 hover:text-zinc-650",
        }
      }}
    />
  );
}

export default function RegisterPage() {
  const benefits = [
    { 
      icon: Coins, 
      title: "Earn Evo Points", 
      desc: "Complete high-yield, targeted consumer surveys tailored for you.",
      color: "text-amber-600 bg-amber-500/10 border-amber-500/20"
    },
    { 
      icon: Gift, 
      title: "Instant Cashouts", 
      desc: "Redeem directly for Amazon, Steam, Apple, Google Play and PayPal cards.",
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
    },
    { 
      icon: Users, 
      title: "10% Referral Bonus", 
      desc: "Get lifetime points bonuses by inviting your friends and colleagues.",
      color: "text-[#02A8B8] bg-[#02E8F8]/10 border-[#02E8F8]/20"
    },
    { 
      icon: ShieldCheck, 
      title: "100% Privacy Guarded", 
      desc: "Your data is anonymized and secured using industry-standard protocols.",
      color: "text-blue-600 bg-blue-500/10 border-blue-500/20"
    }
  ];

  return (
    <div 
      className="min-h-screen w-full bg-white flex flex-col lg:flex-row relative overflow-hidden font-sans"
      style={{
        backgroundImage: 'radial-gradient(#E4E4E7 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      
      {/* Animated Mesh Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#5C8EFF]/5 blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#02E8F8]/5 blur-3xl"
        />
      </div>

      {/* Left Column: Visual Branding & Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10 border-r border-zinc-200 bg-white/40 backdrop-blur-md">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#5C8EFF] to-[#02E8F8] text-white">
            <Coins className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 select-none">
            Evo<span className="text-[#5C8EFF] uppercase">Rewards</span>
          </span>
        </Link>

        {/* Benefits List */}
        <div className="space-y-8 my-auto max-w-lg">
          <div className="space-y-3">
            
            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 leading-tight tracking-tight">
              <BlurText 
                text="Turn your insights into" 
                delay={40} 
                className="inline-flex flex-wrap" 
                animateBy="words" 
              />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8]">
                premium rewards.
              </span>
            </div>
            <div className="min-h-[40px] text-zinc-600 text-sm font-medium">
              <TextType 
                texts={[
                  "Create an account in less than a minute.",
                  "Gain instant access to your targeted survey portal.",
                  "Earn cash-convertible Evo Points daily.",
                  "Redeem directly for premium gift cards & PayPal cash."
                ]}
                typingSpeed={35}
                deletingSpeed={15}
                pauseDuration={3000}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                as="p"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                key={benefit.title}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-zinc-200 hover:border-zinc-300 hover:bg-white shadow-sm transition-all duration-300"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${benefit.color}`}>
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">{benefit.title}</h4>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-500">
          © 2026 EvoGlobalInsight. All rights reserved.
        </p>
      </div>

      {/* Right Column: Clerk Register Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
        {/* Mobile Header Branding */}
        <div className="lg:hidden flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <Coins className="w-7 h-7 text-[#5C8EFF]" />
            <span className="text-xl font-bold tracking-tight text-zinc-900 select-none">
              Evo<span className="text-[#5C8EFF] uppercase">Rewards</span>
            </span>
          </Link>
          <p className="text-xs text-zinc-550 font-medium">Join surveys, earn points, redeem gift cards.</p>
        </div>

        {/* Glow behind register card */}
        <div className="absolute w-80 h-80 rounded-full bg-[#5C8EFF]/5 blur-3xl pointer-events-none" />

        {/* Clerk Sign Up */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Suspense fallback={<div className="text-zinc-500 text-xs">Loading signup...</div>}>
            <ReferralSignUp />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
