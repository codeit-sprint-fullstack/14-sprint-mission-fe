import { Router } from "express";
import {
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import authenticate from "../middlewares/authenticate.js";

const commentRouter = Router();

commentRouter
  .route("/:commentId")
  .patch(authenticate, updateComment)
  .delete(authenticate, deleteComment);

export default commentRouter;
