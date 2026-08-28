function formatRelativeTime(date) {
  const createdAt = new Date(date)
  const now = new Date()

  if (Number.isNaN(createdAt.getTime())) return ''

  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000)

  if (diffInSeconds < 60) return '방금 전'

  const diffInMinutes = Math.floor(diffInSeconds / 60)

  if (diffInMinutes < 60) return `${diffInMinutes}분 전`

  const diffInHours = Math.floor(diffInMinutes / 60)

  if (diffInHours < 24) return `${diffInHours}시간 전`

  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays < 30) return `${diffInDays}일 전`

  const diffInMonths = Math.floor(diffInDays / 30)

  if (diffInMonths < 12) return `${diffInMonths}개월 전`

  return `${Math.floor(diffInMonths / 12)}년 전`
}

export default formatRelativeTime
