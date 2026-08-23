const MAX_PRODUCT_PRICE = 2147483647

function isValidProductId(productId) {
  const numericProductId = Number(productId)

  // 숫자로만 이루어진 1 이상의 정수 ID만 허용
  return (
    /^\d+$/.test(productId) &&
    Number.isInteger(numericProductId) &&
    numericProductId > 0
  )
}

function isValidProductImageUrl(imageUrl) {
  if (typeof imageUrl !== 'string') {
    return false
  }

  try {
    const url = new URL(imageUrl)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isValidProductName(name) {
  const trimmedName = name.trim()

  return trimmedName.length >= 1 && trimmedName.length <= 30
}

function isValidProductDescription(description) {
  return description.trim().length >= 1
}

function isValidProductPrice(price) {
  if (price.trim() === '') return false

  const numericPrice = Number(price)

  return (
    Number.isInteger(numericPrice) &&
    numericPrice >= 0 &&
    numericPrice <= MAX_PRODUCT_PRICE
  )
}

function isValidProductImages(images) {
  return images.length >= 1 && images.every(isValidProductImageUrl)
}

function isValidProductTags(tags) {
  return (
    tags.length >= 1 &&
    tags.every((tag) => {
      const trimmedTag = tag.trim()

      return trimmedTag.length >= 1 && trimmedTag.length <= 20
    })
  )
}

function isValidProductForm({ name, description, price, images, tags }) {
  return (
    isValidProductName(name) &&
    isValidProductDescription(description) &&
    isValidProductPrice(price) &&
    isValidProductImages(images) &&
    isValidProductTags(tags)
  )
}

export {
  MAX_PRODUCT_PRICE,
  isValidProductId,
  isValidProductImageUrl,
  isValidProductName,
  isValidProductDescription,
  isValidProductPrice,
  isValidProductImages,
  isValidProductTags,
  isValidProductForm,
}
