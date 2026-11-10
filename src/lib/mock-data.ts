export const stats = [
  {label:"Total candidates",value:"1,284",change:"+12.8%",sub:"vs. previous month",icon:"users"},
  {label:"Open positions",value:"24",change:"+3 new",sub:"across 6 teams",icon:"briefcase"},
  {label:"Interviews",value:"38",change:"This week",sub:"8 scheduled today",icon:"video"},
  {label:"Offers issued",value:"12",change:"+2 this week",sub:"75% acceptance rate",icon:"send"},
];
export const applications = [
  {day:"Mon",applied:48,interviewed:18}, {day:"Tue",applied:66,interviewed:24},
  {day:"Wed",applied:59,interviewed:21}, {day:"Thu",applied:84,interviewed:33},
  {day:"Fri",applied:74,interviewed:29}, {day:"Sat",applied:91,interviewed:38},
  {day:"Sun",applied:103,interviewed:42},
];
export const stages = [
  {name:"Applied",value:642,fill:"var(--chart-1)"}, {name:"Screening",value:302,fill:"var(--chart-2)"},
  {name:"Interview",value:188,fill:"var(--chart-3)"}, {name:"Offer",value:82,fill:"var(--chart-4)"},
];
export const interviews = [
  {id:1,initials:"AS",name:"Ananya Sharma",role:"Frontend Engineer",time:"10:30 AM",type:"Technical",status:"Upcoming"},
  {id:2,initials:"RK",name:"Rohan Kumar",role:"Data Analyst",time:"12:00 PM",type:"Screening",status:"Upcoming"},
  {id:3,initials:"PM",name:"Priya Mehta",role:"Product Designer",time:"2:15 PM",type:"Portfolio",status:"Upcoming"},
  {id:4,initials:"VD",name:"Vikram Das",role:"ML Engineer",time:"4:00 PM",type:"Technical",status:"Upcoming"},
];
export const candidates = [
  {initials:"AS",name:"Ananya Sharma",role:"Frontend Engineer",stage:"Interview",date:"Today"},
  {initials:"RK",name:"Rohan Kumar",role:"Data Analyst",stage:"Screening",date:"Yesterday"},
  {initials:"PM",name:"Priya Mehta",role:"Product Designer",stage:"Applied",date:"Nov 8"},
  {initials:"VD",name:"Vikram Das",role:"ML Engineer",stage:"Offer",date:"Nov 7"},
];
// How many candidates reached each stage, in order.
export const funnel = [
  {stage:"Applied",count:642},
  {stage:"Screening",count:302},
  {stage:"Interview",count:188},
  {stage:"Offer",count:82},
  {stage:"Joined",count:61},
];
export const activity = [
  {id:1,who:"Ananya Sharma",what:"moved to Interview",when:"10 min ago",kind:"stage"},
  {id:2,who:"Rohan Kumar",what:"uploaded a new resume",when:"1 hour ago",kind:"resume"},
  {id:3,who:"HR Admin",what:"scheduled an interview with Priya Mehta",when:"2 hours ago",kind:"interview"},
  {id:4,who:"Vikram Das",what:"received an offer",when:"Yesterday",kind:"offer"},
  {id:5,who:"HR Admin",what:"posted the job ML Engineer",when:"Yesterday",kind:"job"},
];
