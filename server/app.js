import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Panda Market API Server')
})

// 상품 등록
app.post('/products', async (req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  })

  res.status(201).send(product)
})

// 상품 목록 조회
app.get('/products', async (req, res) => {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 10
  const keyword = req.query.keyword || ''
  const orderBy = req.query.orderBy || 'recent'

  const where = keyword
    ? {
      OR: [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ],
    }
    : {}
  //정렬방식
  const sortOption =
    orderBy === 'favorite'
      ? { favoriteCount: 'desc' }
      : { createdAt: 'desc' }

  const products = await prisma.product.findMany({
    where,
    orderBy: sortOption,
    skip: offset,
    take: limit,
    select: {
      id: true,
      name: true,
      price: true,
      favoriteCount: true,
      createdAt: true,
    }
  })

  const totalCount = await prisma.product.count({ where })

  res.send({
    list: products,
    totalCount,
  })
})

// 상품 상세 조회
app.get('/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
    }
  })

  if (!product) {
    return res.status(404).send({
      message: 'Cannot find given id.',
    })
  }

  res.send(product)
})

// 상품 수정
app.patch('/products/:id', async (req, res) => {
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: req.body,
  })

  res.send(product)
})

// 상품 삭제
app.delete('/products/:id', async (req, res) => {
  await prisma.product.delete({
    where: { id: req.params.id },
  })

  res.sendStatus(204)
})

//게시글 등록
app.post('/articles', async (req, res) => {
  const article = await prisma.article.create({
    data: req.body,
  })

  res.status(201).send(article)
})

//게시글 목록 조회
app.get('/articles', async (req, res) => {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 10
  const keyword = req.query.keyword || ''
  const orderBy = req.query.orderBy || 'recent'

  const where = keyword
    ? {
      OR: [
        { title: { contains: keyword, mode: 'insensitive' } },
        { content: { contains: keyword, mode: 'insensitive' } },
      ],
    }
    : {}

  const sortOption =
    orderBy === 'recent'
      ? { createdAt: 'desc' }
      : { createdAt: 'desc' }

  const articles = await prisma.article.findMany({
    where,
    orderBy: sortOption,
    skip: offset,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    }
  })
  const totalCount = await prisma.article.count({ where })

  res.send({
    list: articles,
    totalCount,
  })
})

//게시글 상세 조회
app.get('/articles/:id', async (req, res) => {
  const article = await prisma.article.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  })

  if (!article) {
    return res.status(404).send({
      message: 'Cannot find given id.',
    })
  }

  res.send(article)
})

// 게시글 수정
app.patch('/articles/:id', async (req, res) => {
  const article = await prisma.article.update({
    where: { id: req.params.id },
    data: req.body,
  })

  res.send(article)
})

// 게시글 삭제
app.delete('/articles/:id', async (req, res) => {
  await prisma.article.delete({
    where: { id: req.params.id },
  })

  res.sendStatus(204)
})



// 중고마켓 댓글 등록
app.post('/products/:productId/comments', async (req, res) => {
  const { productId } = req.params

  const comment = await prisma.productComment.create({
    data: {
      content: req.body.content,
      productId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  res.status(201).send(comment)
})

// 자유게시판 댓글 등록
app.post('/articles/:articleId/comments', async (req, res) => {
  const { articleId } = req.params

  const comment = await prisma.articleComment.create({
    data: {
      content: req.body.content,
      articleId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  res.status(201).send(comment)
})

// 중고마켓 댓글 목록 조회
app.get('/products/:productId/comments', async (req, res) => {
  const { productId } = req.params
  const limit = Number(req.query.limit) || 10
  const cursor = req.query.cursor

  const comments = await prisma.productComment.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const nextCursor =
    comments.length === limit ? comments[comments.length - 1].id : null

  res.send({
    list: comments,
    nextCursor,
  })
})

// 자유게시판 댓글 목록 조회
app.get('/articles/:articleId/comments', async (req, res) => {
  const { articleId } = req.params
  const limit = Number(req.query.limit) || 10
  const cursor = req.query.cursor

  const comments = await prisma.articleComment.findMany({
    where: { articleId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const nextCursor =
    comments.length === limit ? comments[comments.length - 1].id : null

  res.send({
    list: comments,
    nextCursor,
  })
})

// 중고마켓 댓글 수정
app.patch('/product-comments/:id', async (req, res) => {
  const comment = await prisma.productComment.update({
    where: { id: req.params.id },
    data: {
      content: req.body.content,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  res.send(comment)
})

// 자유게시판 댓글 수정
app.patch('/article-comments/:id', async (req, res) => {
  const comment = await prisma.articleComment.update({
    where: { id: req.params.id },
    data: {
      content: req.body.content,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  res.send(comment)
})

// 중고마켓 댓글 삭제
app.delete('/product-comments/:id', async (req, res) => {
  await prisma.productComment.delete({
    where: { id: req.params.id },
  })

  res.sendStatus(204)
})

// 자유게시판 댓글 삭제
app.delete('/article-comments/:id', async (req, res) => {
  await prisma.articleComment.delete({
    where: { id: req.params.id },
  })

  res.sendStatus(204)
})



// 에러 처리
app.use((err, req, res, next) => {
  if (
    err.name === 'StructError' ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    res.status(400).send({ message: err.message });
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.sendStatus(404);
  } else {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})