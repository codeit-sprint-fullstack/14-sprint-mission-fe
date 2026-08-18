'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import {
  getBestProductQueryOptions,
  getProductListQueryOptions,
} from '@/queries/productQueries'
import Dropdown from '@/components/common/Dropdown'
import Pagination from '@/components/common/Pagination'
import ProductCard from '@/components/items/ProductCard'
import styles from './itemsPage.module.css'

const SORT_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'favorite', label: '좋아요순' },
]

function ItemsClient() {
  const [orderBy, setOrderBy] = useState('recent')
  const [searchInput, setSearchInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [bestPageSize, setBestPageSize] = useState(4)

  // Query Options Factory를 사용하여 queryKey, queryFn, 캐시 정책을 하나로 묶음
  const {
    data: productsData,
    isPending: isProductsPending,
    isError: isProductsError,
    isFetching: isProductsFetching,
  } = useQuery(
    getProductListQueryOptions({
      orderBy,
      keyword,
      page: currentPage,
      pageSize,
    }),
  )

  const {
    data: bestProductsData,
    isPending: isBestProductsPending,
    isError: isBestProductsError,
    isFetching: isBestProductsFetching,
  } = useQuery(
    getBestProductQueryOptions({
      pageSize: bestPageSize,
    }),
  )

  const products = productsData?.list ?? []
  const bestProducts = bestProductsData?.list ?? []
  const totalCount = productsData?.totalCount ?? 0

  const pageGroupSize = 5
  const totalPages = Math.ceil(totalCount / pageSize)
  const currentGroup = Math.ceil(currentPage / pageGroupSize)
  const startPage = (currentGroup - 1) * pageGroupSize + 1
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)
  const pageNumbers = []

  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i)
  }

  function updatePageSize() {
    const width = window.innerWidth

    if (width >= 1200) {
      setPageSize(10)
      setBestPageSize(4)
    } else if (width >= 768) {
      setPageSize(6)
      setBestPageSize(2)
    } else {
      setPageSize(4)
      setBestPageSize(1)
    }

    setCurrentPage(1)
  }

  useEffect(() => {
    updatePageSize()
    window.addEventListener('resize', updatePageSize)

    return () => window.removeEventListener('resize', updatePageSize)
  }, [])

  return (
    <main className={styles.marketBackground}>
      <div className={styles.marketPage}>
        <section className={styles.bestProducts}>
          <h2>베스트 상품</h2>
          {isBestProductsFetching && !isBestProductsPending && (
            <p className={styles.refreshMessage}>
              베스트 상품을 업데이트하는 중입니다.
            </p>
          )}
          <div className={styles.bestProductsCards}>
            {isBestProductsPending ? (
              <p>베스트 상품을 불러오는 중입니다.</p>
            ) : isBestProductsError ? (
              <p>베스트 상품을 불러오지 못했습니다.</p>
            ) : bestProducts.length === 0 ? (
              <p>등록된 베스트 상품이 없습니다.</p>
            ) : (
              bestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>
        <section className={styles.products}>
          <div className={styles.productsFunction}>
            <h2>판매 중인 상품</h2>
            <div className={styles.productsFunctionRight}>
              <div className={styles.searchBox}>
                <Image
                  src="/ic_search.svg"
                  alt=""
                  className={styles.searchIcon}
                  width={24}
                  height={24}
                />
                <input
                  className={styles.searchInput}
                  value={searchInput}
                  placeholder="검색할 상품을 입력해주세요"
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setKeyword(searchInput)
                      setCurrentPage(1)
                    }
                  }}
                />
              </div>
              <button className={styles.registerButton}>상품 등록하기</button>
              <Dropdown
                options={SORT_OPTIONS}
                value={orderBy}
                onChange={(nextOrderBy) => {
                  setOrderBy(nextOrderBy)
                  setCurrentPage(1)
                }}
                className={styles.orderByBox}
              />
            </div>
          </div>
          {isProductsFetching && !isProductsPending && (
            <p className={styles.refreshMessage}>
              {keyword
                ? '검색 결과를 업데이트하는 중입니다.'
                : '상품 목록을 업데이트하는 중입니다.'}
            </p>
          )}
          <div className={styles.productsCards}>
            {isProductsPending ? (
              <p>
                {keyword
                  ? '검색 결과를 불러오는 중입니다.'
                  : '상품을 불러오는 중입니다.'}
              </p>
            ) : isProductsError ? (
              <p>
                {keyword
                  ? '검색 결과를 불러오지 못했습니다.'
                  : '상품 목록을 불러오지 못했습니다.'}
              </p>
            ) : products.length === 0 ? (
              <p>
                {keyword ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          {!isProductsPending && !isProductsError && products.length > 0 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onChangePage={setCurrentPage}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ItemsClient
