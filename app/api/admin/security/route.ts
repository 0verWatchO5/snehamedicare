import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const users = await User.find({}, "-password").sort({ createdAt: -1 });

    const isDbConnected = true;
    const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;
    const hasSeedKey = !!process.env.SEED_ADMIN_KEY;

    return NextResponse.json({
      success: true,
      currentUser: session.user,
      securityStatus: {
        dbConnected: isDbConnected,
        hasNextAuthSecret,
        hasSeedKey,
        sessionStrategy: "JWT (Secure Cookie)",
        authVersion: "NextAuth.js v5 Beta",
      },
      users,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      error: err.message,
      currentUser: session.user,
      securityStatus: {
        dbConnected: false,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasSeedKey: !!process.env.SEED_ADMIN_KEY,
        sessionStrategy: "JWT (Secure Cookie)",
        authVersion: "NextAuth.js v5 Beta",
      },
      users: [],
    });
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const { action } = body;

    // Action 1: Change / Set Password
    if (action === "change-password") {
      const { currentPassword, newPassword } = body;

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const email = session.user.email?.toLowerCase().trim();
      if (!email) {
        return NextResponse.json({ error: "No email in session" }, { status: 400 });
      }

      // Verify current password against SEED_ADMIN_KEY or DB
      const SEED_ADMIN_KEY = process.env.SEED_ADMIN_KEY || "snehach@clientsdb";
      let isCurrentValid = currentPassword === SEED_ADMIN_KEY;

      let dbUser = await User.findOne({ email });

      if (!isCurrentValid && dbUser?.password) {
        isCurrentValid = await bcrypt.compare(currentPassword, dbUser.password);
      }

      if (!isCurrentValid) {
        return NextResponse.json(
          { error: "Current password or Master Access Key is incorrect." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      if (!dbUser) {
        dbUser = await User.create({
          name: session.user.name || "Sneha (Super Admin)",
          email,
          password: hashedPassword,
          role: "admin",
        });
      } else {
        dbUser.password = hashedPassword;
        await dbUser.save();
      }

      return NextResponse.json({
        success: true,
        message: "Password updated successfully in database! You can now log in with your new password.",
      });
    }

    // Action 2: Add New Sub-Agent or Admin
    if (action === "create-user") {
      const { name, email, password, role } = body;

      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "Name, email, and password are required." },
          { status: 400 }
        );
      }

      const cleanEmail = email.toLowerCase().trim();
      const existing = await User.findOne({ email: cleanEmail });

      if (existing) {
        return NextResponse.json(
          { error: "A user with this email address already exists." },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: role === "agent" ? "agent" : "admin",
      });

      return NextResponse.json({
        success: true,
        message: `User ${newUser.name} created successfully.`,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      });
    }

    // Action 3: Delete User
    if (action === "delete-user") {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: "User ID is required." }, { status: 400 });
      }

      await User.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "User deleted successfully." });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
