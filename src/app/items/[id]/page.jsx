export default async function ItemDetailPage({ params }) {
  const { id } = await params;

  return (
    <div className="main">
      <div className="inner">
        <h1>상품 상세 페이지</h1>
        <p>상품 ID: {id}</p>
      </div>
    </div>
  );
}
