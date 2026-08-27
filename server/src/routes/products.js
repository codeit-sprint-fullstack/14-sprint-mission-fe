import express from "express";
import {
  createProductCommentController,
  getProductCommentsController,
} from "../controllers/commentController.js";
import {
  addProductLikeController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  removeProductLikeController,
  updateProductController,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/productImageUpload.js";
import {
  validateProductCreate,
  validateProductUpdate,
} from "../middlewares/productValidation.js";

const router = express.Router();

router
  .route("/")
  .get(auth.optionalAccessToken, getProductsController)
  .post(
    auth.verifyAccessToken,
    upload.array("images", 3),
    validateProductCreate,
    createProductController,
  );

router
  .route("/:id")
  .get(auth.optionalAccessToken, getProductController)
  .patch(
    auth.verifyAccessToken,
    upload.array("images", 3),
    validateProductUpdate,
    updateProductController,
  )
  .delete(auth.verifyAccessToken, deleteProductController);

router
  .route("/:productId/comments")
  .get(getProductCommentsController)
  .post(auth.verifyAccessToken, createProductCommentController);

router
  .route("/:productId/likes")
  .post(auth.verifyAccessToken, addProductLikeController)
  .delete(auth.verifyAccessToken, removeProductLikeController);

export default router;
