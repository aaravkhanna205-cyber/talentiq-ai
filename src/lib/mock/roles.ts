// The roles Instant Mechanic hires for, and the hiring stages in order.
// Change them here and every screen follows.
export const roles = [
  "AI Tool Developer",
  "Customer Support Executive",
  "Research Analyst",
  "Team Leader",
  "Accountant",
] as const;
export type Role = (typeof roles)[number];

export const stages = ["Applied", "Screening", "Interview", "Offer", "Joined"] as const;
export type Stage = (typeof stages)[number];
