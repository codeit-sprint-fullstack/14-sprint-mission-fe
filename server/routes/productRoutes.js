import express from "express";
import prisma from "../lib/prisma.js";
import {
  validationCreateProductBody,
  validationUpdateProductBody,
} from "../validators/productValidator.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { offset, limit, keyword, sort } = req.query;

    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 11;

    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const totalCount = await prisma.product.count({ where });
    const products = await prisma.product.findMany({
      where,
      orderBy: sort === "recent" ? { createdAt: "desc" } : { createdAt: "asc" },
      skip: offsetNum,
      take: limitNum,
    });

    res.json({
      list: products,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = validationCreateProductBody(req.body);

    const product = await prisma.product.create({
      data,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const data = validationUpdateProductBody(req.body);

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
