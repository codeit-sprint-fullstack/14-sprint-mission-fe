import { productRepository } from "../repositories/product.repository.js";
import { commentRepository } from "../repositories/comment.repository.js";
import { serializeProduct } from "../serializers/product.serializer.js";
import { serializeComment } from "../serializers/comment.serializer.js";
import { NotFound, Forbidden, BadRequest } from "../errors/HttpError.js";

const MAX_IMAGES = 3;
const normalizeImages = (images) =>
  Array.isArray(images)
    ? images.filter((u) => typeof u === "string" && u.trim()).slice(0, MAX_IMAGES)
    : [];

// 상품 로드 + 소유권 확인
async function getOwnedProduct(productId, userId) {
  const product = await productRepository.findById(productId);
  if (!product) throw NotFound("상품을 찾을 수 없습니다.");
  if (product.ownerId !== userId) throw Forbidden("이 상품에 대한 권한이 없습니다.");
  return product;
}

export const productService = {
  async list(query, viewerId) {
    const { page, pageSize, orderBy, keyword } = query;

    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const orderByClause =
      orderBy === "favorite"
        ? [{ favoriteCount: "desc" }, { id: "desc" }]
        : [{ createdAt: "desc" }, { id: "desc" }];

    const [rows, totalCount] = await Promise.all([
      productRepository.findMany({
        where,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        viewerId,
      }),
      productRepository.count(where),
    ]);

    return { list: rows.map((p) => serializeProduct(p)), totalCount };
  },

  async get(productId, viewerId) {
    const product = await productRepository.findByIdDetailed(productId, viewerId);
    if (!product) throw NotFound("상품을 찾을 수 없습니다.");
    return serializeProduct(product);
  },

  async create({ name, description, price, tags, images }, ownerId) {
    const product = await productRepository.create({
      name,
      description,
      price: Number(price),
      tags: Array.isArray(tags) ? tags : [],
      images: normalizeImages(images),
      ownerId,
    });
    return serializeProduct(product);
  },

  async update(productId, body, userId) {
    await getOwnedProduct(productId, userId);

    const { name, description, price, tags, images } = body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = Number(price);
    if (tags !== undefined) data.tags = Array.isArray(tags) ? tags : [];
    if (images !== undefined) {
      if (Array.isArray(images) && images.length > MAX_IMAGES) {
        throw BadRequest(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`);
      }
      data.images = normalizeImages(images);
    }

    const product = await productRepository.update(productId, data);
    return serializeProduct(product);
  },

  async remove(productId, userId) {
    await getOwnedProduct(productId, userId);
    await productRepository.remove(productId);
    return { message: `삭제가 완료되었습니다. ${productId}` };
  },

  // ===== 좋아요 =====
  async addFavorite(productId, userId) {
    const product = await productRepository.findById(productId);
    if (!product) throw NotFound("상품을 찾을 수 없습니다.");

    const already = await productRepository.findFavorite(userId, productId);
    if (!already) await productRepository.addFavoriteTx(userId, productId);

    const updated = await productRepository.findByIdDetailed(productId, userId);
    return serializeProduct(updated, { isFavorite: true });
  },

  async removeFavorite(productId, userId) {
    const product = await productRepository.findById(productId);
    if (!product) throw NotFound("상품을 찾을 수 없습니다.");

    const already = await productRepository.findFavorite(userId, productId);
    if (already) await productRepository.removeFavoriteTx(userId, productId);

    const updated = await productRepository.findByIdDetailed(productId, userId);
    return serializeProduct(updated, { isFavorite: false });
  },

  // ===== 댓글 =====
  async listComments(productId, { limit, cursor }) {
    const product = await productRepository.findById(productId);
    if (!product) throw NotFound("상품을 찾을 수 없습니다.");

    const rows = await commentRepository.findManyByParent({
      parentKey: "productId",
      parentId: productId,
      limit,
      cursor,
    });

    const hasMore = rows.length > limit;
    const list = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? list[list.length - 1].id : null;

    return { list: list.map(serializeComment), nextCursor };
  },

  async addComment(productId, content, writerId) {
    if (!content || !content.trim()) throw BadRequest("댓글 내용을 입력해주세요.");

    const product = await productRepository.findById(productId);
    if (!product) throw NotFound("상품을 찾을 수 없습니다.");

    const comment = await commentRepository.create({
      content: content.trim(),
      productId,
      writerId,
    });
    return serializeComment(comment);
  },
};
