import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { authOptions } from '@/app/api/auth/[...nextauth]/route' 
import {getServerSession} from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string,{
  apiVersion:"2022-11-15"
})

 
const handler = async(req:NextRequest,res:NextResponse)=>{
  const userSession=await getServerSession(authOptions)
  if(!userSession?.user){
    // res.status(403).json({message:"NOT Logged in"})
    NextResponse.json({message:"NOT Logged In"},{status:403})
    return
  }
  //Extract the data from the body
  const {items,payment_intent_id}=req.body
  // res.status(200).json({userSession})
  NextResponse.json({userSession},{status:200})
  return
}
export {handler as POST}