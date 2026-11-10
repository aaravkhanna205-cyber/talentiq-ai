export type Interview = {
  id: string;
  candidateId: string;
  day: string;
  time: string;
  type: "Screening call" | "Skill round" | "Manager round";
  mode: "Video call" | "In person" | "Phone";
  interviewer: string;
  status: "Upcoming" | "Completed";
};

export const interviews: Interview[] = [
  { id: "i01", candidateId: "c01", day: "Today, 10 Nov", time: "10:30 AM", type: "Skill round", mode: "Video call", interviewer: "Tech lead", status: "Upcoming" },
  { id: "i02", candidateId: "c04", day: "Today, 10 Nov", time: "12:00 PM", type: "Screening call", mode: "Phone", interviewer: "HR Admin", status: "Upcoming" },
  { id: "i03", candidateId: "c09", day: "Today, 10 Nov", time: "2:15 PM", type: "Skill round", mode: "Video call", interviewer: "Research head", status: "Upcoming" },
  { id: "i04", candidateId: "c12", day: "Tomorrow, 11 Nov", time: "11:00 AM", type: "Manager round", mode: "In person", interviewer: "Support manager", status: "Upcoming" },
  { id: "i05", candidateId: "c11", day: "Thu, 12 Nov", time: "4:00 PM", type: "Screening call", mode: "Phone", interviewer: "HR Admin", status: "Upcoming" },
  { id: "i06", candidateId: "c10", day: "Fri, 6 Nov", time: "3:00 PM", type: "Manager round", mode: "In person", interviewer: "Support manager", status: "Completed" },
  { id: "i07", candidateId: "c05", day: "Wed, 4 Nov", time: "11:30 AM", type: "Manager round", mode: "Video call", interviewer: "Support manager", status: "Completed" },
];
