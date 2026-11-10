export const userRoles = ["Super Admin", "Recruiter", "Interviewer", "Viewer"] as const;
export type UserRole = (typeof userRoles)[number];
export type AppUser = { id: string; name: string; email: string; role: UserRole; active: boolean; lastSeen: string };

export const users: AppUser[] = [
  { id: "u1", name: "Aarav Khanna", email: "admin@example.com", role: "Super Admin", active: true, lastSeen: "Today" },
  { id: "u2", name: "HR Admin", email: "hr@example.com", role: "Recruiter", active: true, lastSeen: "Today" },
  { id: "u3", name: "Tech lead", email: "tech.lead@example.com", role: "Interviewer", active: true, lastSeen: "Yesterday" },
  { id: "u4", name: "Support manager", email: "support.manager@example.com", role: "Interviewer", active: true, lastSeen: "6 Nov" },
  { id: "u5", name: "Finance head", email: "finance@example.com", role: "Viewer", active: false, lastSeen: "12 Oct" },
];

export const rolePowers: Record<UserRole, string> = {
  "Super Admin": "Everything: users, settings, data import, audit log",
  Recruiter: "Jobs, candidates, interviews, analytics",
  Interviewer: "Only the interviews and candidates assigned to them",
  Viewer: "Can look at dashboards, cannot change anything",
};

export type AuditEntry = { id: number; when: string; who: string; area: "Users" | "Settings" | "Jobs" | "Candidates" | "Import"; what: string };
export const auditLog: AuditEntry[] = [
  { id: 9, when: "10 Nov, 10:42 AM", who: "HR Admin", area: "Candidates", what: "Moved Ananya Sharma from Screening to Interview" },
  { id: 8, when: "10 Nov, 9:15 AM", who: "Aarav Khanna", area: "Import", what: "Imported 4 candidates from candidates-nov.csv" },
  { id: 7, when: "9 Nov, 5:30 PM", who: "Aarav Khanna", area: "Settings", what: "Turned on email notifications" },
  { id: 6, when: "9 Nov, 11:02 AM", who: "HR Admin", area: "Candidates", what: "Sent an offer to Sana Sheikh" },
  { id: 5, when: "6 Nov, 4:10 PM", who: "Aarav Khanna", area: "Users", what: "Changed Finance head from Recruiter to Viewer" },
  { id: 4, when: "5 Nov, 2:20 PM", who: "HR Admin", area: "Jobs", what: "Posted the job Research Analyst" },
  { id: 3, when: "2 Nov, 10:00 AM", who: "HR Admin", area: "Jobs", what: "Posted the job AI Tool Developer" },
  { id: 2, when: "20 Oct, 3:45 PM", who: "Aarav Khanna", area: "Settings", what: "Added the hiring stage Joined" },
  { id: 1, when: "12 Oct, 9:00 AM", who: "Aarav Khanna", area: "Users", what: "Disabled the account of Finance head" },
];

export type ImportBatch = { id: string; file: string; kind: "Candidates" | "Jobs"; rows: number; by: string; when: string; undone: boolean };
export const importBatches: ImportBatch[] = [
  { id: "b2", file: "candidates-nov.csv", kind: "Candidates", rows: 4, by: "Aarav Khanna", when: "10 Nov, 9:15 AM", undone: false },
  { id: "b1", file: "jobs-october.csv", kind: "Jobs", rows: 5, by: "Aarav Khanna", when: "18 Oct, 1:30 PM", undone: false },
];

export const featureSwitches = [
  { id: "email", label: "Email notifications", text: "Send candidates an email when their stage changes. A person approves every email.", on: true },
  { id: "questions", label: "AI interview question drafts", text: "Let the AI prepare draft questions for interviewers to edit.", on: true },
  { id: "voice", label: "Voice interviews", text: "Allow optional voice interviews in the Candidate Portal.", on: false },
  { id: "portal", label: "Candidate Portal open", text: "Let new candidates register and apply.", on: true },
];
