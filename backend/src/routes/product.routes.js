import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import authenticate from "../middlewares/authenticate.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/validateProduct.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(authenticate, validateCreateProduct, createProduct);

productRouter
  .route("/:productId")
  .get(getProduct)
  .patch(authenticate, validateUpdateProduct, updateProduct)
  .delete(authenticate, deleteProduct);
export default productRouter;
