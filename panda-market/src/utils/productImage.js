const DEFAULT_PRODUCT_IMAGE = '/img_product_default.png'

// Next Image에 허용된 외부 이미지 호스트
const ALLOWED_PRODUCT_IMAGE_HOSTS = new Set([
  'example.com',
  'placecats.com',
  'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
  'loremflickr.com',
  'i.imgur.com',
  'no-cdn.shortpixel.ai',
])

// 이미지 URL 형식과 허용 호스트를 검사하고, 사용할 수 없으면 기본 이미지 반환
function getProductImage(images) {
  const imageUrl = images?.[0]?.trim()

  if (!imageUrl) {
    return DEFAULT_PRODUCT_IMAGE
  }

  try {
    const url = new URL(imageUrl)
    const isAllowedProtocol = url.protocol === 'https:'
    const isAllowedHost = ALLOWED_PRODUCT_IMAGE_HOSTS.has(url.hostname)

    if (!isAllowedProtocol || !isAllowedHost) {
      return DEFAULT_PRODUCT_IMAGE
    }

    return imageUrl
  } catch {
    return DEFAULT_PRODUCT_IMAGE
  }
}

export { DEFAULT_PRODUCT_IMAGE, getProductImage }
