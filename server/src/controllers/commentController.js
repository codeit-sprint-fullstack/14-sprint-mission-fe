import {
  createArticleComment,
  createProductComment,
  deleteComment,
  getArticleComments,
  getProductComments,
  updateComment,
} from "../services/commentService.js";

async function createCommentController(req, res, next, createComment) {
  try {
    const { productId, articleId } = req.params;
    const { content } = req.body;
    const ownerId = req.user.userId;

    const comment = await createComment({
      content,
      productId,
      articleId,
      ownerId,
    });

    return res.status(201).json(comment);
  } catch (error) {
    return next(error);
  }
}

export async function createProductCommentController(req, res, next) {
  return createCommentController(req, res, next, createProductComment);
}

export async function createArticleCommentController(req, res, next) {
  return createCommentController(req, res, next, createArticleComment);
}

async function getCommentsController(req, res, next, getComments) {
  try {
    const { productId, articleId } = req.params;
    const { cursor, limit } = req.query;

    const result = await getComments({
      productId,
      articleId,
      cursor,
      limit,
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function getProductCommentsController(req, res, next) {
  return getCommentsController(req, res, next, getProductComments);
}

export async function getArticleCommentsController(req, res, next) {
  return getCommentsController(req, res, next, getArticleComments);
}

export async function updateCommentController(req, res, next) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const comment = await updateComment({
      id,
      userId,
      content,
    });

    return res.json(comment);
  } catch (error) {
    return next(error);
  }
}

export async function deleteCommentController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await deleteComment(id, userId);

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}
