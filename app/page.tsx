"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PartnerInsurers } from "@/components/PartnerInsurers";
import { ServicesSection } from "@/components/ServicesSection";
import { PremiumCalculator } from "@/components/PremiumCalculator";
import { PlanShowcase } from "@/components/PlanShowcase";
import { HospitalFinder } from "@/components/HospitalFinder";
import { ClaimConcierge } from "@/components/ClaimConcierge";
import { WhySneha } from "@/components/WhySneha";
import { TestimonialsAndFAQ } from "@/components/TestimonialsAndFAQ";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { InsurancePlan, CashlessHospital } from "@/app/data/insuranceData";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<{
    planName?: string;
    sumInsured?: string;
    monthlyPremium?: number;
    members?: string;
  } | null>(null);

  const handleOpenQuote = () => {
    setQuotePrefill(null);
    setIsQuoteModalOpen(true);
  };

  const handleOpenConsultationForService = (serviceTitle: string) => {
    setQuotePrefill({
      planName: `Service Request: ${serviceTitle}`,
      sumInsured: "₹25 Lakh",
    });
    setIsQuoteModalOpen(true);
  };

  const handleSelectPlan = (plan: InsurancePlan) => {
    setQuotePrefill({
      planName: `${plan.name} (${plan.underwriter})`,
      monthlyPremium: plan.startingPremiumMonthly,
      sumInsured: plan.sumInsuredOptions[plan.sumInsuredOptions.length - 1],
    });
    setIsQuoteModalOpen(true);
  };

  const handleCalculatorSelect = (calcDetails: {
    age: number;
    sumInsured: string;
    members: string;
    monthlyPremium: number;
    annualPremium: number;
    taxSavings: number;
  }) => {
    setQuotePrefill({
      planName: `Calculated Coverage (${calcDetails.members}, Age ${calcDetails.age})`,
      sumInsured: calcDetails.sumInsured,
      monthlyPremium: calcDetails.monthlyPremium,
      members: calcDetails.members,
    });
    setIsQuoteModalOpen(true);
  };

  const handleOpenAdmissionModal = (hospital: CashlessHospital) => {
    setQuotePrefill({
      planName: `Cashless Claim Pre-Auth at ${hospital.name} (${hospital.city})`,
      sumInsured: "₹25 Lakh",
    });
    setIsQuoteModalOpen(true);
  };

  const handleOpenTracker = () => {
    const conciergeElement = document.getElementById("concierge");
    if (conciergeElement) {
      conciergeElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c2340] via-[#0e2a4d] to-[#091b30] text-sky-200 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenTracker={handleOpenTracker}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenQuote={handleOpenQuote}
          onOpenTracker={handleOpenTracker}
        />

        {/* Partner Insurers Strip */}
        <PartnerInsurers />

        {/* Dedicated Services Section: What Sneha Does */}
        <ServicesSection
          onOpenConsultation={handleOpenConsultationForService}
        />

        {/* Interactive Premium & Tax Calculator */}
        <PremiumCalculator
          onSelectQuote={handleCalculatorSelect}
        />

        {/* Curated Health Plans Showcase */}
        <PlanShowcase
          onSelectPlan={handleSelectPlan}
        />

        {/* 12,000+ Cashless Hospitals Locator */}
        <HospitalFinder
          onOpenAdmissionModal={handleOpenAdmissionModal}
        />

        {/* 45-Minute Cashless Claim Concierge & Interactive Simulator */}
        <ClaimConcierge />

        {/* The Personal Agent Advantage Bento Grid */}
        <WhySneha />

        {/* Real Testimonials & FAQs */}
        <TestimonialsAndFAQ />
      </main>

      {/* Footer with Individual Agent Disclosures */}
      <Footer />

      {/* 1-on-1 Consultation & Lead Capture Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        prefill={quotePrefill}
      />
    </div>
  );
}
