"use client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store/store";
import {AiFillShopping} from 'react-icons/ai'

const Nav = ({ user }: Session) => {
  const cartSore=useCartStore()
  return (
    <nav className="flex justify-between items-center py-12">
      <Link href={"/"}>
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* toggle the cart */}
        <li
          onClick={()=>cartSore.toggleCart()} 
          className="flex items-center text-3xl relative cursor-pointer">
          <AiFillShopping />
          <span className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cartSore.cart.length}
          </span>
        </li>
        {/* if the user is not signed in */}
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <Image
              src={user.image as string}
              alt={user.name as string}
              width={36}
              height={36}
              className="rounded-full"
            />
          </li>
        )}
      </ul>
      {cartSore.isOpen && <Cart />}
    </nav>
  );
};

export default Nav;