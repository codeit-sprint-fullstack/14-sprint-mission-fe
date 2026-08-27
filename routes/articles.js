import express from "express";
import { authenticate, softAuthenticate } from "../src/middlewares/authenticate.js";
import { validateArticle } from "../src/middlewares/validators.js";
import { articleController } from "../src/controllers/article.controller.js";

const router = express.Router();

router
  .route("/")
  .get(softAuthenticate, articleController.list)
  .post(authenticate, validateArticle, articleController.create);

router
  .route("/:id")
  .get(softAuthenticate, articleController.get)
  .patch(authenticate, articleController.update)
  .delete(authenticate, articleController.remove);

router
  .route("/:id/like")
  .post(authenticate, articleController.addLike)
  .delete(authenticate, articleController.removeLike);

router
  .route("/:id/comments")
  .get(articleController.listComments)
  .post(authenticate, articleController.addComment);

export default router;
