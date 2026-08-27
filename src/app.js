import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";
import productsRouter from "../routes/products.js";
import articlesRouter from "../routes/articles.js";
import commentsRouter from "../routes/comments.js";
import uploadRouter from "../routes/upload.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Panda Market API", version: "1.0.0", description: "중고마켓 API 명세 문서" },
  },
  apis: ["./api_docs.js"],
});

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 도메인 라우터
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);
app.use("/images", uploadRouter);

// 404 → 에러 핸들러
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
