import express from "express";
import Product from "../models/Product.js"

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      tags,
      image,
    });

    res.status(201).json({
      id: product._id.toString(),
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
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .select("name price createdAt")
      .lean();

    const formattedProducts = products.map((product) => {
      return {
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        image: product.image || "",
        createdAt: product.createdAt,
      };
    });

    res.status(200).json({
      list: formattedProducts,
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

    const product = await Product.findById(id)
      .select("name description price tags createdAt")
      .lean();

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const formattedProduct = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      image: product.image || "",
      createdAt: product.createdAt,
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .select("name description price tags image createdAt updatedAt")
      .lean();

    if (!updatedProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const formattedProduct = {
      id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      tags: updatedProduct.tags,
      image: updatedProduct.image,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error("상품 수정 실패:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "상품 id 형식이 올바르지 않습니다.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
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

    const deleteProduct = await Product.findByIdAndDelete(id).lean();

    if (!deleteProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      })
    }

    res.status(200).json({
      message: "상품이 삭제되었습니다.",
    });
  } catch (error) {
    console.error("상품 삭제 실패:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "상품 id 형식이 올바르지 않습니다.",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;