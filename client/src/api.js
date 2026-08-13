// 실제 API 요청 및 응답 반환

import axios from './lib/axios';

// 인증
export async function getMe() {
  const accessToken = localStorage.getItem('accessToken');
  const res = await axios.get('/users/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  return res.data;
}

export async function register(data) {
  const res = await axios.post('/auth/signUp', data);
  return res.data;
}

export async function login(data) {
  const res = await axios.post('/auth/signIn', data);
  return res.data;
}

// products
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

export async function getProduct(productId) {
  const accessToken = localStorage.getItem('accessToken');
  const res = await axios.get(`/products/${productId}`, {
    headers: { 'Authorization': `Bearer ${accessToken}`},
  });
  const product = res.data;
  return product;
}

export async function getProductComments(productId, limit) {
  const res = await axios.get(`/products/${productId}/comments`, {
    params: {
      productId,
      limit,
    }
  })
  const comments = res.data.list;
  return comments;
}