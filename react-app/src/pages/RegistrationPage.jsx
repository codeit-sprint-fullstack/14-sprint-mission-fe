import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { createProduct } from '../api/products.js'
import styles from './RegistrationPage.module.css'
import useProductFormValidation from '../hooks/useProductFormValidation.js'

function RegistrationPage() {
  const navigate = useNavigate()

  //상품명 / 상품소개 / 판매가격 / 입력중인태그 / 추가된태그목록 / API요청중인지
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 사용자가 해당 input을 한 번이라도 클릭했다가 벗어났는지 확인
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tag: false,
  })

  //유효성 검사
  const { errors, isValid } = useProductFormValidation({
    name,
    description,
    price,
    tags,
    tagInput,
  })

  //태그 input에서 enter를 누르면 실행된다
  //enter일 경우 submit을 하고, 입력값 앞뒤 공백을 제거, 빈 값이거나 이미 존재하는 태그면 추가 X
  const handleAddTag = (e) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const newTag = tagInput.trim()
    if (!newTag) return
    if (tags.includes(newTag)) return

    setTags([...tags, newTag])
    setTagInput('')
  }

  //태그 삭제
  //삭제 버튼을 누른 태그를 제외하고 새로운 배열을 만들어서 tags에 저장
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((item) => item !== tag))
  }

  //상품 등록, 폼 제출 시 실행
  //createProduct로 POST 요청을 보내서 상품 등록
  //등록이 성공하면 _id를 사용해 상세 페이지로 이동(빈탭)
  //실패하면 alert를 띄우고 isSubmitting을 false로 바꿈
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValid) return

    try {
      setIsSubmitting(true)

      const product = await createProduct({
        name,
        description,
        price: Number(price),
        tags,
      })

      navigate(`/items/${product._id}`)
    } catch (err) {
      alert('상품 등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h1 className={styles.title}>상품 등록하기</h1>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              등록
            </button>
          </div>

          <label className={styles.label}>
            상품명
            <input
              className={`${styles.input} ${
                touched.name && errors.name ? styles.errorInput : ''
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  name: true,
                }))
              }
              placeholder="상품명을 입력해주세요"
            />
            {touched.name && errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}
          </label>

          <label className={styles.label}>
            상품 소개
            <textarea
              className={`${styles.textarea} ${
                touched.description && errors.description
                  ? styles.errorInput
                  : ''
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  description: true,
                }))
              }
              placeholder="상품 소개를 입력해주세요"
            />
            {touched.description && errors.description && (
              <p className={styles.errorMessage}>{errors.description}</p>
            )}
          </label>

          <label className={styles.label}>
            판매가격
            <input
              className={`${styles.input} ${
                touched.price && errors.price ? styles.errorInput : ''
              }`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  price: true,
                }))
              }
              placeholder="판매 가격을 입력해주세요"
              type="number"
            />
            {touched.price && errors.price && (
              <p className={styles.errorMessage}>{errors.price}</p>
            )}
          </label>

          <label className={styles.label}>
            태그
            <input
              className={`${styles.input} ${
                touched.tag && errors.tag ? styles.errorInput : ''
              }`}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  tag: true,
                }))
              }
              placeholder="태그를 입력해주세요"
            />
            {touched.tag && errors.tag && (
              <p className={styles.errorMessage}>{errors.tag}</p>
            )}
          </label>

          <div className={styles.tags}>
            {tags.map((tag) => (
              <div key={tag} className={styles.tag}>
                <span>#{tag}</span>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveTag(tag)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                  >
                    <circle cx="11" cy="12" r="10" fill="#9CA3AF" />
                    <path
                      d="M7.08057 8L15.0806 16"
                      stroke="#F9FAFB"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 8L7 16"
                      stroke="#F9FAFB"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default RegistrationPage

//입력값 상태 저장 -> 커스텀 훅으로 유효성 검사 -> 등록 버튼 -> POST /products 요청 -? 성공 시 /items/:id로 이동
