import axios from 'axios'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Registration.css'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import useProductFormValidation from '../hooks/useProductFormValidation.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const PRODUCT_API_URL = `${API_BASE_URL}/products`

function Registration() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])

  const {
    errors,
    isFormValid,
    touchField,
    touchAllFields,
  } = useProductFormValidation({
    name,
    description,
    price,
    tagInput,
    tags,
  })

  function handleTagKeyDown(event) {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()
    touchField('tag')

    const newTag = tagInput.trim()

    if (!newTag) {
      return
    }

    if (newTag.length > 5) {
      return
    }

    if (tags.includes(newTag)) {
      setTagInput('')
      return
    }

    setTags([...tags, newTag])
    setTagInput('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isFormValid) {
      touchAllFields()
      return
    }

    try {
      const productData = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
      }

      const response = await axios.post(
        PRODUCT_API_URL,
        productData,
      )

      const createdProduct = response.data

      navigate(`/items/${createdProduct.id}`)
    } catch (error) {
      console.error(error)
      alert('상품 등록에 실패했습니다.')
    }
  }

  return (
    <>
      <Header>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `header-menu-link ${isActive ? 'nav-active' : 'nav-link'}`
          }
        >
          자유게시판
        </NavLink>

        <NavLink
          to="/items"
          className={({ isActive }) =>
            `header-menu-link ${isActive ? 'nav-active' : 'nav-link'}`
          }
        >
          중고마켓
        </NavLink>
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
              disabled={!isFormValid}
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
              className={`registration-input ${errors.name ? 'registration-input-error' : ''}`}
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
              onBlur={() => {
                touchField('name')
              }}
            />

            {errors.name && (
              <p className="registration-error-message">
                {errors.name}
              </p>
            )}
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
              className={`registration-textarea ${errors.description ? 'registration-input-error' : ''}`}
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)
              }}
              onBlur={() => {
                touchField('description')
              }}
            />

            {errors.description && (
              <p className="registration-error-message">
                {errors.description}
              </p>
            )}
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
              className={`registration-input ${errors.price ? 'registration-input-error' : ''}`}
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value)
              }}
              onBlur={() => {
                touchField('price')
              }}
            />

            {errors.price && (
              <p className="registration-error-message">
                {errors.price}
              </p>
            )}
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
              className={`registration-input ${errors.tag ? 'registration-input-error' : ''}`}
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={(event) => {
                setTagInput(event.target.value)
              }}
              onKeyDown={handleTagKeyDown}
              onBlur={() => {
                touchField('tag')
              }}
            />

            {errors.tag && (
              <p className="registration-error-message">
                {errors.tag}
              </p>
            )}

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