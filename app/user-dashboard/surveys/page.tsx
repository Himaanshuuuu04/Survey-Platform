"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  ClipboardList, 
  Clock, 
  Coins, 
  Monitor, 
  Smartphone, 
  Globe, 
  CheckCircle,
  HelpCircle,
  X,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SurveyType {
  _id: string;
  title: string;
  provider: string;
  rewardPoints: number;
  estimatedTimeMins: number;
  countryEligibility: string[];
  deviceCompatibility: string[];
  urlOrApiEndpoint: string;
}

export default function SurveysPage() {
  const { user } = useUser();
  const { refreshUser } = useDBUser();
  const [surveys, setSurveys] = useState<SurveyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTime, setFilterTime] = useState<string>("all"); // 'all' | 'short' | 'long'
  const [filterProvider, setFilterProvider] = useState<string>("all");

  // Modal / Survey taking states
  const [activeSurvey, setActiveSurvey] = useState<SurveyType | null>(null);
  const [surveyStep, setSurveyStep] = useState<number>(0); // 0: Intro, 1: Q1, 2: Q2, 3: Q3, 4: Success
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completing, setCompleting] = useState(false);

  const fetchSurveys = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/surveys", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const data = await res.json();
      if (data.success) {
        setSurveys(data.data);
      }
    } catch (err) {
      console.error("Error fetching surveys:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [user]);

  const handleStartSurvey = (survey: SurveyType) => {
    setActiveSurvey(survey);
    setSurveyStep(0);
    setAnswers({});
  };

  const handleCloseSurvey = () => {
    setActiveSurvey(null);
    setSurveyStep(0);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitSurveyAnswers = async () => {
    if (!activeSurvey || !user) return;
    setCompleting(true);
    try {
      const res = await fetch("/api/user/surveys/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": user.id,
        },
        body: JSON.stringify({ surveyId: activeSurvey._id }),
      });
      const json = await res.json();
      if (json.success) {
        setSurveyStep(4); // Success step
        refreshUser(); // Refresh global balance
      } else {
        alert(json.error || "Failed to submit survey");
      }
    } catch (err) {
      console.error("Error completing survey:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  // Filter surveys
  const filteredSurveys = surveys.filter((s) => {
    const timeMatch = 
      filterTime === "all" ||
      (filterTime === "short" && s.estimatedTimeMins <= 10) ||
      (filterTime === "long" && s.estimatedTimeMins > 10);
    
    const providerMatch = 
      filterProvider === "all" || 
      s.provider.toLowerCase() === filterProvider.toLowerCase();

    return timeMatch && providerMatch;
  });

  const providers = Array.from(new Set(surveys.map((s) => s.provider)));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-[#5C8EFF]" />
          <span>Available Surveys</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          Participate in high-yielding research surveys curated for your profile. Complete fully to earn points.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-zinc-900/20 border border-zinc-850 p-4 rounded-2xl backdrop-blur-md">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-zinc-550 tracking-wider block">Duration</label>
          <select 
            value={filterTime} 
            onChange={(e) => setFilterTime(e.target.value)}
            className="bg-zinc-850 border border-zinc-800 text-zinc-300 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#5C8EFF] focus:border-[#5C8EFF] outline-none"
          >
            <option value="all">All Durations</option>
            <option value="short">Short (≤ 10 mins)</option>
            <option value="long">Long (&gt; 10 mins)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-zinc-550 tracking-wider block">Provider</label>
          <select 
            value={filterProvider} 
            onChange={(e) => setFilterProvider(e.target.value)}
            className="bg-zinc-850 border border-zinc-800 text-zinc-300 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#5C8EFF] focus:border-[#5C8EFF] outline-none"
          >
            <option value="all">All Providers</option>
            {providers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Surveys List */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-sm">
          <div className="w-10 h-10 border-2 border-[#5C8EFF] border-t-transparent animate-spin rounded-full mb-4" />
          <span>Searching active survey routers...</span>
        </div>
      ) : filteredSurveys.length === 0 ? (
        <div className="h-64 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-zinc-500">
          <HelpCircle className="w-12 h-12 text-zinc-700 mb-2" />
          <p className="font-medium text-white">No Surveys Found</p>
          <p className="text-xs text-zinc-450 mt-1">Try resetting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSurveys.map((survey) => (
            <motion.div
              layout
              key={survey._id}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-6 flex flex-col justify-between hover:bg-zinc-900/50 hover:border-zinc-700/60 transition-all duration-300 group"
            >
              <div>
                {/* Provider Tag & Platform Support */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] font-bold tracking-wider uppercase">
                    {survey.provider}
                  </span>
                  
                  <div className="flex gap-2 text-zinc-500">
                    {survey.deviceCompatibility.includes("desktop") && (
                      <span title="Desktop compatible">
                        <Monitor className="w-4 h-4" />
                      </span>
                    )}
                    {(survey.deviceCompatibility.includes("mobile") || survey.deviceCompatibility.includes("ios") || survey.deviceCompatibility.includes("android")) && (
                      <span title="Mobile compatible">
                        <Smartphone className="w-4 h-4" />
                      </span>
                    )}
                    <span title="Global Eligibility">
                      <Globe className="w-4 h-4 text-zinc-650" />
                    </span>
                  </div>
                </div>

                <h3 className="text-md font-bold text-white group-hover:text-[#5C8EFF] transition-colors leading-snug">
                  {survey.title}
                </h3>
              </div>

              {/* Timing, Rewards, CTA */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span>{survey.estimatedTimeMins} mins</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-400/5 border border-amber-400/10 px-2.5 py-1 rounded-xl">
                    <Coins className="w-4 h-4" />
                    <span>{survey.rewardPoints.toLocaleString()} PTS</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSurvey(survey)}
                  className="px-4 py-2 rounded-xl bg-[#5C8EFF] hover:bg-[#5C8EFF]/90 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all"
                >
                  Start
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Survey Completion Modal / Wizard */}
      <AnimatePresence>
        {activeSurvey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSurvey}
              className="absolute inset-0 bg-black"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              {surveyStep !== 4 && (
                <button 
                  onClick={handleCloseSurvey}
                  className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white rounded-lg border border-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Progress Dot Indicator */}
              {surveyStep > 0 && surveyStep < 4 && (
                <div className="flex gap-1.5 mb-6">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`h-1.5 flex-1 rounded-full ${
                        surveyStep >= step ? "bg-[#5C8EFF]" : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Step Contents */}
              {surveyStep === 0 && (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#5C8EFF]/10 text-[#5C8EFF] flex items-center justify-center mx-auto">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{activeSurvey.title}</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    This is a market research survey. Please answer all questions honestly. It will take approximately {activeSurvey.estimatedTimeMins} minutes.
                  </p>
                  <div className="flex justify-center gap-4 text-xs font-semibold py-2">
                    <span className="text-zinc-500">Reward:</span>
                    <span className="text-amber-400 font-bold">{activeSurvey.rewardPoints.toLocaleString()} Evo Points ($${(activeSurvey.rewardPoints / 1000).toFixed(2)})</span>
                  </div>
                  <button
                    onClick={() => setSurveyStep(1)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold uppercase tracking-wider text-xs shadow-lg hover:scale-[1.01] transition-transform"
                  >
                    Agree & Begin Survey
                  </button>
                </div>
              )}

              {surveyStep === 1 && (
                <div className="space-y-6">
                  <span className="text-[10px] font-bold text-[#5C8EFF] uppercase tracking-widest">Question 1 of 3</span>
                  <h4 className="text-md font-bold text-white">How frequently do you research products online before making a purchase?</h4>
                  <div className="space-y-2.5">
                    {["Every single time", "Only for expensive items", "Occasionally", "Rarely or never"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerSelect("q1", opt)}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                          answers.q1 === opt 
                            ? "bg-[#5C8EFF]/10 border-[#5C8EFF] text-white font-semibold" 
                            : "bg-zinc-850/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!answers.q1}
                    onClick={() => setSurveyStep(2)}
                    className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white font-bold uppercase tracking-wider text-xs disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {surveyStep === 2 && (
                <div className="space-y-6">
                  <span className="text-[10px] font-bold text-[#5C8EFF] uppercase tracking-widest">Question 2 of 3</span>
                  <h4 className="text-md font-bold text-white">Which of these digital rewards do you redeem most frequently?</h4>
                  <div className="space-y-2.5">
                    {["Amazon Gift Cards", "Google Play / Apple Gift Cards", "PayPal / Cash payouts", "Brand discounts"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerSelect("q2", opt)}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                          answers.q2 === opt 
                            ? "bg-[#5C8EFF]/10 border-[#5C8EFF] text-white font-semibold" 
                            : "bg-zinc-850/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!answers.q2}
                    onClick={() => setSurveyStep(3)}
                    className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white font-bold uppercase tracking-wider text-xs disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {surveyStep === 3 && (
                <div className="space-y-6">
                  <span className="text-[10px] font-bold text-[#5C8EFF] uppercase tracking-widest">Question 3 of 3</span>
                  <h4 className="text-md font-bold text-white">How likely are you to recommend Evo Rewards to a friend or colleague?</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleAnswerSelect("q3", String(val))}
                        className={`py-3 rounded-xl border text-center font-bold text-sm transition-all ${
                          answers.q3 === String(val)
                            ? "bg-[#5C8EFF]/10 border-[#5C8EFF] text-white"
                            : "bg-zinc-850/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-550 uppercase font-black tracking-widest">
                    <span>Not likely</span>
                    <span>Very likely</span>
                  </div>
                  <button
                    disabled={!answers.q3 || completing}
                    onClick={handleSubmitSurveyAnswers}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold uppercase tracking-wider text-xs disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                  >
                    {completing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    ) : (
                      <>
                        <span>Submit Survey</span>
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {surveyStep === 4 && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Survey Completed!</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Your answers were submitted successfully. Your wallet has been credited with the reward.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold text-sm mx-auto">
                    <Coins className="w-4 h-4" />
                    <span>+{activeSurvey.rewardPoints.toLocaleString()} Evo Points</span>
                  </div>
                  <button
                    onClick={handleCloseSurvey}
                    className="w-full py-3 rounded-xl bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white font-bold uppercase tracking-wider text-xs transition-all"
                  >
                    Back to Surveys
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
