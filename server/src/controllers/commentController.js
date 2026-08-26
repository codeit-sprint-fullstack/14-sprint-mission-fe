import { createProductComment } from "../services/commentService.js";

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
