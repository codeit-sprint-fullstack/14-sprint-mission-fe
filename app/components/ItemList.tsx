import ItemCard, { Product } from "@/app/components/ItemCard";

export const ItemList = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
