import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import Product from "./models/Product.js";
import cors from "cors";
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

console.log("DB 연결 시작");
console.log(DATABASE_URL);
await mongoose.connect(DATABASE_URL)
console.log("DB 연결 완료");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", async(req, res) =>{
    const products = await Product.find();
    const totalCount = await Product.countDocuments()
    res.send({
        products,
        totalCount
    })
})
app.post("/products", async(req, res) =>{
    const newProduct =  await Product.create(req.body);
    res.send(newProduct)
})

app.listen(PORT, () => {
    console.log("실행완료")
})