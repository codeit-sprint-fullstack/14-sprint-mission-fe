import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.post("/", async (req, res) => {
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

  res.status(201).json(product);
});

router.get("/", async (req, res) => {
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
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUniqueOrThrow({
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

  res.status(200).json(product);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, tags, image} = req.body;

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
