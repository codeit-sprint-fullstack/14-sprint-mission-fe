export default function ItemsLoading() {
  return (
    <main className="market-main" aria-busy="true">
      <section className="market-section market-sale-section">
        <h1 className="market-section-title">판매 중인 상품</h1>
        <p className="market-product-status">상품을 불러오는 중입니다.</p>
        <div className="market-product-grid market-products-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <article className="market-product-card is-loading" key={index}>
              <div className="market-product-card__image" />
              <div className="market-product-card__body">
                <h3 className="market-product-card__name">불러오는 중</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
