import { Router } from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";
import authenticate from "../middlewares/authenticate.js";
import { validateCreateProduct } from "../middlewares/validateProduct.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(authenticate, validateCreateProduct, createProduct);

export default productRouter;
