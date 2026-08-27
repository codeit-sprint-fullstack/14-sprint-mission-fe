import articleRepository from "../repositories/articleRepository.js";
import createHttpError from "../utils/createHttpError.js";

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
  const article = await articleRepository.findById(id, userId);

  if (!article) {
    throw createHttpError(404, "게시글을 찾을 수 없습니다.");
  }

  const { _count, articleLikes = [], ...articleData } = article;

  return {
    ...articleData,
    likeCount: _count.articleLikes,
    isLiked: articleLikes.length > 0,
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
