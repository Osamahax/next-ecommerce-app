import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { authOptions } from '@/app/api/auth/[...nextauth]/route' 
import {getServerSession} from 'next-auth'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string,{
  apiVersion:"2022-11-15"
})

 
const handler = async(req:NextApiRequest,res:NextApiResponse)=>{
  const userSession=await getServerSession(req,res,authOptions)
  if(!userSession?.user){
    res.status(403).json({message:"NOT Logged in"})
    return
  }
  //Extract the data from the body
  const {items,payment_intent_id}=req.body
  res.status(200).json({userSession})
  return
}
export {handler as POST}