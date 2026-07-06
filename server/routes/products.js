import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

// 추후 미션 시간이 남으면 에러처리를 수정하자.
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags, image } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        tags: tags ?? [],
        image: image ?? "",
      },
    });

    res.status(201).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (error) {
    console.error("상품 등록 실패:", error);

    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.keyword || "";

    const where = keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const totalCount = await prisma.product.count({
      where,
    });

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      list: products,
      totalCount,
    });
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        image: true,
        createdAt: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: req.body,
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
  } catch (error) {
    console.error("상품 수정 실패:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("상품 삭제 실패:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:productId/comments", async (req, res) => {
  const { productId } = req.params;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      productId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      productId: true,
    },
  });

  res.status(201).json(comment);
});

router.get("/:productId/comments", async (req, res) => {
  const { productId } = req.params;
  const { cursor } = req.query;
  const limit = Number(req.query.limit) || 10;

  const queryOptions = {
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: cursor ? 1 : 0,
    take: limit,
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  };

  if (cursor) {
    queryOptions.cursor = {
      id: cursor,
    };
  }

  const comments = await prisma.comment.findMany(queryOptions);

  const nextCursor =
    comments.length === limit ? comments[comments.length - 1].id : null;

  res.status(200).json({
    list: comments,
    nextCursor,
  });
});

export default router;
