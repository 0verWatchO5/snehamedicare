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
  title: "Sneha Medicare & Insurance | Agent for Star Health, LIC & Tata AIG",
  description:
    "Sneha is an IRDAI-certified insurance agent representing Star Health, LIC of India, and Tata AIG. Complete insurance coverage including Health, Zero-Dep Car, Schengen Travel, and LIC Life policies with direct claim support at official insurer tariffs.",
  keywords: [
    "Sneha Medicare",
    "Insurance Agent Star Health",
    "LIC of India Agent",
    "Tata AIG Car Insurance",
    "Tata AIG Travel Insurance",
    "Zero Depreciation Car Insurance",
    "Schengen Visa Travel Insurance",
    "Star Health Family Floater",
    "LIC Term Life Insurance",
    "Personal insurance agent India",
    "Cashless hospital claims",
    "Cashless garage claims",
    "Section 80D tax saving",
    "Section 80C tax saving"
  ],
  authors: [{ name: "Sneha (Agent: Star Health • LIC • Tata AIG)" }],
  openGraph: {
    title: "Sneha Medicare & Insurance | Agent for Star Health, LIC & Tata AIG",
    description:
      "All types of insurance including Health, Car (Zero Dep), Travel (Schengen), and Life with 1-on-1 personal claim assistance from Sneha at official insurer rates.",
    siteName: "Sneha Medicare & Insurance",
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
