import {
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_TAG_MAX_LENGTH,
} from '../../../constants/product'

const getProductFormValidation = ({
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

  const hasEmptyRequired =
    !trimmedName || !trimmedDescription || !trimmedPrice || tags.length === 0

  if (!trimmedName) {
    errors.name = '상품명을 입력해주세요.'
  } else if (trimmedName.length > PRODUCT_NAME_MAX_LENGTH) {
    errors.name = `상품명은 ${PRODUCT_NAME_MAX_LENGTH}자 이내로 입력해주세요.`
  }

  if (!trimmedDescription) {
    errors.description = '상품 소개를 입력해주세요.'
  } else if (trimmedDescription.length < PRODUCT_DESCRIPTION_MIN_LENGTH) {
    errors.description = `상품 소개는 ${PRODUCT_DESCRIPTION_MIN_LENGTH}자 이상 입력해주세요.`
  } else if (trimmedDescription.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
    errors.description = `상품 소개는 ${PRODUCT_DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`
  }

  if (!trimmedPrice) {
    errors.price = '판매 가격을 입력해주세요.'
  } else if (!Number.isInteger(Number(trimmedPrice))) {
    errors.price = '판매 가격은 정수로 입력해주세요.'
  } else if (Number(trimmedPrice) < 0) {
    errors.price = '판매 가격은 0원 이상이어야 합니다.'
  }
  if (trimmedTagInput.length > PRODUCT_TAG_MAX_LENGTH) {
    errors.tagInput = `태그는 1자 이상 ${PRODUCT_TAG_MAX_LENGTH}자 이내로 입력해주세요.`
  }

  if (tags.length === 0) {
    errors.tags = '태그를 1개 이상 입력해주세요.'
  } else if (tags.some((tag) => tag.trim().length > PRODUCT_TAG_MAX_LENGTH)) {
    errors.tags = `태그는 1자 이상 ${PRODUCT_TAG_MAX_LENGTH}자 이내로 입력해주세요.`
  }

  const isValid =
    !errors.name && !errors.description && !errors.price && !errors.tags

  return {
    errors,
    hasEmptyRequired,
    isValid,
  }
}

export default getProductFormValidation
