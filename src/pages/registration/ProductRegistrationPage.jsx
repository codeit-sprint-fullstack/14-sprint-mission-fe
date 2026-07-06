import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../services/productService'
import MainLayout from '../../components/layout/MainLayout'
import getProductFormValidation from './utils/getProductFormValidation'
import tagRemoveIcon from '../../assets/icons/ic_tag_remove.svg'
import './ProductRegistrationPage.css'
import { PRODUCT_TAG_MAX_LENGTH } from '../../constants/product'
import ProductFormField from './components/ProductFormField'

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
    setFormValues((prevValues) => ({ ...prevValues, tagInput: '' }))
    setHasTriedAddingTag(false)

    if (!isValid) return

    try {
      setIsSubmitting(true)

      const createdProduct = await createProduct({
        name: formValues.name,
        description: formValues.description,
        price: Number(formValues.price),
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
          <ProductFormField
            label="상품명"
            name="name"
            value={formValues.name}
            onChange={handleFormFieldChange}
            error={hasSubmitted ? errors.name : ''}
            type="text"
            placeholder="상품명을 입력해 주세요"
          />

          <ProductFormField
            label="상품소개"
            name="description"
            value={formValues.description}
            onChange={handleFormFieldChange}
            error={hasSubmitted ? errors.description : ''}
            multiline
            rows={10}
            placeholder="상품소개를 입력해 주세요"
          />

          <ProductFormField
            label="판매가격"
            name="price"
            value={formValues.price}
            onChange={handleFormFieldChange}
            error={hasSubmitted ? errors.price : ''}
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            placeholder="판매가격을 입력해 주세요"
          />
          <div className="product-registration-form__tag-section">
            <ProductFormField
              label="태그"
              name="tagInput"
              value={formValues.tagInput}
              onChange={handleFormFieldChange}
              onKeyDown={handleTagEnter}
              error={tagErrorMessage}
              type="text"
              placeholder="태그를 입력해 주세요"
            />
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
