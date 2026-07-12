import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { data } from "react-router-dom";
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

/* ------ product -------- */
app.get("/products", async (req, res) => {
    const keyword = req.query.keyword;
    const page = Number(req.query.page)
    const pageSize = Number(req.query.pageSize)
    const skipCount = (page - 1) * pageSize
    console.log("page:", page);
    console.log(keyword)
    let products;
    let totalCount;
    if (keyword) {
        products = await prisma.product.findMany({
            where:{
              name:{
                contains:keyword
              }
            },
            orderBy:{
              createdAt:"desc"
            },
            skip: skipCount,
            take: pageSize,
        })

        totalCount = await prisma.product.count({
            where:{
              name:{
                contains:keyword
              }
            }
        })
    } else {
        products = await prisma.product.findMany({
          skip: skipCount,
          take: pageSize
        })
        totalCount = await prisma.product.count()
    }

    res.send({
        products,
        totalCount
    })
})
app.post("/products", async (req, res) => {
    const newProduct = await prisma.product.create({
      data:req.body
    });
    res.status(201).send(newProduct)
})
app.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where:{
        id:productId
      }
    })
    res.status(200).send(product)
})
app.patch("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;
    const productPatch = await prisma.product.update({
      where:{
        id:productId,
      },
       data:updateData
    })
    res.status(200).send(productPatch)
})
app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const productDelete = await prisma.product.delete({
      where:{
        id: productId
      }
    })
    res.status(200).send(productDelete);
})

/* ------ article -------- */
app.get("/articles", async (req, res) => {
  const keyword = req.query.keyword;
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  const skipCount = (page - 1) * pageSize;

  let articles;
  let totalCount;

  if (keyword) {
    articles = await prisma.article.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            content: {
              contains: keyword,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skipCount,
      take: pageSize,
    });

    totalCount = await prisma.article.count({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            content: {
              contains: keyword,
            },
          },
        ],
      },
    });
  } else {
    articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: skipCount,
      take: pageSize,
    });

    totalCount = await prisma.article.count();
  }

  res.status(200).send({
    articles,
    totalCount,
  });
});


app.post("/articles", async(req, res)=>{
  const newArticle = await prisma.article.create({
    data:req.body
  });
  res.status(201).send(newArticle)
})

app.get("/articles/:id", async(req, res)=>{
  const articleId = req.params.id;
  const article = await prisma.article.findUnique({
    where:{
      id:articleId
    }
  })
  res.status(200).send(article)
})

app.patch("articles/:id", async(req, res)=>{
  const articleId = req.params.id;
  const updateData =  req.body;
  const articlePatch = await prisma.article.update({
    where:{
      id:articleId
    },
    data:updateData
  })
  res.status(200).send(articlePatch)
})

app.delete("/articles/:id", async(req, res)=>{
  const articleId =  req.params.id;
  const articleDelete = await prisma.article.delete({
    where:{
      id:articleId
    }
  })
  res.status(200).send(articleDelete)
})

app.post("/products/:productId/comments", async (req, res) => {
  const productId = req.params.productId;
  const content = req.body.content;

  const productComment = await prisma.productComment.create({
    data: {
      content: content,
      productId: productId,
    },
  });
  res.status(201).send(productComment);
});

app.get("/products/:productId/comments")

app.listen(PORT, () => {
    console.log("실행완료");

})