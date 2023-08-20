import { AddCardTypes } from "@/types/AddCardTypes"
import formatPrice from "@/util/PriceFormat"
import Image from "next/image"

const Product=({name,image,price}:AddCardTypes)=> {
  return (
    <div>
        <Image src={image} alt={name} width={400} height={400} />
        <h1>{name}</h1>
        {formatPrice(price as number )}
    </div> 
  )
}

export default Product