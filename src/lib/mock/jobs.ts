import type { Role } from "./roles";

export type JobStatus = "Open" | "Draft" | "Closed";
export type Job = {
  id: string;
  title: Role;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  status: JobStatus;
  openings: number;
  postedOn: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

// Demo jobs. The wording is sample text; replace it with your real job descriptions.
export const jobs: Job[] = [
  {
    id: "ai-tool-developer",
    title: "AI Tool Developer",
    department: "Technology",
    location: "Head office",
    type: "Full-time",
    status: "Open",
    openings: 2,
    postedOn: "2 Nov 2026",
    summary: "Build and improve the AI tools that help customers describe car problems and help our team answer faster.",
    responsibilities: [
      "Build chatbot and automation features with Python and LLM APIs",
      "Prepare and clean the data the tools learn from",
      "Test tool answers and fix wrong or unclear ones",
      "Work with the support team to find what to automate next",
    ],
    requirements: [
      "Working knowledge of Python",
      "Has built at least one project using an LLM API",
      "Comfortable with Git and VS Code",
      "Can explain technical work in simple English",
    ],
  },
  {
    id: "customer-support-executive",
    title: "Customer Support Executive",
    department: "Customer Support",
    location: "Head office",
    type: "Full-time",
    status: "Open",
    openings: 4,
    postedOn: "28 Oct 2026",
    summary: "Be the first voice customers hear. Answer calls and chats, book services and follow up until the problem is solved.",
    responsibilities: [
      "Answer customer calls and chat messages",
      "Book and reschedule service visits",
      "Record every conversation in the support system",
      "Pass difficult cases to the team leader with clear notes",
    ],
    requirements: [
      "Clear spoken Hindi and English",
      "At least 6 months in a customer-facing job",
      "Comfortable typing and using a computer all day",
      "Calm and polite with upset customers",
    ],
  },
  {
    id: "research-analyst",
    title: "Research Analyst",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    status: "Open",
    openings: 1,
    postedOn: "5 Nov 2026",
    summary: "Collect and organise car fault information so our diagnosis tools give correct, easy-to-follow answers.",
    responsibilities: [
      "Research common car faults, causes and fixes",
      "Organise findings in clean Excel sheets",
      "Check facts against more than one source",
      "Write explanations in simple English",
    ],
    requirements: [
      "Strong Excel or Google Sheets skills",
      "Careful with detail and sources",
      "Writes clear, simple English",
      "Interest in cars or automobile technology",
    ],
  },
  {
    id: "team-leader",
    title: "Team Leader",
    department: "Customer Support",
    location: "Head office",
    type: "Full-time",
    status: "Open",
    openings: 1,
    postedOn: "20 Oct 2026",
    summary: "Lead a support team of 8 to 10 people, keep service quality high and help each person improve.",
    responsibilities: [
      "Plan shifts and daily targets",
      "Listen to calls and coach the team",
      "Handle cases passed up by executives",
      "Report weekly numbers to management",
    ],
    requirements: [
      "At least 2 years in customer support",
      "Has led or trained a team before",
      "Comfortable with reports and spreadsheets",
      "Clear spoken Hindi and English",
    ],
  },
  {
    id: "accountant",
    title: "Accountant",
    department: "Finance",
    location: "Head office",
    type: "Full-time",
    status: "Draft",
    openings: 1,
    postedOn: "Not posted yet",
    summary: "Keep the company books accurate: invoices, payments, GST filings and monthly reports.",
    responsibilities: [
      "Record daily invoices and payments",
      "Reconcile bank statements",
      "Prepare GST returns and TDS entries",
      "Prepare monthly reports for management",
    ],
    requirements: [
      "B.Com or equivalent",
      "Working knowledge of Tally or similar software",
      "Knows GST and TDS basics",
      "At least 1 year of accounting experience",
    ],
  },
];

export function getJob(id: string) {
  return jobs.find((job) => job.id === id);
}
