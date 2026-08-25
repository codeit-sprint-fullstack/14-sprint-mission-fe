import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import authenticate from "../middlewares/authenticate.js";
import { validateCreateProduct } from "../middlewares/validateProduct.js";

const productRouter = Router();

productRouter.post("/", authenticate, validateCreateProduct, createProduct);

export default productRouter;
