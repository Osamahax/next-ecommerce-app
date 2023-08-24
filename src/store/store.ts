import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { AddCartType } from '@/types/AddCardType'
type CartItem={
    name:string,
    id:string,
    image:string,
    description?:string,
    unit_amount:number | null,
    quantity:number
}

type CartState={
    isOpen:boolean
    cart:CartItem[]
    toggleCart:()=>void
    addProduct:(item:AddCartType)=>void
    removeProduct:(item:AddCartType)=>void
}
export const useCartStore = create<CartState>()(
    persist(
        (set)=>({
            cart:[],
            isOpen:false,
            toggleCart:()=> set((state)=>({isOpen:!state.isOpen})),
            addProduct:(item)=>set((state)=>{
                const existingItem=state.cart.find(cartItem=>cartItem.id===item.id)
                if(existingItem){
                    const updatedCart=state.cart.map((cartItem)=>{
                        if(cartItem.id===item.id){
                             return {...cartItem,quantity:cartItem.quantity+1}
                        }
                        return cartItem
                    })
                    return {cart:updatedCart}
                }else{
                    return {cart :[...state.cart,{...item,quantity:1}]}
                }
            }),
            removeProduct:(item)=>set((state)=>{
                //check if item exist and remove quantity -1
                const existingItem=state.cart.find((cartItem)=>cartItem.id===item.id)
                if(existingItem && existingItem.quantity!>1){
                    const updatedCart = state.cart.map((cartItem)=>{
                        if(cartItem.id === item.id){
                            return {
                                ...cartItem,quantity:cartItem.quantity!-1
                            }
                        }
                        return cartItem
                    })
                    return {cart:updatedCart}
                }else{
                //remove item from cart
                    const filterCart=state.cart.filter((cartItem)=>cartItem.id != item.id)
                    return {cart:filterCart}
                }
            }),
        }),
        {name:'cart-store'}
    )
)