import Image from "next/image"

const Product=({name,image,price})=> {
  return (
    <div>
        <Image src={image} alt={name} width={400} height={400} />
        <h1>{name}</h1>
        {price}
    </div>
  )
}

export default Product