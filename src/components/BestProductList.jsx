import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import './BestProductList.css'

function BestProductList () {
    const [products, setProducts] = useState([]);

useEffect(() => {
  async function getProducts() {
    const response = await axios.get('https://panda-market-api.vercel.app/products');

    setProducts(response.data.list);
  }

  getProducts();
}, []);

const bestProducts = [...products]
.sort((a, b) => b.favoriteCount - a.favoriteCount)
.slice(0, 4);
    return(
    <>
    <h3>베스트 상품</h3>
    <div className="items">
  {bestProducts.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
      />
        );
        })}
    </div>
    </>
    );
}

export default BestProductList