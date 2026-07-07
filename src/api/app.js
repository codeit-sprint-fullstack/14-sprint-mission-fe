import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { parse } from "dotenv";

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(express.json());

// Articles 메서드

app.get("/articles", async (req, res) => {
  try {
    
    console.log("✅ /articles 라우트 호출됨");
    
    const { title, content, from, to, page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;

    const where = {};

    if (title) {
      where.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (content) {
      where.content = {
        contains: content,
        mode: "insensitive",
      };
    }

    if (from || to) {
      where.createdAt = {};
      if(from) {
        where.createdAt.gte = new Date(from);
      }
      if (to) {
        where.createdAt.lte = new Date(to);
      }
    }

    const articles = await prisma.article.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: { [sort]: order },
    });

    const totalCount = await prisma.article.count({where});

    if (articles.length === 0) {
      return res.status(404).json({ error: "조건에 맞는 Article이 없습니다." });
    }

    return res.json({
      totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      articles,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Articles를 가져오는데 실패했습니다."});
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!article) {
      return res.status(404).json({ error: "해당하는 Article이 없습니다."});
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Article를 가져오는데 실패했습니다."})
  }
})

app.post("/articles", async (req, res) => {
  try {
    const { title, content } = req.body;

    if ( !title || !content ) {
      return res.status(400).json({ error: "title과 content 값이 없습니다."});
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Article을 생성하는데 실패했습니다." });
  }
});

app.patch("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "수정할 데이터가 필요합니다." });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당하는 Article을 찾을 수 없습니다." });
    }

    res.status(500).json({ error: "Article 수정에 실패했습니다." });
  }
});

app.delete("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArticle = await prisma.article.delete({
      where: { id },
    });

    res.json({ message: "Article이 삭제되었습니다.", deletedArticle});
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Article을 찾을 수 없습니다." });
    }

    res.status(500).json({ error: "Article 삭제에 실패했습니다." });
  }
});

// ArticleComment 메서드
app.get("/articles/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { cursor, limit = 10, commentId, content, from, to } = req.query;

    const take = Number(limit) || 10;

    const comments = await prisma.articleComment.findMany({
      where: {
        articleId: id,
        ...(commentId && { id: commentId }),
        ...(content && { content: { contains: content } }),
        ...(from && to && {
          createdAt: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
      },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      comments,
      nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Comment를 가져오는데 실패했습니다." });
  }
});

app.post("/articles/:articleId/comments", async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content를 입력해야 합니다." });
    }

    const newComment = await prisma.articleComment.create({
      data: { content, articleId },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    if (error.code === "P2003") {
      return res.status(404).json({ error: "해당 Article을 찾을 수 없습니다." });
    }
    res.status(500).json({ error: "Comment 생성에 실패했습니다." });
  }
});

app.patch("/articles/:articleId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "수정할 Comment가 필요합니다." });
    }

    const updatedComment = await prisma.articleComment.update({
      where: { id: commentId },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Comment를 찾을 수 없습니다." });
    }
    res.status(500).json({ error: "Comment 수정에 실패했습니다." });
  }
});

app.delete("/articles/:articleId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    await prisma.articleComment.delete({
      where: { id: commentId },
    });

    res.json({ message: "Comment를 성공적으로 삭제하였습니다." });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Comment를 찾을 수 없습니다." });
    }
    res.status(500).json({ error: "Comment 삭제에 실패하였습니다." });
  }
});

// Product 메서드
app.get("/products", async (req, res) => {
  try {
    
    console.log("✅ /products 라우트 호출됨");
    
    const { title, content, from, to, page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;

    const where = {};

    if (title) {
      where.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (content) {
      where.content = {
        contains: content,
        mode: "insensitive",
      };
    }

    if (from || to) {
      where.createdAt = {};
      if(from) {
        where.createdAt.gte = new Date(from);
      }
      if (to) {
        where.createdAt.lte = new Date(to);
      }
    }

    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: { [sort]: order },
    });

    const totalCount = await prisma.product.count({where});

    if (products.length === 0) {
      return res.json({
        totalCount: 0,
        page: parseInt(page),
        limit: parseInt(limit),
        products: [],
      });
    }

    return res.json({
      totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Products를 가져오는데 실패했습니다."});
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!product) {
      return res.status(404).json({ error: "해당하는 Product가 없습니다."});
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Product를 가져오는데 실패했습니다."})
  }
})

app.post("/products", async (req, res) => {
  try {
    const { title, content, price } = req.body;
    const priceValue = Number(price);

    if ( !title || !content || isNaN(priceValue) ) {
      return res.status(400).json({ error: "title, content, price 값이 없습니다."});
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        content,
        price,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Product를 생성하는데 실패했습니다." });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, price } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (price) updateData.price = price;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "수정할 데이터가 필요합니다." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당하는 Product를 찾을 수 없습니다." });
    }

    res.status(500).json({ error: "Product 수정에 실패했습니다." });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product가 삭제되었습니다.", deletedProduct});
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Product를 찾을 수 없습니다." });
    }

    res.status(500).json({ error: "Product 삭제에 실패했습니다." });
  }
});

// ProductComment 메서드
app.get("/products/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { cursor, limit = 10, commentId, content, from, to } = req.query;

    const take = Number(limit) || 10;

    const comments = await prisma.productComment.findMany({
      where: {
        productId: id,
        ...(commentId && { id: commentId }),
        ...(content && { content: { contains: content } }),
        ...(from && to && {
          createdAt: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
      },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      comments,
      nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Comment를 가져오는데 실패했습니다." });
  }
});

app.post("/products/:productId/comments", async (req, res) => {
  try {
    const { productId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content를 입력해야 합니다." });
    }

    const newComment = await prisma.productComment.create({
      data: { content, productId },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    if (error.code === "P2003") {
      return res.status(404).json({ error: "해당 Product를 찾을 수 없습니다." });
    }
    res.status(500).json({ error: "Comment 생성에 실패했습니다." });
  }
});

app.patch("/products/:productId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "수정할 Comment가 필요합니다." });
    }

    const updatedComment = await prisma.productComment.update({
      where: { id: commentId },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Comment를 찾을 수 없습니다." });
    }
    res.status(500).json({ error: "Comment 수정에 실패했습니다." });
  }
});

app.delete("/products/:productId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    await prisma.productComment.delete({
      where: { id: commentId },
    });

    res.json({ message: "Comment를 성공적으로 삭제하였습니다." });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Comment를 찾을 수 없습니다." });
    }
    res.status(500).json({ error: "Comment 삭제에 실패하였습니다." });
  }
});

app.listen(3000, () => console.log('✅ DB 서버가 3000번 포트에서 실행될 예정입니다'));


