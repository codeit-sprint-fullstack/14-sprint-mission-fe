import {
  addArticleLike,
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  removeArticleLike,
  updateArticle,
} from "../services/articleService.js";

export async function getArticlesController(req, res) {
  const { page, pageSize, keyword, orderBy } = req.query;
  const userId = req.user?.userId;

  const result = await getArticles({
    page,
    pageSize,
    keyword,
    orderBy,
    userId,
  });

  return res.json(result);
}

export async function getArticleController(req, res) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const article = await getArticleById(id, userId);

  return res.json(article);
}

export async function createArticleController(req, res) {
  const { title, content } = req.body;
  const ownerId = req.user.userId;

  const article = await createArticle({
    title,
    content,
    ownerId,
  });

  return res.status(201).json(article);
}

export async function updateArticleController(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;

  const article = await updateArticle({
    id,
    userId,
    title,
    content,
  });

  return res.json(article);
}

export async function deleteArticleController(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  await deleteArticle(id, userId);

  return res.sendStatus(204);
}

export async function addArticleLikeController(req, res) {
  const { articleId } = req.params;
  const userId = req.user.userId;

  const result = await addArticleLike(articleId, userId);

  return res.json(result);
}

export async function removeArticleLikeController(req, res) {
  const { articleId } = req.params;
  const userId = req.user.userId;

  const result = await removeArticleLike(articleId, userId);

  return res.json(result);
}
