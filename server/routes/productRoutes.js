import express from 'express'
import prisma from '../lib/prisma.js'
import { assert } from 'superstruct'
import { CreateProduct, UpdateProduct } from '../validators/productValidator.js'

const productRoutes = express.Router()

productRoutes.get('/products', async (req, res) => {
  try {
    const keyword = req.query.keyword || ''
    const sort = req.query.sort
    const offset = Number(req.query.offset) || 0
    const pageSize = Number(req.query.pageSize) || 10

    const filter = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {}

    const sortOption =
      sort === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' }

    const totalCount = await prisma.product.count({ where: filter })

    const filteredProducts = await prisma.product.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
      orderBy: sortOption,
      skip: offset,
      take: pageSize,
    })

    const list = filteredProducts
    res.send({ totalCount, list })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Failed to get products.' })
  }
})

productRoutes.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

    const responseProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    }

    res.send(responseProduct)
  } catch (error) {
    res.status(500).send({ message: 'Failed to get product.' })
  }
})

productRoutes.post('/products', async (req, res) => {
  assert(req.body, CreateProduct)
  try {
    const { name, description, price, tags } = req.body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        tags,
      },
    })

    const responseProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
    }

    res.status(201).send(responseProduct)
  } catch (error) {
    res.status(400).send({ message: 'Failed to create product.' })
  }
})

productRoutes.patch('/products/:id', async (req, res) => {
  assert(req.body, UpdateProduct)
  try {
    const id = req.params.id
    const targetProduct = await prisma.product.findUnique({ where: { id } })
    if (!targetProduct) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    })

    // 추후 유저의 개인정보 같은 정보 과다 제공을 미리 막기 위해 명시적으로 설계
    const responseProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }

    res.send(responseProduct)
  } catch (error) {
    res.status(400).send({ message: 'Failed to update product.' })
  }
})

productRoutes.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    const targetProduct = await prisma.product.findUnique({ where: { id } })
    if (!targetProduct) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

    await prisma.product.delete({ where: { id } })

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete product.' })
  }
})

export default productRoutes
