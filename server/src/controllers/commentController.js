import {
  createProductComment,
  deleteComment,
  getProductComments,
  updateComment,
} from "../services/commentService.js";

export async function createProductCommentController(req, res, next) {
  try {
    const { productId } = req.params;
    const { content } = req.body;
    const ownerId = req.user.userId;

    const comment = await createProductComment({
      content,
      productId,
      ownerId,
    });

    return res.status(201).json(comment);
  } catch (error) {
    return next(error);
  }
}

export async function getProductCommentsController(req, res, next) {
  try {
    const { productId } = req.params;
    const { cursor, limit } = req.query;

    const result = await getProductComments({
      productId,
      cursor,
      limit,
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
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
