# Public UI Components Documentation

This document covers all public front-facing components of Sneha MediCare Advisory.

---

## 1. Navbar (`components/Navbar.tsx`)

### Purpose
The primary global header. Features a **unified sticky container** that combines the top contact/announcement strip and the main navigation bar into a single parent element (`sticky top-0 z-50 w-full`), eliminating any scroll detachment or gap bugs.

### Key Elements
- **Top Announcement Bar**:
  - Highlights agency credentials: `"Agent for: Star Health • LIC of India • Tata AIG | Health • Motor • Travel • Life"`.
  - Direct WhatsApp link: `+91 7400319725` with live online indicator.
- **Main Nav Header**:
  - Logo and brand identity: "Sneha MediCare".
  - Jump links: Plans (`#plans`), Calculator (`#calculator`), Services (`#services`), Hospitals (`#hospitals`), Claim Help (`#concierge`), Why Sneha (`#why-sneha`), FAQs (`#faqs`).
  - Action buttons: "Free Claim Concierge" (triggers smooth scroll to tracker) and "Lock Official Quote" (opens `QuoteModal`).
  - Mobile responsive drawer with animated hamburger toggle.

---

## 2. Hero Section (`components/HeroSection.tsx`)

### Purpose
The focal entry point establishing trust, professional agency credentials, and immediate access to quotes across all 4 insurance categories.

### Key Elements
- **IRDAI Credential Pill**:
  - Sovereign gold and sapphire pill badge: `"IRDAI Certified Agent • Star Health • LIC of India • Tata AIG • Health, Motor, Travel & Life"`.
  - Zero neon glow or distracting AI effects.
- **Headline & Subtitle**:
  - *"Complete Insurance For Your Health, Motor, Travel & Life From An Agent Who Actually Answers Your Call."*
  - Replaces impersonal online aggregators with a dedicated personal advisor.
- **Quick Category Selector**:
  - 4 quick-jump buttons: **Health Insurance** (Star Health), **Motor (Zero-Dep)** (Tata AIG), **Travel (Schengen)** (Tata AIG), and **Life / Term** (LIC).
  - Clicking any category smoothly navigates the user directly to relevant plans.
- **Action CTAs**:
  - Primary: `"Compare Plans & Lock Quote"` (launches `QuoteModal`).
  - Secondary: `"45-Min Claim Support"` (scrolls to `ClaimConcierge`).
- **Live Trust Metrics Strip**:
  - Cashless Claim Settlement Ratio (99.1%).
  - Network Hospitals & Garages (14,000+).
  - Bedside Claim Pre-Auth Response Time (45 Minutes).
  - Advisory Consultation Fee (₹0 Regulated Tariffs).

---

## 3. Partner Insurers Strip (`components/PartnerInsurers.tsx`)

### Purpose
Showcases the trio of licensed underwriters that Sneha officially represents, building immediate institutional trust.

### Represented Underwriters
1. **Star Health & Allied Insurance Co. Ltd.**:
   - Focus: Standalone Health, Senior Citizen Red Carpet, Family Mediclaim.
   - Highlights: 14,000+ Cashless Network Hospitals, 99.10% Claim Settlement Ratio.
2. **Life Insurance Corporation of India (LIC)**:
   - Focus: Pure Term Life (Tech Term / Jeevan Amar) & Family Security.
   - Highlights: Sovereign Guarantee (Section 37 of LIC Act), 98.52% Settlement Ratio, ₹50L to ₹3 Cr+ Sum Assured.
3. **Tata AIG General Insurance Co. Ltd.**:
   - Focus: Zero-Depreciation Motor Insurance & International Schengen Travel Guard.
   - Highlights: 8,200+ Cashless Garages, 100% Schengen Visa Approved, Flight Delay & Medical Evacuation.

---

## 4. Services Section (`components/ServicesSection.tsx`)

### Purpose
Defines the 6 distinct services Sneha provides as an independent personal advisor at zero extra charge.

### The 6 Core Advisory Services
1. **Comprehensive Health Insurance Advisory**: Multi-plan comparison across Star Health and Tata AIG without single-company sales bias.
2. **Zero-Depreciation Motor Insurance**: Bumper-to-bumper car insurance with engine protect, consumable cover, and 8,200+ cashless garages.
3. **Schengen & Worldwide Travel Insurance**: Visa-approved mandatory medical cover (€30,000+), trip cancellation, and lost passport protection.
4. **LIC Term Life & Sovereign Security**: High-cover pure term protection backed by the Government of India with Section 80C tax deduction.
5. **Senior Citizen (60+) Healthcare**: Specialized policies with pre-existing disease (PED) waivers and reduced waiting periods.
6. **Free Existing Policy Health Check & Audit**: WhatsApp schedule review uncovering hidden room-rent caps, copay traps, and coverage gaps.

---

## 5. Multi-Insurance Premium Calculator (`components/PremiumCalculator.tsx`)

### Purpose
An interactive, 4-in-1 calculator allowing visitors to estimate official premiums, discounts, and tax deductions in real-time.

### Supported Product Tabs
1. **Health Insurance**:
   - Selectors: Age slider (18–75), Family Member configuration (Individual, Couple, Family Floater, Senior Parents), Sum Insured (₹5L to ₹1 Cr).
   - Computes: Monthly & annual premium, Section 80D tax deductions (up to ₹75,000).
2. **Motor Insurance (Zero-Dep)**:
   - Selectors: Vehicle Segment (Hatchback, Compact Sedan, Mid-SUV, Luxury / EV), Vehicle Age, No-Claim Bonus (NCB) slider (0% to 50%).
   - Computes: Own damage premium, Zero-Depreciation add-on cost, cashless garage network coverage.
