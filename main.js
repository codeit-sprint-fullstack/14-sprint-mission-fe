import ArticleService from "./ArticleService.js";

// Article API 테스트
const articleParams = {
  page: 1,
  pageSize: 10,
  keyword: '',
}
ArticleService.getArticleList(articleParams)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))
  
ArticleService.getArticle(25)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

const createdArticleData = {
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  image: 'https://example.com/...',
}
ArticleService.createArticle(createdArticleData)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

const patchedArticleData = {
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  image: 'https://example.com/...',
}
ArticleService.patchArticle(25, patchedArticleData)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

ArticleService.deleteArticle(25)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))