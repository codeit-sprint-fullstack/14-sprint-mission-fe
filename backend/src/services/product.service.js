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
