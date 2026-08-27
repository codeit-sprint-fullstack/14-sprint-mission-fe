import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import multer from "multer";
import path from "path";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import commentsRouter from "./routes/comments.js";
import articlesRouter from "./routes/articles.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Panda Market API",
      version: "1.0.0",
      description: "중고마켓 API 명세 문서"
    }
  },
  apis: ["./api_docs.js"], // 주석 기반으로 API 문서화할 파일 경로
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);

// 이미지 업로드 API
// 프론트가 <img src> 로 바로 쓸 수 있도록 절대 URL 로 반환한다.
// (파일은 이 서버(:4000)의 /uploads 에서 서빙되고, 프론트는 :3000 이라 상대경로면 못 찾음)
app.post("/images/upload", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    return next({ status: 400, message: "이미지가 업로드되지 않았습니다." });
  }
  const baseUrl = process.env.SERVER_PUBLIC_URL || `${req.protocol}://${req.get("host")}`;
  res.json({ url: `${baseUrl}/uploads/${req.file.filename}` });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "서버 오류가 발생했습니다.";
  if (status === 500) console.error(err);
  res.status(status).json({ message });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
