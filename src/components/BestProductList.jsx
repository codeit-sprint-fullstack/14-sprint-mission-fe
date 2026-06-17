import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function BestProductList () {
    const [products, setProducts] = useState([]);

useEffect(() => {
  async function getProducts() {
    const response = await axios.get('https://panda-market-api.vercel.app/products');

    setProducts(response.data.list);
  }

  getProducts();
}, []);
    return(
    <>
    <h3>베스트 상품</h3>
    <div className="items">
  {products.map((product) => {
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