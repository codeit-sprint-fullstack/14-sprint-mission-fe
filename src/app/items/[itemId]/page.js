import ProductDetail from "@/components/items/ProductDetail/ProductDetail";

export default async function ItemDetailPage({ params }) {
  const { itemId } = await params;

  return <ProductDetail itemId={itemId} />;
}
