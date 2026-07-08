"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserCircle, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { useDBUser } from "@/components/context/UserContext";

const GENDERS = ["Male", "Female", "Non-binary", "Prefer to self-describe", "Prefer not to say"];
const EMPLOYMENT_STATUSES = [
  "Employed full-time", "Employed part-time", "Self-employed", "Business owner",
  "Freelancer / Independent contractor", "Student", "Homemaker", "Retired",
  "Unemployed and looking for work", "Unemployed and not currently looking for work", "Prefer not to say"
];
const OCCUPATIONS = [
  "Executive / Senior Management", "Manager / Team Leader", "Professional (Doctor, Lawyer, Engineer, Accountant, etc.)",
  "Sales & Marketing", "Customer Service / Call Center", "Information Technology (IT)", "Finance & Banking",
  "Human Resources", "Healthcare", "Education / Teaching", "Government / Public Sector", "Manufacturing / Production",
  "Retail", "Hospitality & Tourism", "Transportation & Logistics", "Agriculture", "Skilled Trades / Technician",
  "Administrative / Office Support", "Student", "Homemaker", "Retired", "Other"
];
const EDUCATION_LEVELS = [
  "Less than High School", "High School / Secondary School", "Diploma / Vocational Qualification",
  "Bachelor’s Degree", "Master’s Degree", "Doctorate / PhD", "Professional Degree", "Prefer not to say"
];
const MARITAL_STATUSES = [
  "Single", "Married", "Living with Partner", "Divorced", "Widowed", "Prefer not to say"
];
const INCOME_LEVELS = [
  "Less than $25,000", "$25,000–$49,999", "$50,000–$74,999", "$75,000–$99,999",
  "$100,000–$149,999", "$150,000 or more", "Prefer not to say"
];

export default function DemographicsPage() {
  const router = useRouter();
  const { dbUser, refreshUser } = useDBUser();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    customGender: "",
    employmentStatus: "",
    occupation: "",
    customOccupation: "",
    educationLevel: "",
    country: "",
    state: "",
    city: "",
    maritalStatus: "",
    householdIncome: "",
  });

  useEffect(() => {
    // Fetch countries list on mount
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setCountries(data.data.map((c: any) => c.country).sort());
        }
      })
      .catch(err => console.error("Error fetching countries", err));
  }, []);

  useEffect(() => {
    if (formData.country) {
      // Fetch states based on country
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: formData.country })
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error && data.data && data.data.states) {
            setStates(data.data.states.map((s: any) => s.name).sort());
          } else {
            setStates([]); // fallback to text input if no states found
          }
        })
        .catch(err => {
          console.error("Error fetching states", err);
          setStates([]);
        });
    }
  }, [formData.country]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age, 10),
        gender: formData.gender === "Prefer to self-describe" ? formData.customGender : formData.gender,
        occupation: formData.occupation === "Other" ? formData.customOccupation : formData.occupation,
      };

      const res = await fetch("/api/user/demographics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await refreshUser();
        router.push("/user-dashboard");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit demographics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 99) return false;
    if (!formData.gender || (formData.gender === "Prefer to self-describe" && !formData.customGender)) return false;
    if (!formData.employmentStatus) return false;
    if (!formData.occupation || (formData.occupation === "Other" && !formData.customOccupation)) return false;
    if (!formData.educationLevel || !formData.country || !formData.state || !formData.city) return false;
    if (!formData.maritalStatus || !formData.householdIncome) return false;
    return true;
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-blue-50">Please fill out this one-time demographic survey to unlock the portal and receive highly targeted surveys.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Age */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">1. What is your age?</label>
              <input 
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18" max="99"
                placeholder="Years (e.g. 25)"
                className="w-full md:w-1/2 p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">2. What is your gender?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GENDERS.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      formData.gender === g ? "bg-blue-50 border-blue-500 text-blue-700 font-bold" : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {formData.gender === "Prefer to self-describe" && (
                <input 
                  type="text" 
                  name="customGender"
                  value={formData.customGender}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="w-full mt-2 p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              )}
            </div>

            {/* Employment Status */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">3. Which of the following best describes your current employment status?</label>
              <select 
                name="employmentStatus" 
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="" disabled>Select status</option>
                {EMPLOYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Occupation */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">4. Which occupation best describes your primary role?</label>
              <select 
                name="occupation" 
                value={formData.occupation}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="" disabled>Select occupation</option>
                {OCCUPATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {formData.occupation === "Other" && (
                <input 
                  type="text" 
                  name="customOccupation"
                  value={formData.customOccupation}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="w-full mt-2 p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              )}
            </div>

            {/* Education Level */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">5. What is the highest level of education you have completed?</label>
              <select 
                name="educationLevel" 
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="" disabled>Select education level</option>
                {EDUCATION_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Location (Country, State, City) */}
            <div className="space-y-6 bg-zinc-50 p-5 rounded-xl border border-zinc-100">
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-700">6. Which country do you currently reside in?</label>
                <select 
                  name="country" 
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  required
                >
                  <option value="" disabled>Select country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-700">7. Which state/province do you currently live in?</label>
                {states.length > 0 ? (
                  <select 
                    name="state" 
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    required
                  >
                    <option value="" disabled>Select state</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state/province"
                    className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-700">8. Which city do you currently live in?</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Marital Status */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">9. What is your marital status?</label>
              <select 
                name="maritalStatus" 
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="" disabled>Select status</option>
                {MARITAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Income */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700">10. What is your annual household income?</label>
              <select 
                name="householdIncome" 
                value={formData.householdIncome}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="" disabled>Select income bracket</option>
                {INCOME_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="pt-6 border-t border-zinc-200">
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Unlock Portal</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </motion.div>
    </div>
  );
}