3. **Travel Insurance (Schengen / Global)**:
   - Selectors: Destination Region (Schengen Europe, USA & Canada, Asia & Worldwide), Trip Duration (7 to 90 days), Age tier.
   - Computes: Mandatory €30,000 / $50,000 medical cover premium, flight cancellation and baggage loss rider.
4. **LIC Term Life Insurance**:
   - Selectors: Life Cover Sum Assured (₹50 Lakh to ₹3 Crore), Policy Term (10 to 40 years), Age (18 to 60).
   - Computes: Guaranteed monthly & annual premium, Section 80C income tax savings.

---

## 6. Plan Showcase (`components/PlanShowcase.tsx`)

### Purpose
Curated policy cards with interactive category tabs:
- **All Plans**
- **Health & Mediclaim** (Star Health Comprehensive Floater, Tata AIG MediCare)
- **Motor & Motor (Zero Dep)** (Tata AIG Auto Secure)
- **Travel & Schengen** (Tata AIG Travel Guard)
- **Life & Term Security** (LIC Tech Term & Jeevan Amar)
- **Senior Citizen Care** (Star Health Senior Red Carpet)

### Card Attributes
- Badges for Official Underwriter (Star Health / LIC / Tata AIG).
- Sum insured tiers, key policy benefits, cashless network size.
- Highlighted fine-print protections (e.g., *"Zero Room Rent Capping"*, *"Bumper-to-Bumper"*, *"Schengen Approved"*).
- CTA button: `"Lock Official Quote"` (prefills modal with plan details).

---

## 7. Hospital Finder (`components/HospitalFinder.tsx`)

### Purpose
Searchable cashless hospital locator covering major metros and tier-1/tier-2 Indian cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad).

### Features
- Search by hospital name, city, or specialty tier (Tier-1 Apex / Multi-Specialty).
- Live cashless verification status.
- Direct CTA: `"Pre-Authorize Admission"` (prefills modal with hospital name and city).

---

## 8. Claim Concierge (`components/ClaimConcierge.tsx`)

### Purpose
An interactive simulation demonstrating Sneha's **45-minute bedside cashless claim assistance** process.

### Steps Visualized
1. **Minute 0: Emergency SOS Call**: Client or family calls Sneha directly on phone or WhatsApp.
2. **Minute 15: TPA & Hospital Coordination**: Sneha contacts hospital insurance desk with policy number and photo ID.
3. **Minute 35: Query Resolution**: Sneha clarifies diagnostic queries directly with the underwriter's medical team.
4. **Minute 45: Cashless Pre-Auth Granted**: Initial cashless approval cleared with zero out-of-pocket stress.

---

## 9. Why Sneha Bento Grid (`components/WhySneha.tsx`)

### Purpose
A 5-card Bento Grid presenting the value of a dedicated personal advisor versus faceless online aggregators:
1. **A Real Human in Your Corner 24/7**: No IVR phone trees or chatbot loops during midnight hospital admissions.
2. **100% Unbiased Multi-Line Advice**: Star Health, LIC, and Tata AIG compared objectively to fit the family's exact needs.
3. **Guaranteed Official Pricing (Zero Extra Fee)**: Regulated IRDAI tariffs with zero agent markups.
4. **Fine-Print Clause Buster**: Protection against 1% room rent capping and co-pay traps.
5. **Lifelong Personal Support**: Address changes, newborn additions, and tax certificates handled over direct WhatsApp.

---

## 10. Testimonials & FAQ (`components/TestimonialsAndFAQ.tsx`)

### Purpose
Client social proof and common questions across health, car, travel, and life insurance.

### Features
- Verified client review cards with claim amounts settled (e.g., ₹4.8 Lakh Star Health cardiac claim, ₹78,000 Tata AIG car claim).
- Expandable FAQ accordion addressing cashless procedures, zero-dep add-ons, Schengen visa requirements, and IRDAI regulations.

---

## 11. Footer (`components/Footer.tsx`)

### Purpose
Comprehensive site footer containing institutional underwriter links, insurance products list, and mandatory IRDAI regulatory notices.

### Contents
- Direct phone and WhatsApp contact info.
- Policy links categorized by insurance type.
- Authorized agency partners: Star Health & Allied Insurance, LIC of India, Tata AIG General Insurance.
- Regulatory individual agent notice under Section 42 of the Insurance Act.
- Links to Privacy Policy, Terms of Service, and IRDAI Code of Conduct.

---

## 12. Lead Capture Modal (`components/QuoteModal.tsx`)

### Purpose
The primary conversion vehicle for locking quotes, requesting policy audits, or initiating hospital pre-authorization.

### Form Fields
- **Full Name**: Customer's name.
- **Mobile Number**: 10-digit Indian phone number (with validation).
- **City**: City selection (Mumbai, Delhi, Bengaluru, etc.).
- **Insurance Type**: Health, Motor (Zero-Dep), Travel (Schengen), Life (LIC), Senior Care, Policy Audit.
- **Sum Insured**: Selection tier (₹5 Lakh to ₹1 Crore+).
- **Pre-Existing Diseases (PED)**: Yes / No toggle.

### Submission Lifecycle
1. User clicks **"Request Personal Quote with Sneha"**.
2. Live spinner: *"Locking Your Official Quote in Database..."*.
3. API call sent to `POST /api/quote`.
4. Confetti animation triggers on client.
5. Success confirmation card displays lead reference ID (`#REFXXXXXX`).
6. 1-Click WhatsApp hand-off button generated with pre-composed query.
