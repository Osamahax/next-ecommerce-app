import NextAuth,{ type NextAuthOptions } from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import { PrismaAdapter } from "@Next-Auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions =({
    adapter: PrismaAdapter(prisma),
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProviders({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    events:{
      createUser:async ({user})=>{
         const stripe =new Stripe(process.env.STRIPE_SECRET_KEY as string, {
          apiVersion:'2022-11-15',
         })
         //lets create stripe customer
         if(user.name && user.email){
           const customer=await stripe.customers.create({
            email:user.email,
            name:user.name,
           })
           await prisma.user.update({
            where:{id:user.id},
            data:{stripeCustomerId:customer.id}
           })
         }
      }
    }
})
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}