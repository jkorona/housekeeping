import NextAuth, { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = !nextUrl.pathname.startsWith("/login");
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
