"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function OutcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    const s = searchParams.get("status");
    if (s) {
      setStatus(s.toLowerCase());
    } else {
      setStatus("unknown");
    }
  }, [searchParams]);

  const handleReturn = () => {
    router.push("/user-dashboard/surveys");
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-zinc-900">Validating your survey...</h2>
        <p className="text-zinc-500 mt-2">Please wait a moment while we confirm with the provider.</p>
      </div>
    );
  }

  let icon = <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />;
  let title = "Survey Completed!";
  let description = "Thank you for participating. Your reward has been credited to your wallet.";
  let bgColor = "bg-emerald-50";

  if (status === "screened_out" || status === "screenout" || status === "terminated") {
    icon = <XCircle className="w-16 h-16 text-zinc-400 mb-4" />;
    title = "Survey Terminated";
    description = "Unfortunately, you did not match the required profile for this survey.";
    bgColor = "bg-zinc-50";
  } else if (status === "quota_full" || status === "quota") {
    icon = <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />;
    title = "Quota Reached";
    description = "The provider already received enough responses for this demographic.";
    bgColor = "bg-amber-50";
  } else if (status === "security_failure" || status === "security") {
    icon = <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />;
    title = "Quality Check Failed";
    description = "Your responses did not pass the provider's quality checks. Please answer carefully next time.";
    bgColor = "bg-red-50";
  } else if (status === "unknown") {
    title = "Survey Outcome";
    description = "Your survey session has ended. Check your wallet history to see if points were awarded.";
  }

  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <div className={`rounded-3xl border border-zinc-200 shadow-sm p-8 text-center ${bgColor}`}>
        <div className="flex justify-center">{icon}</div>
        <h1 className="text-2xl font-extrabold text-zinc-900 mb-2">{title}</h1>
        <p className="text-zinc-600 mb-8">{description}</p>
        
        <Button 
          onClick={handleReturn}
          className="w-full h-12 bg-zinc-900 text-white font-bold hover:bg-zinc-800"
        >
          Return to Surveys
        </Button>
      </div>
    </div>
  );
}

export default function OutcomePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <OutcomeContent />
    </Suspense>
  );
}
