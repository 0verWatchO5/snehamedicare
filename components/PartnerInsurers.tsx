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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Certified Individual Underwriter Agent
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Authorized Agent for{" "}
              <span className="text-emerald-400">
                Star Health, LIC & Tata AIG
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              I bring you official company pricing with <strong>₹0 advisory markup</strong>. Whether safeguarding your family's health, your car, international travel, or life security — you get direct 1-on-1 access and personal claim advocacy.
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Guaranteed Official Insurer Tariffs</span>
          </div>
        </div>

        {/* 3 Core Partner Insurers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNER_INSURERS.map((partner) => (
            <div
              key={partner.code}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 backdrop-blur-xl transition-all duration-200 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 font-black text-xs text-teal-400">
                    {partner.code}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {partner.badge}
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg leading-snug mb-1 group-hover:text-teal-300 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {partner.tagline}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">Coverage Scope</span>
                  <span className="text-xs text-slate-300 font-medium">{partner.coverageTypes}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Claim Settlement</span>
                  <span className="text-xs text-emerald-400 font-bold">{partner.claimRatio}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Network</span>
                  <span className="text-xs text-slate-300 font-semibold">{partner.networkHospitals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
