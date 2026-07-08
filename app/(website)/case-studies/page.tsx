"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Clock, 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  X, 
  ChevronRight, 
  Briefcase, 
  Building2, 
  FileCheck2,
  Users
} from "lucide-react";
import { Container, Reveal } from "@/components/primitives";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SafeImage } from "@/components/common/SafeImage";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tagline: string;
  respondentsSize: string;
  markets: string;
  methodology: string;
  devices: string;
  image: string;
  industry?: string;
  objective: string;
  targetAudience: {
    description: string;
    details: string[];
  }[];
  qualityControls: string[];
  outcomes: string[];
  highlights: {
    parameter: string;
    details: string;
  }[];
  strategy?: string;
  contribution: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "cawi-marketing",
    title: "B2B CAWI Research | Marketing & Advertising Decision Makers",
    category: "B2B CAWI",
    tagline: "Unlocking advertising strategies and campaign decision-making among senior marketers across international markets.",
    respondentsSize: "2,500+ Verified Professionals",
    markets: "UK, India, Australia, New Zealand",
    methodology: "CAWI",
    devices: "Mobile, Tablet & Desktop Compatible",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
    industry: "Advertising, Marketing & Media",
    objective: "To understand the evolving advertising strategies, media investments, and campaign decision-making processes among senior marketing professionals working both in-house and within advertising agencies across multiple international markets.",
    targetAudience: [
      {
        description: "Target Group 1 – Advertisers (Brand Side)",
        details: [
          "Working within the Marketing or Advertising department",
          "Holding managerial or higher positions (Manager, Senior Manager, Director, VP, C-Level)",
          "Employed full-time, part-time, or self-employed",
          "Age 21–65 years"
        ]
      },
      {
        description: "Target Group 2 – Advertising Agencies",
        details: [
          "Professionals working in Marketing, Advertising or Media agencies",
          "Marketing & Advertising department",
          "Manager level and above",
          "Age 21–65 years"
        ]
      }
    ],
    qualityControls: [
      "Digital Footprint Tracking",
      "Device Fingerprinting",
      "IP Address Validation",
      "Geo-location Verification",
      "Duplicate Respondent Detection",
      "Speeding & Straight-lining Detection",
      "AI-generated / Open-ended Response Screening",
      "Attention & Logic Checks",
      "Manual Data Quality Review",
      "Blacklisted Respondent Filtering"
    ],
    outcomes: [
      "Successfully recruited verified marketing decision-makers across four international markets.",
      "Delivered high-quality B2B respondents from both advertiser and agency segments while maintaining quota balance.",
      "Achieved high data integrity through multi-layer respondent verification and fraud prevention protocols.",
      "Demonstrated strong capabilities in sourcing hard-to-reach marketing professionals for international CAWI research."
    ],
    highlights: [
      { parameter: "Methodology", details: "CAWI" },
      { parameter: "Markets", details: "UK, India, Australia, New Zealand" },
      { parameter: "Sample Size", details: "2,500+ Completed Interviews" },
      { parameter: "Audience", details: "Marketing & Advertising Decision Makers" },
      { parameter: "Professional Level", details: "Manager and Above" },
      { parameter: "Industry", details: "Advertisers & Agencies" },
      { parameter: "Devices", details: "Mobile, Tablet & Desktop" },
      { parameter: "Quality Controls", details: "IP Validation, Device Fingerprinting, Geo-Verification, AI Detection, Duplicate Removal" }
    ],
    contribution: "Our team successfully managed the complete fieldwork lifecycle, including multi-country feasibility assessment, targeted B2B respondent recruitment, quota management by market and respondent segment, daily fieldwork monitoring, progress reporting, quality validation, respondent verification, and final data delivery within project timelines."
  },
  {
    id: "executive-leadership",
    title: "Executive Leadership Research | B2B CAWI",
    category: "B2B CAWI",
    tagline: "Gathering strategic business insights and transformational priorities from verified C-suite leaders.",
    respondentsSize: "1,200+ C-Level & VPs",
    markets: "United States",
    methodology: "CAWI",
    devices: "Desktop, Mobile & Tablet Compatible",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    industry: "Cross-Industry (Organizations > $20M Revenue)",
    objective: "To collect strategic insights into business priorities, organizational challenges, operational strategies, investment planning, and future growth initiatives from executives responsible for shaping business decisions across multiple industries in the United States.",
    targetAudience: [
      {
        description: "Qualifications & Roles",
        details: [
          "Vice Presidents, Senior VPs, Executive VPs, and C-Level Executives",
          "Employed full-time in organizations with annual revenues exceeding USD 20 Million",
          "Active in strategic business planning and organizational decision-making",
          "Age 25–65 years"
        ]
      },
      {
        description: "Functions & Sectors",
        details: [
          "Functions: Executive Leadership, Administration, Finance, Marketing, Operations, Sales",
          "Sectors: Banking, CPG, Healthcare, Tech, Insurance, Manufacturing, Retail, Media, Non-Profit"
        ]
      }
    ],
    qualityControls: [
      "Digital Footprint Tracking",
      "Device Fingerprinting",
      "IP Address Verification",
      "Geo-location Validation",
      "VPN & Proxy Detection",
      "Duplicate Respondent Detection",
      "Speeding Detection & Straight-lining Analysis",
      "Attention Checks & Logic Validation",
      "AI-generated Response Detection",
      "Open-ended Response Review & Manual QC",
      "Panel Health Monitoring & Blacklist Management"
    ],
    outcomes: [
      "Successfully recruited verified executive decision-makers from revenue-qualified organizations.",
      "Maintained strict industry and seniority quotas across multiple sectors.",
      "Achieved exceptional respondent authenticity through multi-layer fraud prevention.",
      "Delivered high-quality strategic research data within the agreed project timeline."
    ],
    strategy: "Multi-industry feasibility assessment, executive-level respondent sourcing, revenue-based company qualification, invitation-only recruitment, dynamic quota management, continuous fieldwork optimization, real-time progress monitoring, and executive profile verification.",
    highlights: [
      { parameter: "Methodology", details: "CAWI (5 min LOI, 40% IR)" },
      { parameter: "Market", details: "United States" },
      { parameter: "Sample Size", details: "1,200+ Executives" },
      { parameter: "Target Audience", details: "VP, SVP, EVP, C-Level" },
      { parameter: "Company Qualification", details: "Annual Revenue Above USD 20 Million" },
      { parameter: "Survey Compatibility", details: "Desktop, Mobile, Tablet" },
      { parameter: "Quality Controls", details: "Digital Footprint, VPN Detection, AI Screening, Duplicate Prevention" }
    ],
    contribution: "Evo Global Insight managed the project from feasibility assessment through final data delivery, including executive recruitment, company revenue qualification, department and seniority verification, quota management, fieldwork monitoring, respondent validation, daily project reporting, quality assurance, and final data processing."
  },
  {
    id: "finance-professionals",
    title: "B2B CAWI Research | Small Business Finance Professionals",
    category: "B2B CAWI",
    tagline: "Exploring financial management practices and software adoption among accountants and bookkeepers.",
    respondentsSize: "3,000+ Bookkeepers & Accountants",
    markets: "Australia, United States, United Kingdom",
    methodology: "CAWI",
    devices: "Desktop, Mobile & Tablet Compatible",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200",
    industry: "Financial Services & Accounting",
    objective: "To generate actionable insights into financial management practices, accounting software usage, operational challenges, purchasing behavior, and decision-making processes among finance professionals responsible for managing the day-to-day financial operations of small enterprises.",
    targetAudience: [
      {
        description: "Target Qualifications",
        details: [
          "Qualified Accountants and Bookkeepers working in small businesses",
          "Organizations with 1-10 employees (Small Business segment)",
          "Responsible for financial record keeping, bookkeeping, accounting, or software decisions",
          "Fully vetted and qualified before entering the survey"
        ]
      }
    ],
    qualityControls: [
      "Digital Footprint Tracking",
      "Device Fingerprinting",
      "IP Address Validation",
      "Geo-location Verification",
      "Duplicate Response Detection",
      "Speeding Detection & Straight-lining Analysis",
      "Attention & Consistency Checks",
      "Open-ended Response Quality Review",
      "Manual Quality Audits by Research Operations Team"
    ],
    outcomes: [
      "Successfully delivered verified finance professionals across three international markets.",
      "Achieved all quota requirements while maintaining exceptional respondent quality.",
      "Minimized respondent replacement rate through advanced validation protocols.",
      "Delivered validated, decision-ready data within the agreed project timeline."
    ],
    highlights: [
      { parameter: "Methodology", details: "CAWI (12 min LOI)" },
      { parameter: "Markets Covered", details: "Australia, United States, United Kingdom" },
      { parameter: "Sample Size", details: "3,000+ Finance Professionals" },
      { parameter: "Target Audience", details: "Accountants & Bookkeepers" },
      { parameter: "Company Size", details: "Small Businesses (1-10 Employees)" },
      { parameter: "Quality Controls", details: "Device Fingerprinting, Speeding Detection, Open-ended QC, Manual Audits" },
      { parameter: "Compatibility", details: "Desktop, Mobile, Tablet" }
    ],
    contribution: "Evo Global Insight managed the project end-to-end, including multi-country feasibility assessment, respondent recruitment, professional qualification screening, quota management, fieldwork monitoring, respondent validation, quality assurance, daily reporting, and final data delivery."
  }
];

