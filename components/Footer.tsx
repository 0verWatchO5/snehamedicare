"use client";

import React from "react";
import { 
  HeartHandshake, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock,
  UserCheck 
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Identity & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-400 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white">Sneha </span>
                <span className="text-xl font-light text-cyan-400">Medicare</span>
                <div className="text-[10px] text-emerald-400 uppercase font-semibold">
                  Certified Health Insurance Agent
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Personal health insurance advisory by Sneha. Helping families select the ideal policy across India's top insurers and providing 45-minute bedside cashless claim assistance at zero extra fee.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Direct / WhatsApp: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>sneha@snehamedicare.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Insurance Plans Advised */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Policies Advised
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Family Floater Policies</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Senior Citizen (60+) Shield</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Critical Illness Lump Sum</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">₹1 Crore Super Top-Up</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Maternity & Newborn Cover</a></li>
            </ul>
          </div>

          {/* Col 3: Insurer Partners Represented */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Insurers Represented
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Star Health & Allied Insurance</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">HDFC ERGO General Insurance</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Care Health Insurance</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">Niva Bupa Health Insurance</a></li>
              <li><a href="#plans" className="hover:text-cyan-400 transition-colors">ICICI Lombard Health</a></li>
            </ul>
          </div>

          {/* Col 4: Why An Individual Agent? */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Why Work With Sneha?
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>1-on-1 human contact (no bots)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bedside claim paperwork assistance</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>Lifelong policy servicing</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>45-min pre-auth follow-up</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="py-8 space-y-3 text-[11px] text-slate-400 leading-relaxed border-b border-slate-900">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>IRDAI Individual Agent Regulatory Notice</span>
          </div>
          <p>
            <strong>Sneha</strong> (operating as Sneha Medicare) is an IRDAI-certified, licensed individual health insurance agent. Sneha acts as an independent advisor representing authorized insurers and is not an underwriter. Insurance is the subject matter of solicitation.
          </p>
          <p>
            All policy terms, conditions, coverage limits, exclusions, premium calculations, and claim settlements are strictly governed by the underwriting criteria of respective licensed insurance companies (including Star Health & Allied Insurance Co. Ltd., HDFC ERGO General Insurance Co. Ltd., Care Health Insurance Ltd., Niva Bupa Health Insurance Co. Ltd., and ICICI Lombard General Insurance Co. Ltd.). Sneha does not levy any advisory fees or extra commissions to clients; all policies are issued at standard official insurer tariffs. Tax benefits are subject to provisions under Section 80D of the Income Tax Act, 1961.
          </p>
        </div>

        {/* Bottom copyright & links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            © {new Date().getFullYear()} Sneha Medicare (Certified Individual Health Insurance Agent). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">IRDAI Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
