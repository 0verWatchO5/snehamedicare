"use client";

import React, { useState } from "react";
import {
  Star,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Award,
  HeartHandshake
} from "lucide-react";
import { TESTIMONIALS, FAQS } from "@/app/data/insuranceData";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export const TestimonialsAndFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a1e36]/70 border-t border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Testimonials Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="amber" className="mb-4">
              Real Client Stories
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
              When Emergencies Strike,{" "}
              <span className="text-gradient-cyan">
                Your Dedicated Agent Stands By You
              </span>
            </h2>
            <p className="text-sky-200/80 text-base sm:text-lg">
              Read how Sneha helped clients navigate hospital cashless admissions, zero-dep car accident claims, Schengen travel delays, and LIC family security with zero hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-3xl bg-[#0e2a4d]/75 border border-cyan-500/20 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <GlowingEffect variant="cyan" />

                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed italic mb-6">
                    &quot;{t.story}&quot;
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-cyan-900/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-cyan-200 text-sm">{t.name}</div>
                      <div className="text-[11px] text-sky-300/70">{t.role}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {t.claimAmount}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300 mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Policy: {t.plan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto pt-8">
          <div className="text-center mb-12">
            <Badge variant="amber" className="mb-4">
              Clear & Transparent
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-cyan-200 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sky-200/80 text-sm">
              Everything you need to know about Sneha MediCare's agency advisory and claim concierge.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0e2a4d]/60 border border-cyan-500/20 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#132f54]/70 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-cyan-200">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-sky-200/90 leading-relaxed border-t border-cyan-900/40 pt-4 bg-[#0b213c]/80 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center p-6 rounded-2xl bg-[#0e2a4d]/80 border border-cyan-500/25 text-xs text-sky-200">
            <span>Have specific questions about health, car zero-dep, travel Schengen visa, or LIC life policies?</span>{" "}
            <a
              href="tel:+917400319725"
              className="text-cyan-300 font-bold hover:underline inline-flex items-center gap-1 ml-1"
            >
              Speak directly to Sneha at +91 7400319725 (Direct & WhatsApp)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
