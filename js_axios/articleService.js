// axiosApi.js
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app'
})


export const getColorSurveys= ( params = {}) => {
  return instance
  .get('/article/', {params})
  .then((res) => res.data)

}

const createdArticleData = {
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  image: 'https://example.com/...',
}

export const createArticle = (articleData) => {
  return instance
  .post('/articles/', articleData)
  .then((res) => res.data);
  }



const patchArticleData = {
  title: '게시글 수정',
  content: '게시글 수정.',
  image: 'https://example.com/...',
}

export const patchArticle = (id ,articleData) => {
  return instance
  .patch(`/articles/${id}`, articleData)
  .then((res) => {res.data});
}

patchArticle (6716, patchArticleData);

export const deleteArticle = (id) =>{
  return instance
  .delete (`/articles/${id}`)
  .then ((res) => res.data);
}

