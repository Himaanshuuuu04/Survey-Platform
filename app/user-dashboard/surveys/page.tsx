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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SurveyType {
  _id: string;
  title: string;
  provider: string;
  rewardPoints: number;
  estimatedTimeMins: number;
  countryEligibility: string[];
  deviceCompatibility: string[];
  urlOrApiEndpoint: string;
  questions?: Array<{
    questionText: string;
    options: string[];
  }>;
}

const DEFAULT_QUESTIONS = [
  {
    questionText: "How frequently do you research products online before making a purchase?",
    options: ["Every single time", "Only for expensive items", "Occasionally", "Rarely or never"]
  },
  {
    questionText: "Which of these digital rewards do you redeem most frequently?",
    options: ["Amazon Gift Cards", "Google Play / Apple Gift Cards", "PayPal / Cash payouts", "Brand discounts"]
  },
  {
    questionText: "How likely are you to recommend Evo Rewards to a friend or colleague?",
    options: ["1", "2", "3", "4", "5"]
  }
];

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
    if (surveyStep === 999 && activeSurvey) {
      setSurveys((prev) => prev.filter((s) => s._id !== activeSurvey._id));
    }
    setActiveSurvey(null);
    setSurveyStep(0);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const [disqualifiedMessage, setDisqualifiedMessage] = useState<string | null>(null);

  const handleSubmitSurveyAnswers = async () => {
    if (!activeSurvey || !user) return;
    setCompleting(true);
    setDisqualifiedMessage(null);
    
    try {
      const res = await fetch(`/api/user/surveys/${activeSurvey._id}/screener`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": user.id,
        },
        body: JSON.stringify({ answers }),
      });
      const json = await res.json();
      
      if (json.success && json.passed) {
        // Successful pre-screen! Redirect to provider
        window.location.href = json.redirectUrl;
      } else if (!json.passed) {
        // Screened out
        setDisqualifiedMessage(json.message || "You did not qualify for this survey.");
        setSurveyStep(999); // Magic number for disqualified state
      } else {
        alert(json.error || "Failed to submit survey");
      }
    } catch (err) {
      console.error("Error evaluating screener:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  const handleBeginSurvey = async () => {
    if (!activeSurvey || !user) return;
    setCompleting(true);
    try {
      const res = await fetch(`/api/user/surveys/${activeSurvey._id}/start`, {
        method: "POST",
        headers: { "x-clerk-user-id": user.id }
      });
      const data = await res.json();
      if (data.success) {
        // We could store the questions from the API if we want, 
        // but for now we just use the ones already in activeSurvey or DEFAULT
        setSurveyStep(1);
      } else {
        setDisqualifiedMessage(data.error || "Unable to start survey.");
        setSurveyStep(999);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to start survey.");
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
  const currentQuestions = activeSurvey?.questions && activeSurvey.questions.length > 0
    ? activeSurvey.questions
    : DEFAULT_QUESTIONS;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          <span>Available Surveys</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-600 max-w-xl">
          Participate in high-yielding research surveys curated for your profile. Complete fully to earn points.
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardContent className="p-4 flex flex-wrap gap-4 items-center">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Duration</label>
            <select 
              value={filterTime} 
              onChange={(e) => setFilterTime(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-lg px-3 py-2 text-sm font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none w-40"
            >
              <option value="all">All Durations</option>
              <option value="short">Short (≤ 10 mins)</option>
              <option value="long">Long (&gt; 10 mins)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Provider</label>
            <select 
              value={filterProvider} 
              onChange={(e) => setFilterProvider(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-lg px-3 py-2 text-sm font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none w-40"
            >
              <option value="all">All Providers</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Surveys List */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-sm">
          <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent animate-spin rounded-full mb-4" />
          <span>Searching active survey routers...</span>
        </div>
      ) : filteredSurveys.length === 0 ? (
        <div className="h-64 border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-zinc-500">
          <HelpCircle className="w-12 h-12 text-zinc-400 mb-3" />
          <p className="font-bold text-zinc-700">No Surveys Found</p>
          <p className="text-sm text-zinc-500 mt-1">Try resetting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurveys.map((survey) => (
            <Card 
              key={survey._id}
              className="group hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between"
            >
              <CardHeader className="pb-4">
                {/* Provider Tag & Platform Support */}
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-[10px] font-bold tracking-wider uppercase bg-zinc-100 text-zinc-600">
                    {survey.provider}
                  </Badge>
                  
                  <div className="flex gap-2 text-zinc-400">
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
                      <Globe className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {survey.title}
                </CardTitle>
              </CardHeader>

              <CardFooter className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{survey.estimatedTimeMins} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">
                    <Coins className="w-4 h-4" />
                    <span>{survey.rewardPoints.toLocaleString()} PTS</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleStartSurvey(survey)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider"
                  size="sm"
                >
                  Start
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Survey Completion Dialog */}
      <Dialog open={!!activeSurvey} onOpenChange={(open) => !open && handleCloseSurvey()}>
        <DialogContent className="sm:max-w-lg bg-white border-zinc-200">
          {activeSurvey && (
            <>
              {/* Progress Dot Indicator */}
              {surveyStep > 0 && surveyStep <= currentQuestions.length && (
                <div className="flex gap-1.5 mb-2 mt-4">
                  {currentQuestions.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        surveyStep >= (idx + 1) ? "bg-blue-500" : "bg-zinc-100"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Step Contents */}
              {surveyStep === 0 && (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-zinc-900">{activeSurvey.title}</DialogTitle>
                  <DialogDescription className="text-sm text-zinc-600 max-w-sm mx-auto">
                    This is a market research survey. Please answer all questions honestly. It will take approximately {activeSurvey.estimatedTimeMins} minutes.
                  </DialogDescription>
                  <div className="flex justify-center items-center gap-2 text-sm font-semibold py-3 bg-zinc-50 rounded-xl mx-auto w-fit px-6 border border-zinc-200">
                    <span className="text-zinc-600 font-bold">Reward:</span>
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      {activeSurvey.rewardPoints.toLocaleString()} Evo Points (${(activeSurvey.rewardPoints / 1000).toFixed(2)})
                    </span>
                  </div>
                  <Button
                    onClick={handleBeginSurvey}
                    disabled={completing}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 text-white font-bold uppercase tracking-wider text-sm shadow-md"
                  >
                    {completing ? "Loading..." : "Agree & Begin Survey"}
                  </Button>
                </div>
              )}

              {surveyStep >= 1 && surveyStep <= currentQuestions.length && (() => {
                const currentQuestion = currentQuestions[surveyStep - 1];
                const key = `q${surveyStep}`;
                const isLastQuestion = surveyStep === currentQuestions.length;

                return (
                  <div className="space-y-6 py-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                        Question {surveyStep} of {currentQuestions.length}
                      </span>
                      <h4 className="text-lg font-bold text-zinc-900 leading-tight">{currentQuestion.questionText}</h4>
                    </div>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt) => (
                        <Button
                          key={opt}
                          variant="outline"
                          onClick={() => handleAnswerSelect(key, opt)}
                          className={`w-full justify-start h-auto py-4 px-5 text-left text-sm transition-all ${
                            answers[key] === opt 
                              ? "bg-blue-50 border-blue-400 text-blue-700 ring-1 ring-blue-400 font-bold" 
                              : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-medium"
                          }`}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      disabled={!answers[key] || (isLastQuestion && completing)}
                      onClick={isLastQuestion ? handleSubmitSurveyAnswers : () => setSurveyStep(surveyStep + 1)}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 text-white font-bold uppercase tracking-wider text-sm shadow-md"
                    >
                      {isLastQuestion ? (
                        completing ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                        ) : (
                          <>
                            <span>Submit Survey</span>
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )
                      ) : (
                        <>
                          <span>Next Question</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                );
              })()}

              {surveyStep === (currentQuestions.length + 1) && (
                <div className="text-center py-8 space-y-5">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto animate-bounce shadow-sm">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-zinc-900">Survey Completed!</DialogTitle>
                  <DialogDescription className="text-sm text-zinc-600 max-w-sm mx-auto">
                    Your answers were submitted successfully. Your wallet has been credited with the reward.
                  </DialogDescription>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-sm mx-auto shadow-sm">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <span>+{activeSurvey.rewardPoints.toLocaleString()} Evo Points</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCloseSurvey}
                    className="w-full h-12 border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-sm hover:bg-zinc-50 mt-4"
                  >
                    Back to Surveys
                  </Button>
                </div>
              )}
              {surveyStep === 999 && (
                <div className="text-center py-8 space-y-5">
                  <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-sm">
                    <X className="w-10 h-10" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-zinc-900">Not a Match</DialogTitle>
                  <DialogDescription className="text-sm text-zinc-600 max-w-sm mx-auto">
                    {disqualifiedMessage || "Unfortunately, you do not qualify for this survey based on your answers."}
                  </DialogDescription>
                  <Button
                    variant="outline"
                    onClick={handleCloseSurvey}
                    className="w-full h-12 border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-sm hover:bg-zinc-50 mt-4"
                  >
                    Back to Surveys
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
