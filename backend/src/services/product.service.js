import AppError from "../errors/AppError.js";
import productRepository from "../repositories/product.repository.js";

function formatProduct(product) {
  return {
    ...product,
    images: product.images.map((image) => image.path),
  };
}

export async function createProduct(productData, userId) {
  const createdProduct = await productRepository.save({
    ...productData,
    userId,
  });

  return formatProduct(createdProduct);
}

export async function getProduct(productId) {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError(404, "상품을 찾을 수 없습니다.");
  }

  return formatProduct(product);
}

export async function updateProduct(productId, productData, userId) {
  const product = await getProduct(productId);

  if (product.userId !== userId) {
    throw new AppError(403, "상품을 수정할 권한이 없습니다.");
  }

  const updatedProduct = await productRepository.update(productId, productData);

  return formatProduct(updatedProduct);
}

export async function deleteProduct(productId, userId) {
  const product = await getProduct(productId);

  if (product.userId !== userId) {
    throw new AppError(403, "상품을 삭제할 권한이 없습니다.");
  }

  await productRepository.remove(productId);
}

export async function addProductLike(productId, userId) {
  await getProduct(productId);

  const result = await productRepository.addLike(userId, productId);

  if (!result) {
    throw new AppError(409, "이미 좋아요한 상품입니다.");
  }

  return {
    favoriteCount: result.favoriteCount,
    isLiked: true,
  };
}

export async function removeProductLike(productId, userId) {
  await getProduct(productId);

  const result = await productRepository.removeLike(userId, productId);

  if (!result) {
    throw new AppError(409, "좋아요하지 않은 상품입니다.");
  }

  return {
    favoriteCount: result.favoriteCount,
    isLiked: false,
  };
}

export async function getProducts({
  page = "1",
  pageSize = "10",
  orderBy = "recent",
  keyword = "",
}) {
  const parsedPage = Number(page);
  const parsedPageSize = Number(pageSize);

  const safePage =
    Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

  const safePageSize =
    Number.isInteger(parsedPageSize) && parsedPageSize >= 1
      ? parsedPageSize
      : 10;

  const safeOrderBy = orderBy === "favorite" ? "favorite" : "recent";

  const normalizedKeyword = typeof keyword === "string" ? keyword.trim() : "";

  const skip = (safePage - 1) * safePageSize;

  const products = await productRepository.findMany({
    keyword: normalizedKeyword,
    orderBy: safeOrderBy,
    skip,
    take: safePageSize,
  });

  const totalCount = await productRepository.count(normalizedKeyword);

  return {
    totalCount,
    list: products.map(formatProduct),
  };
}
