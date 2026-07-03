const useProductFormValidation = ({
  name,
  description,
  price,
  tagInput,
  tags,
}) => {
  const errors = {}

  const trimmedName = name.trim()
  const trimmedDescription = description.trim()
  const trimmedPrice = price.toString().trim()
  const trimmedTagInput = tagInput.trim()

  if (!trimmedName) {
    errors.name = '상품명을 입력해주세요.'
  } else if (trimmedName.length > 10) {
    errors.name = '상품명은 10자 이내로 입력해주세요.'
  }

  if (!trimmedDescription) {
    errors.description = '상품 소개를 입력해주세요.'
  } else if (trimmedDescription.length < 10) {
    errors.description = '상품 소개는 10자 이상 입력해주세요.'
  } else if (trimmedDescription.length > 100) {
    errors.description = '상품 소개는 100자 이내로 입력해주세요.'
  }

  if (!trimmedPrice) {
    errors.price = '판매 가격을 입력해주세요.'
  } else if (!/^\d+$/.test(trimmedPrice)) {
    errors.price = '판매 가격은 숫자로 입력해주세요.'
  }

  if (trimmedTagInput.length > 5) {
    errors.tagInput = '태그는 5자 이내로 입력해주세요.'
  }

  if (tags.length === 0) {
    errors.tags = '태그를 1개 이상 입력해주세요.'
  } else if (tags.some((tag) => tag.length > 5)) {
    errors.tags = '태그는 5자 이내로 입력해주세요.'
  }

  return {
    errors,
    isValid:
      !errors.name &&
      !errors.description &&
      !errors.price &&
      !errors.tagInput &&
      !errors.tags,
  }
}

export default useProductFormValidation
