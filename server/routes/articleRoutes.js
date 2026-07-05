import express from 'express'
import prisma from '../lib/prisma.js'
import { assert } from 'superstruct'
import { CreateArticle, UpdateArticle } from '../validators/articleValidator.js'

const articleRoutes = express.Router()

articleRoutes.get('/articles', async (req, res) => {
  try {
    const { keyword = '', sort, offset, pageSize } = req.query
    const skip = Number(offset) || 0
    const take = Number(pageSize) || 10

    const filter = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: 'insensitive' } },
            { content: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {}

    const sortOption =
      sort === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' }

    const totalCount = await prisma.article.count({ where: filter })

    const filteredArticles = await prisma.article.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
      orderBy: sortOption,
      skip,
      take,
    })

    const list = filteredArticles
    res.send({ totalCount, list })
  } catch (error) {
    res.status(500).send({ message: 'Failed to get articles' })
  }
})

articleRoutes.get('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params
    const article = await prisma.article.findUnique({ where: { id } })

    if (!article) {
      res.status(404).send({ message: 'cannot find given id.' })
      return
    }

    const responseArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
    }

    res.send(responseArticle)
  } catch (error) {
    res.status(500).send({ message: 'Failed to get article' })
  }
})

articleRoutes.post('/articles', async (req, res) => {
  assert(req.body, CreateArticle)
  try {
    const { title, content } = req.body

    const article = await prisma.article.create({
      data: {
        title,
        content,
      },
    })

    const responseArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
    }

    res.status(201).send(responseArticle)
  } catch (error) {
    res.status(400).send({ message: 'Failed to create article.' })
  }
})

articleRoutes.patch('/articles/:id', async (req, res) => {
  assert(req.body, UpdateArticle)
  try {
    const { id } = req.params
    const targetArticle = await prisma.article.findUnique({ where: { id } })
    if (!targetArticle) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    })

    const responseArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }

    res.send(responseArticle)
  } catch (error) {
    res.status(400).send({ message: 'Failed to update article.' })
  }
})

articleRoutes.delete('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params
    const targetArticle = await prisma.article.findUnique({ where: { id } })
    if (!targetArticle) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

    await prisma.article.delete({ where: { id } })

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete article.' })
  }
})

export default articleRoutes
