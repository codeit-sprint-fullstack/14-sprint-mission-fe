import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import SearchIcon from '../../assets/icon/ic_search.png' 
import ProductCard from '../ProductCard/ProductCard';

const LIMIT = 10;

function ProductList() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');

  const handleLoad = async (orderByParam, keywordParam = '') => {
    const response = await axios.get('/products', {
      params: {
        orderBy: orderByParam,
        keyword: keywordParam,
        pageSize: LIMIT,
      },
    });

    const list = response.data;

    setItems(list);
  };


  useEffect(() => {
    handleLoad(orderBy, keyword);
  }, [orderBy, keyword]);

  return (
    <section>
      <h2>판매중인 상품</h2>
      <div>
        <div className='productSearch'>
          <div>
            <img src={SearchIcon} alt="검색" />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button>상품 등록하기</button>
        </div>

        <select>
          <option value="recent" onClick={() => setOrderBy('recent')}>최신순</option>
          <option value="favorite" onClick={() => setOrderBy('favorite')}>좋아요순</option>
        </select>
      </div>

      <ProductCard items={items} />

    </section>
  );
}

export default ProductList;