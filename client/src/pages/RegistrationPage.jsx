import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../api/productApi'
import Tag from '../components/Tag'

function RegistrationPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  /* 태그는 모델에서도 필수값이 아니며
     요구사항에 필수 입력 조건이 명시되지 않아 유효성 검사에서 제외 */
  const isFormValid = name.trim() && description.trim() && price.trim()

  const handleTagKeyDown = (e) => {
    if (e.key !== 'Enter') {
      return
    }

    e.preventDefault()

    const trimmedTag = tagInput.trim()

    // !trimmedTag = ( trimmedTag === '' )
    if (!trimmedTag || tags.includes(trimmedTag)) {
      return
    }

    setTags([...tags, trimmedTag])
    setTagInput('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = await createProduct({
      name,
      description,
      price,
      tags,
    })

    navigate(`/items/${product.id}`)
  }

  return (
    <main>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-header">
          <h2>상품 등록하기</h2>
          <button type="submit" disabled={!isFormValid}>
            등록
          </button>
        </div>
        <div className="product-name">
          <label>상품명</label>
          <input
            value={name}
            placeholder="상품명을 입력해주세요"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className="product-description">
          <label>상품 소개</label>
          <textarea
            value={description}
            placeholder="상품 소개를 입력해주세요"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
        </div>
        <div className="product-price">
          <label>판매가격</label>
          <input
            value={price}
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => {
              setPrice(e.target.value)
            }}
          />
        </div>
        <div className="product-tags-list">
          <label>태그</label>
          <input
            value={tagInput}
            placeholder="태그를 입력해주세요"
            onChange={(e) => {
              setTagInput(e.target.value)
            }}
            onKeyDown={handleTagKeyDown}
          />
          <div className="tag-cards">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </form>
    </main>
  )
}

export default RegistrationPage
