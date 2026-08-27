import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../services/articleService.js";

export async function getArticlesController(req, res, next) {
  try {
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
  } catch (error) {
    return next(error);
  }
}

export async function getArticleController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const article = await getArticleById(id, userId);

    return res.json(article);
  } catch (error) {
    return next(error);
  }
}

export async function createArticleController(req, res, next) {
  try {
    const { title, content } = req.body;
    const ownerId = req.user.userId;

    const article = await createArticle({
      title,
      content,
      ownerId,
    });

    return res.status(201).json(article);
  } catch (error) {
    return next(error);
  }
}

export async function updateArticleController(req, res, next) {
  try {
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
  } catch (error) {
    return next(error);
  }
}

export async function deleteArticleController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await deleteArticle(id, userId);

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}
