import ProductEdit from "@/components/items/ProductEdit/ProductEdit";

export default async function EditItemPage({ params }) {
  const { itemId } = await params;

  return <ProductEdit itemId={itemId} />;
}
