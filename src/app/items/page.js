"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductItem from "@/components/ProductItems";
import SortDropDown from "@/components/SortDropDown";

import styles from "@/styles/Items.module.css";
import api from "@/api/axios";

export default function ProductPage() {
  // 검색어
  const [keyword, setKeyword] = useState("");

  // 정렬 기준
  const [orderBy, setOrderBy] = useState("recent");

  // 현재 페이지
  const [page, setPage] = useState(1);

  // 일반 상품 목록 조회
  const {
    data,
    error,
    isLoading
  } = useQuery({
    queryKey: ["products", keyword, orderBy, page],
    queryFn: async () => {
      const res = await api.get(
        `/products?page=${page}&pageSize=10&keyword=${keyword}&orderBy=${orderBy}`
      );

      return res.data;
    },
  });

  // 우리 백엔드 응답: { products, totalCount }
  const products = data?.products ?? [];

  // 베스트 상품 조회
  const {
    data: bestData,
    error: bestError
  } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const res = await api.get("/products/best");

      return res.data;
    },
  });

  // 베스트 상품 API는 배열 자체 반환
  const bestProducts = bestData ?? [];

  // 에러 확인용
  console.log("products data:", data);
  console.log("products error:", error);
  console.log("best data:", bestData);
  console.log("best error:", bestError);

  return (
    <>
      <Header />

      <div className="subWrapper">
        {/* 베스트 상품 */}
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

        {/* 판매 중인 상품 */}
        <div className="subContents">
          <div className={styles.itemsTopWrap}>
            <div className="subTitle">
              <p>판매 중인 상품</p>
            </div>

            <div className={styles.itemsTopRight}>
              {/* 검색 */}
              <div className={styles.itemsSearch}>
                <Input
                  variant="item"
                  className={styles.itemInput}
                  placeholder="검색할 내용을 입력해주세요"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              {/* 상품 등록 페이지 이동 */}
              <div className={styles.itemRegist}>
                <Link
                  href="/items/new"
                  className="btn btnItemRegist"
                >
                  상품 등록하기
                </Link>
              </div>

              {/* 정렬 */}
              <div className={styles.itemSortWrap}>
                <SortDropDown
                  orderBy={orderBy}
                  setOrderBy={(value) => {
                    setOrderBy(value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* 상품 목록 */}
          <div className={styles.itemContentsWrap}>
            {isLoading && <p>상품을 불러오는 중입니다.</p>}

            {!isLoading && products.length === 0 && (
              <p>등록된 상품이 없습니다.</p>
            )}

            {products.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}