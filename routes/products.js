import express from "express";
import { authenticate, softAuthenticate } from "../src/middlewares/authenticate.js";
import { validateProduct } from "../src/middlewares/validators.js";
import { productController } from "../src/controllers/product.controller.js";

const router = express.Router();

router
  .route("/")
  .get(softAuthenticate, productController.list)
  .post(authenticate, validateProduct, productController.create);

router
  .route("/:id")
  .get(softAuthenticate, productController.get)
  .patch(authenticate, productController.update)
  .delete(authenticate, productController.remove);

router
  .route("/:id/favorite")
  .post(authenticate, productController.addFavorite)
  .delete(authenticate, productController.removeFavorite);

router
  .route("/:id/comments")
  .get(productController.listComments)
  .post(authenticate, productController.addComment);

export default router;