export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Background radial soft light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(92,142,255,0.04),transparent_60%)] pointer-events-none" />
        
        <Container>
          <Reveal delay={0.05}>
            <div className="max-w-3xl">
              <span className="text-[10px] font-black tracking-widest text-[#5C8EFF] uppercase bg-[#5C8EFF]/5 px-3 py-1.5 rounded-full border border-[#5C8EFF]/15">
                Proven Track Record
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-950 mt-4 mb-6 leading-none">
                B2B Research <br/>
                <span className="text-[#5C8EFF]">Case Studies</span>
              </h1>
              <p className="text-zinc-650 text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore how Evo Global Insight partners with leading market research agencies to successfully deliver high-incidence, verified B2B audiences across complex international CAWI projects.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Grid of Case Studies */}
      <section className="pb-24 bg-[#FAF9F6]/20 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudiesData.map((study, idx) => (
              <Reveal key={study.id} delay={idx * 0.1 + 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex flex-col bg-white rounded-3xl border border-zinc-200/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Aspect Ratio Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-50 border-b border-zinc-100">
                    <SafeImage
                      src={study.image}
                      alt={study.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      {study.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div className="space-y-4">
                      {/* Title */}
                      <h3 className="text-xl font-black text-zinc-950 tracking-tight leading-snug group-hover:text-[#5C8EFF] transition-colors duration-300">
                        {study.title}
                      </h3>
                      
                      {/* Tagline */}
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        {study.tagline}
                      </p>

                      {/* Main Highlights/Metrics */}
                      <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-600">
                        <div>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Sample Size</p>
                          <p className="text-zinc-900 font-bold text-sm mt-0.5 flex items-center gap-1">
                            <Users size={14} className="text-[#5C8EFF]" />
                            {study.respondentsSize.split(" ")[0]}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Markets</p>
                          <p className="text-zinc-900 font-bold mt-0.5 truncate flex items-center gap-1" title={study.markets}>
                            <Globe size={14} className="text-[#5C8EFF]" />
                            {study.markets.split(",").length > 2 ? "Multi-Country" : study.markets}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveStudy(study)}
                      className="mt-8 w-full inline-flex items-center justify-center rounded-2xl border border-zinc-200 hover:border-[#5C8EFF] bg-zinc-50 hover:bg-[#5C8EFF]/5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-800 hover:text-[#5C8EFF] transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      Read Case Study
                      <ChevronRight size={14} className="ml-1.5" />
                    </button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Details Slide-over / Modal Dialog */}
      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop shadow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStudy(null)}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            {/* Modal Body wrapper */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                className="relative w-full max-w-4xl rounded-3xl bg-white border border-zinc-200 shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header Image banner */}
                <div className="relative h-[200px] sm:h-[300px] w-full bg-zinc-100 overflow-hidden">
                  <SafeImage
                    src={activeStudy.image}
                    alt={activeStudy.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setActiveStudy(null)}
                    className="absolute top-6 right-6 h-10 w-10 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-xs text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer shadow-md"
                  >
                    <X size={20} />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#5C8EFF] bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                      {activeStudy.category}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white mt-4 leading-tight">
                      {activeStudy.title}
                    </h2>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                  
                  {/* Brief overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center gap-2 text-zinc-950 font-black uppercase tracking-tight text-sm">
                        <Briefcase size={16} className="text-[#5C8EFF]" />
                        <span>Project Overview & Objective</span>
                      </div>
                      <p className="text-zinc-650 text-sm sm:text-base leading-relaxed">
                        {activeStudy.objective}
                      </p>
                    </div>

                    {/* Quick Specs card */}
                    <div className="bg-zinc-50 border border-zinc-200/60 p-5 rounded-2xl space-y-3.5 shadow-2xs">
                      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2 text-zinc-900 font-extrabold text-xs uppercase tracking-wider">
                        <Sparkles size={14} className="text-[#5C8EFF]" />
                        <span>Study Specs</span>
                      </div>
                      <div className="space-y-2 text-xs font-semibold text-zinc-600">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Methodology:</span>
                          <span className="text-zinc-900 font-bold">{activeStudy.methodology}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Sample Size:</span>
                          <span className="text-[#5C8EFF] font-bold">{activeStudy.respondentsSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Markets:</span>
                          <span className="text-zinc-900 font-bold truncate max-w-[120px]" title={activeStudy.markets}>{activeStudy.markets}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Device support:</span>
                          <span className="text-zinc-900 font-bold">Multi-device</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target Audience specifications */}
                  <div className="space-y-4 border-t border-zinc-100 pt-6">
                    <div className="flex items-center gap-2 text-zinc-950 font-black uppercase tracking-tight text-sm">
                      <Building2 size={16} className="text-[#5C8EFF]" />
                      <span>Target Audience & Feasibility</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeStudy.targetAudience.map((group, idx) => (
                        <div key={idx} className="border border-zinc-150 p-5 rounded-2xl bg-zinc-50/50">
                          <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-zinc-900 mb-3 border-b pb-2 border-zinc-200">
                            {group.description}
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                            {group.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5C8EFF] mt-2 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Our Contribution */}
                  <div className="space-y-3 border-t border-zinc-100 pt-6">
                    <div className="flex items-center gap-2 text-zinc-950 font-black uppercase tracking-tight text-sm">
                      <FileCheck2 size={16} className="text-[#5C8EFF]" />
                      <span>Our Fieldwork Contribution</span>
                    </div>
                    <p className="text-zinc-650 text-sm sm:text-base leading-relaxed">
                      {activeStudy.contribution}
                    </p>
                    {activeStudy.strategy && (
                      <p className="text-zinc-500 text-xs sm:text-sm italic mt-2">
                        <strong>Strategies used:</strong> {activeStudy.strategy}
                      </p>
                    )}
                  </div>

                  {/* Quality Assurance Controls & Outcomes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-100 pt-6">
                    
                    {/* Quality Controls */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-zinc-950 font-black uppercase tracking-tight text-sm">
                        <ShieldCheck size={16} className="text-emerald-600" />
                        <span>Quality Controls & Anti-Fraud</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeStudy.qualityControls.map((control) => (
                          <span
                            key={control}
                            className="text-[10px] sm:text-xs font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg"
                          >
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-zinc-950 font-black uppercase tracking-tight text-sm">
                        <TrendingUp size={16} className="text-emerald-600" />
                        <span>Project Outcomes & Results</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                        {activeStudy.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Table of Details */}
                  <div className="border-t border-zinc-100 pt-6 space-y-4">
                    <div className="text-zinc-950 font-black uppercase tracking-tight text-sm">
                      Key Highlights Parameter Table
                    </div>
                    <div className="overflow-x-auto border border-zinc-200 rounded-2xl bg-zinc-50/20">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-zinc-200 bg-zinc-50 font-extrabold text-zinc-700">
                            <th className="p-3 sm:p-4">Parameter</th>
                            <th className="p-3 sm:p-4">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeStudy.highlights.map((hl, idx) => (
                            <tr key={idx} className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50/50 text-zinc-600">
                              <td className="p-3 sm:p-4 font-bold text-zinc-900">{hl.parameter}</td>
                              <td className="p-3 sm:p-4">{hl.details}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* Footer buttons */}
                <div className="p-6 border-t border-zinc-150 bg-zinc-50/50 flex justify-end">
                  <button
                    onClick={() => setActiveStudy(null)}
                    className="px-6 py-2.5 rounded-xl border border-zinc-200 hover:border-zinc-400 text-zinc-800 text-xs font-bold uppercase tracking-wider bg-white transition-colors cursor-pointer"
                  >
                    Close Case Study
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <FinalCTA />
    </>
  );
}
