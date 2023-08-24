"use client";

import Image from "next/image";
import { useCartStore } from "@/store/store";
import formatPrice from "@/util/PriceFormat";
import {IoAddCircle,IoRemoveCircle} from "react-icons/io5"
const Cart = () => {
  const cartStore = useCartStore();
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div onClick={(e)=>e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700">
        <h1>Here's your shopping list 🗯</h1>
        {cartStore.cart.map((item)=>(
            <div className="flex py-4 gap-4">
                <Image className="rounded-md  h-24" src={item.image} alt={item.name} width={200} height={200}/>
                <div>
                    <h2>{item.name}</h2>
                    <div className="flex gap-2 text-lg">
                      <h2>Quantity: {item.quantity}</h2>
                      <button onClick={()=>cartStore.removeProduct(item)}><IoRemoveCircle/></button>
                      <button onClick={()=>cartStore.addProduct(item)}><IoAddCircle /></button>
                    </div>
                    <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                </div>
            </div>
        ))
        }
        <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">Checkout</button>
      </div>
    </div>
  );
};
export default Cart;