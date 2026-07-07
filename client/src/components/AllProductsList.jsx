import { useState, useEffect, Children, useCallback } from "react";
import { useIsMobile, useSetIsMobile } from "../contexts/ResponsiveContext.jsx";
import { Link } from "react-router-dom";
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";
import Pagination from "./Pagination.jsx";
import Dropdown from "./Dropdown.jsx";

function AllProductsList () {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('recent');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const isMobile = useIsMobile();
  const setIsMobile = useSetIsMobile();
  const handleLoad = useCallback(async( ) => {
    const response = await axios.get('/tasks', {
      params: {
        orderBy: order,
        pageSize: pageSize,
        page: page,
        keyword: keyword,
      }
    });
    const { items } = response.data;

    setItems(items);
    setPage(page);
    setTotalPage(Math.ceil(response.data.totalCount / pageSize)); 
    
  }, [order, pageSize, page, keyword]);

  const submitSearch = async (formData) => {
    const searchKeyword = formData.get('keyword');
    setKeyword(searchKeyword);
    setPage(1);
  };

  const handleSize = useCallback(() => {
    const contentWidth = window.innerWidth;
    if (contentWidth < 480 ){
      setPageSize(4);
      setIsMobile(true);
    } else if (contentWidth < 1024 ){
      setPageSize(6);
      setIsMobile(false);
    } else {
      setPageSize(10);
      setIsMobile(false);
    }
  },[]);

  useEffect(() => {
    handleSize();
    window.addEventListener('resize',handleSize);
    return () => window.removeEventListener('resize',handleSize);
  },[handleSize]);

  useEffect(() => {
    handleLoad();
  },[handleLoad]);

  return ( 
      <section className="products-list all">
        <div className="section-title-header">
          <h2 className="section-title">판매 중인 상품</h2>
          {isMobile ? (
            <>
            <Link to="/registration"><button className="bt-primary" type="button">상품 등록하기</button></Link>
            <div className="products-search-m">
              <form action={submitSearch}>
                <div className="search-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z" fill="#9CA3AF"/>
                  </svg>
                  <input type="text" name="keyword" defaultValue="" placeholder="검색할 상품을 입력해주세요"/>
                </div>
                <button className="bt-primary bt-search">검색</button>
              </form>
            <Dropdown order={order} setOrder={setOrder} isMobile={isMobile}/>
            </div>
            </>
          ) : (
            <>
            <div className="products-filter">
            <form action={submitSearch}>
              <div className="search-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z" fill="#9CA3AF"/>
                </svg>
                <input type="text" name="keyword" defaultValue="" placeholder="검색할 상품을 입력해주세요"/>
              </div>
              <button className="bt-primary bt-search">검색</button>
            </form>
            <Link to="/registration"><button className="bt-primary" type="button">상품 등록하기</button></Link>
            <Dropdown order={order} setOrder={setOrder} isMobile={isMobile}/>
          </div>
            </>
          )}
        </div>
        <ItemList items={items}/>
        <Pagination lists={totalPage} page={page} setPage={setPage}/>
      </section>
    );
 }

 export default AllProductsList;