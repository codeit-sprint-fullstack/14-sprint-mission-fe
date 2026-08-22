import { fetchWithAuth } from '@/api/fetchWithAuth'

const PRODUCT_API_URL = 'https://panda-market-api.vercel.app/products'
const COMMENT_API_URL = 'https://panda-market-api.vercel.app/comments'

async function getProductComments({ productId, limit, cursor }) {
  const url = new URL(`${PRODUCT_API_URL}/${productId}/comments`)

  url.searchParams.set('limit', String(limit))

  if (cursor != null) {
    url.searchParams.set('cursor', String(cursor))
  }

  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error(`댓글 목록을 불러오지 못했습니다 (${res.status})`)

    error.status = res.status

    throw error
  }

  return res.json()
}

async function createProductComment({ productId, content }) {
  const res = await fetchWithAuth(`${PRODUCT_API_URL}/${productId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!res.ok) {
    const error = new Error(`댓글을 등록하지 못했습니다 (${res.status})`)

    error.status = res.status

    throw error
  }

  return res.json()
}

async function updateComment({ commentId, content }) {
  const res = await fetchWithAuth(`${COMMENT_API_URL}/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!res.ok) {
    const error = new Error(`댓글을 수정하지 못했습니다 (${res.status})`)

    error.status = res.status

    throw error
  }

  return res.json()
}

async function deleteComment(commentId) {
  const res = await fetchWithAuth(`${COMMENT_API_URL}/${commentId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = new Error(`댓글을 삭제하지 못했습니다 (${res.status})`)

    error.status = res.status

    throw error
  }

  return res.json()
}

export {
  getProductComments,
  createProductComment,
  updateComment,
  deleteComment,
}
