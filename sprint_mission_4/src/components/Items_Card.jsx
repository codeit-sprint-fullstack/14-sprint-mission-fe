import style from "./Items_Card.module.css";
import ic_heart from "../assets/ic_heart.png";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import defaultImg from "../assets/placeholder.png";
import GetApi from "./GetApi";

function Items_Card({ page, size, index }){
  const { products, loading, error } = GetApi(page, size);

  if (loading)
    return console.log('로딩중...');
  if(error)
    return console.log(`에러 발생: ${error.message}`);

  return (
    <>
        {products.map((item) => (
        <div key={item.id} className={style.ItemList}>
          <div key={item.id} className={ index === true
            ? `${style.product_card} ${style.mainlist}`
            : `${style.product_card} ${style.sublist}`}>
            <img src={item.images[0]}
              alt={item.images[0]}
              onError={(e) => { e.target.src = defaultImg }
            } 
            />
            <div className={style.itemInfo}>
              <h3>{item.name}</h3>
              <p>{item.price}원</p>
              <div id={style.likeCount}>
                <img src={ic_heart}/>
                <span>{item.favoriteCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Items_Card;