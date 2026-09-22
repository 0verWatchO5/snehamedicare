export interface AgentService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  deliverables: string[];
}

export const AGENT_SERVICES: AgentService[] = [
  {
    id: "new-policy-consulting",
    title: "New Policy Advisory & Comparison",
    tagline: "Unbiased, multi-insurer plan selection tailored to your family's exact medical needs.",
    description: "I evaluate policies across India's top insurers (Star Health, HDFC ERGO, Care, Niva Bupa) to recommend the ideal sum insured, zero room rent capping, and maximum value at official company pricing.",
    badge: "100% Free Consultation",
    iconName: "ShieldCheck",
    deliverables: [
      "Side-by-side comparison of top 3 suited policies",
      "Analysis of room rent limits & restore benefits",
      "Pre-existing disease disclosure guidance",
      "Immediate digital issuance at official rates"
    ]
  },
  {
    id: "policy-audit",
    title: "Free Existing Policy Health Check & Audit",
    tagline: "Find out if your existing policy has dangerous hidden clauses before an emergency strikes.",
    description: "Already have a health policy or corporate group cover? Share your policy schedule with me. I audit it thoroughly to identify hidden 1% room-rent traps, disease sub-limits, high copays, or coverage gaps.",
    badge: "Most Requested Service",
    iconName: "FileSearch",
    deliverables: [
      "Identification of hidden room rent & surgeon capping",
      "Assessment of PED waiting period & restoration clauses",
      "Evaluation of employer coverage sufficiency",
      "Written audit report with actionable advice"
    ]
  },
  {
    id: "cashless-claim-assistance",
    title: "24/7 Bedside Cashless Claim Defense",
    tagline: "Personal coordination with hospital TPA desk to get your pre-authorization approved.",
    description: "When hospitalization occurs, you shouldn't be stressing over paperwork. Send me the admission slip via WhatsApp at any hour; I call the hospital TPA desk and insurer to fast-track cashless pre-auth.",
    badge: "24/7 Emergency Support",
    iconName: "Clock",
    deliverables: [
      "Direct follow-up with hospital TPA billing counter",
      "Expedited pre-authorization turnaround in ~45 mins",
      "Resolution of query letters and document deficiencies",
      "Zero out-of-pocket surprise bill advocacy"
    ]
  },
  {
    id: "senior-parents-consulting",
    title: "Senior Citizens & Pre-Existing Illness Consulting",
    tagline: "Dedicated solutions for parents (60+) and individuals with diabetes, BP, or cardiac history.",
    description: "Securing coverage for senior parents can be tough due to age and medical history. I specialize in finding plans with waived medical checkups, day-30 chronic coverage, and reduced waiting periods.",
    badge: "Specialized Advisory",
    iconName: "Heart",
    deliverables: [
      "Policies with no pre-policy checkup up to age 70",
      "Fast-track waiting periods for diabetes & hypertension",
      "Domiciliary hospitalization & Ayush treatment coverage",
      "Co-pay reduction & waiver strategy"
    ]
  },
  {
    id: "super-topup-planning",
    title: "₹1 Crore Super Top-Up Upgrade Strategy",
    tagline: "Multiply your existing cover up to ₹1 Crore at a fraction of the standard cost.",
    description: "Medical inflation is rising rapidly. I help you construct a high-value super top-up shield with low deductibles so your family is protected against major health events for just ₹12–15 a day.",
    badge: "Smart Money Strategy",
    iconName: "Zap",
    deliverables: [
      "Seamless integration with your employer health insurance",
      "Zero room rent restrictions on super top-up layer",
      "High buffer threshold against critical surgeries",
      "Guaranteed lifelong renewability"
    ]
  },
  {
    id: "lifelong-policy-servicing",
    title: "Hassle-Free Policy Servicing & Endorsements",
    tagline: "A single human contact for all changes, endorsements, and Section 80D tax receipts.",
    description: "No more waiting on customer care phone trees. Message me on WhatsApp to add your spouse or newborn, change address, switch coverage tiers, or download annual tax-saving certificates.",
    badge: "Lifelong Support",
    iconName: "HeartHandshake",
    deliverables: [
      "Adding spouse or newborn to your family policy",
      "Address, contact details & nominee endorsement updates",
      "Instant Section 80D tax receipt generation (Save up to ₹75k)",
      "Advance renewal reminders so coverage never lapses"
    ]
  }
];

