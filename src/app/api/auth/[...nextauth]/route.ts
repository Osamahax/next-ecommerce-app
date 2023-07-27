import NextAuth from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler=NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProviders({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ]
})
export {handler as GET, handler as POST}