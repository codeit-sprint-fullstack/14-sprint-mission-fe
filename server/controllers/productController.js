import mongoose from 'mongoose'

import Product from '../models/Product.js'

const formatProduct = (product) => ({
  id: product._id.toString(),
  name: product.name,
  description: product.description,
  price: product.price,
  tags: product.tags,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
})

const formatProductSummary = (product) => ({
  id: product._id.toString(),
  name: product.name,
  price: product.price,
  createdAt: product.createdAt,
})

const isBlank = (value) => typeof value !== 'string' || value.trim() === ''

const isInvalidObjectId = (id) => !mongoose.isValidObjectId(id)

const isMissing = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '')

const validateCreateProduct = ({ name, description, price, tags }) => {
  if (isBlank(name)) return 'name is required'
  if (isBlank(description)) return 'description is required'

  if (isMissing(price)) return 'price is required'

  const numericPrice = Number(price)

  if (!Number.isFinite(numericPrice)) {
    return 'price must be a number'
  }

  if (numericPrice < 0) {
    return 'price must be greater than or equal to 0'
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    return 'tags must be an array'
  }

  return null
}

const validateUpdateProduct = ({ name, description, price, tags }) => {
  if (name !== undefined && isBlank(name)) {
    return 'name cannot be empty'
  }

  if (description !== undefined && isBlank(description)) {
    return 'description cannot be empty'
  }

  if (price !== undefined) {
    if (isMissing(price)) return 'price cannot be empty'

    const numericPrice = Number(price)

    if (!Number.isFinite(numericPrice)) {
      return 'price must be a number'
    }

    if (numericPrice < 0) {
      return 'price must be greater than or equal to 0'
    }
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    return 'tags must be an array'
  }

  return null
}

export const getProducts = async (req, res) => {
  try {
    const offset = Number(req.query.offset ?? 0)
    const limit = Number(req.query.limit ?? 10)
    const { keyword, orderBy = 'recent' } = req.query

    if (
      Number.isNaN(offset) ||
      Number.isNaN(limit) ||
      offset < 0 ||
      limit < 1
    ) {
      return res.status(400).json({ message: 'Invalid pagination query' })
    }

    if (orderBy !== 'recent') {
      return res.status(400).json({ message: 'Invalid orderBy query' })
    }

    const filter = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {}

    const [products, totalCount] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(offset).limit(limit),
      Product.countDocuments(filter),
    ])

    return res.status(200).json({
      list: products.map(formatProductSummary),
      totalCount,
    })
  } catch {
    return res.status(500).json({ message: 'Failed to get products' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, tags = [] } = req.body
    const validationMessage = validateCreateProduct({
      name,
      description,
      price,
      tags,
    })

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage })
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      tags,
    })

    return res.status(201).json(formatProduct(product))
  } catch {
    return res.status(500).json({ message: 'Failed to create product' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    if (isInvalidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product id' })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).json(formatProduct(product))
  } catch {
    return res.status(500).json({ message: 'Failed to get product' })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    if (isInvalidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product id' })
    }

    const validationMessage = validateUpdateProduct(req.body)

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage })
    }

    const updateData = {}

    if (req.body.name !== undefined) {
      updateData.name = req.body.name
    }

    if (req.body.description !== undefined) {
      updateData.description = req.body.description
    }

    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price)
    }

    if (req.body.tags !== undefined) {
      updateData.tags = req.body.tags
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields to update' })
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: 'after',
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).json(formatProduct(product))
  } catch {
    return res.status(500).json({ message: 'Failed to update product' })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    if (isInvalidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product id' })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: 'Failed to delete product' })
  }
}
