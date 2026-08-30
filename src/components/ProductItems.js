import styles from "@/styles/Items.module.css"
export default function ProductItem({ product }) {
  return (
    <>
      <div className={styles.itemContents}>
          <div className={styles.itemImgWrap}>
            <img
              src={
                !product.images?.[0] ||
                product.images[0].includes("example.com")
                  ? "/assets/sample.webp"
                  : product.images[0]
              }
              alt={product.name}
            />
          </div>
          <div className={styles.itemTextWrap}>
            <div className={styles.itemTit}>
              <p>{product.name}</p>
            </div>
            <div className={styles.itemPrice}>
              <p>{product.price}<span>원</span></p>
            </div>
            <div className={styles.itemFavWrap}>
              <img src="/assets/ic_fav.png" />
              <p>{product.favoriteCount}</p>
            </div>
          </div>
        </div>
    </>
  )
}