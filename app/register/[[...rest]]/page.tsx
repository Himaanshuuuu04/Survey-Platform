"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Coins, Gift, ShieldCheck, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
          card: "bg-zinc-900/65 backdrop-blur-xl border border-zinc-850 shadow-2xl rounded-3xl w-full p-2",
          headerTitle: "text-white font-bold text-xl",
          headerSubtitle: "text-zinc-450 text-sm mt-1",
          socialButtonsBlockButton: "bg-zinc-850 hover:bg-zinc-805 border border-zinc-800 text-white font-semibold rounded-xl py-2.5 transition-colors",
          socialButtonsBlockButtonText: "text-white font-semibold text-xs",
          dividerLine: "bg-zinc-800/80",
          dividerText: "text-zinc-500 font-bold text-[10px] uppercase tracking-wider",
          formButtonPrimary: "bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-[#5C8EFF]/20 hover:scale-[1.01] active:scale-100 transition-all",
          formFieldLabel: "text-zinc-350 font-bold text-[10px] uppercase tracking-wider",
          formFieldInput: "bg-zinc-850/80 border border-zinc-800 focus:border-[#5C8EFF] focus:ring-1 focus:ring-[#5C8EFF] text-white rounded-xl py-2.5 px-3.5 text-sm transition-all",
          footerActionText: "text-zinc-400 text-xs font-medium",
          footerActionLink: "text-[#5C8EFF] hover:text-[#5C8EFF]/80 font-bold transition-colors text-xs",
          identityPreviewText: "text-white font-medium",
          identityPreviewEditButtonIcon: "text-[#5C8EFF]",
          formResendCodeLink: "text-[#5C8EFF] hover:text-[#5C8EFF]/80 font-bold",
          formFieldInputShowHideButton: "text-zinc-400 hover:text-white",
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
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    { 
      icon: Gift, 
      title: "Instant Cashouts", 
      desc: "Redeem directly for Amazon, Steam, Apple, Google Play and PayPal cards.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    { 
      icon: Users, 
      title: "10% Referral Bonus", 
      desc: "Get lifetime points bonuses by inviting your friends and colleagues.",
      color: "text-[#02E8F8] bg-[#02E8F8]/10 border-[#02E8F8]/20"
    },
    { 
      icon: ShieldCheck, 
      title: "100% Privacy Guarded", 
      desc: "Your data is anonymized and secured using industry-standard protocols.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col lg:flex-row relative overflow-hidden font-sans">
      
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
          className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#5C8EFF]/10 blur-3xl"
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
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#02E8F8]/10 blur-3xl"
        />
      </div>

      {/* Left Column: Visual Branding & Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10 border-r border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#5C8EFF] to-[#02E8F8] text-white">
            <Coins className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white select-none">
            Evo<span className="text-[#5C8EFF] uppercase">Rewards</span>
          </span>
        </Link>

        {/* Benefits List */}
        <div className="space-y-8 my-auto max-w-lg">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C8EFF]/10 border border-[#5C8EFF]/25 text-[#5C8EFF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Participant Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Turn your insights <br/>
              into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8]">premium rewards.</span>
            </h2>
            <p className="text-zinc-400 text-sm">
              Create an account in less than a minute and gain instant access to your survey portal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                key={benefit.title}
                className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${benefit.color}`}>
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{benefit.title}</h4>
                  <p className="text-xs text-zinc-450 mt-1 leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-550">
          © {new Date().getFullYear()} EvoGlobalInsight. All rights reserved.
        </p>
      </div>

      {/* Right Column: Clerk Register Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
        {/* Mobile Header Branding */}
        <div className="lg:hidden flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <Coins className="w-7 h-7 text-[#5C8EFF]" />
            <span className="text-xl font-bold tracking-tight text-white select-none">
              Evo<span className="text-[#5C8EFF] uppercase">Rewards</span>
            </span>
          </Link>
          <p className="text-xs text-zinc-405">Join surveys, earn points, redeem gift cards.</p>
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
