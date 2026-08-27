import express from "express";
import {
  createProductCommentController,
  getProductCommentsController,
} from "../controllers/commentController.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import {
  validateProductCreate,
  validateProductUpdate,
} from "../middlewares/productValidation.js";

const router = express.Router();

router
  .route("/")
  .get(auth.optionalAccessToken, getProductsController)
  .post(auth.verifyAccessToken, validateProductCreate, createProductController);

router
  .route("/:id")
  .get(auth.optionalAccessToken, getProductController)
  .patch(auth.verifyAccessToken, validateProductUpdate, updateProductController)
  .delete(auth.verifyAccessToken, deleteProductController);

router
  .route("/:productId/comments")
  .get(getProductCommentsController)
  .post(auth.verifyAccessToken, createProductCommentController);

export default router;
