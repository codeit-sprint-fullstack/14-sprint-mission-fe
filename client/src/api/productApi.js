import axios from '../utils/axios.js';

// 목록 조회 (검색 / 페이지 / 최신순)
export async function getProductList({ page = 1, pageSize = 10, keyword = '', sort = 'recent' } = {}) {
  const res = await axios.get('/products', {
    params: { page, pageSize, keyword, sort },
  });
  console.log('서버 응답 res.data:', res.data);
  return res.data;
}

export async function getProduct(id) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(data) {
  const res = await axios.post('/products', data);
  return res.data;
}