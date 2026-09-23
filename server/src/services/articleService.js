import articleRepository from "../repositories/articleRepository.js";
import { assertOwner } from "../utils/authorization.js";
import createHttpError from "../utils/createHttpError.js";
import { createCursorPage, createPagePagination } from "../utils/pagination.js";
import { formatLikeResource } from "../utils/resourceFormatters.js";

const ARTICLE_DETAIL_COMMENT_LIMIT = 10;

export async function getArticles({
  page = 1,
  pageSize = 10,
  keyword,
  orderBy = "recent",
  userId,
}) {
  const { skip, take } = createPagePagination(page, pageSize);

  const [list, totalCount] = await Promise.all([
    articleRepository.findAll({
      skip,
      take,
      keyword,
      orderBy,
      userId,
    }),
    articleRepository.countAll({
      keyword,
    }),
  ]);

  const formattedList = list.map((article) =>
    formatLikeResource(article, "articleLikes"),
  );

  return {
    list: formattedList,
    totalCount,
  };
}

export async function getArticleById(id, userId) {
  const article = await articleRepository.findById(
    id,
    userId,
    ARTICLE_DETAIL_COMMENT_LIMIT,
  );

  if (!article) {
    throw createHttpError(404, "게시글을 찾을 수 없습니다.");
  }

  const { comments, ...articleData } = formatLikeResource(
    article,
    "articleLikes",
  );

  return {
    ...articleData,
    comments: createCursorPage(comments, ARTICLE_DETAIL_COMMENT_LIMIT),
  };
}

export async function createArticle({ title, content, ownerId }) {
  return articleRepository.create({
    title,
    content,
    ownerId,
  });
}

async function ensureArticleOwner(id, userId) {
  const article = await articleRepository.findOwnerById(id);

  return assertOwner(
    article,
    userId,
    "게시글을 찾을 수 없습니다.",
    "게시글을 수정하거나 삭제할 권한이 없습니다.",
  );
}

export async function updateArticle({ id, userId, title, content }) {
  await ensureArticleOwner(id, userId);

  const data = {};

  if (title !== undefined) {
    data.title = title;
  }

  if (content !== undefined) {
    data.content = content;
  }

  return articleRepository.updateById(id, data);
}

export async function deleteArticle(id, userId) {
  await ensureArticleOwner(id, userId);

  await articleRepository.deleteById(id);
}

export async function addArticleLike(articleId, userId) {
  const result = await articleRepository.addLike(articleId, userId);

  if (!result) {
    throw createHttpError(404, "게시글을 찾을 수 없습니다.");
  }

  return {
    ...result,
    isLiked: true,
  };
}

export async function removeArticleLike(articleId, userId) {
  const result = await articleRepository.removeLike(articleId, userId);

  if (!result) {
    throw createHttpError(404, "게시글을 찾을 수 없습니다.");
  }

  return {
    ...result,
    isLiked: false,
  };
}
