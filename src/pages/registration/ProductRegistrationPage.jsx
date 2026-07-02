import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../services/ProductService'
import MainLayout from '../../components/layout/MainLayout.jsx'
import './ProductRegistrationPage.css'
import { useState } from 'react'

const ProductRegistrationPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    tagInput: '',
    tags: [],
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setSubmitError('')

      const createdProduct = await createProduct({
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        tags: formValues.tags,
      })

      navigate(`/items/${createdProduct.id}`)
    } catch {
      setSubmitError('상품 등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormFieldChange = (event) => {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return (
    <MainLayout>
      <div className="product-registration-page">
        <form onSubmit={handleSubmit} className="product-registration-form">
          <div className="product-registration-form__header">
            <h1 className="product-registration-page__title">상품 등록하기</h1>
            <button
              type="submit"
              disabled={isSubmitting}
              className="product-registration-page__submit-button"
            >
              {isSubmitting ? '등록 중' : '등록하기'}
            </button>
          </div>
          {submitError && (
            <p className="product-registration-form__error">{submitError}</p>
          )}

          <label className="product-registration-form__field">
            <span className="product-registration-form__label">상품명</span>
            <input
              name="name"
              value={formValues.name}
              onChange={handleFormFieldChange}
              className="product-registration-form__input"
              type="text"
              placeholder="상품명을 입력해 주세요"
            />
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">상품소개</span>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleFormFieldChange}
              className="product-registration-form__textarea"
              placeholder="상품소개를 입력해 주세요"
              rows={10}
            />
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">판매가격</span>
            <input
              name="price"
              value={formValues.price}
              onChange={handleFormFieldChange}
              className="product-registration-form__input"
              type="number"
              placeholder="판매가격을 입력해 주세요"
            />
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">태그</span>
            <input
              name="tagInput"
              value={formValues.tagInput}
              onChange={handleFormFieldChange}
              className="product-registration-form__input"
              type="text"
              placeholder="태그를 입력해 주세요"
            />
          </label>
        </form>
      </div>
    </MainLayout>
  )
}

export default ProductRegistrationPage
