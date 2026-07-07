import { useMemo, useState } from 'react'

// =====================================================
// 상품명 유효성 검사
// =====================================================
function validateName(name) {
  const trimmedName = name.trim()

  if (trimmedName.length === 0) {
    return '상품명을 입력해주세요.'
  }

  if (trimmedName.length > 10) {
    return '상품명은 10자 이내로 입력해주세요.'
  }

  return ''
}

// =====================================================
// 상품 소개 유효성 검사
// =====================================================
function validateDescription(description) {
  const trimmedDescription = description.trim()

  if (trimmedDescription.length < 10) {
    return '상품 소개는 10자 이상 입력해주세요.'
  }

  if (trimmedDescription.length > 100) {
    return '상품 소개는 100자 이내로 입력해주세요.'
  }

  return ''
}

// =====================================================
// 판매 가격 유효성 검사
// =====================================================
function validatePrice(price) {
  const trimmedPrice = price.trim()

  if (trimmedPrice.length === 0) {
    return '판매 가격을 입력해주세요.'
  }

  if (Number.isNaN(Number(trimmedPrice))) {
    return '판매 가격은 숫자로 입력해주세요.'
  }

  return ''
}

// =====================================================
// 태그 유효성 검사
// =====================================================
function validateTag(tagInput, tags) {
  const trimmedTagInput = tagInput.trim()

  if (trimmedTagInput.length > 5) {
    return '태그는 5글자 이내로 입력해주세요.'
  }

  if (tags.length === 0) {
    return '태그를 입력한 후 Enter를 눌러주세요.'
  }

  return ''
}


function useProductFormValidation({
  name,
  description,
  price,
  tagInput,
  tags,
}) {
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tag: false,
  })

  const validationErrors = useMemo(() => {
    return {
      name: validateName(name),
      description: validateDescription(description),
      price: validatePrice(price),
      tag: validateTag(tagInput, tags),
    }
  }, [name, description, price, tagInput, tags])

  const errors = {
    name: touched.name ? validationErrors.name : '',
    description: touched.description ? validationErrors.description : '',
    price: touched.price ? validationErrors.price : '',
    tag: touched.tag ? validationErrors.tag : '',
  }

  const isFormValid =
    !validationErrors.name &&
    !validationErrors.description &&
    !validationErrors.price &&
    !validationErrors.tag

  function touchField(fieldName) {
    setTouched((prevTouched) => {
      return {
        ...prevTouched,
        [fieldName]: true,
      }
    })
  }

  function touchAllFields() {
    setTouched({
      name: true,
      description: true,
      price: true,
      tag: true,
    })
  }

  return {
    errors,
    isFormValid,
    touchField,
    touchAllFields,
  }
}

export default useProductFormValidation