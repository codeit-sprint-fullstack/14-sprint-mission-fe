import express from 'express'
import prisma from '../lib/prisma.js'
import { assert } from 'superstruct'
import { CreateProduct, UpdateProduct } from '../validators/productValidator.js'

const productRoutes = express.Router()

productRoutes.get('/products', async (req, res) => {
  try {
    const { keyword = '', sort, offset, pageSize } = req.query
    const skip = Number(offset) || 0
    const take = Number(pageSize) || 10

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
      skip,
      take,
    })

    const list = filteredProducts
    res.json({ totalCount, list })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get products.',
      code: 'GET_PRODUCTS_FAILED',
    })
  }
})

productRoutes.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) {
      res.status(404).json({
        message: 'Product not found.',
        code: 'PRODUCT_NOT_FOUND',
      })
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

    res.json(responseProduct)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get product.',
      code: 'GET_PRODUCT_FAILED',
    })
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

    res.status(201).json({
      message: 'Product created successfully.',
      code: 'CREATE_PRODUCT_SUCCESS',
      product: responseProduct,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create product.',
      code: 'CREATE_PRODUCT_FAILED',
    })
  }
})

productRoutes.patch('/products/:id', async (req, res) => {
  assert(req.body, UpdateProduct)
  try {
    const { id } = req.params
    const targetProduct = await prisma.product.findUnique({ where: { id } })
    if (!targetProduct) {
      res.status(404).json({
        message: 'Product not found.',
        code: 'PRODUCT_NOT_FOUND',
      })
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

    res.json({
      message: 'Product updated successfully.',
      code: 'UPDATE_PRODUCT_SUCCESS',
      product: responseProduct,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update product.',
      code: 'UPDATE_PRODUCT_FAILED',
    })
  }
})

productRoutes.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const targetProduct = await prisma.product.findUnique({ where: { id } })
    if (!targetProduct) {
      res.status(404).json({
        message: 'Product not found.',
        code: 'PRODUCT_NOT_FOUND',
      })
      return
    }

    await prisma.product.delete({ where: { id } })

    res.status(200).json({
      message: 'Product deleted successfully.',
      code: 'DELETE_PRODUCT_SUCCESS',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete product.',
      code: 'DELETE_PRODUCT_FAILED',
    })
  }
})

export default productRoutes
