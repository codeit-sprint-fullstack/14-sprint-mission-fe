'use client';

export default function ItemsError({ error, reset }) {
  return (
    <main className="market-main">
      <section className="market-section market-sale-section">
        <h1 className="market-section-title">상품을 불러오지 못했습니다</h1>
        <p className="market-product-status">{error.message || '잠시 후 다시 시도해주세요.'}</p>
        <button className="market-register-button" type="button" onClick={reset}>다시 시도</button>
      </section>
    </main>
  );
}
