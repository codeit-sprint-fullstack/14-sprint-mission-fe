import express from "express";
import {
  deleteCommentController,
  updateCommentController,
} from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/:id")
  .patch(auth.verifyAccessToken, updateCommentController)
  .delete(auth.verifyAccessToken, deleteCommentController);

export default router;
