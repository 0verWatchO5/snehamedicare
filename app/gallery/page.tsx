"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  HeartHandshake,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  PhoneCall,
  ArrowRight,
  FileCheck,
  CheckCircle2,
  Filter
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GalleryItemType {
  _id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  publicId: string;
  createdAt: string;
  featured?: boolean;
}

const CATEGORIES = [
  "All",
  "Awards & Honors",
  "Certificates & Licenses",
  "Claim Approvals",
  "Client Moments",
  "Events & Seminars",
];

// Curated default showcase items in case database is just initialized
const DEFAULT_SAMPLE_ITEMS: GalleryItemType[] = [
  {
    _id: "sample-1",
    title: "Star Health Premier Club Agency Recognition",
    description: "Awarded for exceptional customer claim advocacy and ethical advisory standards.",
    category: "Awards & Honors",
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80",
    publicId: "sample-1",
    createdAt: new Date().toISOString(),
    featured: true,
  },
  {
    _id: "sample-2",
    title: "IRDAI Licensed Individual Agent Certification",
    description: "Official authorized individual license credentials across Health, Life, and General Insurance.",
    category: "Certificates & Licenses",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    publicId: "sample-2",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-3",
    title: "Cashless Hospital Pre-Authorization Clearance",
    description: "Successful ₹4.8 Lakh cashless surgery pre-authorization settled within 38 minutes.",
    category: "Claim Approvals",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    publicId: "sample-3",
    createdAt: new Date().toISOString(),
    featured: true,
  },
  {
    _id: "sample-4",
    title: "Tata AIG Motor & Travel Insurance Advisory Summit",
    description: "Annual partner conclave on zero-depreciation coverage and Schengen visa compliance.",
    category: "Events & Seminars",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    publicId: "sample-4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-5",
    title: "LIC Sovereign Guarantee Policy Deliveries",
    description: "Handing over long-term family security bond documents to young parents in Mumbai.",
    category: "Client Moments",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    publicId: "sample-5",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-6",
    title: "Senior Citizen Health Shield Consultation",
    description: "Personal home consultation explaining PED waiting period waivers and day-care procedures.",
    category: "Client Moments",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    publicId: "sample-6",
    createdAt: new Date().toISOString(),
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Fetch gallery items from MongoDB API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        } else {
          // Fallback to sample items so the page is never blank
          setItems(DEFAULT_SAMPLE_ITEMS);
        }
      } catch {
        setItems(DEFAULT_SAMPLE_ITEMS);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c2340] via-[#0e2a4d] to-[#091b30] text-sky-200 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Breadcrumbs & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="amber" className="px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" /> Official Credentials & Milestones
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-cyan-200 tracking-tight mb-4">
            Sneha MediCare{" "}
            <span className="text-gradient-cyan">
              Photo & Milestone Gallery
            </span>
          </h1>

          <p className="text-sky-200/80 text-sm sm:text-base leading-relaxed">
            A real visual record of IRDAI licensing credentials, Star Health & LIC agency honors, hospital claim approvals, and personal client advisory sessions.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 border-cyan-300 shadow-md shadow-cyan-950/50"
                  : "bg-[#0b213c]/80 text-sky-200/80 border-cyan-900/40 hover:border-cyan-400/40 hover:text-cyan-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center text-sky-300/70 text-sm flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span>Loading gallery photos...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center p-8 rounded-3xl bg-[#0e2a4d]/60 border border-cyan-900/40 max-w-md mx-auto">
            <Award className="w-10 h-10 text-cyan-400/60 mx-auto mb-3" />
            <h3 className="text-base font-bold text-cyan-200 mb-1">No photos in this category yet</h3>
            <p className="text-xs text-sky-300/60">Check back soon or select another category above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-3xl p-4 bg-[#0e2a4d]/85 border border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 cursor-pointer"
              >
                <GlowingEffect variant="cyan" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#07192d] mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/90 text-slate-950 font-bold text-[11px] shadow-sm">
                        <Maximize2 className="w-3 h-3" /> Expand Fullscreen
                      </span>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0c2340]/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-cyan-200 group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-sky-200/70 leading-relaxed mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-sky-300/60 mt-auto">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Verified Credential
                      </span>
                      <span className="font-mono">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Agent Advisory Strip */}
        <div className="relative mt-20 p-8 rounded-3xl bg-gradient-to-r from-[#0e2a4d] to-[#10325c] border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <GlowingEffect variant="cyan" />

          <div className="relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Direct 1-on-1 Consultation
            </span>
            <h3 className="text-2xl font-black text-cyan-200">
              Need Personal Advice on Your Family&apos;s Policy?
            </h3>
            <p className="text-xs text-sky-200/80 max-w-xl mt-1">
              Talk directly to Sneha. Compare official quotes across Star Health, LIC, and Tata AIG with zero agent markups.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Button
              variant="default"
              size="lg"
              onClick={() => setIsQuoteOpen(true)}
              className="w-full sm:w-auto font-bold text-xs px-6 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              Request Personal Quote
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Link
              href="/"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl border border-cyan-500/30 text-xs font-semibold text-sky-200 hover:text-cyan-200 hover:bg-[#132f54]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#051121]/95 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-[#132f54]/80 hover:bg-[#1a3d6b] text-sky-200 hover:text-cyan-100 flex items-center justify-center border border-cyan-500/30 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          {filteredItems.length > 1 && (
            <button
              onClick={prevLightbox}
              className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#132f54]/80 hover:bg-[#1a3d6b] text-sky-200 hover:text-cyan-100 items-center justify-center border border-cyan-500/30 transition-colors cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {filteredItems.length > 1 && (
            <button
              onClick={nextLightbox}
              className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#132f54]/80 hover:bg-[#1a3d6b] text-sky-200 hover:text-cyan-100 items-center justify-center border border-cyan-500/30 transition-colors cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Content container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-[#0b213c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/80"
          >
            <div className="relative w-full max-h-[68vh] flex items-center justify-center bg-[#061528] overflow-hidden">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[68vh] object-contain"
              />
            </div>

            <div className="w-full p-6 bg-[#0e2a4d] border-t border-cyan-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <span className="text-xs text-sky-300/60 font-mono">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-cyan-200">
                  {filteredItems[lightboxIndex].title}
                </h3>
                {filteredItems[lightboxIndex].description && (
                  <p className="text-xs text-sky-200/80 mt-1 max-w-xl">
                    {filteredItems[lightboxIndex].description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={filteredItems[lightboxIndex].imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#132f54] hover:bg-[#183d6b] text-cyan-200 border border-cyan-500/30 transition-colors"
                >
                  Open Original
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Quote modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefill={{ planName: "Inquiry from Gallery Page" }}
      />
    </div>
  );
}
