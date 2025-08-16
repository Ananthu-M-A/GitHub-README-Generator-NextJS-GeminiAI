import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

interface User {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) (session.user as User).id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};