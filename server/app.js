import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import prismaPackage from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const { PrismaClient, Prisma } = prismaPackage

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors())
app.use(express.json())

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequestError'
  }
}

function validateProductCreateInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new BadRequestError('Request body must be an object.')
  }

  const name = input.name
  const description = input.description
  const price = input.price
  const tags = input.tags

  if (typeof name !== 'string' || name.trim() === '') {
    throw new BadRequestError('name is required and must be a non-empty string.')
  }

  if (typeof description !== 'string' || description.trim() === '') {
    throw new BadRequestError(
      'description is required and must be a non-empty string.',
    )
  }

  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    throw new BadRequestError('price is required and must be a non-negative number.')
  }

  if (
    !Array.isArray(tags) ||
    tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')
  ) {
    throw new BadRequestError('tags is required and must be an array of strings.')
  }

  return {
    name: name.trim(),
    description: description.trim(),
    price,
    tags: tags.map((tag) => tag.trim()),
  }
}

function validateRequestBody(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new BadRequestError('Request body must be an object.')
  }
}

function validateNonEmptyString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new BadRequestError(
      `${fieldName} is required and must be a non-empty string.`,
    )
  }

  return value.trim()
}

function validateArticleCreateInput(input) {
  validateRequestBody(input)

  return {
    title: validateNonEmptyString(input.title, 'title'),
    content: validateNonEmptyString(input.content, 'content'),
  }
}

function validateArticleUpdateInput(input) {
  validateRequestBody(input)
  const data = {}

  if (Object.hasOwn(input, 'title')) {
    data.title = validateNonEmptyString(input.title, 'title')
  }

  if (Object.hasOwn(input, 'content')) {
    data.content = validateNonEmptyString(input.content, 'content')
  }

  if (Object.keys(data).length === 0) {
    throw new BadRequestError('At least one of title or content is required.')
  }

  return data
}

function validateProductUpdateInput(input) {
  validateRequestBody(input)
  const data = {}

  if (Object.hasOwn(input, 'name')) {
    data.name = validateNonEmptyString(input.name, 'name')
  }

  if (Object.hasOwn(input, 'description')) {
    data.description = validateNonEmptyString(input.description, 'description')
  }

  if (Object.hasOwn(input, 'price')) {
    if (
      typeof input.price !== 'number' ||
      !Number.isFinite(input.price) ||
      input.price < 0
    ) {
      throw new BadRequestError('price must be a non-negative number.')
    }
    data.price = input.price
  }

  if (Object.hasOwn(input, 'tags')) {
    if (
      !Array.isArray(input.tags) ||
      input.tags.some(
        (tag) => typeof tag !== 'string' || tag.trim() === '',
      )
    ) {
      throw new BadRequestError('tags must be an array of strings.')
    }
    data.tags = input.tags.map((tag) => tag.trim())
  }

  if (Object.keys(data).length === 0) {
    throw new BadRequestError(
      'At least one of name, description, price or tags is required.',
    )
  }

  return data
}

function validateCommentInput(input) {
  validateRequestBody(input)
  return {
    content: validateNonEmptyString(input.content, 'content'),
  }
}

app.get('/', (req, res) => {
  res.send('Panda Market API Server')
})

// 상품 등록
app.post('/products', async (req, res) => {
  const data = validateProductCreateInput(req.body)
  const product = await prisma.product.create({
    data,
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
  const data = validateProductUpdateInput(req.body)
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data,
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
  const data = validateArticleCreateInput(req.body)
  const article = await prisma.article.create({
    data,
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
      title: { contains: keyword, mode: 'insensitive' },
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
  const data = validateArticleUpdateInput(req.body)
  const article = await prisma.article.update({
    where: { id: req.params.id },
    data,
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
  const data = validateCommentInput(req.body)

  const comment = await prisma.productComment.create({
    data: {
      content: data.content,
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
  const data = validateCommentInput(req.body)

  const comment = await prisma.articleComment.create({
    data: {
      content: data.content,
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
  const data = validateCommentInput(req.body)
  const comment = await prisma.productComment.update({
    where: { id: req.params.id },
    data,
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
  const data = validateCommentInput(req.body)
  const comment = await prisma.articleComment.update({
    where: { id: req.params.id },
    data,
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
  if (err instanceof BadRequestError) {
    res.status(400).send({ message: err.message })
  } else if (
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
