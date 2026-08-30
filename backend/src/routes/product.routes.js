import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addProductLike,
  removeProductLike,
} from "../controllers/product.controller.js";
import authenticate, {
  optionalAuthenticate,
} from "../middlewares/authenticate.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/validateProduct.js";
import { createProductComment } from "../controllers/comment.controller.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(authenticate, validateCreateProduct, createProduct);

productRouter
  .route("/:productId")
  .get(optionalAuthenticate, getProduct)
  .patch(authenticate, validateUpdateProduct, updateProduct)
  .delete(authenticate, deleteProduct);

productRouter
  .route("/:productId/likes")
  .post(authenticate, addProductLike)
  .delete(authenticate, removeProductLike);

productRouter
  .route("/:productId/comments")
  .post(authenticate, createProductComment);

export default productRouter;
