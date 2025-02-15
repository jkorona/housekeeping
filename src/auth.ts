import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { authConfig } from "./auth.config";
import { db } from "./db";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const { handlers, auth, signOut } = NextAuth(authConfig);
