// 실제 API 요청 및 응답 반환

import axios from './lib/axios';

/**************** auth ***************/
// 로그인 유저 가져오기
export async function getMe() {
  const res = await axios.get('/users/me');
  return res.data;
}

// 회원가입
export async function register(data) {
  const res = await axios.post('/auth/signUp', data);
  return res.data;
}

// 로그인
export async function login(data) {
  const res = await axios.post('/auth/signIn', data);
  return res.data;
}

/**************** products ***************/
// 상품 목록 가져오기
export async function getProducts({ page, pageSize, orderBy, keyword }) {
  const res = await axios.get('/products', {
    params: {
      page,
      pageSize,
      orderBy,
      keyword,
    }
  });
  const data = res.data;
  return {
    totalCount: data.totalCount,
    products: data.list
  };
}

// 상품 상세 가져오기
export async function getProduct(productId) {
  const res = await axios.get(`/products/${productId}`);
  const product = res.data;
  return product;
}

// 상품 생성하기
export async function createProduct(data) {
  const res = await axios.post('/products');
  return res.data;
}

// 상품 수정하기
export async function updateProduct(productId, data) {
  const res = await axios.patch(`/products/${productId}`, data);
  return res.data;
}

// 상품 삭제하기
export async function deleteProduct(productId) {
  const res = await axios.delete(`/products/${productId}`);
  return res.data;
}

// 상품 좋아요 생성하기
export async function createProductFavorite(productId) {
  const res = await axios.post(`/products/${productId}/favorite`);
  return res.data;
}

// 상품 좋아요 삭제하기
export async function deleteProductFavorite(productId) {
  const res = await axios.delete(`/products/${productId}/favorite`);
  return res.data;
}

/**************** articles ***************/
// 게시글 목록 가져오기
export async function getArticles({ page, pageSize, orderBy, keyword }) {
  const res = await axios.get('/articles', {
    params: {
      page,
      pageSize,
      orderBy,
      keyword,
    },
  });
  const data = res.data;
  return {
    totalCount: data.totalCount,
    articles: data.list,
  };
}

// 게시글 상세 가져오기
export async function getArticle(articleId) {
  const res = await axios.get(`/articles/${articleId}`);
  return res.data;
}

// 게시글 생성하기
export async function createArticle(data) {
  const res = await axios.post('/articles', data);
  return res.data;
}

// 게시글 수정하기
export async function updateArticle(articleId, data) {
  const res = await axios.patch(`/articles/${articleId}`, data);
  return res.data;
}

// 게시글 삭제하기
export async function deleteArticle(articleId) {
  const res = await axios.delete(`/articles/${articleId}`);
  return res.data;
}

// 게시글 좋아요 생성하기
export async function createArticleLike(articleId) {
  const res = await axios.post(`/articles/${articleId}/like`);
  return res.data;
}

// 게시글 좋아요 삭제하기
export async function deleteArticleLike(articleId) {
  const res = await axios.delete(`/articles/${articleId}/like`);
  return res.data;
}

/**************** comments ***************/
// 상품 댓글 목록 가져오기
export async function getProductComments(productId, limit, cursor) {
  const res = await axios.get(`/products/${productId}/comments`, {
    params: {
      limit,
      cursor,
    }
  })
  return res.data;
}

// 상품 댓글 생성하기
export async function createProductComment(productId, data) {
  const res = await axios.post(`/products/${productId}/comments`, data);
  return res.data;
}

// 게시글 댓글 목록 가져오기
export async function getArticleComments(articleId, limit, cursor) {
  const res = await axios.get(`/articles/${articleId}/comments`, {
    params: {
      limit, 
      cursor,
    },
  })
  return res.data;
}

// 게시글 댓글 생성하기
export async function createArticleComment(articleId, data) {
  const res = await axios.post(`/articles/${articleId}/comments`, data);
  return res.data;
}

// 댓글 수정하기
export async function updateComment(commentId, data) {
  const res = await axios.patch(`/comments/${commentId}`, data);
  return res.data;
}

// 댓글 삭제하기
export async function deleteComment(commentId) {
  const res = await axios.delete(`/comments/${commentId}`);
  return res.data;
}