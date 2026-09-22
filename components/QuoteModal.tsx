"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  MessageSquare, 
  User, 
  Phone, 
  MapPin, 
  Shield, 
  Clock,
  UserCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    planName?: string;
    sumInsured?: string;
    monthlyPremium?: number;
    members?: string;
  } | null;
}

export const QuoteModal = ({ isOpen, onClose, prefill }: QuoteModalProps) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [sumInsured, setSumInsured] = useState(prefill?.sumInsured || "₹25 Lakh");
  const [hasPED, setHasPED] = useState("no");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setMobile("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 text-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="emerald">
                <UserCheck className="w-3 h-3 mr-1" />
                1-on-1 Consultation with Sneha
              </Badge>
              <span className="text-[11px] text-slate-400">100% Free • ₹0 Advisory Fee</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1 tracking-tight">
              Compare Top Health Plans
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Share a few details, and I will personally compare policies across Star Health, HDFC ERGO, Care, and Niva Bupa to find what suits your family best.
            </p>

            {prefill && (
              <div className="mb-6 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Selected Option</span>
                  <span className="font-bold text-white">{prefill.planName || prefill.members}</span>
                </div>
                {prefill.monthlyPremium && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Est. Premium</span>
                    <span className="font-black text-emerald-400 text-sm">₹{prefill.monthlyPremium.toLocaleString()}/mo</span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rajesh Sharma"
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" /> Mobile Number (for quote comparison & WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 9876543210)"
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* City & Sum Insured */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" /> Desired Cover
                  </label>
                  <select
                    value={sumInsured}
                    onChange={(e) => setSumInsured(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="₹5 Lakh">₹5 Lakh</option>
                    <option value="₹10 Lakh">₹10 Lakh</option>
                    <option value="₹25 Lakh">₹25 Lakh</option>
                    <option value="₹50 Lakh">₹50 Lakh</option>
                    <option value="₹1 Crore">₹1 Crore</option>
                  </select>
                </div>
              </div>

              {/* Pre-Existing Condition Question */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Does anyone have pre-existing conditions? (BP, Diabetes, Thyroid, Asthma)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasPED("no")}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      hasPED === "no"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-950/60 border-slate-800 text-slate-400"
                    }`}
                  >
                    No, Healthy
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasPED("yes")}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      hasPED === "yes"
                        ? "bg-amber-500/20 border-amber-500 text-amber-300"
                        : "bg-slate-950/60 border-slate-800 text-slate-400"
                    }`}
                  >
                    Yes, Pre-Existing
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                variant="glow"
                size="lg"
                type="submit"
                className="w-full font-bold text-xs mt-4 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Request Personal Consultation with Sneha
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Spam • Your Number is Only Seen by Sneha</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              Thank You, {name}!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed mb-6">
              I have received your request for a customized {sumInsured} policy comparison. I will personally review the best options and connect with you shortly.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 mb-6 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <strong className="text-white font-mono">{mobile}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">City:</span>
                <strong className="text-white">{city}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Response Time:</span>
                <strong className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Within 15-30 Minutes
                </strong>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/919876543210?text=Hi%20Sneha,%20I%20requested%20a%20quote%20comparison%20for%20${encodeURIComponent(name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Message Sneha on WhatsApp Directly
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full text-xs"
              >
                Close & Return
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
