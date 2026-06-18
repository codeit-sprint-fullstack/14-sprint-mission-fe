import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Items_Card from "./Items_Card.jsx";
import style from "./Items_Content.module.css";
import ic_search from "../assets/ic_search.svg";
import btn_right from "../assets/btn_right.png";
import btn_left from "../assets/btn_left.png";
import { useState } from "react";

function Items_Content () {
  const navigate = useNavigate(); // 링크 이동 시 새로고침이 아닌 상태로 컴포넌트 호출
  const [sortRule, setSortRule] = useState('recent');

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.bestItem}>
            <h2>베스트 상품</h2>
            <div className={style.bestItemList}>
              <Items_Card page={1} size={4} option={'favorite'} index={true}/>
            </div>
          </div>
          <div className={style.sellItem}>
            <div className={style.sellHeader}>
              <h2>판매 중인 상품</h2>
              <div className={style.search_Button}>
                <input type="text" id={style.searchItem} placeholder="검색할 상품을 입력해주세요"/>
                <button onClick={() => navigate('/')}>
                  <span>상품 등록하기</span>
                </button>
                <select id={style.dropdown} name="category" value={sortRule} onChange={(e) => setSortRule(e.target.value)
                }>
                  <option value="recent">최신순</option>
                  <option value="favorite">좋아요순</option>
                </select>
              </div>
            </div>
            <div className={style.sellItemList}>
              <Items_Card page={1} size={10} option={sortRule} index={false}/>
            </div>
          </div>

          <div className={style.listButton}>
            <button type="button" id={style.right} onClick={() => console.log("클릭됨")}/>
            <button type="button" onClick={() => console.log("클릭됨")}><span>1</span></button>
            <button type="button" onClick={() => console.log("클릭됨")}><span>2</span></button>           
            <button type="button" onClick={() => console.log("클릭됨")}><span>3</span></button>
            <button type="button" onClick={() => console.log("클릭됨")}><span>4</span></button>
            <button type="button" onClick={() => console.log("클릭됨")}><span>5</span></button>                                  
            <button type="button" id={style.left} alt="다음 페이지" onClick={() => console.log("클릭됨")}/>         
          </div>         
        </div>
      </div>
      <Footer />
    </>
  );

}

export default Items_Content;
