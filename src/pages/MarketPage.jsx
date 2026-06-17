import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'

// const mockProducts = [
//   {
//     id: 1,
//     name: 'ipad mini',
//     price: 500000,
//     favoriteCount: 230,
//     images: [
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEct0hZVWV3V8A2fg0s0scfCMMyu9D8xVFFxJ0PGMNg&s=10'
//     ],
//   },
//   {
//     id: 2,
//     name: 'iphone 17',
//     price: 1400000,
//     favoriteCount: 110,
//     images: [
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSatjoSbK08gsGjKJk137zLtJBBasWmGxWC3A1hGOl8XA&s=10'
//     ],
//   },
//   {
//     id: 3,
//     name: 'iphone 13',
//     price: 700000,
//     favoriteCount: 225,
//     images: [
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShIzn6__iyucy_RZXHRO4Ui195Snuh3wh1-kgj9Zpl-g&s=10'
//     ],
//   },
//   {
//     id: 4,
//     name: 'AirPods Pro3',
//     price: 210000,
//     favoriteCount: 327,
//     images: [
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMPZWsKrge8b9QNJfiG8Ov9DEgK98xeIgXBcWiqlrbeQ&s=10'
//     ],
//   },
// ];

function MarketPage() {
  const url = 'https://panda-market-api.vercel.app/products';

  // state
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // pagination
  const pageSize = 10;
  const pageGroupSize = 5;
  const totalPages = Math.ceil(totalCount / pageSize);

  const currentGroup = Math.ceil(page / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const fetchProducts = async () => {
    const res = await axios.get(url, {
      params: {
        orderBy: orderBy,
        pageSize: pageSize,  // PC 기준
        keyword: keyword,
        page: page,
      }
    });

    setProducts(res.data.list);
    setTotalCount(res.data.totalCount);
  };

  const fetchBestProducts = async () => {
    const res = await axios.get(url, {
      params: {
        orderBy: 'favorite',
        pageSize: 4,
      }
    })

    setBestProducts(res.data.list);
  };

  useEffect(() => {
    fetchBestProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [orderBy, keyword, page]);

  return (
    <>
      <section>
        <h2>베스트 상품</h2>
        <div>
          {
            bestProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
      </section>
      <section>
        <div>
          <h2>판매 중인 상품</h2>
          <input
            value={searchInput}
            placeholder="검색할 상품을 입력해주세요"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // 입력 중인 값(searchInput)을 실제 검색어(keyword)로 확정
                setKeyword(searchInput)
                // 검색 후 페이지 초기화
                setPage(1);
              }
            }}
          ></input>
          <button>상품 등록하기</button>
          <select
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value)
              // 정렬 후 페이지 초기화
              setPage(1);
            }}
          >
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
        <div>
          {
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
        <div>
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>

          {pageNumbers.map(pagenumber => (
            <button
              key={pagenumber}
              onClick={() => setPage(pagenumber)}
            >
              {pagenumber}
            </button>
          ))}

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      </section >
    </>)
}

export default MarketPage;