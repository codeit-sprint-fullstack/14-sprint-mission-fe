import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config(); //.env 를 읽을수 있게 해줌

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);
app.use("/articles", articleRoutes);
app.use(commentRoutes);

app.get("/", (req, res) => {
  res.send("Panda Market API Server");
});

app.use((error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;

  res.status(status).json({
    message: error.message || "서버 오류가 발생했습니다.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
