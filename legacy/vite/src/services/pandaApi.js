import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const pandaApi = axios.create({
  baseURL: API_BASE_URL,
});

function getRequestErrorMessage(error) {
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

async function request(config) {
  try {
    const response = await pandaApi.request(config);
    return response.data === '' ? null : response.data;
  } catch (error) {
    throw new Error(getRequestErrorMessage(error));
  }
}

export function getProductList({ page = 1, pageSize = 15, keyword = '' } = {}) {
  return request({
    url: '/products',
    method: 'GET',
    params: {
      offset: Math.max(0, (page - 1) * pageSize),
      limit: pageSize,
      orderBy: 'recent',
      ...(keyword ? { keyword } : {}),
    },
  });
}

export function getProduct(productId) {
  return request({
    url: `/products/${productId}`,
    method: 'GET',
  });
}

export function createProduct(product) {
  return request({
    url: '/products',
    method: 'POST',
    data: product,
  });
}

export function patchProduct(productId, product) {
  return request({
    url: `/products/${productId}`,
    method: 'PATCH',
    data: product,
  });
}

export function deleteProduct(productId) {
  return request({
    url: `/products/${productId}`,
    method: 'DELETE',
  });
}

export function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  return request({
    url: '/articles',
    method: 'GET',
    params: {
      offset: Math.max(0, (page - 1) * pageSize),
      limit: pageSize,
      orderBy: 'recent',
      ...(keyword ? { keyword } : {}),
    },
  });
}

export function getArticle(articleId) {
  return request({
    url: `/articles/${articleId}`,
    method: 'GET',
  });
}

export function createArticle(article) {
  return request({
    url: '/articles',
    method: 'POST',
    data: article,
  });
}

export function patchArticle(articleId, article) {
  return request({
    url: `/articles/${articleId}`,
    method: 'PATCH',
    data: article,
  });
}

export function deleteArticle(articleId) {
  return request({
    url: `/articles/${articleId}`,
    method: 'DELETE',
  });
}

export function getArticleComments(articleId, { cursor = '', pageSize = 10 } = {}) {
  return request({
    url: `/articles/${articleId}/comments`,
    method: 'GET',
    params: {
      limit: pageSize,
      ...(cursor ? { cursor } : {}),
    },
  });
}

export function createArticleComment(articleId, comment) {
  return request({
    url: `/articles/${articleId}/comments`,
    method: 'POST',
    data: comment,
  });
}

export function getProductComments(productId, { cursor = '', pageSize = 10 } = {}) {
  return request({
    url: `/products/${productId}/comments`,
    method: 'GET',
    params: {
      limit: pageSize,
      ...(cursor ? { cursor } : {}),
    },
  });
}

export function createProductComment(productId, comment) {
  return request({
    url: `/products/${productId}/comments`,
    method: 'POST',
    data: comment,
  });
}

export function patchComment(commentId, comment) {
  return request({
    url: `/comments/${commentId}`,
    method: 'PATCH',
    data: comment,
  });
}

export function deleteComment(commentId) {
  return request({
    url: `/comments/${commentId}`,
    method: 'DELETE',
  });
}
