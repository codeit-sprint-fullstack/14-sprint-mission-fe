import style from "../style/Items_Card.module.css";
import ic_heart from "../assets/ic_heart.png";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import defaultImg from "../assets/placeholder.png";
import useApi from "./useApi";

function Items_Card({ page, size, option, keyword, index, onMeta }){
  const { products, count, totalPage, loading, error } = useApi(page, size, option, keyword);
  // const [totalPage, setTotalPage] = useState(0); // 페이지 개수
  // const [totalCount, setTotalCount] = useState(0); // 상품 개수

  useEffect(() => {
    if (count && onMeta) {
      onMeta({ count, totalPage });
    }
  }, [count, size, onMeta]);

  if (loading)
    return (
      <div className={style.ItemList}>
        <div className={`${style.product_card} ${style.sublist}`}>
          <img src={defaultImg} alt="기본 이미지" />
          <div className={style.itemInfo}>
            <h3>상품명 로딩중...</h3>
            <p>가격 로딩중...</p>
            <div id={style.likeCount}>
              <img src={ic_heart}/>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    );

  if(error)
    return console.log(`에러 발생: ${error.message}`);

  return (
    <>
      {products.map((item, idx) => (
        <div key={`${item.id}-${index ? 'main' : 'sub'}`} className={style.ItemList}>
          <div className={ index === true
            ? `${style.product_card} ${style.mainlist}`
            : `${style.product_card} ${style.sublist}`}>
            <img  // DB에 이미지를 넣지 않아 임시로 defaultImg가 고정으로 나오게 수정
              src={item.images?.[0] || defaultImg}
              alt={item.images?.[0] || item.name}
              onError={(e) => { e.target.src = defaultImg }}
            />
            <div className={style.itemInfo}>
              <h3>{item.title}</h3>
              <p>{item.price}원</p>
              <div id={style.likeCount}>
                <img src={ic_heart}/>
                <span>{item.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Items_Card;