export interface PartnerInsurer {
  name: string;
  code: string;
  tagline: string;
  claimRatio: string;
  networkHospitals: string;
  badge: string;
}

export const PARTNER_INSURERS: PartnerInsurer[] = [
  {
    name: "Star Health Insurance",
    code: "STAR",
    tagline: "India's First Standalone Health Insurer",
    claimRatio: "99.1%",
    networkHospitals: "14,000+",
    badge: "Top Choice for Families"
  },
  {
    name: "HDFC ERGO General Insurance",
    code: "HDFC",
    tagline: "Trusted Banking Grade Healthcare Security",
    claimRatio: "98.7%",
    networkHospitals: "13,000+",
    badge: "Fastest Settlement Speed"
  },
  {
    name: "Care Health Insurance",
    code: "CARE",
    tagline: "Specialized Critical Illness & Maternity Plans",
    claimRatio: "98.4%",
    networkHospitals: "11,500+",
    badge: "Unlimited Recharge Benefit"
  },
  {
    name: "Niva Bupa Health Insurance",
    code: "NIVA",
    tagline: "Formerly Max Bupa - Premium Care Experience",
    claimRatio: "98.9%",
    networkHospitals: "10,000+",
    badge: "Any-Room Upgrade Advantage"
  },
  {
    name: "ICICI Lombard Health",
    code: "ICICI",
    tagline: "Comprehensive Multi-Tier Cashless Hospital Network",
    claimRatio: "98.5%",
    networkHospitals: "12,500+",
    badge: "Instant Digital Approvals"
  },
  {
    name: "Aditya Birla Health Insurance",
    code: "ABHI",
    tagline: "Health Returns & Chronic Care Management",
    claimRatio: "97.8%",
    networkHospitals: "10,500+",
    badge: "Earn Up to 100% Premium Back"
  }
];

