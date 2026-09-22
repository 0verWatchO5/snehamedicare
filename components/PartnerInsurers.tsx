"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Award, UserCheck } from "lucide-react";
import { PARTNER_INSURERS } from "@/app/data/insuranceData";
import { Badge } from "@/components/ui/badge";

export const PartnerInsurers = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-800/80 bg-slate-950/90 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              Certified Individual Agent
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Licensed to Advise Policies from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                India's Top Insurers
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              Because I am an independent advisor representing multiple leading companies, I help you select the best features and lowest premiums across insurers at <strong>official company rates with ₹0 advisory markup</strong>.
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Guaranteed Official Insurer Tariffs</span>
          </div>
        </div>

        {/* Partner Insurer Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNER_INSURERS.map((partner) => (
            <div
              key={partner.code}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center font-black text-xs text-cyan-400 mb-3 shadow-inner group-hover:border-cyan-500/40">
                  {partner.code}
                </div>
                <h3 className="font-bold text-white text-xs sm:text-sm leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-tight mb-3">
                  {partner.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] text-emerald-400 font-semibold">
                  {partner.claimRatio} Claim Ratio
                </div>
                <div className="text-[10px] text-slate-500">
                  {partner.networkHospitals} Hospitals
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
