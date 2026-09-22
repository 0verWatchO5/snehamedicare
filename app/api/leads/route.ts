import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const filterType = searchParams.get("type");
    const filterStatus = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (filterType && filterType !== "all") {
      query.insuranceType = filterType;
    }
    if (filterStatus && filterStatus !== "all") {
      query.status = filterStatus;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(150);

    return NextResponse.json({ success: true, leads });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Failed to fetch leads:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch leads from database. Ensure MongoDB Atlas IP is whitelisted." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const updateFields: Record<string, unknown> = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;

    const updatedLead = await Lead.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    await Lead.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Lead removed" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
