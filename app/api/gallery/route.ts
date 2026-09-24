import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { GalleryItem } from "@/models/GalleryItem";
import cloudinary from "@/lib/cloudinary";

// GET: Fetch all gallery items (optional category filter)
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query: Record<string, unknown> = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const items = await GalleryItem.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, items });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Gallery GET error:", err.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

// POST: Add a new gallery item
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { title, description, category, imageUrl, publicId, width, height, featured } =
      body;

    if (!title || !imageUrl || !publicId) {
      return NextResponse.json(
        { success: false, error: "Title, Image URL, and Cloudinary Public ID are required." },
        { status: 400 }
      );
    }

    const newItem = await GalleryItem.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      category: category || "Awards & Honors",
      imageUrl,
      publicId,
      width: Number(width) || 0,
      height: Number(height) || 0,
      featured: Boolean(featured),
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Gallery POST error:", err.message);
    return NextResponse.json(
      { success: false, error: "Failed to save gallery item" },
      { status: 500 }
    );
  }
}

// DELETE: Remove item from both MongoDB and Cloudinary
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Item ID is required" },
        { status: 400 }
      );
    }

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary if publicId exists
    if (item.publicId) {
      try {
        await cloudinary.uploader.destroy(item.publicId);
      } catch (cloudErr) {
        console.warn("Cloudinary asset deletion warning:", cloudErr);
      }
    }

    // Delete from database
    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gallery item and cloud asset deleted successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Gallery DELETE error:", err.message);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
