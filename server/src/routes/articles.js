import express from "express";
import {
  addArticleLikeController,
  createArticleController,
  deleteArticleController,
  getArticleController,
  getArticlesController,
  removeArticleLikeController,
  updateArticleController,
} from "../controllers/articleController.js";
import {
  createArticleCommentController,
  getArticleCommentsController,
} from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(auth.optionalAccessToken, getArticlesController)
  .post(auth.verifyAccessToken, createArticleController);

router
  .route("/:id")
  .get(auth.optionalAccessToken, getArticleController)
  .patch(auth.verifyAccessToken, updateArticleController)
  .delete(auth.verifyAccessToken, deleteArticleController);

router
  .route("/:articleId/likes")
  .post(auth.verifyAccessToken, addArticleLikeController)
  .delete(auth.verifyAccessToken, removeArticleLikeController);

router
  .route("/:articleId/comments")
  .get(getArticleCommentsController)
  .post(auth.verifyAccessToken, createArticleCommentController);

export default router;
