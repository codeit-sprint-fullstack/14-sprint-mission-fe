import {
  createProductComment,
  getProductComments,
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
