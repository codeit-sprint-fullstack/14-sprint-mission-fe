import fs from "fs";
import productRepository from "../repositories/productRepository.js";
import { assertOwner } from "../utils/authorization.js";
import createHttpError from "../utils/createHttpError.js";
import { createCursorPage, createPagePagination } from "../utils/pagination.js";
import { formatLikeResource } from "../utils/resourceFormatters.js";

const PRODUCT_DETAIL_COMMENT_LIMIT = 10;

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword,
  orderBy = "recent",
  userId,
}) {
  const { skip, take } = createPagePagination(page, pageSize);

  const [list, totalCount] = await Promise.all([
    productRepository.findAll({
      skip,
      take,
      keyword,
      orderBy,
      userId,
    }),
    productRepository.countAll({
      keyword,
    }),
  ]);

  const formattedList = list.map((product) =>
    formatLikeResource(product, "productLikes"),
  );

  return {
    list: formattedList,
    totalCount,
  };
}

export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
  ownerId,
}) {
  return productRepository.create({
    name,
    description,
    price: Number(price),
    tags: tags ?? [],
    images: images ?? [],
    ownerId,
  });
}

export async function getProductById(id, userId) {
  const product = await productRepository.findById(
    id,
    userId,
    PRODUCT_DETAIL_COMMENT_LIMIT,
  );

  if (!product) {
    throw createHttpError(404, "상품을 찾을 수 없습니다.");
  }

  const { comments, ...productData } = formatLikeResource(
    product,
    "productLikes",
  );

  return {
    ...productData,
    comments: createCursorPage(comments, PRODUCT_DETAIL_COMMENT_LIMIT),
  };
}

async function ensureProductOwner(id, userId) {
  const product = await productRepository.findOwnerById(id);

  return assertOwner(
    product,
    userId,
    "상품을 찾을 수 없습니다.",
    "상품을 수정하거나 삭제할 권한이 없습니다.",
  );
}

function removeProductImages(images) {
  for (const image of images) {
    fs.unlink(image.slice(1), () => {});
  }
}

export async function updateProduct({
  id,
  userId,
  name,
  description,
  price,
  tags,
  images,
  existingImages,
}) {
  const existingProduct = await ensureProductOwner(id, userId);

  if (existingImages !== undefined) {
    const hasInvalidImage = existingImages.some(
      (image) => !existingProduct.images.includes(image),
    );

    if (hasInvalidImage) {
      throw createHttpError(
        400,
        "상품에 등록되지 않은 이미지가 포함되어 있습니다.",
      );
    }
  }

  const data = {};

  if (name !== undefined) {
    data.name = name;
  }

  if (description !== undefined) {
    data.description = description;
  }

  if (price !== undefined) {
    data.price = Number(price);
  }

  if (tags !== undefined) {
    data.tags = tags;
  }

  if (images !== undefined) {
    data.images = images;
  }

  const product = await productRepository.updateById(id, data);

  if (images !== undefined) {
    const removedImages = existingProduct.images.filter(
      (image) => !images.includes(image),
    );

    removeProductImages(removedImages);
  }

  return product;
}

export async function deleteProduct(id, userId) {
  const product = await ensureProductOwner(id, userId);

  await productRepository.deleteById(id);

  removeProductImages(product.images);
}

export async function addProductLike(productId, userId) {
  const result = await productRepository.addLike(productId, userId);

  if (!result) {
    throw createHttpError(404, "상품을 찾을 수 없습니다.");
  }

  return {
    ...result,
    isLiked: true,
  };
}

export async function removeProductLike(productId, userId) {
  const result = await productRepository.removeLike(productId, userId);

  if (!result) {
    throw createHttpError(404, "상품을 찾을 수 없습니다.");
  }

  return {
    ...result,
    isLiked: false,
  };
}
