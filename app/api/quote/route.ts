import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      mobile,
      city,
      insuranceType,
      sumInsured,
      planName,
      hasPED,
      monthlyPremium,
      members,
    } = body;

    if (!name || !mobile) {
      return NextResponse.json(
        { error: "Name and Mobile number are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    let dbConnected = false;
    let savedLeadId: string | null = null;

    try {
      await connectToDatabase();
      const newLead = await Lead.create({
        name: name.trim(),
        mobile: mobile.trim(),
        city: city || "Mumbai",
        insuranceType: insuranceType || "health",
        sumInsured: sumInsured || "₹25 Lakh",
        planName: planName || "General Advisory Inquiry",
        hasPED: hasPED || "no",
        monthlyPremium: Number(monthlyPremium) || 0,
        members: members || "Family Floater",
        status: "NEW",
        source: "Website Quote Modal",
      });

      dbConnected = true;
      savedLeadId = newLead._id.toString();
    } catch (dbError: unknown) {
      const err = dbError as Error;
      console.error("Database lead save failed (check MongoDB Atlas IP whitelist):", err.message);
      // We don't fail the user; we still generate the confirmation
    }

    // Pre-composed WhatsApp message for Sneha
    const typeLabel =
      insuranceType === "car"
        ? "Car (Zero-Dep)"
        : insuranceType === "travel"
        ? "International Travel (Schengen)"
        : insuranceType === "life"
        ? "LIC Term Life"
        : "Health Insurance";

    const waText = encodeURIComponent(
      `*New Insurance Inquiry (Website)*\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${mobile}\n` +
      `• *City:* ${city || "Mumbai"}\n` +
      `• *Type:* ${typeLabel}\n` +
      `• *Plan:* ${planName || "General Consultation"}\n` +
      `• *Sum Insured:* ${sumInsured || "N/A"}\n` +
      `• *Existing Medical History:* ${hasPED === "yes" ? "Yes (PED Declared)" : "No"}`
    );

    const waUrl = `https://wa.me/919876543210?text=${waText}`;

    return NextResponse.json(
      {
        success: true,
        message: "Quote locked successfully! Sneha will call you shortly.",
        leadId: savedLeadId,
        dbStored: dbConnected,
        whatsappUrl: waUrl,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Quote API route error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please call Sneha directly." },
      { status: 500 }
    );
  }
}
