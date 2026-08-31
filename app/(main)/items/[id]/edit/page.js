import ProductEdit from "@/app/components/ProductEdit";

export default async function itemEditPage({ params }) {
  const { id } = await params;

  return (
    <section className="insert-item">
      <ProductEdit id={id} />
    </section>
  );
}
