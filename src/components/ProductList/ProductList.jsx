import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import SearchIcon from '../../assets/icon/ic_search.png' 
import BtnRight from '../../assets/icon/btn_left.png'
import BtnLeft from '../../assets/icon/btn_right.png'
import ProductCard from '../ProductCard/ProductCard';
import '../../components/Products.css';

const LIMIT = 10;

function ProductList() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [hasNext, setHasNext] = useState(false);

  const handleLoad = async (orderByParam, keywordParam = '') => {
    const response = await axios.get('/products', {
      params: {
        pageSize: LIMIT,
        orderBy: orderByParam,
        keyword: keywordParam,
      },
    });

    const { list, nextCursor } = response.data;

    setItems(list);
    setHasNext(!nextCursor);
  };

  const handleLoadMore = async () => {
    const response = await axios.get('/products', {
      params: {
        orderBy,
        keyword,
        cursor: items[items.length - 1]?.id,
        pageSize: LIMIT,
      },
    });

    const { list, nextCursor } = response.data;

    setItems((prevItems) => [...prevItems, ...list]);
    setHasNext(!!nextCursor);
  };


  useEffect(() => {
    handleLoad(orderBy, keyword);
  }, [orderBy, keyword]);

  return (
    <div className='productList'>
      <div className='productSearchWrap'>
        <h2>판매중인 상품</h2>
        <div className='productSearchArea'>
          <div className='productSearch'>
            <div>
              <img src={SearchIcon} alt="검색" />
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
            <button
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}>상품 등록하기</button>
          </div>

          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>

      <ProductCard items={items} />

      <div className='pageNation'>
          <button>
            <img src={BtnRight} alt="앞으로" />
          </button>
          <button className='pageNationNum'>1</button>
          <button className='pageNationNum'>2</button>
          <button className='pageNationNum'>3</button>
          <button className='pageNationNum'>4</button>
          <button className='pageNationNum'>5</button>
          {hasNext && (
            <button onClick={handleLoadMore}>
              <img src={BtnLeft} alt="뒤로" />
            </button>
          )}
      </div>

    </div>
  );
}

export default ProductList;