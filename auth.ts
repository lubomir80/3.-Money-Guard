import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "./prisma/prisma";



export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   ...authConfig
})