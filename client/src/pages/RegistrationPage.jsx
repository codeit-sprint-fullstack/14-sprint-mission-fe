import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../api/productApi'
import Tag from '../components/Tag'
import './RegistrationPage.css'

function RegistrationPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [tagError, setTagError] = useState('')

  // Product 스키마의 validation 기준과 동일하게 프론트에서도 검사
  const trimmedName = name.trim()
  const trimmedDescription = description.trim()
  const trimmedPrice = price.trim()

  const isNameValid = trimmedName.length >= 1 && trimmedName.length <= 10
  const isDescriptionValid =
    trimmedDescription.length >= 10 && trimmedDescription.length <= 100
  const isPriceValid = /^\d+$/.test(trimmedPrice)
  /* type = number 일 때
  const isPriceValid = trimmedPrice !== '' && Number(trimmedPrice) >= 0 */

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
      setTagError('5글자 이내로 입력해주세요.')
      return
    }

    setTags([...tags, trimmedTag])
    setTagInput('')
    setTagError('')
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

      // 백엔드 응답이 _id 또는 id인 경우 모두 대응
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

        <div className="registration-name">
          <label>상품명</label>
          <input
            className={!isNameValid && trimmedName ? 'input-error' : ''}
            value={name}
            placeholder="상품명을 입력해주세요"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          {!isNameValid && trimmedName && (
            <p className="input-error-message">10자 이내로 입력해주세요.</p>
          )}
        </div>

        <div className="registration-description">
          <label>상품 소개</label>
          <textarea
            className={
              !isDescriptionValid && trimmedDescription ? 'input-error' : ''
            }
            value={description}
            placeholder="상품 소개를 입력해주세요"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
          {trimmedDescription.length > 0 && trimmedDescription.length < 10 && (
            <p className="input-error-message">10자 이상 입력해주세요.</p>
          )}

          {trimmedDescription.length > 100 && (
            <p className="input-error-message">100자 이내로 입력해주세요.</p>
          )}
        </div>

        <div className="registration-price">
          <label>판매가격</label>
          <input
            className={!isPriceValid && trimmedPrice ? 'input-error' : ''}
            type="text" // number로 명시하려 했으나 요구사항 때문에 text로 설정
            value={price}
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => {
              setPrice(e.target.value)
            }}
          />
          {!isPriceValid && trimmedPrice && (
            <p className="input-error-message">숫자를 입력해주세요.</p>
          )}
        </div>

        <div className="registration-tags">
          <label>태그</label>
          <input
            className={tagError ? 'input-error' : ''}
            value={tagInput}
            placeholder="태그를 입력해주세요"
            onChange={(e) => {
              const nextTagInput = e.target.value

              setTagInput(nextTagInput)

              if (nextTagInput.trim().length > 5) {
                setTagError('5글자 이내로 입력해주세요.')
                return
              }

              setTagError('')
            }}
            onKeyDown={handleTagKeyDown}
          />
          {tagError && <p className="input-error-message">{tagError}</p>}

          <div className="registration-tag-cards">
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
