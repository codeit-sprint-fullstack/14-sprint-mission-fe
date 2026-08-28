import {
  createProductComment as createProductCommentService,
  updateComment as updateCommentService,
  deleteComment as deleteCommentService,
} from "../services/comment.service.js";

export async function createProductComment(req, res, next) {
  try {
    const comment = await createProductCommentService(
      req.params.productId,
      req.body.content,
      req.auth.userId,
    );

    return res.status(201).json(comment);
  } catch (error) {
    return next(error);
  }
}

export async function updateComment(req, res, next) {
  try {
    const comment = await updateCommentService(
      req.params.commentId,
      req.body.content,
      req.auth.userId,
    );

    return res.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    await deleteCommentService(req.params.commentId, req.auth.userId);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
