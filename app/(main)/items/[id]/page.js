import ItemDetail from "@/app/components/ItemDetail";

export default async function ItemDetailPage({ params }) {
  const { id } = await params;

  return (
    <>
      <ItemDetail id={id} />
    </>
  );
}
