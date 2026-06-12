import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app',
})

function getArticleList(params = {}) {
    return instance
    .get('/articles/', { params, })
    .then((res) => res.data)
    .catch((e) => {
      console.log('에러 발생: ', e.message)
      throw e
    })
}

function getArticle(id) {
  return instance
    .get(`/articles/${id}`)
    .then((res) => res.data)
    .catch((e) => {
      console.log('에러 발생: ', e.message)
      throw e
    })
}

function createArticle(articleData) {
  return instance
    .post('/articles/', articleData)
    .then((res) => res.data)
    .catch((e) => {
      console.log('에러 발생: ', e.message)
      throw e
    })
}

function patchArticle(id, articleData) {
  return instance
    .patch(`/articles/${id}`, articleData)
    .then((res) => res.data)
    .catch((e) => {
      console.log('에러 발생: ', e.message)
      throw e
    })
}

function deleteArticle(id) {
  return instance
    .delete(`/articles/${id}`)
    .then((res) => res.data)
    .catch((e) => {
      console.log('에러 발생: ', e.message)
      throw e
    })
}

export default {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
}