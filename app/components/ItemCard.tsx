import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
};

export const ItemCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/items/${product.id}`}>
      <div>
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={120}
            height={120}
            style={{ width: "auto", height: "auto" }}
            unoptimized
          />
        )}
        <p>상품이름 : {product.name}</p>
        <h1>가격 : {product.price}</h1>
        <p>좋아요 : {product.favoriteCount}</p>
      </div>
    </Link>
  );
};

export default ItemCard;
