import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const router = express.Router();

// ==============================================================
// 상품 등록
// ==============================================================
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      tags,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const product = await Product.findById(id);

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      message: "상품이 삭제되었습니다.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "상품 삭제에 실패했습니다.",
      error: error.message,
    });
  }
});


// ==============================================================
// 상품 목록 조회
// ==============================================================
router.get("/", async (req, res) => {
  try {
    const {
      offset = 0,
      limit = 10,
      orderBy = "recent",
      keyword = "",
    } = req.query;

    const filter = {};

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const sortOption = {};

    if (orderBy === "recent") {
      sortOption.createdAt = -1;
    }

    const products = await Product.find(filter)
      .select("name price createdAt")
      .sort(sortOption)
      .skip(Number(offset))
      .limit(Number(limit));

    const totalCount = await Product.countDocuments(filter);

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


export default router;