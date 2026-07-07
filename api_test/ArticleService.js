import axios from 'axios';

const baseURL = 'https://panda-market-api-crud.vercel.app';

const articleApi = axios.create({
  baseURL,
});

function getArticleErrorMessage(error) {
  const status = error.response?.status;
  const message = error.response?.data?.message;

  if (message) {
    return message;
  }

  if (status) {
    return `요청 실패. 에러 코드 : ${status}`;
  }

  return error.message || '요청에 실패했습니다.';
}

function handleArticleRes(response) {
  return response.data === '' ? null : response.data;
}

function handleArticleError(error) {
  console.error(getArticleErrorMessage(error));
  return null;
}

export function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  return articleApi
    .get('/articles', {
      params: {
        page,
        pageSize,
        ...(keyword ? { keyword } : {}),
      },
    })
    .then(handleArticleRes)
    .catch(handleArticleError);
}

export function getArticle(articleId) {
  return articleApi
    .get(`/articles/${articleId}`)
    .then(handleArticleRes)
    .catch(handleArticleError);
}

export function createArticle({ title, content, image }) {
  return articleApi
    .post('/articles', {
      title,
      content,
      image,
    })
    .then(handleArticleRes)
    .catch(handleArticleError);
}

export function patchArticle(articleId, { title, content, image }) {
  return articleApi
    .patch(`/articles/${articleId}`, {
      title,
      content,
      image,
    })
    .then(handleArticleRes)
    .catch(handleArticleError);
}

export function deleteArticle(articleId) {
  return articleApi
    .delete(`/articles/${articleId}`)
    .then(handleArticleRes)
    .catch(handleArticleError);
}
