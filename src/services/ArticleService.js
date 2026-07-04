import { createApiClient, createQueryString } from './apiClient'

const BASE_URL = 'https://panda-market-api-crud.vercel.app'

const requestArticle = createApiClient({
  baseUrl: BASE_URL,
  errorMessage: '게시글 요청에 실패했습니다.',
})

export const getArticleList = (page = 1, pageSize = 10, keyword = '') => {
  const queryString = createQueryString({ page, pageSize, keyword })

  return requestArticle(`/articles?${queryString}`)
}

export const getArticle = (articleId) => {
  return requestArticle(`/articles/${articleId}`)
}

export const createArticle = ({ title, content, image }) => {
  return requestArticle('/articles', {
    method: 'POST',
    body: { title, content, image },
  })
}

export const patchArticle = (articleId, article) => {
  return requestArticle(`/articles/${articleId}`, {
    method: 'PATCH',
    body: article,
  })
}

export const deleteArticle = (articleId) => {
  return requestArticle(`/articles/${articleId}`, {
    method: 'DELETE',
  })
}
