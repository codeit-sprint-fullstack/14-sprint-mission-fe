import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import './ProductList.css';
import searchImg from '../assets/searchImg.svg'


function ProductList () {
    const [products, setProducts] = useState([]);
    useEffect(() => {
    async function getProducts() {
        const response = await axios.get('https://panda-market-api.vercel.app/products');

        setProducts(response.data.list);
    }
    getProducts();
    },[]);
    return(
    <>
    
  <div className="product-list-header">
        <h3 className="list-title">판매중인 상품</h3>
        
    <div className="product-list-controls">
        <img className="maginifier-img" src={searchImg} alt='돋보기 이미지'/>
        <input className= "search-input" placeholder="검색할 상품을 입력해주세요" />
        <button className="register-button">상품 등록하기</button>
    <select className="order-select">
        <option>최신순</option>
        <option>좋아요순</option>
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
    </>
    );
}

export default ProductList