function useProductFormValidation({ name, description, price, tags, tagInput }) {
  const errors = {}

  if (!name.trim()) {
    errors.name = '상품명을 입력해주세요.'
  } else if (name.trim().length > 10) {
    errors.name = '상품명은 10자 이내로 입력해주세요.'
  }

  if (!description.trim()) {
    errors.description = '상품 소개를 입력해주세요.'
  } else if (description.trim().length < 10) {
    errors.description = '상품 소개는 10자 이상 입력해주세요.'
  } else if (description.trim().length > 100) {
    errors.description = '상품 소개는 100자 이내로 입력해주세요.'
  }

  if (!price.trim()) {
    errors.price = '판매 가격을 입력해주세요.'
  } else if (!/^\d+$/.test(price)) {
    errors.price = '판매 가격은 숫자로 입력해주세요.'
  }

  const hasInvalidTag = tags.some((tag) => tag.length > 5)

  if (tagInput.trim().length > 5) {
    errors.tag = '태그는 5글자 이내로 입력해주세요.'
  } else if (hasInvalidTag) {
    errors.tag = '태그는 5글자 이내로 입력해주세요.'
  }

  const isValid =
    !errors.name &&
    !errors.description &&
    !errors.price &&
    !errors.tag &&
    tags.length > 0

  if (tags.length === 0) {
    errors.tag = errors.tag || '태그를 1개 이상 입력해주세요.'
  }

  return {
    errors,
    isValid: isValid && tags.length > 0,
  }
}

export default useProductFormValidation