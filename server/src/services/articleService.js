import articleRepository from "../repositories/articleRepository.js";
import createHttpError from "../utils/createHttpError.js";

const ARTICLE_DETAIL_COMMENT_LIMIT = 10;

export async function getArticles({
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
    articleRepository.findAll({
      skip,
      take: pageSizeNumber,
      keyword,
      orderBy,
      userId,
    }),
    articleRepository.countAll({
      keyword,
    }),
  ]);

  const formattedList = list.map((article) => {
    const { _count, articleLikes = [], ...articleData } = article;

    return {
      ...articleData,
      likeCount: _count.articleLikes,
      isLiked: articleLikes.length > 0,
    };
  });

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

  const { _count, articleLikes = [], comments, ...articleData } = article;

  const hasMoreComments = comments.length > ARTICLE_DETAIL_COMMENT_LIMIT;

  const commentList = hasMoreComments
    ? comments.slice(0, ARTICLE_DETAIL_COMMENT_LIMIT)
    : comments;

  const nextCursor = hasMoreComments
    ? commentList[commentList.length - 1].id
    : null;

  return {
    ...articleData,
    likeCount: _count.articleLikes,
    isLiked: articleLikes.length > 0,
    comments: {
      list: commentList,
      nextCursor,
    },
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

  if (!article) {
    throw createHttpError(404, "게시글을 찾을 수 없습니다.");
  }

  if (article.ownerId !== userId) {
    throw createHttpError(403, "게시글을 수정하거나 삭제할 권한이 없습니다.");
  }
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
