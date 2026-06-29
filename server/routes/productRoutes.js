import express from 'express'
import Product from '../models/Product.js'

const productRoutes = express.Router()

productRoutes.get('/products', async (req, res) => {
  try {
    const keyword = req.query.keyword || ''
    const sort = req.query.sort
    const offset = Number(req.query.offset) || 0
    const pageSize = Number(req.query.pageSize) || 10

    // 조건 흐름을 눈으로 보기 위해 if/else로 작성, 추후 리펙토링 예정
    const filter = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {}

    const sortOption = sort === 'recent' ? { createdAt: -1 } : { createdAt: 1 }

    const totalCount = await Product.countDocuments(filter)

    const filteredProducts = await Product.find(filter)
      .select('name price createdAt')
      .sort(sortOption)
      .skip(offset)
      .limit(pageSize)

    const list = filteredProducts
    res.send({ totalCount, list })
  } catch (error) {
    res.status(500).send({ message: 'Failed to get products.' })
  }
})

productRoutes.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)

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
  try {
    const { name, description, price, tags } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      tags,
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
  try {
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

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
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      res.status(404).send({ message: 'Cannot find given id.' })
      return
    }

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete product.' })
  }
})

export default productRoutes
