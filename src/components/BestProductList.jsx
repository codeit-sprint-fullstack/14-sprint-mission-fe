import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./BestProductList.css";

function getBestLimitByWidth() {
  const width = window.innerWidth;

  if (width <= 767) {
    return 1;
  }

  if (width <= 1024) {
    return 2;
  }

  return 4;
}

function BestProductList() {
  const [products, setProducts] = useState([]);
  const [bestLimit, setBestLimit] = useState(getBestLimitByWidth);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
      );

      setProducts(response.data.list);
    }

    getProducts();
  }, []);

  useEffect(() => {
    function handleResize() {
      setBestLimit(getBestLimitByWidth());
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bestProducts = [...products]
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, bestLimit);

  return (
    <>
      <h3 className="best-list-title">베스트 상품</h3>

      <div className="best-items">
        {bestProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}

export default BestProductList;