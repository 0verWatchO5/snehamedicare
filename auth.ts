import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

const SEED_ADMIN_KEY = process.env.SEED_ADMIN_KEY || "snehach@clientsdb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Access Key",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Username or Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        // 1. Master Seed Admin Access Key (Instant login with .env key)
        if (password === SEED_ADMIN_KEY) {
          return {
            id: "admin-master-1",
            name: "Sneha (Super Admin)",
            email: email,
            role: "admin",
          };
        }

        // 2. Check Database User if DB is connected
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ email });
          if (dbUser && dbUser.password) {
            const isValid = await bcrypt.compare(password, dbUser.password);
            if (isValid) {
              return {
                id: dbUser._id.toString(),
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role,
              };
            }
          }
        } catch (err) {
          console.warn("DB check during auth skipped or failed:", err);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
