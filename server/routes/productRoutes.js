import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
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
});

router.post("/", async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "상품 목록 등록에 실패했습니다.",
    });
  }
});

router.get("/:id", async (req, res) => {
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
    console.error(error);

    res.status(500).json({
      message: "상품 상세 조회에 실패했습니다.",
    });
  }
});

router.patch("/:id", async (req, res) => {
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

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "상품 수정에 실패했습니다.",
    });
  }
});

router.delete("/:id", async (req, res) => {
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
    console.error(error);

    res.status(500).json({
      message: "상품 삭제에 실패했습니다.",
    });
  }
});

export default router;
