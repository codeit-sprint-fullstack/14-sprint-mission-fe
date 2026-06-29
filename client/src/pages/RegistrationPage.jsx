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

  // Product 스키마의 validation 기준과 동일하게 프론트에서도 검사
  const trimmedName = name.trim()
  const trimmedDescription = description.trim()
  const trimmedPrice = price.trim()

  const isNameValid = trimmedName.length >= 1 && trimmedName.length <= 10
  const isDescriptionValid =
    trimmedDescription.length >= 10 && trimmedDescription.length <= 100
  const isPriceValid = trimmedPrice !== '' && Number(trimmedPrice) >= 0

  /* 태그는 필수값이 아니며
     요구사항에 필수 입력 조건이 명시되지 않아 유효성 검사에서 제외 */
  const isFormValid = isNameValid && isDescriptionValid && isPriceValid

  const handleTagKeyDown = (e) => {
    //한글 조합 중 Enter가 중복 처리되는 것을 방지
    if (e.nativeEvent.isComposing) {
      return
    }

    if (e.key !== 'Enter') {
      return
    }

    e.preventDefault()

    const trimmedTag = tagInput.trim()

    // !trimmedTag = (trimmedTag === '')
    if (!trimmedTag || tags.includes(trimmedTag)) {
      return
    }

    // Product 스키마와 동일하게 태그는 최대 5글자
    if (trimmedTag.length > 5) {
      return
    }

    setTags([...tags, trimmedTag])
    setTagInput('')
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid) {
      return
    }

    try {
      // trim()된 값과 숫자형 가격을 서버로 전달
      const product = await createProduct({
        name: trimmedName,
        description: trimmedDescription,
        price: Number(trimmedPrice),
        tags,
      })

      navigate(`/items/${product._id || product.id}`)
    } catch (error) {
      console.error('상품 등록 실패:', error)
    }
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
            type="number"
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
              <Tag key={tag} tag={tag} onDelete={handleDeleteTag} />
            ))}
          </div>
        </div>
      </form>
    </main>
  )
}

export default RegistrationPage
