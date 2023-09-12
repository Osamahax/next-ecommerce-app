'use client'

import {loadStripe,StripeElementsOptions} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import { useCartStore } from '@/store/store'
import {useState,useEffect} from 'react'
import { headers } from 'next/dist/client/components/headers'

const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout=()=>{
    const cartStore=useCartStore()
    const [clientSecret,setClientSecret]=useState("")
    useEffect(()=>{
        //Create a paymentintent as soon as the page loads
        fetch('/api/create-payment-intent',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                items:cartStore.cart,
                payment_intent_id:cartStore.paymentIntent,
            })
        })
    },[])
}
export default Checkout