import express from "express";
import { authenticate } from "../src/middlewares/authenticate.js";
import { commentController } from "../src/controllers/comment.controller.js";

const router = express.Router();

// 상품·게시글 댓글 공용 (Comment.writerId 기준 작성자 확인)
router
  .route("/:commentId")
  .patch(authenticate, commentController.update)
  .delete(authenticate, commentController.remove);

export default router;
