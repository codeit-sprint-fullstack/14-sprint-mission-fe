import { useState, useEffect } from 'react';
import { getProducts, getBestProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard'
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import searchIcon from '../assets/ic_search.svg';
import './MarketPage.css'

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
  // state
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [searchInput, setSearchInput] = useState('');  // 입력중인 값
  const [keyword, setKeyword] = useState('');          // API 요청 보낼 확정된 검색어
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);     // 검색/정렬 조건에 맞는 전체 상품 개수
  const [pageSize, setPageSize] = useState(10);
  const [bestPageSize, setBestPageSize] = useState(4);

  // pagination
  const pageGroupSize = 5;
  const totalPages = Math.ceil(totalCount / pageSize);

  const currentGroup = Math.ceil(CurrentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = [];  //

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const updatePageSize = () => {
    // 브라우저의 현재 뷰포트 너비
    const width = window.innerWidth;

    if (width >= 1200) {
      setPageSize(10);
      setBestPageSize(4);
    } else if (width >= 768) {
      setPageSize(6);
      setBestPageSize(2);
    } else {
      setPageSize(4);
      setBestPageSize(1);
    }

    setCurrentPage(1);
  };

  const fetchProducts = async () => {
    const data = await getProducts({
      // 객체 프로퍼티 축약 문법
      orderBy,
      pageSize,
      keyword,
      page: CurrentPage,
    });

    setProducts(data.list);
    setTotalCount(data.totalCount);
  };

  const fetchBestProducts = async () => {
    const data = await getBestProducts({
      pageSize: bestPageSize,
    });

    setBestProducts(data.list);
  };

  // 컴포넌트가 처음 생성되면 (페이지가 처음 열릴 때)
  useEffect(() => {
    // 현재 화면 크기에 맞게 pageSize를 계산
    updatePageSize();

    // 브라우저 크기가 바뀔 때마다 다시 계산
    window.addEventListener('resize', updatePageSize);

    // 컴포넌트가 사라질 때는 resize 감시 제거
    return () => {
      window.removeEventListener('resize', updatePageSize);
    };
    // 이 설정 자체는 처음 한 번만 수행할 것 
  }, []);

  useEffect(() => {
    fetchBestProducts();
  }, [bestPageSize]);

  useEffect(() => {
    fetchProducts();
  }, [orderBy, keyword, CurrentPage, pageSize]);

  return (
    <main className='market-background'>
      <div className='market-page'>
        <section className='best-products'>
          <h2>베스트 상품</h2>
          <div className='best-products-cards'>
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
        <section className='products'>
          <div className='products-function'>
            <h2>판매 중인 상품</h2>
            <div className='products-function-right'>
              <div className='search-box'>
                <img src={searchIcon} alt='' className='search-icon' />
                <input
                  className='search-input'
                  value={searchInput}
                  placeholder='검색할 상품을 입력해주세요'
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // 입력 중인 값(searchInput)을 실제 검색어(keyword)로 확정
                      setKeyword(searchInput)
                      // 검색 후 페이지 초기화
                      setCurrentPage(1);
                    }
                  }}
                />
              </div>
              <button className='btn-register'>상품 등록하기</button>
              <Dropdown
                orderBy={orderBy}
                onChangeOrderBy={(nextOrderBy) => {
                  setOrderBy(nextOrderBy);
                  // 정렬 후 페이지 초기화
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className='products-cards'>
            {
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            }
          </div>
          <Pagination
            page={CurrentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onChangePage={setCurrentPage}
          />
        </section >
      </div>
    </main>)
}

export default MarketPage;