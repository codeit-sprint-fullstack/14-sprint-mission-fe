import {
  createArticleComment,
  createProductComment,
  deleteComment,
  getArticleComments,
  getProductComments,
  updateComment,
} from "../services/commentService.js";

async function createCommentController(req, res, createComment) {
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
}

export async function createProductCommentController(req, res) {
  return createCommentController(req, res, createProductComment);
}

export async function createArticleCommentController(req, res) {
  return createCommentController(req, res, createArticleComment);
}

async function getCommentsController(req, res, getComments) {
  const { productId, articleId } = req.params;
  const { cursor, limit } = req.query;

  const result = await getComments({
    productId,
    articleId,
    cursor,
    limit,
  });

  return res.json(result);
}

export async function getProductCommentsController(req, res) {
  return getCommentsController(req, res, getProductComments);
}

export async function getArticleCommentsController(req, res) {
  return getCommentsController(req, res, getArticleComments);
}

export async function updateCommentController(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const comment = await updateComment({
    id,
    userId,
    content,
  });

  return res.json(comment);
}

export async function deleteCommentController(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  await deleteComment(id, userId);

  return res.sendStatus(204);
}
