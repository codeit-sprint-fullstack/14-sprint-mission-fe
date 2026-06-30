import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Items_Card from "./Items_Card.jsx";
import style from "../style/Items_Content.module.css";
import ic_search from "../assets/ic_search.svg";
import btn_right from "../assets/btn_right.png";
import btn_left from "../assets/btn_left.png";
import { use, useEffect, useState, useLayoutEffect } from "react";

function Items_Content () {
  const navigate = useNavigate(); // 링크 이동 시 새로고침이 아닌 상태로 컴포넌트 호출
  const [sortRule, setSortRule] = useState('recent');
  const [count, setCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const getSizes = () => {
    if (window.innerWidth >= 1200) {
      return { favoritSize: 4, size: 10 };
    } else if (window.innerWidth >= 744) {
      return { favoritSize: 2, size: 6 };
    } else {
      return { favoritSize: 1, size: 4 };
    }
  };

  const [favoritSize, setFavoritSize] = useState(getSizes().favoritSize);
  const [size, setSize] = useState(getSizes().size);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setFavoritSize(4);
        setSize(10);
      } else if (window.innerWidth >= 744) {
        setFavoritSize(2);
        setSize(6);
      } else {
        setFavoritSize(1);
        setSize(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMeta = ({ count, totalPage }) => {
    console.log(count);
    console.log(totalPage);
    setCount(count);
    setTotalPage(totalPage);
  }

  {/* 페이지네이션 구현 */}
  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(page - Math.floor(maxButtons / 2), 1);
    let end = start + maxButtons - 1;

    if (end > totalPage) {
      end = totalPage;
      start = Math.max(end - maxButtons + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.bestItem}>
            <h2>베스트 상품</h2>
            <div className={style.bestItemList}>
              <Items_Card key="main" page={1} size={favoritSize} option={'recent'} keyword={null} index={true}/>
            </div>
          </div>
          <div className={style.sellItem}>
            <div className={style.sellHeader}>
              <h2>판매 중인 상품</h2>
              <div className={style.search_Button}>
                <input
                  type="text"
                  id={style.searchItem}
                  placeholder="검색할 상품을 입력해주세요"
                  defaultValue={keyword}   // undefined/null 방지
                  onBlur={(e) => {setKeyword(e.target.value)
                    console.log(keyword);
                  }}
                />
                <button onClick={() => navigate('/registration')}>
                  <span>상품 <br/>등록하기</span>
                </button>
                <select id={style.dropdown} name="category" value={sortRule} onChange={(e) => setSortRule(e.target.value)
                }>
                  <option value="recent">최신순</option>
                  <option value="favorite">좋아요순</option>
                </select>
              </div>
            </div>
            <div className={style.sellItemList}>
              <Items_Card key="sub" page={page} size={size} option={sortRule} index={false} keyword={keyword} onMeta={handleMeta}/>
            </div>
          </div>
          
          {/* 페이지네이션 구현 */}
          <div className={style.listButton}>
            <button
              type="button"
              id={style.right}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            />

            {getPageNumbers().map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={page === num ? style.active : ""}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              id={style.left}
              onClick={() => setPage(prev => Math.min(prev + 1, totalPage))}
            />
          </div>        
        </div>
      </div>
    </>
  );

}

export default Items_Content;
