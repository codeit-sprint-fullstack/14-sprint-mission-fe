import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); //.env 를 읽을수 있게 해줌

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Panda Market API Server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
