import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      providerId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    providerId: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    providerId?: string | null;
  }
}
