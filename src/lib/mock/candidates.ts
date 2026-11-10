import type { Stage } from "./roles";

export type Evidence = "supported" | "unclear" | "missing";
export type Candidate = {
  id: string;
  name: string;
  email: string;
  jobId: string;
  stage: Stage;
  appliedOn: string;
  experience: string;
  resumeFile: string;
  skills: string[];
  summary: string;
  // One entry per job requirement, in the same order as the job's requirements list.
  evidence: Evidence[];
};

// Fictional people for demo screens. None of this is real data.
export const candidates: Candidate[] = [
  { id: "c01", name: "Ananya Sharma", email: "ananya.sharma@example.com", jobId: "ai-tool-developer", stage: "Interview", appliedOn: "8 Nov 2026", experience: "2 years", resumeFile: "ananya-sharma.pdf", skills: ["Python", "LLM APIs", "FastAPI", "Git"], summary: "Built a support chatbot for a college project and worked 2 years as a Python developer.", evidence: ["supported", "supported", "supported", "unclear"] },
  { id: "c02", name: "Karan Malhotra", email: "karan.malhotra@example.com", jobId: "ai-tool-developer", stage: "Screening", appliedOn: "9 Nov 2026", experience: "1 year", resumeFile: "karan-malhotra.pdf", skills: ["Python", "Pandas", "SQL"], summary: "Data-focused Python developer. Resume does not mention LLM work.", evidence: ["supported", "missing", "unclear", "unclear"] },
  { id: "c03", name: "Meera Iyer", email: "meera.iyer@example.com", jobId: "ai-tool-developer", stage: "Applied", appliedOn: "10 Nov 2026", experience: "Fresher", resumeFile: "meera-iyer.docx", skills: ["Python", "Prompt writing", "Git"], summary: "Recent graduate with two personal projects using an LLM API.", evidence: ["supported", "supported", "supported", "supported"] },
  { id: "c04", name: "Rohan Kumar", email: "rohan.kumar@example.com", jobId: "customer-support-executive", stage: "Screening", appliedOn: "7 Nov 2026", experience: "1 year", resumeFile: "rohan-kumar.pdf", skills: ["Calls", "Chat support", "MS Office"], summary: "One year at a telecom call centre handling billing questions.", evidence: ["unclear", "supported", "supported", "unclear"] },
  { id: "c05", name: "Sana Sheikh", email: "sana.sheikh@example.com", jobId: "customer-support-executive", stage: "Offer", appliedOn: "30 Oct 2026", experience: "3 years", resumeFile: "sana-sheikh.pdf", skills: ["Calls", "CRM", "Hindi", "English"], summary: "Three years in support for an e-commerce company, with a quality award.", evidence: ["supported", "supported", "supported", "supported"] },
  { id: "c06", name: "Deepak Yadav", email: "deepak.yadav@example.com", jobId: "customer-support-executive", stage: "Joined", appliedOn: "29 Oct 2026", experience: "2 years", resumeFile: "deepak-yadav.pdf", skills: ["Calls", "Bookings", "Hindi"], summary: "Two years booking service visits at a car dealership.", evidence: ["supported", "supported", "supported", "unclear"] },
  { id: "c07", name: "Pooja Nair", email: "pooja.nair@example.com", jobId: "customer-support-executive", stage: "Applied", appliedOn: "10 Nov 2026", experience: "Fresher", resumeFile: "pooja-nair.docx", skills: ["English", "Typing"], summary: "Graduate applying for a first job. No customer-facing work listed.", evidence: ["unclear", "missing", "supported", "unclear"] },
  { id: "c08", name: "Priya Mehta", email: "priya.mehta@example.com", jobId: "research-analyst", stage: "Applied", appliedOn: "8 Nov 2026", experience: "1 year", resumeFile: "priya-mehta.pdf", skills: ["Excel", "Research", "Report writing"], summary: "Market research intern for a year; strong Excel work shown.", evidence: ["supported", "supported", "supported", "missing"] },
  { id: "c09", name: "Arjun Reddy", email: "arjun.reddy@example.com", jobId: "research-analyst", stage: "Interview", appliedOn: "6 Nov 2026", experience: "2 years", resumeFile: "arjun-reddy.pdf", skills: ["Excel", "Automobile engineering", "Writing"], summary: "Automobile engineering diploma and two years writing service manuals.", evidence: ["supported", "supported", "supported", "supported"] },
  { id: "c10", name: "Vikram Das", email: "vikram.das@example.com", jobId: "team-leader", stage: "Offer", appliedOn: "25 Oct 2026", experience: "5 years", resumeFile: "vikram-das.pdf", skills: ["Team handling", "Coaching", "Reports"], summary: "Five years in support, the last two leading a team of 12.", evidence: ["supported", "supported", "supported", "supported"] },
  { id: "c11", name: "Neha Gupta", email: "neha.gupta@example.com", jobId: "team-leader", stage: "Screening", appliedOn: "4 Nov 2026", experience: "3 years", resumeFile: "neha-gupta.pdf", skills: ["Support", "Training", "Excel"], summary: "Three years in support; trained new joiners but has not led a team.", evidence: ["supported", "unclear", "supported", "supported"] },
  { id: "c12", name: "Imran Khan", email: "imran.khan@example.com", jobId: "team-leader", stage: "Interview", appliedOn: "1 Nov 2026", experience: "4 years", resumeFile: "imran-khan.docx", skills: ["Team handling", "Shift planning"], summary: "Shift supervisor for two years at a logistics helpdesk.", evidence: ["supported", "supported", "unclear", "unclear"] },
];

export function getCandidate(id: string) {
  return candidates.find((c) => c.id === id);
}
export function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
