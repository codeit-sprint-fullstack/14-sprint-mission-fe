import '../css/ProductList.css'
import SortDropDown from './SortDropDown.jsx';
import Input from './Input.jsx';
import Button from './Button.jsx';
import iconHeart from '../assets/ic_heart.svg'

function ProductList({ items, orderBy, setOrderBy, page, setPage, keyword, setKeyword }) {
  return (
    <div className="productContents SellProductContents">
      <div className="inner">
        <div className="prodcutSell">
          <div className='titleSection'>
            <p className="sectionTitle">판매 중인 상품</p>
            <div className="sectionTool">
              <Input variant="product" type="text" placeholder="검색할 상품을 입력해주세요" value={keyword}
                onChange={(e) => setKeyword(e.target.value)} />
              <Button>상품 등록하기</Button>
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
                  <li className="item">
                    <a href='/'>
                      <div className="itemImg">
                        <img src={item.images} alt={item.name} />
                      </div>
                      <div className="itemName">{item.name}</div>
                      <div className="itemPrice">{item.price.toLocaleString()}원</div>
                      <div className="itemFav">
                        <img src={iconHeart} alt="찜" />{item.favoriteCount}
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="pagination">
            <div className="btnWrap">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btnArrow btnLeft"
              />
              {Array.from({ length: 5 }).map((_, index) => {
                const pageNum = index + 1;

                return (
                  <button
                    key={pageNum}
                    className={page === pageNum ? 'active' : ''}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(page + 1)}
                className="btnArrow btnRight"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default ProductList