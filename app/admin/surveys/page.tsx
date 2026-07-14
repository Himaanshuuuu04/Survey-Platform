"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, ClipboardList, Pencil, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface Survey {
  _id: string;
  title: string;
  provider: string;
  rewardPoints: number;
  estimatedTimeMins: number;
  urlOrApiEndpoint?: string;
  status: string;
  category?: string;
  targetAgeRange?: string[];
  targetGender?: string[];
  targetEmploymentStatus?: string[];
  targetOccupation?: string[];
  targetEducationLevel?: string[];
  targetState?: string[];
  targetCity?: string[];
  targetMaritalStatus?: string[];
  targetHouseholdIncome?: string[];
  countryEligibility?: string[];
  deviceCompatibility?: string[];
  questions?: Array<{
    questionText: string;
    options: string[];
    acceptedAnswers?: string[];
  }>;
}

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
const AGE_RANGES = ["18-24", "25-34", "35-44", "45+"];

const MultiSelectCheckboxes = ({ label, options, selected, onChange }: { label: string, options: string[], selected: string[], onChange: (val: string[]) => void }) => {
  const toggle = (opt: string) => {
    if (opt === "All") {
      onChange(["All"]);
      return;
    }
    
    let newSelected = selected.filter(s => s !== "All");
    if (newSelected.includes(opt)) {
      newSelected = newSelected.filter(s => s !== opt);
      if (newSelected.length === 0) newSelected = ["All"];
    } else {
      newSelected.push(opt);
    }
    onChange(newSelected);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="max-h-48 overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-md p-3 space-y-2 bg-white">
        <div className="flex items-center space-x-2">
          <Checkbox checked={selected.includes("All")} onCheckedChange={() => toggle("All")} />
          <Label className="font-normal cursor-pointer" onClick={() => toggle("All")}>All</Label>
        </div>
        {options.map(opt => (
          <div key={opt} className="flex items-center space-x-2">
            <Checkbox checked={selected.includes(opt)} onCheckedChange={() => toggle(opt)} />
            <Label className="font-normal cursor-pointer" onClick={() => toggle(opt)}>{opt}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    rewardPoints: "",
    estimatedTimeMins: "",
    urlOrApiEndpoint: "",
    status: "active",
    category: "Other",
    targetAgeRange: ["All"],
    targetGender: ["All"],
    targetEmploymentStatus: ["All"],
    targetOccupation: ["All"],
    targetEducationLevel: ["All"],
    targetState: "All",
    targetCity: "All",
    targetMaritalStatus: ["All"],
    targetHouseholdIncome: ["All"],
    countryEligibility: "ALL",
    deviceCompatibility: ["desktop", "mobile", "ios", "android"],
    questions: [] as { questionText: string, options: string, acceptedAnswers?: string }[],
  });

  // Edit & Delete States
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    provider: "",
    rewardPoints: "",
    estimatedTimeMins: "",
    urlOrApiEndpoint: "",
    status: "active",
    category: "Other",
    targetAgeRange: ["All"],
    targetGender: ["All"],
    targetEmploymentStatus: ["All"],
    targetOccupation: ["All"],
    targetEducationLevel: ["All"],
    targetState: "All",
    targetCity: "All",
    targetMaritalStatus: ["All"],
    targetHouseholdIncome: ["All"],
    countryEligibility: "ALL",
    deviceCompatibility: ["desktop", "mobile", "ios", "android"],
    questions: [] as { questionText: string, options: string, acceptedAnswers?: string }[],
  });

  const [deleteConfirmSurvey, setDeleteConfirmSurvey] = useState<Survey | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (survey: Survey) => {
    setEditingSurvey(survey);
    setEditFormData({
      title: survey.title,
      provider: survey.provider,
      rewardPoints: String(survey.rewardPoints),
      estimatedTimeMins: String(survey.estimatedTimeMins),
      urlOrApiEndpoint: survey.urlOrApiEndpoint || "",
      status: survey.status,
      category: survey.category || "Other",
      targetAgeRange: survey.targetAgeRange?.length ? survey.targetAgeRange : ["All"],
      targetGender: survey.targetGender?.length ? survey.targetGender : ["All"],
      targetEmploymentStatus: survey.targetEmploymentStatus?.length ? survey.targetEmploymentStatus : ["All"],
      targetOccupation: survey.targetOccupation?.length ? survey.targetOccupation : ["All"],
      targetEducationLevel: survey.targetEducationLevel?.length ? survey.targetEducationLevel : ["All"],
      targetState: survey.targetState?.join(", ") || "All",
      targetCity: survey.targetCity?.join(", ") || "All",
      targetMaritalStatus: survey.targetMaritalStatus?.length ? survey.targetMaritalStatus : ["All"],
      targetHouseholdIncome: survey.targetHouseholdIncome?.length ? survey.targetHouseholdIncome : ["All"],
      countryEligibility: survey.countryEligibility?.join(", ") || "ALL",
      deviceCompatibility: survey.deviceCompatibility || ["desktop", "mobile", "ios", "android"],
      questions: (survey.questions || []).map(q => ({ 
        questionText: q.questionText, 
        options: q.options.join(", "),
        acceptedAnswers: q.acceptedAnswers ? q.acceptedAnswers.join(", ") : ""
      })),
    });
    setIsEditOpen(true);
  };

  const handleUpdateSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSurvey) return;
    setIsUpdating(true);

    const questions = editFormData.questions.filter(q => q.questionText && q.options).map(q => ({
      questionText: q.questionText,
      options: q.options.split(",").map(o => o.trim()).filter(Boolean),
      acceptedAnswers: q.acceptedAnswers ? q.acceptedAnswers.split(",").map(a => a.trim()).filter(Boolean) : []
    }));

    try {
      const res = await fetch(`/api/admin/surveys/${editingSurvey._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editFormData.title,
          provider: editFormData.provider,
          rewardPoints: Number(editFormData.rewardPoints),
          estimatedTimeMins: Number(editFormData.estimatedTimeMins),
          urlOrApiEndpoint: editFormData.urlOrApiEndpoint,
          status: editFormData.status,
          category: editFormData.category,
          targetAgeRange: editFormData.targetAgeRange,
          targetGender: editFormData.targetGender,
          targetEmploymentStatus: editFormData.targetEmploymentStatus,
          targetOccupation: editFormData.targetOccupation,
          targetEducationLevel: editFormData.targetEducationLevel,
          targetState: editFormData.targetState.split(",").map(c => c.trim()).filter(Boolean),
          targetCity: editFormData.targetCity.split(",").map(c => c.trim()).filter(Boolean),
          targetMaritalStatus: editFormData.targetMaritalStatus,
          targetHouseholdIncome: editFormData.targetHouseholdIncome,
          countryEligibility: editFormData.countryEligibility.split(",").map(c => c.trim()).filter(Boolean),
          deviceCompatibility: editFormData.deviceCompatibility,
          questions
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Survey updated successfully");
        setIsEditOpen(false);
        setEditingSurvey(null);
        fetchSurveys();
      } else {
        toast.error(data.error || "Failed to update survey");
      }
    } catch (error: any) {
      console.error("Error updating survey:", error);
      toast.error(error.message || "Failed to update survey");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteSurvey = async () => {
    if (!deleteConfirmSurvey) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/surveys/${deleteConfirmSurvey._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Survey deleted successfully");
        setDeleteConfirmSurvey(null);
        fetchSurveys();
      } else {
        toast.error(data.error || "Failed to delete survey");
      }
    } catch (error: any) {
      console.error("Error deleting survey:", error);
      toast.error(error.message || "Failed to delete survey");
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/surveys");
      const data = await res.json();
      if (data.success) {
        setSurveys(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch surveys", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleCreateSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const questions = formData.questions.filter(q => q.questionText && q.options).map(q => ({
      questionText: q.questionText,
      options: q.options.split(",").map(o => o.trim()).filter(Boolean),
      acceptedAnswers: q.acceptedAnswers ? q.acceptedAnswers.split(",").map(a => a.trim()).filter(Boolean) : []
    }));

    try {
      const res = await fetch("/api/admin/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          provider: formData.provider,
          rewardPoints: Number(formData.rewardPoints),
          estimatedTimeMins: Number(formData.estimatedTimeMins),
          urlOrApiEndpoint: formData.urlOrApiEndpoint,
          status: formData.status,
          category: formData.category,
          targetAgeRange: formData.targetAgeRange,
          targetGender: formData.targetGender,
          targetEmploymentStatus: formData.targetEmploymentStatus,
          targetOccupation: formData.targetOccupation,
          targetEducationLevel: formData.targetEducationLevel,
          targetState: formData.targetState.split(",").map(c => c.trim()).filter(Boolean),
          targetCity: formData.targetCity.split(",").map(c => c.trim()).filter(Boolean),
          targetMaritalStatus: formData.targetMaritalStatus,
          targetHouseholdIncome: formData.targetHouseholdIncome,
          countryEligibility: formData.countryEligibility.split(",").map(c => c.trim()).filter(Boolean),
          deviceCompatibility: formData.deviceCompatibility,
          questions
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Survey created successfully");
        setIsDialogOpen(false);
        setFormData({
          title: "",
          provider: "",
          rewardPoints: "",
          estimatedTimeMins: "",
          urlOrApiEndpoint: "",
          status: "active",
          category: "Other",
          targetAgeRange: ["All"],
          targetGender: ["All"],
          targetEmploymentStatus: ["All"],
          targetOccupation: ["All"],
          targetEducationLevel: ["All"],
          targetState: "All",
          targetCity: "All",
          targetMaritalStatus: ["All"],
          targetHouseholdIncome: ["All"],
          countryEligibility: "ALL",
          deviceCompatibility: ["desktop", "mobile", "ios", "android"],
          questions: [],
        });
        fetchSurveys(); 
      } else {
        toast.error(data.error || "Failed to create survey");
      }
    } catch (error: any) {
      console.error("Error creating survey:", error);
      toast.error(error.message || "Failed to create survey");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Surveys</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage available surveys and their reward points.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-white hover:bg-brand-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Survey
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Survey</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new survey to the platform.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSurvey} className="space-y-4 pt-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="targeting">Targeting</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider (e.g. BitLabs)</Label>
                    <Input required value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Reward Points</Label>
                      <Input type="number" required value={formData.rewardPoints} onChange={(e) => setFormData({ ...formData, rewardPoints: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Est. Time (Mins)</Label>
                      <Input type="number" required value={formData.estimatedTimeMins} onChange={(e) => setFormData({ ...formData, estimatedTimeMins: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>URL / API Endpoint</Label>
                    <Input type="url" required value={formData.urlOrApiEndpoint} onChange={(e) => setFormData({ ...formData, urlOrApiEndpoint: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <NativeSelect value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                      <NativeSelectOption value="active">Active</NativeSelectOption>
                      <NativeSelectOption value="inactive">Inactive</NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <NativeSelect value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                      <NativeSelectOption value="Other">Other</NativeSelectOption>
                      <NativeSelectOption value="Technology">Technology</NativeSelectOption>
                      <NativeSelectOption value="Gaming">Gaming</NativeSelectOption>
                      <NativeSelectOption value="Lifestyle">Lifestyle</NativeSelectOption>
                      <NativeSelectOption value="Finance">Finance</NativeSelectOption>
                      <NativeSelectOption value="Health">Health</NativeSelectOption>
                    </NativeSelect>
                  </div>
                </TabsContent>

                <TabsContent value="targeting" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MultiSelectCheckboxes label="Target Age Range" options={AGE_RANGES} selected={formData.targetAgeRange} onChange={(val) => setFormData({ ...formData, targetAgeRange: val })} />
                    <MultiSelectCheckboxes label="Target Gender" options={GENDERS} selected={formData.targetGender} onChange={(val) => setFormData({ ...formData, targetGender: val })} />
                    
                    <div className="space-y-2">
                      <Label>Country Eligibility (comma separated)</Label>
                      <Input placeholder="ALL, US, UK..." value={formData.countryEligibility} onChange={(e) => setFormData({ ...formData, countryEligibility: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Target State (comma separated)</Label>
                      <Input placeholder="All, California, Texas..." value={formData.targetState} onChange={(e) => setFormData({ ...formData, targetState: e.target.value })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Target City (comma separated)</Label>
                      <Input placeholder="All, Los Angeles, Austin..." value={formData.targetCity} onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })} />
                    </div>

                    <MultiSelectCheckboxes label="Target Employment Status" options={EMPLOYMENT_STATUSES} selected={formData.targetEmploymentStatus} onChange={(val) => setFormData({ ...formData, targetEmploymentStatus: val })} />
                    <MultiSelectCheckboxes label="Target Occupation" options={OCCUPATIONS} selected={formData.targetOccupation} onChange={(val) => setFormData({ ...formData, targetOccupation: val })} />
                    <MultiSelectCheckboxes label="Target Education Level" options={EDUCATION_LEVELS} selected={formData.targetEducationLevel} onChange={(val) => setFormData({ ...formData, targetEducationLevel: val })} />
                    <MultiSelectCheckboxes label="Target Marital Status" options={MARITAL_STATUSES} selected={formData.targetMaritalStatus} onChange={(val) => setFormData({ ...formData, targetMaritalStatus: val })} />
                    <div className="md:col-span-2">
                      <MultiSelectCheckboxes label="Target Household Income" options={INCOME_LEVELS} selected={formData.targetHouseholdIncome} onChange={(val) => setFormData({ ...formData, targetHouseholdIncome: val })} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <Label>Device Compatibility</Label>
                    <div className="flex flex-wrap gap-4">
                      {['desktop', 'mobile', 'ios', 'android'].map(device => (
                        <div key={device} className="flex items-center space-x-2">
                          <Checkbox checked={formData.deviceCompatibility.includes(device)} onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({ ...formData, deviceCompatibility: [...formData.deviceCompatibility, device] });
                            } else {
                              setFormData({ ...formData, deviceCompatibility: formData.deviceCompatibility.filter(d => d !== device) });
                            }
                          }} />
                          <Label className="capitalize font-normal">{device}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="space-y-4 mt-4">
                  {formData.questions.map((q, idx) => (
                    <div key={idx} className="space-y-2 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg relative">
                      <div className="flex justify-between items-center mb-1">
                        <Label className="font-bold">Question {idx + 1}</Label>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                          const newQ = [...formData.questions];
                          newQ.splice(idx, 1);
                          setFormData({ ...formData, questions: newQ });
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input placeholder="Question Text (e.g. Which is your favorite color?)" value={q.questionText} onChange={(e) => {
                        const newQ = [...formData.questions];
                        newQ[idx].questionText = e.target.value;
                        setFormData({ ...formData, questions: newQ });
                      }} />
                      <Input placeholder="Options (comma-separated, e.g. Red, Blue, Green)" value={q.options} onChange={(e) => {
                        const newQ = [...formData.questions];
                        newQ[idx].options = e.target.value;
                        setFormData({ ...formData, questions: newQ });
                      }} />
                      <Input placeholder="Accepted Answers (comma-separated, matches options)" value={q.acceptedAnswers} onChange={(e) => {
                        const newQ = [...formData.questions];
                        newQ[idx].acceptedAnswers = e.target.value;
                        setFormData({ ...formData, questions: newQ });
                      }} />
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full mt-2 border-dashed" onClick={() => {
                    setFormData({ ...formData, questions: [...formData.questions, { questionText: "", options: "", acceptedAnswers: "" }] });
                  }}>
                    <Plus className="h-4 w-4 mr-2" /> Add Question
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating} className="bg-brand text-white hover:bg-brand-dark">
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Survey"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Provider</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead className="hidden sm:table-cell">Est. Time</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : surveys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No surveys found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                surveys.map((survey) => (
                  <TableRow key={survey._id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-brand" />
                      {survey.title}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{survey.provider}</TableCell>
                    <TableCell className="font-sharp font-semibold text-brand">
                      {survey.rewardPoints?.toLocaleString() || 0} pts
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{survey.estimatedTimeMins} mins</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={survey.status === 'active' ? 'default' : 'secondary'} className={survey.status === 'active' ? 'bg-success text-white' : ''}>
                        {survey.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          onClick={() => handleEditClick(survey)}
                          title="Edit Survey"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteConfirmSurvey(survey)}
                          title="Delete Survey"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Survey Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Survey</DialogTitle>
            <DialogDescription>
              Modify the survey details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSurvey} className="space-y-4 pt-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="targeting">Targeting</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input required value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider (e.g. BitLabs)</Label>
                    <Input required value={editFormData.provider} onChange={(e) => setEditFormData({ ...editFormData, provider: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Reward Points</Label>
                      <Input type="number" required value={editFormData.rewardPoints} onChange={(e) => setEditFormData({ ...editFormData, rewardPoints: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Est. Time (Mins)</Label>
                      <Input type="number" required value={editFormData.estimatedTimeMins} onChange={(e) => setEditFormData({ ...editFormData, estimatedTimeMins: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>URL / API Endpoint</Label>
                    <Input type="url" required value={editFormData.urlOrApiEndpoint} onChange={(e) => setEditFormData({ ...editFormData, urlOrApiEndpoint: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <NativeSelect value={editFormData.status} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}>
                      <NativeSelectOption value="active">Active</NativeSelectOption>
                      <NativeSelectOption value="inactive">Inactive</NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <NativeSelect value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}>
                      <NativeSelectOption value="Other">Other</NativeSelectOption>
                      <NativeSelectOption value="Technology">Technology</NativeSelectOption>
                      <NativeSelectOption value="Gaming">Gaming</NativeSelectOption>
                      <NativeSelectOption value="Lifestyle">Lifestyle</NativeSelectOption>
                      <NativeSelectOption value="Finance">Finance</NativeSelectOption>
                      <NativeSelectOption value="Health">Health</NativeSelectOption>
                    </NativeSelect>
                  </div>
                </TabsContent>

                <TabsContent value="targeting" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MultiSelectCheckboxes label="Target Age Range" options={AGE_RANGES} selected={editFormData.targetAgeRange} onChange={(val) => setEditFormData({ ...editFormData, targetAgeRange: val })} />
                    <MultiSelectCheckboxes label="Target Gender" options={GENDERS} selected={editFormData.targetGender} onChange={(val) => setEditFormData({ ...editFormData, targetGender: val })} />
                    
                    <div className="space-y-2">
                      <Label>Country Eligibility (comma separated)</Label>
                      <Input placeholder="ALL, US, UK..." value={editFormData.countryEligibility} onChange={(e) => setEditFormData({ ...editFormData, countryEligibility: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Target State (comma separated)</Label>
                      <Input placeholder="All, California, Texas..." value={editFormData.targetState} onChange={(e) => setEditFormData({ ...editFormData, targetState: e.target.value })} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Target City (comma separated)</Label>
                      <Input placeholder="All, Los Angeles, Austin..." value={editFormData.targetCity} onChange={(e) => setEditFormData({ ...editFormData, targetCity: e.target.value })} />
                    </div>

                    <MultiSelectCheckboxes label="Target Employment Status" options={EMPLOYMENT_STATUSES} selected={editFormData.targetEmploymentStatus} onChange={(val) => setEditFormData({ ...editFormData, targetEmploymentStatus: val })} />
                    <MultiSelectCheckboxes label="Target Occupation" options={OCCUPATIONS} selected={editFormData.targetOccupation} onChange={(val) => setEditFormData({ ...editFormData, targetOccupation: val })} />
                    <MultiSelectCheckboxes label="Target Education Level" options={EDUCATION_LEVELS} selected={editFormData.targetEducationLevel} onChange={(val) => setEditFormData({ ...editFormData, targetEducationLevel: val })} />
                    <MultiSelectCheckboxes label="Target Marital Status" options={MARITAL_STATUSES} selected={editFormData.targetMaritalStatus} onChange={(val) => setEditFormData({ ...editFormData, targetMaritalStatus: val })} />
                    <div className="md:col-span-2">
                      <MultiSelectCheckboxes label="Target Household Income" options={INCOME_LEVELS} selected={editFormData.targetHouseholdIncome} onChange={(val) => setEditFormData({ ...editFormData, targetHouseholdIncome: val })} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <Label>Device Compatibility</Label>
                    <div className="flex flex-wrap gap-4">
                      {['desktop', 'mobile', 'ios', 'android'].map(device => (
                        <div key={device} className="flex items-center space-x-2">
                          <Checkbox checked={editFormData.deviceCompatibility.includes(device)} onCheckedChange={(checked) => {
                            if (checked) {
                              setEditFormData({ ...editFormData, deviceCompatibility: [...editFormData.deviceCompatibility, device] });
                            } else {
                              setEditFormData({ ...editFormData, deviceCompatibility: editFormData.deviceCompatibility.filter(d => d !== device) });
                            }
                          }} />
                          <Label className="capitalize font-normal">{device}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="space-y-4 mt-4">
                  {editFormData.questions.map((q, idx) => (
                    <div key={idx} className="space-y-2 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg relative">
                      <div className="flex justify-between items-center mb-1">
                        <Label className="font-bold">Question {idx + 1}</Label>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                          const newQ = [...editFormData.questions];
                          newQ.splice(idx, 1);
                          setEditFormData({ ...editFormData, questions: newQ });
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input placeholder="Question Text (e.g. Which is your favorite color?)" value={q.questionText} onChange={(e) => {
                        const newQ = [...editFormData.questions];
                        newQ[idx].questionText = e.target.value;
                        setEditFormData({ ...editFormData, questions: newQ });
                      }} />
                      <Input placeholder="Options (comma-separated, e.g. Red, Blue, Green)" value={q.options} onChange={(e) => {
                        const newQ = [...editFormData.questions];
                        newQ[idx].options = e.target.value;
                        setEditFormData({ ...editFormData, questions: newQ });
                      }} />
                      <Input placeholder="Accepted Answers (comma-separated, matches options)" value={q.acceptedAnswers} onChange={(e) => {
                        const newQ = [...editFormData.questions];
                        newQ[idx].acceptedAnswers = e.target.value;
                        setEditFormData({ ...editFormData, questions: newQ });
                      }} />
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full mt-2 border-dashed" onClick={() => {
                    setEditFormData({ ...editFormData, questions: [...editFormData.questions, { questionText: "", options: "", acceptedAnswers: "" }] });
                  }}>
                    <Plus className="h-4 w-4 mr-2" /> Add Question
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating} className="bg-brand text-white hover:bg-brand-dark">
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Survey"}
                </Button>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmSurvey} onOpenChange={(open) => !open && setDeleteConfirmSurvey(null)}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Confirm Survey Deletion
            </DialogTitle>
            <DialogDescription className="mt-2">
              Are you sure you want to delete <strong className="text-foreground">{deleteConfirmSurvey?.title}</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 text-xs text-muted-foreground bg-destructive/5 border border-destructive/10 rounded-lg p-3">
            <p className="font-semibold text-destructive">⚠️ Note about deletion:</p>
            <p className="mt-1">
              If this survey has associated transaction history, it will be soft-deleted (marked as inactive) to maintain database integrity. Otherwise, it will be permanently deleted.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirmSurvey(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteSurvey}
              disabled={isDeleting}
              className="gap-1.5"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Confirm Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
