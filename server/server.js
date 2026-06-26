import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import productsRouter from "./routes/products.js"

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Panda Market API server is running.");
});

app.use("/products", productsRouter);

try {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  await mongoose.connect(DATABASE_URL);
  console.log("Connected to DB");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Server start failed:", error.message);
}