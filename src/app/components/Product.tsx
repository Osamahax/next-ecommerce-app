import { AddCardTypes } from "@/types/AddCardTypes";
import { ProductType } from "@/types/ProductType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import Link from "next/link";
const Product = ({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) => {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description,features },
      }}
    >
      <div className="text-gray-700">
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
