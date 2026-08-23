"use client"
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductItem from "@/components/ProductItems";
import SortDropDown from "@/components/SortDropDown";
import styles from "@/styles/Items.module.css"
import api from "@/api/axios";
import { useState } from "react";
import Pagenation from "@/components/Pagenation";

export default function ProductPage() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ["products", keyword, orderBy, page],
    queryFn: async () => {
      const res = await api.get(
        `/products?page=${page}&pageSize=10&keyword=${keyword}&orderBy=${orderBy}`
      );
      return res.data
    }
  })
  const products = data?.list ?? [];
  console.log(products);

  const { data: bestData } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const res = await api.get("/products?pageSize=4&orderBy=favorite");
      return res.data
    }
  })
  const bestProducts = bestData?.list ?? [];


  return (
    <>
      <Header />
      <div className="subWrapper">
        <div className="subContents">
          <div className="subTitle">
            <p>베스트 상품</p>
          </div>
          <div className={styles.bestItemContentsWrap}>
            {bestProducts.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
              />
            ))}
          </div>
        </div>
        <div className="subContents">
          <div className={styles.itemsTopWrap}>
            <div className="subTitle">
              <p>판매 중인 상품</p>
            </div>
            <div className={styles.itemsTopRight}>
              <div className={styles.itemsSearch}>
                <Input
                  variant="item"
                  className={styles.itemInput}
                  placeholder="검색할 내용을 입력해주세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className={styles.itemRegist}>
                <button className="btn btnItemRegist">상품 등록하기</button>
              </div>
              <div className={styles.itemSortWrap}>
                <SortDropDown
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                />
              </div>
            </div>
          </div>
          <div className={styles.itemContentsWrap}>
            {products.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
              />
            ))}
          </div>
          {/* <Pagenation
            page={page}
            setPage={setPage}
          /> */}
        </div>
      </div>
      <Footer />
    </>

  )
}