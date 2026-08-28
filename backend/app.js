import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./src/lib/prisma.js";
import authRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/product.routes.js";
import commentRouter from "./src/routes/comment.routes.js";
import uploadRouter from "./src/routes/upload.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/comments", commentRouter);
app.use("/uploads", uploadRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API server is running");
});

//
// ARTICLES
//
app.get("/articles", async (req, res) => {
  const { offset = 0, limit = 10, order = "newest" } = req.query;

  let orderBy;
  switch (order) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
  }

  const articles = await prisma.article.findMany({
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),

    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });
  res.send(articles);
});

app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUniqueOrThrow({ where: { id } });
  res.send(article);
});

app.post("/articles", async (req, res) => {
  const article = await prisma.article.create({ data: req.body });
  res.status(201).send(article);
});

app.patch("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.send(article);
});

app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({ where: { id } });
  res.send(204);
});

//
// COMMENTS
//
app.get("/comments", async (req, res) => {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.send(comments);
});

app.get("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id: parseInt(commentsId) },
  });
  res.send(comment);
});

app.get("/articles/:articleId/comments", async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
      },
    });

    if (!article) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다",
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        articleId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

app.post("/articles/:articleId/comments", async (req, res) => {
  const { articleId } = req.params;
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      user: { connect: { id: req.body.userId } },
      article: { connect: { id: articleId } },
    },
  });
  res.status(201).send(comment);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
