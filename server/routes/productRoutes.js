import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { offset, limit, keyword, sort } = req.query;

  const offsetNum = Number(offset) || 0;
  const limitNum = Number(limit) || 10;

  const filter = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const totalCount = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sort === "recent" ? "-createdAt" : "createdAt")
    .skip(offsetNum)
    .limit(limitNum);

  res.json({
    list: products,
    totalCount,
  });
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      messege: "상품 목록 조회에 실패했습니다.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.json(product);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(product);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  res.sendStatus(204);
});

export default router;
