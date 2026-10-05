export interface JourneyStep {
  date: string;
  title: string;
  description: string;
  status: "complete" | "current" | "upcoming";
}

export interface AdmissionJourney {
  id: string;
  label: string;
  window: string;
  steps: JourneyStep[];
}

export const admissionJourneys: AdmissionJourney[] = [
  {
    id: "mba",
    label: "MBA",
    window: "Applications close 15 Jan 2027",
    steps: [
      { date: "Aug 2026", title: "Applications open", description: "The online portal opens and forms are released.", status: "complete" },
      { date: "15 Jan 2027", title: "Round 1 deadline", description: "Early submissions receive a decision in the first cycle.", status: "current" },
      { date: "20 Feb 2027", title: "Round 2 deadline", description: "Final deadline for the flagship MBA intake.", status: "upcoming" },
      { date: "Mar 2027", title: "Interviews", description: "Shortlisted candidates attend personal interviews.", status: "upcoming" },
      { date: "Apr 2027", title: "Offers released", description: "Final decisions and offer letters are issued.", status: "upcoming" },
      { date: "Jun 2027", title: "Programme begins", description: "Orientation and classes commence on campus.", status: "upcoming" },
    ],
  },
  {
    id: "mba-analytics",
    label: "MBA (Business Analytics)",
    window: "Applications close 15 Jan 2027",
    steps: [
      { date: "Aug 2026", title: "Applications open", description: "Portal opens for the specialised analytics cohort.", status: "complete" },
      { date: "15 Jan 2027", title: "Round 1 deadline", description: "First review of analytics applications.", status: "current" },
      { date: "05 Feb 2027", title: "Round 2 deadline", description: "Final deadline for the analytics intake.", status: "upcoming" },
      { date: "Mar 2027", title: "Interviews & aptitude review", description: "Interviews and a quantitative assessment.", status: "upcoming" },
      { date: "Apr 2027", title: "Offers released", description: "Decisions shared with all applicants.", status: "upcoming" },
      { date: "Jun 2027", title: "Programme begins", description: "Classes begin on campus.", status: "upcoming" },
    ],
  },
  {
    id: "epgp",
    label: "EPGP",
    window: "Applications close 30 Nov 2026",
    steps: [
      { date: "Jun 2026", title: "Applications open", description: "Residential executive programme admissions open.", status: "complete" },
      { date: "30 Nov 2026", title: "Final deadline", description: "Closing date for all EPGP applications.", status: "current" },
      { date: "Dec 2026", title: "Interviews", description: "Candidates meet the admissions panel.", status: "upcoming" },
      { date: "Jan 2027", title: "Offers released", description: "Offers issued to selected candidates.", status: "upcoming" },
      { date: "Apr 2027", title: "Programme begins", description: "The residential year commences.", status: "upcoming" },
    ],
  },
  {
    id: "phd",
    label: "Doctoral (PhD)",
    window: "Applications close 20 Feb 2027",
    steps: [
      { date: "Oct 2026", title: "Applications open", description: "Doctoral applications open across ten areas.", status: "complete" },
      { date: "20 Feb 2027", title: "Final deadline", description: "Closing date for doctoral applications.", status: "current" },
      { date: "Mar 2027", title: "Research proposal review", description: "Faculty review proposals and shortlist candidates.", status: "upcoming" },
      { date: "Apr 2027", title: "Interviews", description: "Interviews with the relevant research area.", status: "upcoming" },
      { date: "Jul 2027", title: "Programme begins", description: "Doctoral coursework begins.", status: "upcoming" },
    ],
  },
  {
    id: "cert-fintech",
    label: "Certificate (FinTech)",
    window: "Applications close 10 Dec 2026",
    steps: [
      { date: "Sep 2026", title: "Applications open", description: "Part-time certificate admissions open.", status: "complete" },
      { date: "10 Dec 2026", title: "Final deadline", description: "Closing date for certificate applications.", status: "current" },
      { date: "Dec 2026", title: "Rolling review", description: "Applications reviewed on a rolling basis.", status: "upcoming" },
      { date: "Jan 2027", title: "Offers released", description: "Decisions shared with applicants.", status: "upcoming" },
      { date: "Feb 2027", title: "Programme begins", description: "Weekend classes commence.", status: "upcoming" },
    ],
  },
];

export interface EligibilityRule {
  id: string;
  label: string;
  minExperience: number;
  requiresTest: boolean;
  quantitative: boolean;
  note: string;
}

export const eligibilityRules: EligibilityRule[] = [
  {
    id: "mba",
    label: "MBA",
    minExperience: 0,
    requiresTest: true,
    quantitative: false,
    note: "A bachelor's degree and a valid CAT, GMAT or GRE score are required. Work experience is welcome but not mandatory.",
  },
  {
    id: "mba-analytics",
    label: "MBA (Business Analytics)",
    minExperience: 0,
    requiresTest: true,
    quantitative: false,
    note: "A bachelor's degree with a quantitative background and a valid CAT, GMAT or GRE score are expected.",
  },
  {
    id: "epgp",
    label: "EPGP",
    minExperience: 5,
    requiresTest: true,
    quantitative: false,
    note: "A bachelor's degree, at least five years of full-time work experience and a GMAT or GRE score are required.",
  },
  {
    id: "phd",
    label: "Doctoral (PhD)",
    minExperience: 0,
    requiresTest: true,
    quantitative: false,
    note: "A bachelor's degree (a master's is preferred) and a valid CAT, GMAT, GRE or UGC-NET score are required.",
  },
  {
    id: "cert-fintech",
    label: "Certificate (FinTech)",
    minExperience: 0,
    requiresTest: false,
    quantitative: false,
    note: "A bachelor's degree is required. No entrance test is needed for this part-time certificate.",
  },
];

export const testOptions = ["None", "CAT", "GMAT", "GRE", "UGC-NET", "Other"];