import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDB } from "@/app/lib/db";

export const authOptions = {
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const db = await connectToDB();
        const admin = await db
          .collection("admins")
          .findOne({ email: credentials.email });

        if (!admin) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
