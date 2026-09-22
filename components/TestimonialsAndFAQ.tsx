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

export const TestimonialsAndFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Testimonials Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="emerald" className="mb-4">
              Real Client Stories
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              When Health Emergencies Strike,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Our Agents Stand By Your Side
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Read how Sneha Medicare advisors turned midnight hospital stress into smooth, cashless relief for families across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{t.story}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-[11px] text-slate-400">{t.role}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t.claimAmount}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1">
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
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about Sneha Medicare's agency advisory and claim concierge.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/40 border border-slate-800/80 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/80 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 bg-slate-950/40 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <span>Still have questions about your specific family health history or pre-existing conditions?</span>{" "}
            <a
              href="tel:18008887634"
              className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1 ml-1"
            >
              Speak to a licensed Sneha agent at 1800-888-SNEHA (Toll Free)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
