import express from "express";
import {
  createProductCommentController,
  getProductCommentsController,
} from "../controllers/commentController.js";
import {
  createProductController,
  getProductController,
  getProductsController,
} from "../controllers/productController.js";
import prisma from "../lib/prisma.js";
import auth from "../middlewares/auth.js";
import { validateProductCreate } from "../middlewares/productValidation.js";

const router = express.Router();

router
  .route("/")
  .get(auth.optionalAccessToken, getProductsController)
  .post(auth.verifyAccessToken, validateProductCreate, createProductController);

router.get("/:id", auth.optionalAccessToken, getProductController);

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, tags, image } = req.body;

  const data = {};

  if (name !== undefined) {
    data.name = name;
  }

  if (description !== undefined) {
    data.description = description;
  }

  if (price !== undefined) {
    data.price = Number(price);
  }

  if (tags !== undefined) {
    data.tags = tags;
  }

  if (image !== undefined) {
    data.image = image;
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json(updatedProduct);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.sendStatus(204);
});

router
  .route("/:productId/comments")
  .get(getProductCommentsController)
  .post(auth.verifyAccessToken, createProductCommentController);

export default router;