export interface InsurancePlan {
  id: string;
  name: string;
  underwriter: string;
  tagline: string;
  badge?: string;
  category: "family" | "senior" | "critical" | "topup" | "maternity";
  minAge: number;
  maxAge: number;
  startingPremiumMonthly: number;
  startingPremiumAnnual: number;
  sumInsuredOptions: string[];
  keyBenefits: string[];
  features: {
    roomRent: string;
    prePostHosp: string;
    noClaimBonus: string;
    restoration: string;
    waitingPeriodPED: string;
    dayCareProcedures: string;
    healthCheckup: string;
  };
  popular?: boolean;
}

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: "family-shield-pro",
    name: "Family Health Optima & ReAssure",
    underwriter: "Star Health & Niva Bupa",
    tagline: "Comprehensive family floater covering self, spouse, and kids with zero room rent capping.",
    badge: "Sneha's Top Recommendation",
    category: "family",
    minAge: 18,
    maxAge: 65,
    startingPremiumMonthly: 980,
    startingPremiumAnnual: 11450,
    sumInsuredOptions: ["₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore"],
    popular: true,
    keyBenefits: [
      "Zero Room Rent Capping — Sneha ensures no proportionate deduction penalty",
      "100% Unlimited Sum Insured Restoration for unrelated medical conditions",
      "Free Annual Full-Body Preventive Health Checkup for all adult members",
      "Cumulative No-Claim Bonus up to 100% (increases every claim-free year)",
      "Direct personal claim assistance from Sneha during hospitalization"
    ],
    features: {
      roomRent: "No Capping (Single Private AC Room)",
      prePostHosp: "60 Days Pre / 180 Days Post",
      noClaimBonus: "20% per year, up to 100%",
      restoration: "100% Unlimited Restores",
      waitingPeriodPED: "24 Months (Reduced from 36)",
      dayCareProcedures: "540+ modern procedures",
      healthCheckup: "Free comprehensive panel yearly"
    }
  },
  {
    id: "senior-citizen-care",
    name: "Senior Golden Years Health Shield",
    underwriter: "Care Health & Star Health",
    tagline: "Tailored policy for parents and seniors (60+) recommended personally by Sneha.",
    badge: "No Medical Checkup Required",
    category: "senior",
    minAge: 60,
    maxAge: 85,
    startingPremiumMonthly: 1890,
    startingPremiumAnnual: 21990,
    sumInsuredOptions: ["₹5 Lakh", "₹10 Lakh", "₹15 Lakh", "₹25 Lakh"],
    keyBenefits: [
      "No pre-policy medical checkup mandatory up to age 70",
      "Coverage for Diabetes, Hypertension & Cardiac conditions after 30 days",
      "Domiciliary hospitalization & home nursing allowance included",
      "Co-pay reduction options negotiated personally with the underwriter",
      "Ayush (Ayurveda, Yoga, Homeopathy) inpatient coverage included"
    ],
    features: {
      roomRent: "Single AC Room (or 1% SI)",
      prePostHosp: "30 Days Pre / 60 Days Post",
      noClaimBonus: "10% per year, up to 50%",
      restoration: "1-time 100% refill",
      waitingPeriodPED: "12 - 24 Months for listed conditions",
      dayCareProcedures: "All recognized procedures",
      healthCheckup: "Free Geriatric Cardiac & Sugar panel"
    }
  },
  {
    id: "critical-illness-elite",
    name: "Comprehensive Critical Illness Shield",
    underwriter: "HDFC ERGO & ICICI Lombard",
    tagline: "Guaranteed lump-sum payout on first diagnosis of 36 critical illnesses including cancer.",
    badge: "Direct Lump Sum Cash",
    category: "critical",
    minAge: 18,
    maxAge: 65,
    startingPremiumMonthly: 650,
    startingPremiumAnnual: 7490,
    sumInsuredOptions: ["₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore"],
    keyBenefits: [
      "100% Cash payout directly into your bank account with zero medical bills needed",
      "Covers 36 major ailments: Cancer, Heart Attack, Stroke, Kidney & Organ Failure",
      "Second medical opinion arranged with premier national and international faculties",
      "Protects family income and ongoing household EMIs during recovery",
      "Full Section 80D tax deduction up to ₹75,000"
    ],
    features: {
      roomRent: "Lump sum given directly to policyholder",
      prePostHosp: "Immediate payout upon 30-day survival",
      noClaimBonus: "Fixed guaranteed sum",
      restoration: "Lump sum benefit",
      waitingPeriodPED: "90 days initial waiting period",
      dayCareProcedures: "Covered under policy terms",
      healthCheckup: "Annual Oncological & Cardiac screen"
    }
  },
  {
    id: "super-top-up-booster",
    name: "₹1 Crore Super Top-Up Multiplier",
    underwriter: "Care Health & Niva Bupa",
    tagline: "Boost your employer or existing base policy coverage to ₹1 Crore for just ₹13/day.",
    badge: "Maximum Value For Money",
    category: "topup",
    minAge: 18,
    maxAge: 70,
    startingPremiumMonthly: 390,
    startingPremiumAnnual: 4450,
    sumInsuredOptions: ["₹25 Lakh (Ded. ₹3L)", "₹50 Lakh (Ded. ₹5L)", "₹1 Crore (Ded. ₹5L)"],
    keyBenefits: [
      "Multiply existing employer/personal cover up to ₹1 Crore at minimal premium",
      "Aggregate deductible across all medical events in a policy year",
      "Zero room rent restrictions once the deductible threshold is crossed",
      "Cashless hospitalization supported across all 12,000+ networked hospitals",
      "Lifelong renewability guaranteed by partner underwriters"
    ],
    features: {
      roomRent: "No Capping",
      prePostHosp: "60 Days Pre / 90 Days Post",
      noClaimBonus: "Not required on top-up",
      restoration: "High buffer threshold",
      waitingPeriodPED: "12 Months on top-up tier",
      dayCareProcedures: "Full day care coverage",
      healthCheckup: "Included on 3-year term"
    }
  },
  {
    id: "maternity-newborn-bliss",
    name: "Mother & Newborn Joy Package",
    underwriter: "Star Health & Care Health",
    tagline: "Carefully curated maternal healthcare covering deliveries, pre/post natal, and newborn care.",
    badge: "Day 1 Baby Cover",
    category: "maternity",
    minAge: 21,
    maxAge: 45,
    startingPremiumMonthly: 1250,
    startingPremiumAnnual: 14500,
    sumInsuredOptions: ["₹5 Lakh", "₹10 Lakh", "₹15 Lakh"],
    keyBenefits: [
      "Normal and Caesarean (C-Section) delivery expenses covered",
      "Day 1 baby cover for congenital conditions, incubator, and ICU care",
      "Covers all government and pediatric recommended vaccinations for year 1",
      "Ultrasounds, regular OB-GYN consultations, and lab investigations included",
      "Sneha personally coordinates pre-authorization with the maternity desk"
    ],
    features: {
      roomRent: "Single Private Room",
      prePostHosp: "Pre & Post natal expenses covered",
      noClaimBonus: "10% per year",
      restoration: "Available for non-maternity claims",
      waitingPeriodPED: "Reduced waiting options available",
      dayCareProcedures: "Includes advanced maternal procedures",
      healthCheckup: "Specialized maternal health panel"
    }
  }
];

