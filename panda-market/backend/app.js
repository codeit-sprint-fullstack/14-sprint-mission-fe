import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import Product from "./models/Product.js";
import cors from "cors";
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

await mongoose.connect(DATABASE_URL)
const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
    const keyword = req.query.keyword;
    const page = Number(req.query.page)
    const pageSize = Number(req.query.pageSize)
    const skipCount = (page - 1) * pageSize
    console.log("page:", page);
    console.log(keyword)
    let products;
    let totalCount;
    if (keyword) {
        products = await Product.find({
            "name": { "$regex": keyword }
        })
        .skip(skipCount)
        .limit(pageSize);
        totalCount = await Product.countDocuments({
            "name": { "$regex": keyword }
        })
    } else {
        products = await Product.find()
            .skip(skipCount)
            .limit(pageSize);
        totalCount = await Product.countDocuments()
    }

    res.send({
        products,
        totalCount
    })
})
app.post("/products", async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.send(newProduct)
})
app.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
    res.send(product)
})
app.patch("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;
    const product = await Product.findByIdAndUpdate(
        productId,
        updateData, {
        new: true
    }
    )
    res.send(product)
})
app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;
    res.send(product);
})

app.listen(PORT, () => {
    console.log("실행완료");

})