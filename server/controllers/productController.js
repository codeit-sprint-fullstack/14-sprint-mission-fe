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

const isBlank = (value) => typeof value !== 'string' || value.trim() === ''

const validateCreateProduct = ({ name, description, price, tags }) => {
  if (isBlank(name)) {
    return 'name is required'
  }

  if (isBlank(description)) {
    return 'description is required'
  }

  if (price === undefined || price === null || price === '') {
    return 'price is required'
  }

  if (Number.isNaN(Number(price))) {
    return 'price must be a number'
  }

  if (Number(price) < 0) {
    return 'price must be greater than or equal to 0'
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    return 'tags must be an array'
  }

  return null
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

    if (!mongoose.isValidObjectId(id)) {
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
