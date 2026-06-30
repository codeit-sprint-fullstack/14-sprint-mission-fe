import axios from 'axios'
import { useState } from 'react'
import './Registration.css'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Registration() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])

async function handleSubmit(event) {
  event.preventDefault()

  try {
    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags: [tagInput.trim()],
    }

    const response = await axios.post(
      'http://localhost:3000/products',
      productData
    )

    const createdProduct = response.data

    window.location.href = `/items/${createdProduct.id}`
  } catch (error) {
    console.error(error)
    alert('상품 등록에 실패했습니다.')
  }
}

  return (
    <>
      <Header>
        <a href="/" className='header-menu-link'>자유게시판</a>
        <a href="/items" className='header-menu-link'>중고마켓</a>
      </Header>

      <main className="registration-page">
        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >
          <div className="registration-form-header">
            <h1 className="registration-title">
              상품 등록하기
            </h1>

            <button
              type="submit"
              className="registration-submit-button"
            >
              등록
            </button>
          </div>

          <div className="registration-field">
            <label
              htmlFor="product-name"
              className="registration-label"
            >
              상품명
            </label>

            <input
              id="product-name"
              type="text"
              className="registration-input"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>

          <div className="registration-field">
            <label
              htmlFor="product-description"
              className="registration-label"
            >
              상품 소개
            </label>

            <textarea
              id="product-description"
              className="registration-textarea"
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)
              }}
            />
          </div>

          <div className="registration-field">
            <label
              htmlFor="product-price"
              className="registration-label"
            >
              판매가격
            </label>

            <input
              id="product-price"
              type="text"
              className="registration-input"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value)
              }}
            />
          </div>

          <div className="registration-field">
            <label
              htmlFor="product-tag"
              className="registration-label"
            >
              태그
            </label>

            <input
              id="product-tag"
              type="text"
              className="registration-input"
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={(event) => {
                setTagInput(event.target.value)
              }}
            />

            <div className="registration-tag-list">
              {tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="registration-tag"
                  >
                    #{tag}
                  </span>
                )
              })}
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </>
  )
}

export default Registration