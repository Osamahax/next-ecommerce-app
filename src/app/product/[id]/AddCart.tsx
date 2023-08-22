"use client";

import { useCartStore } from "@/store/store";
import { AddCartType } from "@/types/AddCardType";
import { useState } from "react";

const AddCart = ({ name, id, image, unit_amount,quantity }: AddCartType) => {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);
  return (
    <button
        onClick={()=>cartStore.addProduct({id,name,unit_amount,quantity,image})} 
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
      Add to Cart
    </button>
  );
};

export default AddCart;
