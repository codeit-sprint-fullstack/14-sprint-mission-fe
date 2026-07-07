import express from "express";

import prisma from "../lib/prisma.js";

const router = express.Router();

function parsePositiveInteger(value, defaultValue) {
  const numberValue = Number(value);

  if (value === undefined) {
    return defaultValue;
  }

  if (
    Number.isNaN(numberValue) ||
    !Number.isInteger(numberValue) ||
    numberValue < 0
  ) {
    return null;
  }

  return numberValue;
}

function validateProductInput({
  name,
  description,
  price,
  tags,
}) {
  const errors = [];

  if (
    typeof name !== "string" ||
    name.trim().length < 1 ||
    name.trim().length > 10
  ) {
    errors.push("상품명은 1자 이상 10자 이내로 입력해주세요.");
  }

  if (
    typeof description !== "string" ||
    description.trim().length < 10 ||
    description.trim().length > 100
  ) {
    errors.push("상품 소개는 10자 이상 100자 이내로 입력해주세요.");
  }

  if (
    typeof price !== "number" ||
    Number.isNaN(price) ||
    price < 1
  ) {
    errors.push("가격은 1 이상의 숫자여야 합니다.");
  }

  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.some((tag) => {
      return (
        typeof tag !== "string" ||
        tag.trim().length === 0 ||
        tag.trim().length > 5
      );
    })
  ) {
    errors.push("태그는 최소 1개 이상이며, 각 태그는 5글자 이내여야 합니다.");
  }

  return errors;
}

// ==============================================================
// 상품 목록 조회
// ==============================================================
router.get("/", async (req, res) => {
  try {
    const {
      offset,
      limit,
      orderBy = "recent",
      keyword = "",
    } = req.query;

    const numericOffset = parsePositiveInteger(offset, 0);
    const numericLimit = parsePositiveInteger(limit, 10);

    if (
      numericOffset === null ||
      numericLimit === null ||
      numericLimit < 1
    ) {
      return res.status(400).json({
        message: "offset과 limit은 올바른 숫자여야 합니다.",
      });
    }

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

    const orderByOption =
      orderBy === "recent"
        ? {
            createdAt: "desc",
          }
        : {
            createdAt: "desc",
          };

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          price: true,
          createdAt: true,
        },
        orderBy: orderByOption,
        skip: numericOffset,
        take: numericLimit,
      }),

      prisma.product.count({
        where,
      }),
    ]);

    res.status(200).json({
      list: products,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "상품 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 상품 등록
// ==============================================================
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      tags,
    } = req.body;

    const productData = {
      name,
      description,
      price: Number(price),
      tags,
    };

    const errors = validateProductInput(productData);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "상품 등록 데이터가 올바르지 않습니다.",
        errors,
      });
    }

    const product = await prisma.product.create({
      data: {
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: productData.price,
        tags: productData.tags.map((tag) => tag.trim()),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "상품 등록에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 특정 상품 조회
// ==============================================================
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id) ||
      id < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

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
    res.status(500).json({
      message: "상품 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 상품 수정
// ==============================================================
router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id) ||
      id < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const updateData = {};

    if (req.body.name !== undefined) {
      updateData.name = req.body.name;
    }

    if (req.body.description !== undefined) {
      updateData.description = req.body.description;
    }

    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price);
    }

    if (req.body.tags !== undefined) {
      updateData.tags = req.body.tags;
    }

    const mergedProduct = {
      name: updateData.name ?? existingProduct.name,
      description: updateData.description ?? existingProduct.description,
      price: updateData.price ?? existingProduct.price,
      tags: updateData.tags ?? existingProduct.tags,
    };

    const errors = validateProductInput(mergedProduct);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "상품 수정 데이터가 올바르지 않습니다.",
        errors,
      });
    }

    if (updateData.name !== undefined) {
      updateData.name = updateData.name.trim();
    }

    if (updateData.description !== undefined) {
      updateData.description = updateData.description.trim();
    }

    if (updateData.tags !== undefined) {
      updateData.tags = updateData.tags.map((tag) => tag.trim());
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: updateData,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: "상품 수정에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 상품 삭제
// ==============================================================
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id) ||
      id < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "상품 삭제에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;