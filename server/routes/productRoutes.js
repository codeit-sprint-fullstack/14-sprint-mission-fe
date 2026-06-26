import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  const { offset, limit, keyword, sort } = req.query;

  const offsetNum = Number(offset) || 0;
  const limitNum = Number(limit) || 11;

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
      message: "상품 목록 등록에 실패했습니다.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "잘못된 상품 ID 입니다.",
      });
    }

    const product = await Product.findById(id);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "잘못된 상품 ID 입니다.",
      });
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
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
      message: "상품 수정에 실패했습니다.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "잘못된 상품 ID 입니다.",
      });
    }

    await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "상품 삭제에 실패했습니다.",
    });
  }
});

export default router;
