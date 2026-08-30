import express from 'express';
import passport from '../config/passport.js';
import commentController from '../controllers/commentController.js';

const productCommentRouter = express.Router({ mergeParams: true });
const articleCommentRouter = express.Router({ mergeParams: true });
const commentRouter = express.Router({ mergeParams: true });

productCommentRouter.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  commentController.createProductComment
)

productCommentRouter.get(
  '/',
  commentController.getProductComments
)

articleCommentRouter.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  commentController.createArticleComment
)

articleCommentRouter.get(
  '/',
  commentController.getArticleComments
)

commentRouter.patch(
  '/',
  passport.authenticate('access-token', { session: false }),
  commentController.updateComment
)

commentRouter.delete(
  '/',
  passport.authenticate('access-token', { session: false }),
  commentController.deleteComment
)

export {
  productCommentRouter,
  articleCommentRouter,
  commentRouter,
}