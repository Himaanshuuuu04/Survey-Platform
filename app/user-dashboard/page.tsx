"use client";

import React, { useState, useEffect } from "react";
import { useDBUser } from "@/components/context/UserContext";
import { useUser } from "@clerk/nextjs";
import { 
  Coins, 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowUpRight, 
  ChevronRight, 
  Gift,
  Monitor,
  Smartphone,
  Globe,
  HelpCircle,
  X,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

interface DashboardData {
  stats: {
    fullName: string;
    email: string;
    currentPoints: number;
    usdBalance: number;
    lifetimeEarnings: number;
    pendingPoints: number;
    surveysCompleted: number;
    referralCode: string;
    referralEarnings: number;
    status: string;
  };
  recentActivity: Array<{
    _id: string;
    type: "credit" | "debit";
    amount: number;
    category: string;
    status: "pending" | "completed" | "rejected";
    description: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const { user } = useUser();
  const { dbUser, refreshUser } = useDBUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [surveys, setSurveys] = useState<SurveyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"best" | "completed">("best");

  // Modal / Survey taking states
  const [activeSurvey, setActiveSurvey] = useState<SurveyType | null>(null);
  const [surveyStep, setSurveyStep] = useState<number>(0); 
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completing, setCompleting] = useState(false);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/dashboard", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard details:", err);
    }
  };

  const fetchSurveys = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/surveys", {
        headers: {
          "x-clerk-user-id": user.id,
        },
      });
      const json = await res.json();
      if (json.success) {
        setSurveys(json.data);
      }
    } catch (err) {
      console.error("Error fetching surveys:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchDashboardData(), fetchSurveys()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, [user, dbUser?.currentPoints]);

  const stats = data?.stats || {
    currentPoints: dbUser?.currentPoints || 0,
    usdBalance: (dbUser?.currentPoints || 0) / 1000,
    lifetimeEarnings: dbUser?.lifetimeEarnings || 0,
    pendingPoints: dbUser?.pendingPoints || 0,
    surveysCompleted: dbUser?.surveysCompleted || 0,
    referralCode: dbUser?.referralCode || "",
  };

  const pointsGoal = 5000;
  const progressPercent = Math.min((stats.currentPoints / pointsGoal) * 100, 100);
  const isGoalReached = stats.currentPoints >= pointsGoal;

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
        setSurveyStep(4);
        refreshUser();
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Error completing survey:", err);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-12 font-sans">
      
      {/* Middle Column (3/4 width on desktop) */}
      <div className="flex-1 lg:max-w-[73%] space-y-8">
        
        {/* Featured Surveys Section */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Featured Surveys</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Earn Evo points by completing targeted questionnaires.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-850 gap-6 mb-6 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => setActiveTab("best")}
              className={`pb-3 relative transition-colors ${activeTab === "best" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              Best Surveys
              {activeTab === "best" && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5C8EFF]" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("completed")}
              className={`pb-3 relative transition-colors ${activeTab === "completed" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              My Completed ({stats.surveysCompleted})
              {activeTab === "completed" && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5C8EFF]" />
              )}
            </button>
          </div>

          {/* Surveys Grid / Carousel */}
          {loading ? (
            <div className="h-48 flex items-center justify-center text-zinc-500 text-xs">
              Loading active surveys...
            </div>
          ) : activeTab === "completed" ? (
            <div className="h-48 flex flex-col items-center justify-center text-zinc-500 text-xs border border-dashed border-zinc-850 rounded-2xl">
              <CheckCircle className="w-10 h-10 text-zinc-700 mb-2" />
              <p>You have completed {stats.surveysCompleted} surveys total.</p>
            </div>
          ) : surveys.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-zinc-500 text-xs border border-dashed border-zinc-850 rounded-2xl">
              <Coins className="w-10 h-10 text-zinc-700 mb-2" />
              <p className="font-semibold text-white">No surveys at the moment</p>
              <p className="text-zinc-550 mt-1">Unfortunately currently there are no surveys. Please check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {surveys.slice(0, 6).map((survey) => (
                <div 
                  key={survey._id}
                  onClick={() => handleStartSurvey(survey)}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl border border-zinc-850/85 bg-zinc-900/20 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Header: Category & Payout */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate max-w-[65%]">
                        {survey.provider}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black shrink-0">
                        <Coins className="w-3.5 h-3.5" />
                        <span>+{survey.rewardPoints} PTS</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-[#5C8EFF] transition-colors leading-snug line-clamp-2">
                      {survey.title}
                    </h3>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-850/60 flex items-center justify-between text-xs text-zinc-450">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{survey.estimatedTimeMins} mins</span>
                    </div>

                    {/* Compatibility */}
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      {survey.deviceCompatibility.includes("desktop") && <Monitor className="w-3.5 h-3.5" />}
                      {survey.deviceCompatibility.includes("mobile") && <Smartphone className="w-3.5 h-3.5" />}
                      {survey.deviceCompatibility.includes("tablet") && <Globe className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity Table */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm font-bold text-white block">Recent Activity</span>
              <span className="text-xs text-zinc-500">Latest transactions logged in your wallet</span>
            </div>
            <Link 
              href="/user-dashboard/wallet"
              className="flex items-center gap-1 text-xs text-[#5C8EFF] font-semibold hover:text-[#5C8EFF]/80 transition-colors"
            >
              <span>Full History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="h-32 flex items-center justify-center text-zinc-500 text-xs">
              Fetching activity history...
            </div>
          ) : !data || data.recentActivity.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center text-zinc-500 text-xs text-center border border-dashed border-zinc-850 rounded-2xl">
              <Coins className="w-8 h-8 text-zinc-700 mb-2" />
              <p>No recent activity. Complete your first survey to start earning!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-850 text-zinc-500 font-bold text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Activity</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/50">
                  {data.recentActivity.map((activity) => (
                    <tr key={activity._id} className="text-zinc-300 hover:bg-zinc-900/20 transition-colors">
                      <td className="py-3.5 font-medium max-w-xs sm:max-w-sm truncate text-white">{activity.description}</td>
                      <td className="py-3.5 text-xs capitalize font-semibold">{activity.category.replace("_", " ")}</td>
                      <td className={`py-3.5 font-bold ${activity.type === "credit" ? "text-emerald-400" : "text-rose-400"}`}>
                        {activity.type === "credit" ? "+" : "-"}{activity.amount.toLocaleString()} pts
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          activity.status === "completed" 
                            ? "bg-emerald-500/10 text-emerald-400" 
                            : activity.status === "pending"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-xs text-zinc-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (1/4 width on desktop) */}
      <div className="w-full lg:w-[27%] space-y-6">
        
        {/* Balance Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md p-6">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Balance:</div>
          
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-3xl font-black text-white">${stats.usdBalance.toFixed(2)} USD</span>
            <span className="text-xs text-zinc-400 font-semibold">{stats.currentPoints.toLocaleString()} PTS</span>
          </div>

          {/* Progress Goal */}
          <div className="space-y-1.5 mb-6">
            <div className="flex justify-between text-[11px] font-bold text-zinc-400">
              <span>Goal Progress</span>
              <span>${stats.usdBalance.toFixed(2)} / $5.00</span>
            </div>
            
            <div className="h-2 w-full bg-zinc-850 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8]"
              />
            </div>
          </div>

          {/* Cashout Button */}
          <Link 
            href="/user-dashboard/redeem"
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isGoalReached 
                ? "bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white hover:scale-[1.02] shadow-lg shadow-[#5C8EFF]/25" 
                : "bg-zinc-800 text-zinc-500 pointer-events-none cursor-not-allowed border border-zinc-750"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Cashout</span>
          </Link>
        </div>

        {/* Account Statistics */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 backdrop-blur-md p-6 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-3">Account statistics</h3>
          
          <div className="space-y-2">
            
            {/* Stat Item: Total Earnings */}
            <Link 
              href="/user-dashboard/wallet"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850/50 hover:border-zinc-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Earnings</p>
                  <p className="text-xs font-bold text-white mt-0.5">${stats.lifetimeEarnings.toFixed(2)} USD</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </Link>

            {/* Stat Item: Completed */}
            <Link 
              href="/user-dashboard/surveys"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850/50 hover:border-zinc-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Surveys Completed</p>
                  <p className="text-xs font-bold text-white mt-0.5">{stats.surveysCompleted}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </Link>

            {/* Stat Item: Pending */}
            <Link 
              href="/user-dashboard/redeem"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850/50 hover:border-zinc-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pending Rewards</p>
                  <p className="text-xs font-bold text-white mt-0.5">{stats.pendingPoints.toLocaleString()} PTS</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </Link>

            {/* Stat Item: Referrals */}
            <Link 
              href="/user-dashboard/referrals"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-850/50 hover:border-zinc-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Referral Code</p>
                  <p className="text-xs font-bold text-white mt-0.5">{stats.referralCode || "GET CODE"}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </Link>

          </div>
        </div>
      </div>

      {/* Survey Completion Wizard Modal Overlay */}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl border border-zinc-850 bg-zinc-900 p-6 shadow-2xl z-10"
            >
              {/* Close Button */}
              {surveyStep !== 4 && (
                <button 
                  onClick={handleCloseSurvey}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Step Renderers */}
              {surveyStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#5C8EFF] uppercase tracking-widest">Survey Verification</span>
                    <h3 className="text-xl font-bold text-white mt-1">{activeSurvey.title}</h3>
                    <p className="text-xs text-zinc-450 mt-1">Provider: {activeSurvey.provider}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-950/50 border border-zinc-855 space-y-3 text-xs text-zinc-350">
                    <div className="flex justify-between">
                      <span>Time Commitment:</span>
                      <span className="text-white font-semibold">{activeSurvey.estimatedTimeMins} Minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compatibility:</span>
                      <span className="text-white font-semibold capitalize">{activeSurvey.deviceCompatibility.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reward Value:</span>
                      <span className="text-amber-400 font-black">+{activeSurvey.rewardPoints.toLocaleString()} PTS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSurveyStep(1)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5C8EFF] to-[#02E8F8] text-white font-bold uppercase tracking-wider text-xs shadow-lg hover:scale-[1.01] transition-transform"
                  >
                    Begin Survey Questionnaire
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
                    className="w-full py-3 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-xs disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
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
                    className="w-full py-3 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-xs disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
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
                        <span>Submit Response</span>
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
                    Close & Return to Dashboard
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
