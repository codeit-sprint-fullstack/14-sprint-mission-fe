import productRepository from '../repositories/productRepository.js';

// 응답 형식 포맷 함수
function formatProductsItem(product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    tags: product.tags,
    images: product.images,
    ownerNickname: product.user.nickname,
    ownerId: product.user.id,
    favoriteCount: product._count.favorites,
    createdAt: product.createdAt
  }
}

// 응답(isFavorite 추가)
function formatProductDetail(product, isFavorite) {
  return {
    ...formatProductsItem(product),
    isFavorite,
  };
}

// 상품 생성하기
async function createProduct(data, userId) {
  const product = await productRepository.save(data, userId);
  
  return formatProductsItem(product);
}

// 상품 목록 가져오기
async function getProducts(query = {}) {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = query;
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);
  const offset = (pageNumber - 1) * pageSizeNumber;

  const { totalCount, products } = await productRepository.findMany({
    offset,
    limit: pageSizeNumber,
    orderBy,
    keyword
  });

  return {
    totalCount,
    list: products.map(formatProductsItem)
  };
}

// 상품 가져오기
async function getProduct(productId, userId) {
  // 1. 가져오려는 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 상품에 좋아요 눌렀는지 확인
  const existingFavorite = await productRepository.findFavorite(productId, userId);

  return formatProductDetail(existingProduct, Boolean(existingFavorite));
}

// 상품 수정하기
async function updateProduct(productId, data, userId) {
  // 1. 수정하려는 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }

  // 2. 수정하려는 유저가 작성자인지 확인
  if (existingProduct.user.id !== userId) {
    const error = new Error('Forbidden');
    error.code = 403;
    throw error;
  }

  // 3. 통과하면 상품 수정
  const updatedProduct = await productRepository.update(productId, data);

  // 4. 유저가 상품에 좋아요 눌렀는지 확인
  const existingFavorite = await productRepository.findFavorite(productId, userId);

  return formatProductDetail(updatedProduct, Boolean(existingFavorite));
}

// 상품 삭제하기
async function deleteProduct(productId, userId) {
  // 1. 삭제하려는 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }

  // 2. 삭제하려는 유저가 작성자인지 확인
  if (existingProduct.user.id !== userId) {
    const error = new Error('Forbidden');
    error.code = 403;
    throw error;
  }

  // 3. 통과하면 상품 삭제
  return await productRepository.remove(productId);
}

// 상품 좋아요 생성하기
async function createFavorite(productId, userId) {
  // 1. 좋아요 누를 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 상품에 좋아요를 눌렀는지 확인
  const existingFavorite = await productRepository.findFavorite(productId, userId);
  if (!existingFavorite) { // 좋아요 없으면 관계 생성
     await productRepository.saveFavorite(productId, userId);
  }

  // 3. 좋아요가 반영된 최신 상품 조회
  const updatedProduct = await productRepository.findUnique(productId);

  return formatProductDetail(updatedProduct, true);
}

// 상품 좋아요 삭제하기
async function deleteFavorite(productId, userId) {
  // 1. 좋아요 삭제하려는 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }

  // 2. 유저가 상품 좋아요 눌렀는지 확인
  const existingFavorite = await productRepository.findFavorite(productId, userId);
  if (existingFavorite) { // 좋아요 있으면 관계 삭제
    await productRepository.removeFavorite(productId, userId);
  }

  // 3. 좋아요가 반영된 최신 상품 조회
  const updatedProduct = await productRepository.findUnique(productId);

  return formatProductDetail(updatedProduct, false);
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createFavorite,
  deleteFavorite,
}