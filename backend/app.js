import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const app = express();

// 상품 등록
app.post("/products", async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    const product = await Product.create({ name, description, price, tags });
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// 상품 상세 조회
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// 상품 수정
app.patch("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  } catch {
    res.status(500).send({ message: err.message });
  }
});

// 상품 삭제
app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).send({ message: "삭제되었습니다." });
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  } catch {
    res.status(500).send({ message: err.message });
  }
});

// 상품 목록 조회
app.get("/products", async (req, res) => {
    try {
        const { page = 1, pageSize = 10, keyword = " "} = req.query;
        const offect = (Number(page) - 1 ) * Number(pageSize);
        const filter = keyword
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.listen(3000, () => console.log("Server Started"));