export interface CashlessHospital {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  beds: number;
  specialties: string[];
  expressCashlessMinutes: number;
  phone: string;
  tpaDesk: string;
}

export const CASHLESS_HOSPITALS: CashlessHospital[] = [
  {
    id: "hosp-1",
    name: "Apollo Multispeciality Hospital",
    city: "Mumbai",
    area: "Navi Mumbai / Belapur",
    rating: 4.9,
    reviewCount: 1420,
    beds: 500,
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Robotic Surgery"],
    expressCashlessMinutes: 35,
    phone: "+91 22 6280 6280",
    tpaDesk: "Ground Floor, Tower A"
  },
  {
    id: "hosp-2",
    name: "Fortis Memorial Research Institute",
    city: "Delhi NCR",
    area: "Gurugram, Sector 44",
    rating: 4.8,
    reviewCount: 2180,
    beds: 450,
    specialties: ["Neuro Sciences", "Organ Transplant", "Pediatrics", "Cardiac Sciences"],
    expressCashlessMinutes: 40,
    phone: "+91 124 492 1021",
    tpaDesk: "Gate 2, TPA Coordination Lounge"
  },
  {
    id: "hosp-3",
    name: "Manipal Hospital",
    city: "Bangalore",
    area: "Old Airport Road / Whitefield",
    rating: 4.9,
    reviewCount: 3100,
    beds: 650,
    specialties: ["Comprehensive Cancer Care", "Cardiovascular", "Spine Surgery", "ICU"],
    expressCashlessMinutes: 30,
    phone: "+91 80 2502 4444",
    tpaDesk: "Main Atrium, Priority Desk #4"
  },
  {
    id: "hosp-4",
    name: "Max Super Speciality Hospital",
    city: "Delhi NCR",
    area: "Saket / Patparganj",
    rating: 4.8,
    reviewCount: 1890,
    beds: 520,
    specialties: ["Laparoscopic Surgery", "Kidney Transplant", "Gastroenterology"],
    expressCashlessMinutes: 42,
    phone: "+91 11 2651 5050",
    tpaDesk: "Emergency Reception Wing"
  },
  {
    id: "hosp-5",
    name: "KIMS Hospitals",
    city: "Hyderabad",
    area: "Secunderabad / Kondapur",
    rating: 4.8,
    reviewCount: 2450,
    beds: 1000,
    specialties: ["Heart & Lung Transplant", "Joint Replacement", "Nephrology"],
    expressCashlessMinutes: 35,
    phone: "+91 40 4488 5000",
    tpaDesk: "Block B, TPA Cashless Lounge"
  },
  {
    id: "hosp-6",
    name: "Ruby Hall Clinic & Research Centre",
    city: "Pune",
    area: "Dhole Patil Road / Wanowrie",
    rating: 4.7,
    reviewCount: 1650,
    beds: 550,
    specialties: ["Critical Care", "Neurology", "Vascular Surgery", "Maternity"],
    expressCashlessMinutes: 38,
    phone: "+91 20 6645 5100",
    tpaDesk: "Ground Floor Cashless Helpdesk"
  },
  {
    id: "hosp-7",
    name: "MIOT International",
    city: "Chennai",
    area: "Manapakkam",
    rating: 4.9,
    reviewCount: 1980,
    beds: 1000,
    specialties: ["Orthopedics", "Trauma Care", "Interventional Cardiology"],
    expressCashlessMinutes: 32,
    phone: "+91 44 4200 2288",
    tpaDesk: "Lobby 1, TPA Liaison Counter"
  },
  {
    id: "hosp-8",
    name: "AMRI Hospitals",
    city: "Kolkata",
    area: "Dhakuria / Salt Lake",
    rating: 4.7,
    reviewCount: 1320,
    beds: 420,
    specialties: ["General Medicine", "Pulmonology", "Neonatology", "ENT"],
    expressCashlessMinutes: 45,
    phone: "+91 33 6680 0000",
    tpaDesk: "Tower 2, Cashless Pre-Auth Desk"
  }
];

