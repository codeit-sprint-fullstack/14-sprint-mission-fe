import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import './ProductList.css';
import searchImg from '../assets/searchImg.svg'


function ProductList () {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [orderBy, setOrderBy]= useState('recent');
    const [currentPage, setCurrentPage] = useState('1');
    const [totalCount, setTotalCount] = useState(0);
    const [pageGroup, setPageGroup] = useState(1);
    
    useEffect(() => {
    async function getProducts() {
        const response = await axios.get(`https://panda-market-api.vercel.app/products?page=${currentPage}&pageSize=10&orderBy=${orderBy}`);
          
        setProducts(response.data.list);
        setTotalCount(response.data.totalCount);
    }
    getProducts();
    },[orderBy, currentPage]);

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(
            searchText.toLowerCase()
        );
    });

    const sortedProducts = [...filteredProducts].sort((a,b) => {
        if(orderBy === 'favorite') {
            return (b.favoriteCount - a.favoriteCount)
        }else {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }
    });

    
    const pageSize = 10;
    const totalPages = Math.ceil (totalCount/ pageSize);


    const pageGroupSize = 5;

    const startPage = (pageGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize -1, totalPages)

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1},
        (_, index) => startPage + index
    );

    const totalPagesGroups = Math.ceil(totalPages / pageGroupSize);

    return(
    <>
        <div className="product-list-header">
            <h3 className="list-title">판매중인 상품</h3>
            
            <div className="product-list-controls">
                <img className="maginifier-img" src={searchImg} alt='돋보기 이미지'/>
                <input className= "search-input" placeholder="검색할 상품을 입력해주세요" 
                    value = {searchText}
                    onChange={(e) => {
                    setSearchText(e.target.value);
                }}/>
                <button className="register-button">상품 등록하기</button>
                <select className="order-select"
                    value={orderBy}
                    onChange={(e) => {
                    setOrderBy(e.target.value)}}
                >
                    <option value="recent">최신순</option>
                    <option value="favorite">좋아요순</option>
                </select>
            </div>
        </div>

        <div className="items">
            {products.map((product) => {
                return (
                    <ProductCard key={product.id} product={product} />
                );
            })}
        </div>

        <div className="pagination">

            <button className="button" onClick={() => setPageGroup(pageGroup -1)} 
            disabled={pageGroup === 1}
            >
                &lt;
            </button>
            {pageNumbers.map((pageNumber) => {
                return (
                    <button className= {`button ${currentPage === pageNumber ? "active" : ""}`}
                     key={pageNumber}
                     onClick={() => {
                        setCurrentPage(pageNumber);
                     }}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button className="button" onClick={() => setPageGroup(pageGroup +1)} 
            disabled={pageGroup === totalPagesGroups}
            >
                &gt;
            </button>
        </div>
    </>
    );
}

export default ProductList