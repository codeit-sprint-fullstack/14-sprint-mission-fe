import { articleRepository } from "../repositories/article.repository.js";
import { commentRepository } from "../repositories/comment.repository.js";
import { serializeArticle } from "../serializers/article.serializer.js";
import { serializeComment } from "../serializers/comment.serializer.js";
import { NotFound, Forbidden, BadRequest } from "../errors/HttpError.js";

const MAX_IMAGES = 3;
const normalizeImages = (images) =>
  Array.isArray(images)
    ? images.filter((u) => typeof u === "string" && u.trim()).slice(0, MAX_IMAGES)
    : [];

async function getOwnedArticle(articleId, userId) {
  const article = await articleRepository.findById(articleId);
  if (!article) throw NotFound("게시글을 찾을 수 없습니다.");
  if (article.writerId !== userId) throw Forbidden("이 게시글에 대한 권한이 없습니다.");
  return article;
}

export const articleService = {
  async list(query, viewerId) {
    const { page, pageSize, orderBy, keyword } = query;

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const orderByClause =
      orderBy === "like"
        ? [{ likeCount: "desc" }, { id: "desc" }]
        : [{ createdAt: "desc" }, { id: "desc" }];

    const [rows, totalCount] = await Promise.all([
      articleRepository.findMany({
        where,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        viewerId,
      }),
      articleRepository.count(where),
    ]);

    return { list: rows.map((a) => serializeArticle(a)), totalCount };
  },

  async get(articleId, viewerId) {
    const article = await articleRepository.findByIdDetailed(articleId, viewerId);
    if (!article) throw NotFound("게시글을 찾을 수 없습니다.");
    return serializeArticle(article);
  },

  async create({ title, content, images }, writerId) {
    const article = await articleRepository.create({
      title,
      content,
      images: normalizeImages(images),
      writerId,
    });
    return serializeArticle(article, { isLiked: false });
  },

  async update(articleId, body, userId) {
    await getOwnedArticle(articleId, userId);

    const { title, content, images } = body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (images !== undefined) {
      if (Array.isArray(images) && images.length > MAX_IMAGES) {
        throw BadRequest(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`);
      }
      data.images = normalizeImages(images);
    }

    const article = await articleRepository.update(articleId, data, userId);
    return serializeArticle(article);
  },

  async remove(articleId, userId) {
    await getOwnedArticle(articleId, userId);
    await articleRepository.remove(articleId);
    return { message: `게시글이 삭제되었습니다. ${articleId}` };
  },

  // ===== 좋아요 =====
  async addLike(articleId, userId) {
    const article = await articleRepository.findById(articleId);
    if (!article) throw NotFound("게시글을 찾을 수 없습니다.");

    const already = await articleRepository.findLike(userId, articleId);
    if (!already) await articleRepository.addLikeTx(userId, articleId);

    const updated = await articleRepository.findByIdDetailed(articleId, userId);
    return serializeArticle(updated, { isLiked: true });
  },

  async removeLike(articleId, userId) {
    const article = await articleRepository.findById(articleId);
    if (!article) throw NotFound("게시글을 찾을 수 없습니다.");

    const already = await articleRepository.findLike(userId, articleId);
    if (already) await articleRepository.removeLikeTx(userId, articleId);

    const updated = await articleRepository.findByIdDetailed(articleId, userId);
    return serializeArticle(updated, { isLiked: false });
  },

  // ===== 댓글 =====
  async listComments(articleId, { limit, cursor }) {
    const article = await articleRepository.findById(articleId);
    if (!article) throw NotFound("게시글을 찾을 수 없습니다.");

    const rows = await commentRepository.findManyByParent({
      parentKey: "articleId",
      parentId: articleId,
      limit,
      cursor,
    });

    const hasMore = rows.length > limit;
    const list = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? list[list.length - 1].id : null;

    return { list: list.map(serializeComment), nextCursor };
  },

  async addComment(articleId, content, writerId) {
    if (!content || !content.trim()) throw BadRequest("댓글 내용을 입력해주세요.");

    const article = await articleRepository.findById(articleId);
    if (!article) throw NotFound("게시글을 찾을 수 없습니다.");

    const comment = await commentRepository.create({
      content: content.trim(),
      articleId,
      writerId,
    });
    return serializeComment(comment);
  },
};
