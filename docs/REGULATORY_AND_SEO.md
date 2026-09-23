# Regulatory Compliance & SEO Architecture

## 1. IRDAI Individual Agent Regulatory Compliance

Sneha operates as an IRDAI-certified, licensed individual insurance agent. In accordance with the Insurance Regulatory and Development Authority of India (IRDAI) guidelines and the Insurance Act, 1938, the website enforces specific regulatory standards across all public copy.

### Mandatory Declarations
1. **Subject Matter of Solicitation**:
   - The disclaimer prominently states: *"Insurance is the subject matter of solicitation."*
2. **Individual Agent Status vs. Underwriter**:
   - The copy explicitly clarifies that Sneha is an independent licensed individual agent representing authorized insurers, not an insurance underwriting company.
3. **Official Tariff Guarantee (Zero Agent Markups)**:
   - All quotes, comparisons, and policy issuances are strictly priced according to official IRDAI-approved insurance company rate charts. Sneha levies zero advisory fees, commission surcharges, or processing fees on the policyholder.
4. **Underwriter Discretion on Claims**:
   - All claim settlements, coverage terms, waiting periods, room-rent clauses, and exclusions remain subject to the underwriting criteria and policy terms of the respective insurers:
     - **Star Health & Allied Insurance Co. Ltd.**
     - **Life Insurance Corporation of India (LIC)**
     - **Tata AIG General Insurance Co. Ltd.**

---

## 2. Tax Deduction Disclosures

The website provides informative guidance on eligible income tax benefits under the Income Tax Act, 1961:

- **Section 80D (Health Insurance Premiums)**:
  - Up to **₹25,000** for self, spouse, and dependent children.
  - An additional deduction up to **₹50,000** for senior citizen parents (age 60+).
  - Maximum cumulative deduction: **₹75,000 to ₹1,00,000**.
  - Up to **₹5,000** for preventive health check-ups within the overall limit.
- **Section 80C (LIC Life & Term Insurance)**:
  - Premiums paid for pure term life and endowment policies qualify for deduction up to **₹1,50,000** per financial year.
- **Section 10(10D)**:
  - Death benefits or maturity proceeds are exempt from income tax subject to statutory conditions.

---

## 3. SEO (Search Engine Optimization) Architecture

The public application is optimized for search visibility across major Indian cities and high-intent insurance advisory keywords.

### Metadata Configuration (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: "Sneha MediCare | Agent for Star Health, LIC & Tata AIG",
  description:
    "Sneha is an IRDAI-certified insurance agent representing Star Health, LIC of India, and Tata AIG. Complete insurance coverage including Health, Zero-Dep Car, Schengen Travel, and LIC Life policies with direct claim support at official insurer tariffs.",
  keywords: [
    "Sneha MediCare",
    "Insurance Agent Star Health",
    "LIC of India Agent",
    "Tata AIG Car Insurance",
    "Tata AIG Travel Insurance",
    "Zero Depreciation Car Insurance",
    "Schengen Visa Travel Insurance",
    "Star Health Family Floater",
    "LIC Term Life Insurance",
    "Personal insurance agent India",
    "Cashless hospital claims",
    "Cashless garage claims",
    "Section 80D tax saving",
    "Section 80C tax saving"
  ],
  authors: [{ name: "Sneha (Agent: Star Health • LIC • Tata AIG)" }],
  openGraph: {
    title: "Sneha MediCare | Agent for Star Health, LIC & Tata AIG",
    description:
      "All types of insurance including Health, Car (Zero Dep), Travel (Schengen), and Life with 1-on-1 personal claim assistance from Sneha at official insurer rates.",
    siteName: "Sneha MediCare",
    locale: "en_IN",
    type: "website",
  },
};
```

### Semantic HTML & Accessibility
- **Single `<h1>` Tag**: Located in the Hero Section for primary topic authority.
- **Proper Heading Hierarchy**: `<h2>` for each major section, `<h3>` for cards, and `<h4>` for sub-services.
- **Interactive Element IDs**: Clear anchor targets (`#plans`, `#calculator`, `#services`, `#hospitals`, `#concierge`, `#why-sneha`, `#faqs`) for frictionless in-page navigation.
- **Mobile Responsive Meta**: Fast-loading static generation with Next.js Turbopack compilation.
