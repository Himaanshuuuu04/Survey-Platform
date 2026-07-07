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
  ArrowRight,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
    const surveyQuestions = activeSurvey.questions && activeSurvey.questions.length > 0
      ? activeSurvey.questions
      : DEFAULT_QUESTIONS;
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
        setSurveyStep(surveyQuestions.length + 1);
        refreshUser();
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Error completing survey:", err);
    } finally {
      setCompleting(false);
    }
  };

  const surveyQuestions = activeSurvey?.questions && activeSurvey.questions.length > 0
    ? activeSurvey.questions
    : DEFAULT_QUESTIONS;

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-12">
      
      {/* Middle Column (3/4 width on desktop) */}
      <div className="flex-1 lg:max-w-[73%] space-y-8">
        
        {/* Featured Surveys Section */}
        <Card className="border-zinc-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-zinc-900">Featured Surveys</CardTitle>
            <CardDescription>Earn Evo points by completing targeted questionnaires.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="best" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-sm mb-6 bg-zinc-100">
                <TabsTrigger value="best" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold">
                  Best Surveys
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold">
                  My Completed ({stats.surveysCompleted})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="best" className="mt-0">
                {loading ? (
                  <div className="h-48 flex items-center justify-center text-zinc-500 text-sm">
                    Loading active surveys...
                  </div>
                ) : surveys.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-zinc-500 text-sm border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                    <ClipboardList className="w-10 h-10 text-zinc-400 mb-2" />
                    <p className="font-bold text-zinc-700">No surveys at the moment</p>
                    <p className="text-zinc-500 mt-1">Check back later for more opportunities!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {surveys.slice(0, 6).map((survey) => (
                      <Card 
                        key={survey._id}
                        className="group flex flex-col justify-between overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white"
                        onClick={() => handleStartSurvey(survey)}
                      >
                        <CardHeader className="p-5 pb-0">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider bg-zinc-50">
                              {survey.provider}
                            </Badge>
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 font-black gap-1 px-2">
                              <Coins className="w-3 h-3" />
                              +{survey.rewardPoints} PTS
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {survey.title}
                          </CardTitle>
                        </CardHeader>
                        <CardFooter className="p-5 pt-4 mt-auto border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{survey.estimatedTimeMins} mins</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {survey.deviceCompatibility.includes("desktop") && <Monitor className="w-3.5 h-3.5" />}
                            {survey.deviceCompatibility.includes("mobile") && <Smartphone className="w-3.5 h-3.5" />}
                            {survey.deviceCompatibility.includes("tablet") && <Globe className="w-3.5 h-3.5" />}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="h-48 flex flex-col items-center justify-center text-zinc-500 text-sm border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mb-2" />
                  <p className="font-bold text-zinc-900">Great job!</p>
                  <p>You have completed {stats.surveysCompleted} surveys in total.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="border-zinc-200 shadow-sm bg-white">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-zinc-900">Recent Activity</CardTitle>
              <CardDescription>Latest transactions logged in your wallet</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold text-xs">
              <Link href="/user-dashboard/wallet">
                Full History <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-32 flex items-center justify-center text-zinc-500 text-sm">
                Fetching activity history...
              </div>
            ) : !data || data.recentActivity.length === 0 ? (
              <div className="h-32 flex flex-col items-center justify-center text-zinc-500 text-sm text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                <Coins className="w-8 h-8 text-zinc-400 mb-2" />
                <p>No recent activity. Complete your first survey to start earning!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Activity</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Amount</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentActivity.map((activity) => (
                    <TableRow key={activity._id} className="border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <TableCell className="font-semibold text-sm max-w-xs sm:max-w-sm truncate text-zinc-900">
                        {activity.description}
                      </TableCell>
                      <TableCell className="text-xs font-medium capitalize text-zinc-600">
                        {activity.category.replace("_", " ")}
                      </TableCell>
                      <TableCell className={`font-bold text-sm ${activity.type === "credit" ? "text-emerald-600" : "text-rose-600"}`}>
                        {activity.type === "credit" ? "+" : "-"}{activity.amount.toLocaleString()} pts
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            activity.status === "completed" 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : activity.status === "pending"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-zinc-500 font-medium">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column (1/4 width on desktop) */}
      <div className="w-full lg:w-[27%] space-y-6">
        
        {/* Balance Card */}
        <Card className="border-zinc-200 shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Coins className="w-24 h-24 text-blue-600" />
          </div>
          <CardHeader className="pb-2 relative z-10">
            <CardDescription className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Available Balance</CardDescription>
            <div className="flex items-baseline justify-between mt-1">
              <CardTitle className="text-3xl font-black text-zinc-900">${stats.usdBalance.toFixed(2)} USD</CardTitle>
            </div>
            <div className="text-xs text-zinc-500 font-bold">{stats.currentPoints.toLocaleString()} PTS</div>
          </CardHeader>
          <CardContent className="relative z-10 pb-4">
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-[11px] font-bold text-zinc-600">
                <span>Goal Progress</span>
                <span>${stats.usdBalance.toFixed(2)} / $5.00</span>
              </div>
              <Progress value={progressPercent} className="h-2.5 bg-zinc-100" />
            </div>
          </CardContent>
          <CardFooter className="relative z-10 pt-2 pb-6">
            <Button 
              asChild 
              disabled={!isGoalReached} 
              className={`w-full h-12 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                isGoalReached 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 hover:shadow-lg"
                  : "bg-zinc-100 text-zinc-400 hover:bg-zinc-100 cursor-not-allowed border border-zinc-200 shadow-none"
              }`}
            >
              <Link href={isGoalReached ? "/user-dashboard/redeem" : "#"}>
                <Gift className="w-4 h-4 mr-2" />
                Cashout
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Account Statistics */}
        <Card className="border-zinc-200 shadow-sm bg-white">
          <CardHeader className="pb-4 border-b border-zinc-100">
            <CardTitle className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Account statistics</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100">
              
              <Link href="/user-dashboard/wallet" className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Earnings</p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">{stats.lifetimeEarnings.toFixed(2)} Points</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </Link>

              <Link href="/user-dashboard/surveys" className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Surveys Completed</p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">{stats.surveysCompleted}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </Link>

              <Link href="/user-dashboard/wallet" className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pending Rewards</p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">{stats.pendingPoints.toLocaleString()} PTS</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </Link>

              <Link href="/user-dashboard/referrals" className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Referral Code</p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">{stats.referralCode || "GET CODE"}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </Link>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Survey Completion Dialog */}
      <Dialog open={!!activeSurvey} onOpenChange={(open) => !open && handleCloseSurvey()}>
        <DialogContent className="sm:max-w-lg bg-white border-zinc-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-zinc-900">
              {surveyStep === 0 ? "Survey Verification" : 
               surveyStep <= surveyQuestions.length ? `Question ${surveyStep} of ${surveyQuestions.length}` :
               "Survey Completed!"}
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              {surveyStep === 0 && activeSurvey && (
                <>Provider: <span className="font-semibold text-zinc-700">{activeSurvey.provider}</span></>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            {surveyStep === 0 && activeSurvey && (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-4 text-sm text-zinc-600">
                  <h3 className="font-bold text-lg text-zinc-900">{activeSurvey.title}</h3>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span className="font-medium">Time Commitment:</span>
                    <span className="text-zinc-900 font-bold">{activeSurvey.estimatedTimeMins} Minutes</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                    <span className="font-medium">Compatibility:</span>
                    <span className="text-zinc-900 font-bold capitalize">{activeSurvey.deviceCompatibility.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Reward Value:</span>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-black text-sm px-3 py-1">
                      +{activeSurvey.rewardPoints.toLocaleString()} PTS
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setSurveyStep(1)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold uppercase tracking-wider text-xs shadow-md hover:opacity-90"
                >
                  Begin Questionnaire
                </Button>
              </div>
            )}

            {surveyStep >= 1 && surveyStep <= surveyQuestions.length && (() => {
              const currentQuestion = surveyQuestions[surveyStep - 1];
              const key = `q${surveyStep}`;
              const isLastQuestion = surveyStep === surveyQuestions.length;

              return (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-zinc-900 leading-snug">{currentQuestion.questionText}</h4>
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => (
                      <Button
                        key={opt}
                        variant="outline"
                        onClick={() => handleAnswerSelect(key, opt)}
                        className={`w-full justify-start h-auto py-4 px-5 whitespace-normal text-left text-sm font-medium transition-all rounded-xl ${
                          answers[key] === opt 
                            ? "bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-50 hover:text-blue-800 ring-1 ring-blue-400" 
                            : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                        }`}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                  <Button
                    disabled={!answers[key] || (isLastQuestion && completing)}
                    onClick={isLastQuestion ? handleSubmitSurveyAnswers : () => setSurveyStep(surveyStep + 1)}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-6"
                  >
                    {isLastQuestion ? (
                      completing ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      ) : (
                        <><span>Submit Response</span> <CheckCircle className="w-4 h-4 ml-1" /></>
                      )
                    ) : (
                      <><span>Next Question</span> <ArrowRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </div>
              );
            })()}

            {surveyStep === (surveyQuestions.length + 1) && (
              <div className="text-center py-8 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto animate-bounce shadow-sm">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-zinc-900">Awesome!</h3>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                    Your answers were submitted successfully. Your wallet has been credited.
                  </p>
                </div>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 font-bold text-base px-4 py-2 border-none">
                  <Coins className="w-5 h-5 mr-2" />
                  +{activeSurvey?.rewardPoints.toLocaleString()} Evo Points
                </Badge>
                <div className="pt-6">
                  <Button
                    variant="outline"
                    onClick={handleCloseSurvey}
                    className="w-full h-12 rounded-xl border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-xs hover:bg-zinc-50"
                  >
                    Close & Return to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
