# Insurance Data Models & Dataset Documentation

All static and reference insurance data is housed in `app/data/insuranceData.ts`. This serves as the single source of truth for partner underwriters, insurance plans, advisory services, cashless hospitals, testimonials, and FAQs.

---

## 1. Type Interfaces

### `PartnerInsurer`
Defines an official insurance underwriter represented by the agency.
```typescript
export interface PartnerInsurer {
  id: string;
  name: string;
  category: "Health Specialist" | "Life & Sovereign Security" | "General & Motor Specialist";
  description: string;
  claimRatio: string;
  networkSize: string;
  logoText: string;
  color: string;
  coverageTypes: string[];
}
```

### `InsurancePlan`
Defines a specific insurance policy product advised by the agency.
```typescript
export interface InsurancePlan {
  id: string;
  name: string;
  underwriter: "Star Health" | "Tata AIG" | "LIC of India";
  category: "family" | "senior" | "car" | "travel" | "life" | "topup";
  tag: string;
  sumInsuredOptions: string[];
  startingPremiumMonthly: number;
  startingPremiumAnnual: number;
  features: string[];
  waitingPeriod: string;
  roomRentLimit: string;
  idealFor: string;
  taxSection?: string;
  popular?: boolean;
}
```

### `AgentService`
Defines advisory service offerings provided by Sneha.
```typescript
export interface AgentService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  perks: string[];
}
```

### `CashlessHospital`
Represents a partner hospital in the network directory.
```typescript
export interface CashlessHospital {
  name: string;
  city: string;
  address: string;
  tier: "Apex Super-Specialty" | "Multi-Specialty" | "Premium Care";
  tpaDesks: string[];
  specialties: string[];
  distance?: string;
}
```

### `Testimonial`
Client reviews and claim settlement case studies.
```typescript
export interface Testimonial {
  name: string;
  city: string;
  role: string;
  rating: number;
  story: string;
  plan: string;
  claimAmount: string;
}
```

### `FAQ`
Frequently asked questions and expert answers.
```typescript
export interface FAQ {
  question: string;
  answer: string;
  category: "claims" | "plans" | "agent" | "pricing";
}
```

---

## 2. Core Insurance Datasets

### A. Partner Insurers (`PARTNER_INSURERS`)
1. **Star Health & Allied Insurance Co. Ltd.**
   - Focus: Standalone Health Insurance, Senior Citizen Red Carpet, Family Floater.
   - Claim Settlement Ratio: **99.10%** | Network: **14,000+ Hospitals**.
2. **Life Insurance Corporation of India (LIC)**
   - Focus: Pure Term Life (Tech Term, Jeevan Amar) & Sovereign Guaranteed Family Security.
   - Claim Settlement Ratio: **98.52%** | Backing: **Government of India (Section 37, LIC Act)**.
3. **Tata AIG General Insurance Co. Ltd.**
   - Focus: Zero-Depreciation Car Insurance (Auto Secure) & Schengen/Global Travel Guard.
   - Network: **8,200+ Cashless Garages** & Worldwide Medical Assistance.

---

### B. Curated Insurance Plans (`INSURANCE_PLANS`)

| Plan Name | Underwriter | Category | Starting Premium | Highlights |
|---|---|---|---|---|
| **Star Comprehensive Floater** | Star Health | Family Health | ₹1,250/mo | Zero Room Rent Capping, Maternity & Newborn Cover, ₹5L–₹1 Cr SI |
| **Tata AIG Auto Secure (Zero Dep)** | Tata AIG | Car & Motor | ₹990/mo | Bumper-to-Bumper Zero Dep, Engine Protect, Consumables Cover, 8,200+ Garages |
| **Tata AIG Travel Guard** | Tata AIG | Travel & Schengen | ₹650/trip | 100% Schengen Visa Compliant (€30K+), Flight Delays, Lost Baggage & Evacuation |
| **LIC Tech Term (Pure Term)** | LIC of India | Life & Term | ₹850/mo | Sovereign Guarantee, ₹50L–₹3 Cr Sum Assured, Section 80C Tax Deduction |
| **Star Senior Citizens Red Carpet** | Star Health | Senior Health | ₹2,100/mo | Entry Age 60–75, No Pre-Insurance Medical Screening, Covers Pre-Existing Ailments |
| **Tata AIG MediCare Premier** | Tata AIG | Super Health | ₹1,450/mo | Global Coverage for Planned Surgeries, Cumulative Bonus Super, OPD Cover |

---

### C. Cashless Network Hospitals (`CASHLESS_HOSPITALS`)
Sample apex healthcare providers represented in the locator:
- **Kokilaben Dhirubhai Ambani Hospital** (Mumbai)
- **Lilavati Hospital & Research Centre** (Mumbai)
- **Max Super Speciality Hospital** (Saket, New Delhi)
- **Fortis Memorial Research Institute** (Gurugram, NCR)
- **Manipal Hospital** (HAL Airport Road, Bengaluru)
- **Apollo Hospitals** (Jubilee Hills, Hyderabad)
- **Apollo Main Hospital** (Greams Road, Chennai)
- **Ruby Hall Clinic** (Pune)

---

### D. Verified Claim Settlements (`TESTIMONIALS`)
Case studies proving real-world claim assistance:
1. **Mr. Rajesh & Sunita Mehta (Mumbai)**: ₹4,85,000 Star Health cardiac surgery approved in 40 minutes at Kokilaben Hospital.
2. **Vikramaditya Sengupta (Bengaluru)**: ₹78,400 Tata AIG Zero-Dep car accident claim with zero out-of-pocket parts deduction.
3. **Pooja & Rohan Deshmukh (Pune)**: €3,200 Tata AIG emergency medical claim in Frankfurt reimbursed without Schengen visa complications.
