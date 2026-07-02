import '../css/ProductList.css'
import SortDropDown from './SortDropDown.jsx';
import Input from './Input.jsx';
import Button from './Button.jsx';
import iconHeart from '../assets/ic_heart.svg'
import { useNavigate, Link } from "react-router-dom";
import defaultImg from "../assets/img_default.png"
function ProductList({ items, orderBy, setOrderBy, page, setPage, keyword, setKeyword, totalCount, pageSize }) {
  const navigate = useNavigate();
  // 5개씩 묶인 페이지 그룹
  const pageGroup = Math.floor((page - 1) / 5);
  // 현재 페이지 그룹의 시작 페이지 번호
  const startPage = pageGroup * 5 + 1;
  // 전체 페이지 개수
  const totalPage = Math.ceil((totalCount / pageSize))

  let pageButtonCount;
  if (totalPage >= 5) {
    pageButtonCount = 5
  } else {
  pageButtonCount = totalPage
  }
  return (
    <div className="productContents SellProductContents">
      <div className="inner">
        <div className="prodcutSell">
          <div className='titleWrap'>
            <p className="sectionTitle">판매 중인 상품</p>
            <div className="sectionTool">
              <Input variant="product" type="text" placeholder="검색할 상품을 입력해주세요" value={keyword}
                onChange={(e) => setKeyword(e.target.value)} />
              <Button onClick={() => navigate("/register")}>상품 등록하기</Button>
              <SortDropDown
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />
            </div>
          </div>
          <div className="productList">
            <ul className="itemList">
              {items.map((item) => {
                return (
                  <li className="item" key={item._id}>
                    <Link to={`/Items/${item._id}`}>
                      <div className="itemImg">
                        <img src={item.images || defaultImg} alt={item.name} />
                      </div>
                      <div className="itemName">{item.name}</div>
                      <div className="itemPrice">{item.price.toLocaleString()}원</div>
                      <div className="itemFav">
                        <img src={iconHeart} alt="찜" />{item.favoriteCount}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="pagination">
            <div className="btnWrap">
              <button className="btnArrow btnLeft" />
              {Array.from({ length: pageButtonCount }).map((_, index) => {
                const pageNum = startPage + index;
                return (
                  <button onClick={() => setPage(pageNum)} key={pageNum}>{pageNum}</button>
                )
              })}
              <button className="btnArrow btnRight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList