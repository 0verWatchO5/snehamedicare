import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  let leads = [];
  let dbError = null;

  try {
    await connectToDatabase();
    const rawLeads = await Lead.find({}).sort({ createdAt: -1 }).limit(200).lean();
    leads = JSON.parse(JSON.stringify(rawLeads));
  } catch (err: unknown) {
    const error = err as Error;
    console.warn("Admin page DB fetch notice:", error.message);
    dbError = error.message;
  }

  return (
    <AdminDashboardClient
      initialLeads={leads}
      dbError={dbError}
      user={session.user}
    />
  );
}
