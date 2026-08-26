import productRepository from "../repositories/productRepository.js";
import createHttpError from "../utils/createHttpError.js";

const PRODUCT_DETAIL_COMMENT_LIMIT = 10;

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword,
  orderBy = "recent",
  userId,
}) {
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);

  const skip = (pageNumber - 1) * pageSizeNumber;

  const [list, totalCount] = await Promise.all([
    productRepository.findAll({
      skip,
      take: pageSizeNumber,
      keyword,
      orderBy,
      userId,
    }),
    productRepository.countAll({
      keyword,
    }),
  ]);

  const formattedList = list.map((product) => {
    const { _count, productLikes = [], ...productData } = product;

    return {
      ...productData,
      likeCount: _count.productLikes,
      isLiked: productLikes.length > 0,
    };
  });

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

  const { _count, productLikes = [], comments, ...productData } = product;

  const hasMoreComments = comments.length > PRODUCT_DETAIL_COMMENT_LIMIT;

  const commentList = hasMoreComments
    ? comments.slice(0, PRODUCT_DETAIL_COMMENT_LIMIT)
    : comments;

  const nextCursor = hasMoreComments
    ? commentList[commentList.length - 1].id
    : null;

  return {
    ...productData,
    likeCount: _count.productLikes,
    isLiked: productLikes.length > 0,
    comments: {
      list: commentList,
      nextCursor,
    },
  };
}
