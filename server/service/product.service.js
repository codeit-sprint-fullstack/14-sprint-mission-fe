import Product from "../models/product.model.js";

//get, 정렬 / 페이지네이션 기능 구현
export async function getProduct(sort, count) {
  // 최신순 정렬 구현
  const sortOption = { createdAt: sort === 'oldest' ? 'asc' : 'desc' };
  return await Product.find().sort(sortOption).limit(count);
}

//post, 상품 등록 기능 구현
export async function createProduct(data) {
  return await Product.create(data);
}