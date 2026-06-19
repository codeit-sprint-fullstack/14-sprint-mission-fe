function ProductList({
  products,
  list,
}) {
  if (products.length === 0) {
    return (
      <p className="product-list-empty">
        등록된 상품이 없습니다.
      </p>
    )
  }

  return (
    <div className={list}>
      {products.map((product) => {
        const imageUrl = product.images?.[0]

        return (
          <article
            className="product-card"
            key={product.id}>
            <div className="product-card-image-wrapper">
              {imageUrl ? (
                <img
                  className="product-card-image"
                  src={imageUrl}
                  alt={`${product.name} 상품 이미지`} />
              ) : (
                <div className="product-card-image-empty">
                  이미지 없음
                </div>
              )}
            </div>

            <div className="product-card-information">
              <h3 className="product-card-name">
                {product.name}
              </h3>

              <p className="product-card-price">
                {Number(
                  product.price ?? 0,
                ).toLocaleString('ko-KR')}
                원
              </p>

              <div className="product-card-favorite">
                <span
                  className="product-card-heart"
                  aria-hidden="true"
                >
                  ♡
                </span>

                <span>
                  {product.favoriteCount ?? 0}
                </span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProductList