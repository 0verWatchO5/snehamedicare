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
    id: "health-insurance",
    title: "Health Insurance & Cashless Hospitalization",
    tagline: "Unbiased plan selection across Star Health and Tata AIG with zero room rent capping.",
    description: "I evaluate comprehensive health plans from Star Health and Tata AIG to recommend ideal family floater coverage, day-1 pre-existing coverage, and 100% restoration benefits at official insurer rates.",
    badge: "Star Health & Tata AIG",
    iconName: "ShieldCheck",
    deliverables: [
      "Custom family floaters & senior citizen care",
      "Zero room rent restrictions & restore benefits",
      "Fast-track pre-existing condition waiting periods",
      "Immediate digital policy issuance with ₹0 agent fee"
    ]
  },
  {
    id: "car-motor-insurance",
    title: "Motor & Two-Wheeler Motor Insurance",
    tagline: "Zero-depreciation motor coverage with instant cashless garage claim assistance.",
    description: "Protect your vehicle with Tata AIG's industry-leading Auto Secure plans. Enjoy bumper-to-bumper zero dep, engine protection, return to invoice, and 24x7 spot roadside assistance.",
    badge: "Tata AIG Authorized",
    iconName: "Zap",
    deliverables: [
      "Bumper-to-bumper Zero Depreciation add-on",
      "Engine & gearbox hydro-lock protection",
      "Access to 7,500+ cashless network garages",
      "Seamless No Claim Bonus (NCB) transfer up to 50%"
    ]
  },
  {
    id: "travel-insurance",
    title: "International & Domestic Travel Insurance",
    tagline: "Schengen & US embassy approved overseas medical and trip delay coverage.",
    description: "Traveling abroad for vacation, business, or studies? I issue instant travel policies from Tata AIG and Star Health covering overseas medical emergencies, lost baggage, passport loss, and flight cancellations.",
    badge: "Schengen & USA Visa Ready",
    iconName: "Clock",
    deliverables: [
      "Emergency medical treatment & hospital cashless abroad",
      "Schengen visa compliant with €30,000+ minimum cover",
      "Baggage delay, lost passport & trip cancellation",
      "Student travel & senior citizen overseas medical cover"
    ]
  },
  {
    id: "lic-life-insurance",
    title: "LIC Life, Term & Retirement Planning",
    tagline: "India's most trusted sovereign-backed life protection and term security.",
    description: "As an authorized agent for Life Insurance Corporation of India (LIC), I help you design pure term insurance, child education funds, and guaranteed lifetime pension plans with Section 80C tax benefits.",
    badge: "LIC of India",
    iconName: "Heart",
    deliverables: [
      "High sum assured pure term plans (Tech Term / Jeevan Amar)",
      "Guaranteed child education & marriage maturity funds",
      "Lifetime pension & retirement annuities (Saral Pension)",
      "100% Sovereign Guarantee by the Government of India"
    ]
  },
  {
    id: "cashless-claim-assistance",
    title: "24/7 Claim Advocacy & Emergency Defense",
    tagline: "Personal coordination during hospital admissions, car accidents & overseas emergencies.",
    description: "When an emergency strikes, you shouldn't be negotiating with call centers. Reach Sneha directly. I personally coordinate hospital TPA desks, cashless garages for vehicle repairs, and emergency claim documents.",
    badge: "24/7 Personal Claim Help",
    iconName: "HeartHandshake",
    deliverables: [
      "Hospital TPA pre-authorization turnaround in ~45 mins",
      "Cashless car accident claim coordination with surveyor",
      "Assistance with overseas medical bills & reimbursement",
      "Zero out-of-pocket surprise bill advocacy"
    ]
  },
  {
    id: "policy-audit-servicing",
    title: "Free Multi-Policy Audit & Renewal Servicing",
    tagline: "A single dedicated human advisor for all your family's insurance policies.",
    description: "Consolidate your insurance portfolio. Share your existing health, motor, travel, or LIC policy documents. I audit them for hidden sub-limits, ensure timely renewals, and handle all nominee or address endorsements.",
    badge: "Complete Portfolio Care",
    iconName: "FileSearch",
    deliverables: [
      "Identification of hidden capping & coverage gaps",
      "Advance renewal reminders so protection never lapses",
      "Endorsement updates (nominee, address, vehicle transfer)",
      "Section 80D & Section 80C tax-saving certificates"
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
  coverageTypes: string;
}

export const PARTNER_INSURERS: PartnerInsurer[] = [
  {
    name: "Star Health Insurance",
    code: "STAR",
    tagline: "India's Premier Standalone Health Insurer",
    claimRatio: "99.1%",
    networkHospitals: "14,000+ Hospitals",
    badge: "Specialist Health & Senior Care",
    coverageTypes: "Family Health • Senior Citizens • Super Top-Up"
  },
  {
    name: "LIC of India",
    code: "LIC",
    tagline: "Life Insurance Corporation — Yogakshemam Vahamyaham",
    claimRatio: "98.5%",
    networkHospitals: "Sovereign Guarantee",
    badge: "India's #1 Life & Term Insurer",
    coverageTypes: "Pure Term Life • Child Future • Pension & Annuity"
  },
  {
    name: "Tata AIG General Insurance",
    code: "TATA AIG",
    tagline: "With You Always — Auto, Travel & Health Security",
    claimRatio: "99.0%",
    networkHospitals: "7,500+ Garages & 10,000+ Hospitals",
    badge: "Top Choice for Motor & Travel",
    coverageTypes: "Zero-Dep Motor • Schengen Travel • Health & Critical Care"
  }
];

export interface InsurancePlan {
  id: string;
  name: string;
  underwriter: string;
  tagline: string;
  badge?: string;
  category: "family" | "senior" | "car" | "travel" | "life" | "topup";
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
    id: "star-family-comprehensive",
    name: "Star Health Comprehensive Floater",
    underwriter: "Star Health Insurance",
    tagline: "Comprehensive family floater covering self, spouse, and kids with zero room rent capping.",
    badge: "Sneha's Top Health Pick",
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
      "Direct personal claim assistance from Sneha at 14,000+ cashless hospitals"
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
    id: "tata-aig-auto-secure",
    name: "Tata AIG Auto Secure (Motor Package)",
    underwriter: "Tata AIG General Insurance",
    tagline: "Zero-depreciation motor coverage with instant cashless garage claim settlement.",
    badge: "7,500+ Cashless Garages",
    category: "car",
    minAge: 18,
    maxAge: 80,
    startingPremiumMonthly: 690,
    startingPremiumAnnual: 7850,
    sumInsuredOptions: ["IDV Based", "Zero Depreciation", "Engine Protection", "Return to Invoice"],
    popular: true,
    keyBenefits: [
      "Bumper-to-bumper Zero Depreciation coverage for plastic, fiber & metal parts",
      "Engine & Gearbox Protection against water ingression & oil leakage",
      "Access to 7,500+ cashless network garages across India",
      "24/7 Spot Roadside Assistance: emergency towing, jump-start & flat tyre",
      "Seamless No Claim Bonus (NCB) transfer up to 50% from existing insurer"
    ],
    features: {
      roomRent: "N/A (Motor Coverage)",
      prePostHosp: "Instant cashless garage survey",
      noClaimBonus: "Up to 50% NCB transfer",
      restoration: "Return to invoice value option",
      waitingPeriodPED: "Immediate coverage upon inspection",
      dayCareProcedures: "Glass, fiber & metal repair covered",
      healthCheckup: "Free vehicle inspection"
    }
  },
  {
    id: "tata-aig-travel-guard",
    name: "Tata AIG Travel Guard (Overseas & Schengen)",
    underwriter: "Tata AIG General Insurance",
    tagline: "Embassy-approved international travel shield with cashless hospital care abroad.",
    badge: "Schengen & US Visa Approved",
    category: "travel",
    minAge: 6,
    maxAge: 85,
    startingPremiumMonthly: 420,
    startingPremiumAnnual: 1850,
    sumInsuredOptions: ["$50,000", "$100,000 (Schengen)", "$250,000", "$500,000 (USA/Canada)"],
    popular: true,
    keyBenefits: [
      "Compliant with Schengen visa requirements (min €30,000 medical coverage)",
      "Cashless emergency hospitalization & medical evacuation worldwide",
      "Compensation for checked baggage loss, passport theft & trip cancellation",
      "Flight delay & missed connection emergency hotel accommodation allowance",
      "Direct WhatsApp emergency coordination with Sneha while you travel"
    ],
    features: {
      roomRent: "Hospital room covered abroad",
      prePostHosp: "Medical evacuation included",
      noClaimBonus: "N/A (Trip policy)",
      restoration: "Reimbursement & cashless network",
      waitingPeriodPED: "Emergency life-saving PED covered",
      dayCareProcedures: "Emergency outpatient covered",
      healthCheckup: "No medical test needed"
    }
  },
  {
    id: "lic-tech-term-amar",
    name: "LIC Tech Term & Jeevan Amar",
    underwriter: "LIC of India",
    tagline: "India's #1 pure term life cover backed by the Sovereign Guarantee of India.",
    badge: "Govt of India Sovereign Guarantee",
    category: "life",
    minAge: 18,
    maxAge: 65,
    startingPremiumMonthly: 790,
    startingPremiumAnnual: 8990,
    sumInsuredOptions: ["₹50 Lakh", "₹1 Crore", "₹1.5 Crore", "₹2 Crore"],
    popular: true,
    keyBenefits: [
      "100% Sovereign Guarantee under Section 37 of LIC Act by Govt of India",
      "High sum assured life protection at lowest non-smoker rates",
      "Accidental Death & Disability Benefit riders for 2x financial security",
      "Guaranteed lumpsum or regular monthly income payout to your nominees",
      "Tax deductions under Section 80C & 100% tax-free claim under Section 10(10D)"
    ],
    features: {
      roomRent: "N/A (Pure Life Cover)",
      prePostHosp: "Lumpsum payment to nominee",
      noClaimBonus: "Guaranteed sum assured",
      restoration: "Terminal illness acceleration",
      waitingPeriodPED: "Standard medical underwriting",
      dayCareProcedures: "N/A (Life Insurance)",
      healthCheckup: "Free tele-MER or clinic checkup"
    }
  },
  {
    id: "senior-citizen-care",
    name: "Star Health Senior Citizen Red Carpet",
    underwriter: "Star Health Insurance",
    tagline: "Tailored policy for parents and seniors (60+) with no pre-policy medical tests.",
    badge: "No Medical Checkup Required",
    category: "senior",
    minAge: 60,
    maxAge: 85,
    startingPremiumMonthly: 1890,
    startingPremiumAnnual: 21990,
    sumInsuredOptions: ["₹5 Lakh", "₹10 Lakh", "₹15 Lakh", "₹25 Lakh"],
    keyBenefits: [
      "No pre-policy medical checkup mandatory up to age 75",
      "Coverage for Diabetes, Hypertension & Cardiac conditions after 11 months",
      "Domiciliary hospitalization & home nursing allowance included",
      "Co-pay reduction options negotiated personally with the underwriter",
      "Ayush (Ayurveda, Yoga, Homeopathy) inpatient coverage included"
    ],
    features: {
      roomRent: "Single AC Room (or 1% SI)",
      prePostHosp: "30 Days Pre / 60 Days Post",
      noClaimBonus: "10% per year, up to 50%",
      restoration: "1-time 100% refill",
      waitingPeriodPED: "Reduced waiting period for listed conditions",
      dayCareProcedures: "All recognized procedures",
      healthCheckup: "Free Geriatric Cardiac & Sugar panel"
    }
  },
  {
    id: "tata-aig-MediCare-premier",
    name: "Tata AIG MediCare Premier & Super Top-Up",
    underwriter: "Tata AIG General Insurance",
    tagline: "Global medical treatment, OPD consultations, and maternity in a single high-tier plan.",
    badge: "Worldwide Emergency Treatment",
    category: "topup",
    minAge: 18,
    maxAge: 70,
    startingPremiumMonthly: 990,
    startingPremiumAnnual: 11200,
    sumInsuredOptions: ["₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore"],
    keyBenefits: [
      "Global Cover: Inpatient treatment covered abroad for listed critical surgeries",
      "Zero room rent restrictions — stay in any private or suite room without penalty",
      "Restore benefit up to 100% of sum insured automatically upon exhaustion",
      "OPD dental, ophthalmic, and vaccination coverage included",
      "Cumulative bonus increases sum insured by 50% for every claim-free year"
    ],
    features: {
      roomRent: "No Capping (Suite Room Allowed)",
      prePostHosp: "60 Days Pre / 90 Days Post",
      noClaimBonus: "50% per claim-free year, up to 100%",
      restoration: "100% Unlimited Restores",
      waitingPeriodPED: "24 Months",
      dayCareProcedures: "All day care procedures",
      healthCheckup: "Free yearly comprehensive wellness checkup"
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
    name: "Dr. Ananya Sengupta",
    role: "Assistant Professor, Mumbai",
    story: "Online websites just sell policies and disappear when you need a claim. Sneha sat down with me, analyzed my family's needs, and picked a plan with zero room rent capping from Star Health. When my daughter had dengue, Sneha managed the hospital cashless pre-auth from start to finish.",
    rating: 5,
    plan: "Star Health Comprehensive Floater",
    claimAmount: "₹1.42 Lakh Cashless"
  },
  {
    name: "Karan & Neha Malhotra",
    role: "Tech Consultant, Bengaluru",
    story: "Sneha handled our Tata AIG car insurance with bumper-to-bumper zero dep. When our SUV had accidental damage on the highway, Sneha coordinated directly with the Tata AIG surveyor and the cashless workshop. Not a single rupee out of pocket for parts!",
    rating: 5,
    plan: "Tata AIG Auto Secure (Zero Dep)",
    claimAmount: "₹68,500 Cashless Garage"
  },
  {
    name: "Vikramaditya Rao",
    role: "Entrepreneur & Frequent Traveler, Hyderabad",
    story: "Sneha manages all our insurance: our LIC pure term life plan, our Star Health family floater, and our Schengen travel insurance for our Europe trip. Having one single trusted human agent for all policies gives our entire family absolute peace of mind.",
    rating: 5,
    plan: "LIC Term Life & Tata AIG Travel Guard",
    claimAmount: "Full Family Portfolio"
  }
];

export const FAQS = [
  {
    question: "Who is Sneha? Is this an agency or a dedicated personal agent?",
    answer: "Sneha is a certified, licensed individual insurance agent representing Star Health, LIC of India, and Tata AIG General Insurance. You work directly with Sneha 1-on-1 for personalized insurance planning across health, car, travel, and life, with direct personal assistance when filing claims."
  },
  {
    question: "Which insurance products does Sneha cover?",
    answer: "Sneha covers the complete spectrum of family and personal insurance: (1) Health Insurance & Senior Citizen Care via Star Health and Tata AIG, (2) Motor & Motor Insurance with zero depreciation via Tata AIG, (3) International & Domestic Travel Insurance (Schengen & US visa approved) via Tata AIG and Star Health, and (4) Pure Term Life, Retirement, and Child Future Planning with LIC of India."
  },
  {
    question: "Do I have to pay Sneha any consultation or service fee?",
    answer: "No, absolutely ₹0! Sneha's advisory, policy comparison, quotes, and claim assistance services are 100% free of charge to you. All policies are issued at standard, IRDAI-regulated official company tariffs with zero markups or hidden fees."
  },
  {
    question: "Why choose a personal agent over an online aggregator or website?",
    answer: "When you buy directly online, you get impersonal call center queues and automated chatbots during emergencies. With Sneha, you have a direct human contact on WhatsApp and phone who coordinates with hospital TPA desks for cashless admission, liaises with motor surveyors for car claims, and expedites documentation."
  },
  {
    question: "Which primary insurance companies is Sneha authorized to represent?",
    answer: "Sneha is an authorized individual advisor for three of India's most respected underwriters: Star Health Insurance (Health & Senior Care), Life Insurance Corporation of India (LIC - Life & Term), and Tata AIG General Insurance (Motor, Two-Wheeler, International Travel & Health)."
  },
  {
    question: "Can Sneha help review or transfer my existing policies?",
    answer: "Yes! Sneha provides a 100% free Policy Health Check. You can share your existing health, motor, or life policy schedule to check for hidden sub-limits, ensure your car's No Claim Bonus (NCB) transfers at up to 50% discount, or verify that your family's life coverage is adequate."
  }
];

export const TRUST_STATS = [
  { label: "Core Insurers", value: "Star • LIC • Tata AIG", subtext: "Official certified agent" },
  { label: "Insurance Types", value: "Health • Motor • Travel • Life", subtext: "Complete family protection" },
  { label: "Cashless Network", value: "14,000+ Hosp / 7,500+ Garages", subtext: "Direct claim coordination" },
  { label: "Families Advised", value: "2,500+", subtext: "1-on-1 human advocacy" },
];
