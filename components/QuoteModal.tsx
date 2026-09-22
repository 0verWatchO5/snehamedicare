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
  const [insuranceType, setInsuranceType] = useState<string>("health");
  const [sumInsured, setSumInsured] = useState(prefill?.sumInsured || "₹25 Lakh");
  const [hasPED, setHasPED] = useState("no");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [leadRefId, setLeadRefId] = useState<string | null>(null);
  const [whatsAppDirectUrl, setWhatsAppDirectUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          city,
          insuranceType,
          sumInsured,
          planName: prefill?.planName || "Direct Quote Inquiry",
          monthlyPremium: prefill?.monthlyPremium || 0,
          members: prefill?.members || "Family Floater",
          hasPED,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.leadId) setLeadRefId(data.leadId);
        if (data.whatsappUrl) setWhatsAppDirectUrl(data.whatsappUrl);

        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });

        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit. Please contact Sneha on WhatsApp.");
      }
    } catch {
      // Fallback: still show confirmation and allow direct WhatsApp
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setMobile("");
    setErrorMsg(null);
    setLeadRefId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="emerald">
                <UserCheck className="w-3 h-3 mr-1" />
                Direct Access to Sneha
              </Badge>
              <span className="text-[11px] text-slate-400">100% Free • ₹0 Advisory Fee</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1 tracking-tight">
              Compare Star Health, LIC & Tata AIG
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Share your requirements and I will personally compare official policies across Star Health, LIC, and Tata AIG to find the best plan for you.
            </p>

            {prefill && (
              <div className="mb-6 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-teal-400 uppercase font-bold block">Selected Plan</span>
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
              {/* Insurance Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Type of Insurance
                </label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="health">Health Insurance (Star Health / Tata AIG)</option>
                  <option value="car">Car & Motor Insurance (Tata AIG Zero-Dep)</option>
                  <option value="travel">Travel Insurance (Tata AIG Overseas / Schengen)</option>
                  <option value="life">Life & Term Insurance (LIC of India)</option>
                  <option value="senior">Senior Citizen Health (Star Health 60+)</option>
                  <option value="audit">Free Multi-Policy Audit & Review</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rajesh Sharma"
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-400" /> Mobile Number (for quote comparison & WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 9876543210)"
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* City & Sum Insured */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" /> City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
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
                    <Shield className="w-3.5 h-3.5 text-teal-400" /> Desired Cover / Value
                  </label>
                  <select
                    value={sumInsured}
                    onChange={(e) => setSumInsured(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="₹5 Lakh">₹5 Lakh</option>
                    <option value="₹10 Lakh">₹10 Lakh</option>
                    <option value="₹25 Lakh">₹25 Lakh</option>
                    <option value="₹50 Lakh">₹50 Lakh</option>
                    <option value="₹1 Crore">₹1 Crore</option>
                    <option value="Vehicle IDV">Vehicle IDV (Car / Bike)</option>
                    <option value="$100k Schengen">$100,000 (Travel Schengen)</option>
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

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mt-3 text-center">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <Button
                variant="default"
                size="lg"
                type="submit"
                disabled={loading}
                className="w-full font-bold text-xs mt-4 shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Locking Your Official Quote in Database...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                    Request Personal Quote with Sneha
                  </span>
                )}
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
              Your inquiry has been successfully registered. Sneha will personally evaluate official quotes across Star Health, LIC, and Tata AIG with zero agent markups.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 mb-6 text-left">
              {leadRefId && (
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Inquiry Ref:</span>
                  <strong className="text-emerald-400 font-mono">#{leadRefId.slice(-6).toUpperCase()}</strong>
                </div>
              )}
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
                href={
                  whatsAppDirectUrl ||
                  `https://wa.me/919876543210?text=Hi%20Sneha,%20I%20requested%20a%20quote%20comparison%20for%20${encodeURIComponent(name)}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Message Sneha on WhatsApp Directly
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full text-xs border-slate-700"
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
