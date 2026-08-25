import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./src/lib/prisma.js";
import authRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/product.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);

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

app.patch("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  const updatedComment = await prisma.comment.update({
    where: { id: parseInt(commentsId) },
    data: req.body,
  });
  res.send(updatedComment);
});

app.delete("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  await prisma.comment.delete({ where: { id: parseInt(commentsId) } });
  res.status(204).send();
});

//
// // PRODUCTS //
// //GET list
// app.get("/products", async (req, res) => {
//   try {
//     const sort = req.query.sort;
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.count) || 10;

//     const skipIndex = (page - 1) * limit;

//     const sortOption = { _id: sort === "recent" ? "desc" : "asc" };

//     const totalProducts = await Product.countDocuments();
//     const totalPages = Math.ceil(totalProducts / limit);

//     const products = await Product.find()
//       .sort(sortOption)
//       .skip(skipIndex)
//       .limit(limit);

//     res.send({
//       products: products,
//       currentPage: page,
//       totalPages: totalPages,
//     });
//   } catch (e) {
//     res.status(500).send({ message: "서버 오류가 발생했습니다" });
//   }
// });

// //GET id
// app.get("/products/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Cannot find given id." });
//   }
// });

// //POST
// app.post("/products", async (req, res) => {
//   const newProduct = await Product.create(req.body);
//   res.status(201).send(newProduct);
// });

// //PATCH
// app.patch("/products/:id", async (req, res) => {
//   const id = req.params.id;
//   const product = await Product.findById(id);

//   if (product) {
//     Object.keys(req.body).forEach((key) => {
//       product[key] = req.body[key];
//     });

//     // 이것 작성해야 mongoDB에 저장됨. 필수!
//     await product.save();

//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Cannot find given id." });
//   }
// });

// //DELETE
// app.delete("/products/:id", async (req, res) => {
//   const id = req.params.id;
//   const product = await Product.findByIdAndDelete(id);
//   if (product) {
//     res.sendStatus(204);
//   } else {
//     res.status(404).send({ message: "Cannot find given id. " });
//   }
// });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
