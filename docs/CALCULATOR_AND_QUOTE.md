# Premium Calculator & Lead Capture Workflow

This document details the multi-insurance estimation engine and the quote ingestion pipeline.

---

## 1. Multi-Insurance Premium Calculator (`components/PremiumCalculator.tsx`)

The calculator provides instant, client-side pricing approximations across 4 insurance categories based on standard Indian actuarial brackets.

### A. Tab 1: Health Insurance
- **Inputs**:
  - `age`: 18 to 75 years (slider).
  - `members`: `"1A"` (Individual), `"2A"` (Couple), `"2A1C"` (Family Floater 1 Child), `"2A2C"` (Family Floater 2 Children), `"senior"` (Senior Parents).
  - `sumInsured`: ₹5 Lakh, ₹10 Lakh, ₹25 Lakh, ₹50 Lakh, ₹1 Crore.
- **Formulas**:
  - **Base Premium**:
    - Under 30: ₹6,800/yr
    - 31–45: ₹10,200/yr
    - 46–60: ₹18,400/yr
    - 60+: ₹29,800/yr
  - **Sum Insured Multipliers**:
    - ₹5L: `1.0x`
    - ₹10L: `1.32x`
    - ₹25L: `1.65x`
    - ₹50L: `1.95x`
    - ₹1 Cr: `2.4x`
  - **Member Multipliers**:
    - Individual: `1.0x`
    - Couple: `1.65x`
    - Family 1 Child: `1.9x`
    - Family 2 Children: `2.2x`
    - Senior Parents: `2.7x`
- **Tax Savings (Section 80D)**:
  - If parents included (age >= 60): up to **₹75,000** deduction (₹25,000 self + ₹50,000 senior parents) calculated at 30% tax bracket: `min(annualPremium, 75000) * 0.312`.
  - Self & family: up to **₹25,000** deduction: `min(annualPremium, 25000) * 0.312`.

---

### B. Tab 2: Car Insurance (Zero Depreciation)
- **Inputs**:
  - `vehicleSegment`: Hatchback (e.g. Swift/i20), Sedan (e.g. City/Verna), Mid-SUV (e.g. Creta/Seltos), Luxury / EV (e.g. BMW/Ioniq).
  - `vehicleAge`: New (Year 1), 1–2 Years, 2–4 Years, 4+ Years.
  - `zeroDep`: Boolean toggle (includes bumper-to-bumper parts clearance).
  - `ncbDiscount`: Slider (0%, 20%, 25%, 35%, 45%, 50% No Claim Bonus).
- **Formulas**:
  - Base Own Damage (OD) premium scaled by segment (₹6,500 for Hatchback up to ₹32,000 for Luxury).
  - Zero-Depreciation add-on adds 22% to base OD.
  - NCB discount is deducted from OD: `OD * (1 - ncbDiscount / 100)`.
  - Mandatory Third-Party (TP) statutory tariff added.

---

### C. Tab 3: Travel Insurance (Schengen & Global)
- **Inputs**:
  - `destination`: `"schengen"` (Europe / Schengen Zone), `"usa_canada"` (North America), `"worldwide"` (Asia & Worldwide).
  - `durationDays`: 7 to 90 days.
  - `travelerAge`: Under 40, 41–60, 61–75.
- **Formulas**:
  - Daily base rate multiplied by duration.
  - Schengen: Mandatory €30,000 / $50,000 medical emergency cover with zero deductible.
  - USA & Canada: Applies high-medical-cost multiplier (`1.85x`).
  - Senior traveler surcharge (age > 60: `1.6x`).

---

### D. Tab 4: LIC Term Life Insurance
- **Inputs**:
  - `sumAssured`: ₹50 Lakh, ₹1 Crore, ₹1.5 Crore, ₹2 Crore, ₹3 Crore.
  - `policyTerm`: 10 to 40 years.
  - `entryAge`: 18 to 60 years.
  - `tobaccoUser`: Non-Smoker vs Smoker.
- **Formulas**:
  - Actuarial pure mortality cost based on entry age.
  - Smoker rate adds 40% loading.
  - Sum Assured multiplier scaled linearly with sovereign guarantee under Section 37 of LIC Act.
  - **Tax Savings (Section 80C)**: Up to ₹1,50,000 deduction on annual premium at 30% slab: `min(annualPremium, 150000) * 0.312`.

---

## 2. Lead Ingestion Pipeline (`/api/quote`)

When any quote or consultation CTA is triggered, the public lead capture modal (`QuoteModal.tsx`) executes the following flow:

### Step 1: Client Submission
- Payload sent via `POST /api/quote`:
```json
{
  "name": "Ananya Sharma",
  "mobile": "9820123456",
  "city": "Mumbai",
  "insuranceType": "health",
  "sumInsured": "₹25 Lakh",
  "planName": "Star Comprehensive Floater (Star Health)",
  "monthlyPremium": 1250,
  "members": "Family Floater",
  "hasPED": "no"
}
```

### Step 2: Database Persistence
- Connected to MongoDB Atlas via cached pool (`lib/mongodb.ts`).
- Creates a `Lead` document with status `"NEW"`.
- If MongoDB Atlas is in process of IP whitelisting or temporarily unreachable, the endpoint handles the error gracefully without throwing a 500 error to the client.

### Step 3: Instant WhatsApp Hand-off Link
- The API creates a pre-encoded direct WhatsApp message for Sneha's phone (`+91 98765 43210`):
```
*New Insurance Inquiry (Website)*
• *Name:* Ananya Sharma
• *Phone:* 9820123456
• *City:* Mumbai
• *Type:* Health Insurance
• *Plan:* Star Comprehensive Floater (Star Health)
• *Sum Insured:* ₹25 Lakh
• *Existing Medical History:* No
```
- The client receives `{ success: true, leadId: "...", whatsappUrl: "..." }`.
- Confetti triggers on screen, and the client is given an immediate one-tap button: **"Message Sneha on WhatsApp Directly"**.
