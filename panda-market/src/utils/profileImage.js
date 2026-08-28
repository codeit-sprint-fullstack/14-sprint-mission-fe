const DEFAULT_PROFILE_IMAGE = '/ic_profile.svg'

const ALLOWED_PROFILE_IMAGE_HOSTS = new Set([
  'example.com',
  'placecats.com',
  'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
  'loremflickr.com',
  'i.imgur.com',
  'no-cdn.shortpixel.ai',
])

function getProfileImageSrc(image) {
  if (typeof image !== 'string') return DEFAULT_PROFILE_IMAGE

  const imageUrl = image.trim()

  if (!imageUrl) return DEFAULT_PROFILE_IMAGE

  try {
    const url = new URL(imageUrl)
    const isAllowedProtocol = url.protocol === 'https:'
    const isAllowedHost = ALLOWED_PROFILE_IMAGE_HOSTS.has(url.hostname)

    if (!isAllowedProtocol || !isAllowedHost) {
      return DEFAULT_PROFILE_IMAGE
    }

    return imageUrl
  } catch {
    return DEFAULT_PROFILE_IMAGE
  }
}

function handleProfileImageError(e) {
  const image = e.currentTarget

  if (image.getAttribute('src') === DEFAULT_PROFILE_IMAGE) return

  // 기존 원격 이미지 후보 목록을 제거
  image.removeAttribute('srcset')
  image.src = DEFAULT_PROFILE_IMAGE
}

export { getProfileImageSrc, handleProfileImageError }
