import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Sneha Medicare | Certified Individual Health Insurance Agent & Claim Advocate",
  description:
    "Sneha is an IRDAI-certified individual health insurance agent representing Star Health, HDFC ERGO, Care, and Niva Bupa. Get 100% unbiased policy comparison and direct 24/7 bedside cashless claim assistance at official insurer rates.",
  keywords: [
    "Sneha Medicare",
    "Individual health insurance agent",
    "Health insurance advisor India",
    "Personal insurance agent",
    "Cashless hospital claims",
    "Star Health agent",
    "Care health insurance",
    "HDFC ERGO health",
    "Niva Bupa ReAssure",
    "Family floater insurance",
    "Section 80D tax saving",
    "Zero room rent capping"
  ],
  authors: [{ name: "Sneha (Certified Health Insurance Agent)" }],
  openGraph: {
    title: "Sneha Medicare | Certified Individual Health Insurance Agent",
    description:
      "Compare India's top health insurers with direct, 1-on-1 advice from Sneha. Zero room rent penalties and personal 45-minute bedside claim defense.",
    siteName: "Sneha Medicare",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
