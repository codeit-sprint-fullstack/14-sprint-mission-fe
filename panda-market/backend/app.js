import dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
import mongoose from "mongoose";
import express from "express";
await mongoose.connect(DATABASE_URL)
const app = express();
app.use(express.json());

app.get("/products", (req, res) =>{
    res.send("하이")
})
app.listen(PORT, () => {
    
})