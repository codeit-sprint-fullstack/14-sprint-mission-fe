import 'dotenv/config'
import express from 'express'

import productRoutes from './routes/productRoutes.js'
import articleRoutes from './routes/articleRoutes.js'

import errorHandler from './middlewares/errorHandler.js'

const app = express()
app.use(express.json())

app.use('/products', productRoutes)
app.use('/articles', articleRoutes)

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

app.use(errorHandler)

app.listen(3000, () => console.log('Server Started!'))