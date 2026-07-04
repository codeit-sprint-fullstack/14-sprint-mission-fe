import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../services/ProductService'
import MainLayout from '../../components/layout/MainLayout.jsx'
import getProductFormValidation from './hooks/getProductFormValidation.js'
import tagRemoveIcon from '../../assets/icons/ic_tag_remove.svg'
import './ProductRegistrationPage.css'
import { PRODUCT_TAG_MAX_LENGTH } from '../../constants/product'

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
  const { errors, hasEmptyRequired, isValid } =
    getProductFormValidation(formValues)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [hasTriedAddingTag, setHasTriedAddingTag] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setHasSubmitted(true)
    setSubmitError('')

    if (!isValid) return

    try {
      setIsSubmitting(true)

      const createdProduct = await createProduct({
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        tags: formValues.tags,
      })

      navigate(`/items/${createdProduct.id}`)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormFieldChange = (event) => {
    const { name, value } = event.target

    if (name === 'tagInput') {
      setHasTriedAddingTag(false)
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleTagEnter = (event) => {
    if (event.key !== 'Enter') return
    event.preventDefault()

    const nextTag = formValues.tagInput.trim()
    setHasTriedAddingTag(true)

    if (!nextTag || nextTag.length > PRODUCT_TAG_MAX_LENGTH) {
      return
    }

    if (formValues.tags.includes(nextTag)) {
      setFormValues((prevValues) => ({
        ...prevValues,
        tagInput: '',
      }))
      setHasTriedAddingTag(false)
      return
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      tags: [...prevValues.tags, nextTag],
      tagInput: '',
    }))
    setHasTriedAddingTag(false)
  }

  const handleTagRemove = (tagToRemove) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const shouldShowTagError = hasTriedAddingTag || hasSubmitted

  const tagErrorMessage = shouldShowTagError
    ? errors.tagInput || errors.tags || ''
    : ''

  return (
    <MainLayout>
      <div className="product-registration-page">
        <form onSubmit={handleSubmit} className="product-registration-form">
          <div className="product-registration-form__header">
            <h1 className="product-registration-page__title">상품 등록하기</h1>
            <button
              type="submit"
              disabled={isSubmitting || hasEmptyRequired}
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
              className={`product-registration-form__input ${
                hasSubmitted && errors.name
                  ? 'product-registration-form__input--error'
                  : ''
              }`}
              type="text"
              placeholder="상품명을 입력해 주세요"
            />
            {hasSubmitted && errors.name && (
              <p className="product-registration-form__field-error">
                {errors.name}
              </p>
            )}
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">상품소개</span>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleFormFieldChange}
              className={`product-registration-form__textarea ${
                hasSubmitted && errors.description
                  ? 'product-registration-form__input--error'
                  : ''
              }`}
              placeholder="상품소개를 입력해 주세요"
              rows={10}
            />
            {hasSubmitted && errors.description && (
              <p className="product-registration-form__field-error">
                {errors.description}
              </p>
            )}
          </label>
          <label className="product-registration-form__field">
            <span className="product-registration-form__label">판매가격</span>
            <input
              name="price"
              value={formValues.price}
              onChange={handleFormFieldChange}
              className={`product-registration-form__input ${
                hasSubmitted && errors.price
                  ? 'product-registration-form__input--error'
                  : ''
              }`}
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="판매가격을 입력해 주세요"
            />
            {hasSubmitted && errors.price && (
              <p className="product-registration-form__field-error">
                {errors.price}
              </p>
            )}
          </label>
          <div className="product-registration-form__tag-section">
            <label className="product-registration-form__field">
              <span className="product-registration-form__label">태그</span>
              <input
                name="tagInput"
                value={formValues.tagInput}
                onChange={handleFormFieldChange}
                onKeyDown={handleTagEnter}
                className={`product-registration-form__input ${
                  tagErrorMessage
                    ? 'product-registration-form__input--error'
                    : ''
                }`}
                type="text"
                placeholder="태그를 입력해 주세요"
              />
              {tagErrorMessage && (
                <p className="product-registration-form__field-error">
                  {tagErrorMessage}
                </p>
              )}
            </label>
            {formValues.tags.length > 0 && (
              <div className="product-registration-form__tag-list">
                {formValues.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="product-registration-form__tag-chip"
                    onClick={() => handleTagRemove(tag)}
                    aria-label={`${tag} 태그 삭제`}
                  >
                    <span className="product-registration-form__tag-chip-text">
                      #{tag}
                    </span>
                    <span
                      className="product-registration-form__tag-chip-remove"
                      aria-hidden="true"
                    >
                      <img
                        src={tagRemoveIcon}
                        alt=""
                        className="product-registration-form__tag-chip-remove-icon"
                      />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default ProductRegistrationPage
