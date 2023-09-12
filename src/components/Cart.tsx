"use client";

import Image from "next/image";
import { useCartStore } from "@/store/store";
import formatPrice from "@/util/PriceFormat";
import {IoAddCircle,IoRemoveCircle} from "react-icons/io5"
// import basket from "public/basket.png"
import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  const cartStore = useCartStore();

  //Total Price
  const totalPrice=cartStore.cart.reduce((acc,item)=>{
    return acc+item.unit_amount!*item.quantity
  },0)
  return (
    <motion.div layout
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    > 
      {/* Cart */}
      <motion.div layout onClick={(e)=>e.stopPropagation()} 
        className="bg-white absolute right-0 top-0 h-screen w-full lg:w-2/5 p-12 overflow-y-scroll text-gray-700">
        <button onClick={()=>cartStore.toggleCart()}>Back to store 🏃‍♂️</button>
        {cartStore.cart.map((item)=>(
            <div className="flex py-4 gap-4">
                <Image className="rounded-md  h-24" src={item.image} alt={item.name} width={200} height={200}/>
                <motion.div layout key={item.id}>
                    <h2>{item.name}</h2>
                    <div className="flex gap-2 text-lg">
                      <h2>Quantity: {item.quantity}</h2>
                      <button onClick={()=>cartStore.removeProduct(item)}><IoRemoveCircle/></button>
                      <button onClick={()=>cartStore.addProduct(item)}><IoAddCircle /></button>
                    </div>
                    <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                </motion.div>
            </div>
        ))
        }
        {/*Checkout and totalPrice*/}
        {
          cartStore.cart.length > 0 && (
            <motion.div layout>
              <p>Total: {formatPrice(totalPrice)}</p>
              <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">Checkout</button>
            </motion.div>
          )
        }
        <AnimatePresence>
          {!cartStore.cart.length && (
            <motion.div animate={{scale:1,rotateZ:0,opacity:0.75}}  
              initial={{scale:0,rotateZ:-10,opacity:0}}
              exit={{scale:0,rotateZ:-10,opacity:0}}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
              <h1>Uhhh ohhh... it's empty 😥</h1>
              <Image src="/basket.png" alt="basket" width={200} height={200} />
            </motion.div>
          )
          }
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
export default Cart;
