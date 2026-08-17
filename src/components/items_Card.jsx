import style from "./items_Card.module.css";
import React from "react";

function Items_Card({ products = [], index }) {
  return (
    <>
      {products.map((item) => (
        <div key={item.id} className={style.ItemList}>
          <div
            className={
              index
                ? `${style.product_card} ${style.mainlist}`
                : `${style.product_card} ${style.sublist}`
            }
          >
            <img
              src={item.images[0]}
              alt={item.name}
              onError={(e) => {
                e.target.src = "./assets/placeholder.png";
              }}
            />
            <div className={style.itemInfo}>
              <h3>{item.name}</h3>
              <p>{item.price}원</p>
              <div id={style.likeCount}>
                <img src="./assets/ic_heart.svg" alt="좋아요" />
                <span>{item.favoriteCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Items_Card;