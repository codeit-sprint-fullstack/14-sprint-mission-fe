import 'dotenv/config'
import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { assert } from 'superstruct'
import { CreateProduct, PatchProduct, CreateArticle, PatchArticle, CreateComment, PatchComment } from './structs.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const app = express()
app.use(express.json())

/*********** products ***********/
app.get('/products', async (req, res, next) => {
  try {
    const { offset = 0, limit = 10, sort = 'recent', keyword  = '' } = req.query
    
    let orderBy
    switch (sort) {
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'recent':
      default:
        orderBy = { createdAt: 'desc' }
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit)
    })
    res.send(products)
  } catch (err) {
    next(err)
  }
})

app.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true
      }
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

app.post('/products', async (req, res, next) => {
  try {
    assert(req.body, CreateProduct)

    const product = await prisma.product.create({
      data: req.body
    })
    res.status(201).send(product)
  } catch (err) {
    next(err)
  }
})

app.patch('/products/:id', async (req, res, next) => {
  try {
    assert(req.body, PatchProduct)
    const { id } = req.params

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: req.body.name ?? Prisma.skip,
        description: req.body.description ?? Prisma.skip,
        price: req.body.price ?? Prisma.skip,
        tags: req.body.tags ?? Prisma.skip
      }
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

app.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

/*********** article ***********/
app.get('/articles', async (req, res, next) => {
  try {
    const { limit = 3, offset = 0, sort = 'recent', keyword = '' } = req.query

    let orderBy
    switch (sort) {
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'recent':
      default: 
        orderBy = { createdAt: 'desc' }
    }

    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { content: { contains: keyword, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true
      },
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit)
    })
    res.send(articles)
  } catch (err) {
    next(err)
  }
})

app.get('/articles/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true
      }
    })
    res.send(article)
  } catch (err) {
    next(err)
  }
})

app.post('/articles', async (req, res, next) => {
  try {
    assert(req.body, CreateArticle)
    const article = await prisma.article.create({
      data: req.body
    })
    res.status(201).send(article)
  } catch (err) {
    next(err)
  }
})

app.patch('/articles/:id', async (req, res, next) => {
  try {
    assert(req.body, PatchArticle)
    const { id } = req.params

    const article = await prisma.article.update({
      where: { id },
      data: {
        title: req.body.title ?? Prisma.skip,
        content: req.body.content ?? Prisma.skip
      }
    })
    res.send(article)
  } catch (err) {
    next(err)
  }
})

app.delete('/articles/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.article.delete({
      where: { id }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

/*********** comment ***********/
app.get('/products/:id/comments', async (req, res, next) => {
  try {
    const { id: productId } = req.params
    const { limit = 3, cursor } = req.query

    const productComments = await prisma.comment.findMany({
      where: { productId },
      select: {
        id: true,
        content: true,
        createdAt: true
      },
      take: parseInt(limit),
      skip: cursor? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' }
    })
    res.send(productComments)
  } catch (err) {
    next(err)
  }
})

app.get('/articles/:id/comments', async (req, res, next) => {
  try {
    const { id: articleId } = req.params
    const { limit = 3, cursor } = req.query

    const articleComments = await prisma.comment.findMany({
      where: { articleId },
      select: {
        id: true,
        content: true,
        createdAt: true
      },
      take: parseInt(limit),
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' }
    })
    res.send(articleComments)
  } catch (err) {
    next(err)
  }
})

app.post('/products/:id/comments', async (req, res, next) => {
  try {
    assert(req.body, CreateComment)
    const { id: productId } = req.params

    const productComment = await prisma.comment.create({
      data: {
        content: req.body.content,
        product: { connect: { id: productId } }
      }
    })
    res.status(201).send(productComment)
  } catch (err) {
    next(err)
  }
})

app.post('/articles/:id/comments', async (req, res, next) => {
  try {
    assert(req.body, CreateComment)
    const { id: articleId } = req.params

    const articleComment = await prisma.comment.create({
      data: {
        content: req.body.content,
        article: { connect: { id: articleId } }
      }
    })
    res.status(201).send(articleComment)
  } catch (err) {
    next(err)
  }
})

app.patch('/comments/:id', async (req, res, next) => {
  try {
    assert(req.body, PatchComment)
    const { id } = req.params

    const comment = await prisma.comment.update({
      where: { id },
      data: {
        content: req.body.content
      }
    })
    res.send(comment)
  } catch (err) {
    next(err)
  }
})

app.delete('/comments/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.comment.delete({
      where: { id }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (
    err.name === 'StructError' || 
    err instanceof Prisma.PrismaClientValidationError
  ) {
    res.status(400).send({ message: err.message })
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.status(404).send({ message: 'Cannot find given id.' })
  } else {
    console.error(err)
    res.status(500).send({ message: err.message })
  }
})

app.listen(3000, () => console.log('Server Started!'))