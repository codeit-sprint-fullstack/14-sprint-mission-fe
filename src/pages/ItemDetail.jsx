import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import './ItemDetail.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const PRODUCT_API_URL = `${API_BASE_URL}/products`

function ItemDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getProductDetail() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `${PRODUCT_API_URL}/${id}`,
        )

        setProduct(response.data)
      } catch (requestError) {
        console.error('상품 상세 조회 실패:', requestError)
        setError(requestError)
      } finally {
        setIsLoading(false)
      }
    }

    getProductDetail()
  }, [id])

  return (
    <>
      <Header />

      <main className="item-detail">
        <div className="item-detail-container">
          {isLoading && (
            <p className="item-detail-status">
              상품 정보를 불러오는 중입니다.
            </p>
          )}

          {!isLoading && error && (
            <p className="item-detail-status item-detail-error">
              상품 정보를 불러오지 못했습니다.
            </p>
          )}

          {!isLoading && !error && product && (
            <section className="item-detail-card">
              <h1 className="item-detail-title">
                {product.name}
              </h1>

              <p className="item-detail-price">
                {Number(product.price).toLocaleString('ko-KR')}원
              </p>

              <div className="item-detail-section">
                <h2 className="item-detail-section-title">
                  상품 소개
                </h2>

                <p className="item-detail-description">
                  {product.description}
                </p>
              </div>

              <div className="item-detail-section">
                <h2 className="item-detail-section-title">
                  태그
                </h2>

                <div className="item-detail-tags">
                  {product.tags.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className="item-detail-tag"
                      >
                        #{tag}
                      </span>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ItemDetail