export const TESTIMONIALS = [
  {
    name: "Rajesh & Priya Sharma",
    role: "IT Professional, Bengaluru",
    story: "When my father was admitted late at night at Manipal Hospital, Sneha personally answered my call within seconds. She got in touch with the hospital's TPA desk directly, submitted the documents, and secured cashless approval in 32 minutes. Having Sneha as our personal agent is priceless!",
    rating: 5,
    plan: "Senior Golden Years Shield (Care Health)",
    claimAmount: "₹4.85 Lakh Cashless"
  },
  {
    name: "Dr. Ananya Sengupta",
    role: "Assistant Professor, Mumbai",
    story: "Online websites just sell policies and disappear when you need a claim. Sneha sat down with me, analyzed my family's needs, and picked a plan with zero room rent capping from Star Health. When my daughter had dengue, Sneha managed the claim from start to finish.",
    rating: 5,
    plan: "Family Health Optima (Star Health)",
    claimAmount: "₹1.42 Lakh Cashless"
  },
  {
    name: "Vikramaditya Rao",
    role: "Entrepreneur, Hyderabad",
    story: "Sneha reviewed our corporate cover and suggested adding a ₹1 Crore Super Top-Up policy from Niva Bupa. The premium was astonishingly low, and her transparent explanation of fine print and deductibles was deeply refreshing.",
    rating: 5,
    plan: "₹1 Crore Super Top-Up (Niva Bupa)",
    claimAmount: "Peace of Mind"
  }
];

export const FAQS = [
  {
    question: "Who is Sneha? Is this a company or an individual agent?",
    answer: "Sneha is a certified, licensed individual health insurance agent and personal advisor — not a corporate company or agency. This website showcases Sneha's dedicated insurance advisory and claim assistance services. You work directly with Sneha 1-on-1 for personalized guidance, policy audits, and 24/7 bedside claim support."
  },
  {
    question: "What services does Sneha provide?",
    answer: "Sneha provides comprehensive end-to-end health insurance services: (1) Free Multi-Insurer Policy Comparison across Star Health, HDFC ERGO, Care, and Niva Bupa, (2) Free Existing Policy Audits to identify hidden room-rent capping and sub-limits, (3) 24/7 Bedside Cashless Hospital Claim Assistance, (4) Senior Citizen & PED Advisory, (5) Super Top-Up Planning up to ₹1 Crore, and (6) Lifelong Policy Servicing, endorsements, and Section 80D tax certificates."
  },
  {
    question: "Do I have to pay Sneha any fee for her services?",
    answer: "No, absolutely ₹0! Sneha's advisory, policy comparison, document review, and claim assistance services are 100% free of charge to you. Policies are issued at standard, IRDAI-regulated official insurer tariffs without any markups or extra fees."
  },
  {
    question: "Why should I work with an individual agent like Sneha instead of an online portal?",
    answer: "When you buy directly online, you get automated bots, hold music, and zero claim support during emergency hospital admissions. With Sneha, you have an experienced human agent on WhatsApp and phone who personally contacts the hospital TPA desk to expedite cashless approvals and defend your claims."
  },
  {
    question: "Which insurance companies does Sneha work with?",
    answer: "Sneha is authorized to advise and arrange policies with India's leading health insurers, including Star Health Insurance, HDFC ERGO General Insurance, Care Health Insurance, Niva Bupa (formerly Max Bupa), and ICICI Lombard."
  },
  {
    question: "Can Sneha review my existing health insurance policy?",
    answer: "Yes! Sneha offers a 100% free Existing Policy Health Check. You can send your policy schedule to Sneha on WhatsApp, and she will review it to see if it has 1% room rent limits, disease sub-limits, or insufficient coverage that could lead to heavy out-of-pocket bills during hospitalization."
  }
];

export const TRUST_STATS = [
  { label: "Insurer Partners", value: "Top 6+", subtext: "Star, HDFC, Care, Niva Bupa..." },
  { label: "Cashless Network Hospitals", value: "12,000+", subtext: "Personal admission support" },
  { label: "Client Claim Assistance", value: "100%", subtext: "Direct agent contact 24/7" },
  { label: "Families Protected", value: "2,500+", subtext: "1-on-1 lifelong relationship" },
];
