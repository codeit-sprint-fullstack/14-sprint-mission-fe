import mongoose from 'mongoose'

import Product from '../models/Product.js'

const MAX_PRODUCT_LIMIT = 50

const UPDATABLE_FIELDS = ['name', 'description', 'price', 'tags']

const CAST_ERROR_MESSAGES = {
  price: '판매 가격은 숫자로 입력해주세요.',
  tags: '태그 형식이 올바르지 않습니다.',
}

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

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getCastErrorMessage = (error) => {
  const rootPath = error.path?.split('.')[0]

  return CAST_ERROR_MESSAGES[rootPath] ?? '입력 값의 형식이 올바르지 않습니다.'
}

const getValidationErrorMessage = (error) => {
  if (error.name === 'CastError') return getCastErrorMessage(error)
  if (error.name !== 'ValidationError') return null

  return Object.values(error.errors)
    .map((fieldError) =>
      fieldError.name === 'CastError'
        ? getCastErrorMessage(fieldError)
        : fieldError.message,
    )
    .join(' ')
}

const isInvalidObjectId = (id) => !mongoose.isValidObjectId(id)

export const getProducts = async (req, res) => {
  try {
    const offset = Number(req.query.offset ?? 0)
    const limit = Number(req.query.limit ?? 10)
    const { keyword, orderBy = 'recent' } = req.query

    if (
      !Number.isInteger(offset) ||
      !Number.isInteger(limit) ||
      offset < 0 ||
      limit < 1 ||
      limit > MAX_PRODUCT_LIMIT
    ) {
      return res
        .status(400)
        .json({ message: '페이지네이션 값이 올바르지 않습니다.' })
    }

    if (orderBy !== 'recent') {
      return res.status(400).json({ message: '정렬 값이 올바르지 않습니다.' })
    }

    const normalizedKeyword = typeof keyword === 'string' ? keyword.trim() : ''
    const escapedKeyword = escapeRegex(normalizedKeyword)

    const filter = escapedKeyword
      ? {
          $or: [
            { name: { $regex: escapedKeyword, $options: 'i' } },
            { description: { $regex: escapedKeyword, $options: 'i' } },
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
    return res.status(500).json({ message: '상품 목록 조회에 실패했습니다.' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, tags } = req.body

    const product = await Product.create({
      name,
      description,
      price: price === '' ? undefined : price,
      tags,
    })

    return res.status(201).json(formatProduct(product))
  } catch (error) {
    const validationMessage = getValidationErrorMessage(error)

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage })
    }
    return res.status(500).json({ message: '상품 등록에 실패했습니다.' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    if (isInvalidObjectId(id)) {
      return res.status(400).json({ message: '상품 ID가 올바르지 않습니다.' })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    return res.status(200).json(formatProduct(product))
  } catch {
    return res.status(500).json({ message: '상품 조회에 실패했습니다.' })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    if (isInvalidObjectId(id)) {
      return res.status(400).json({ message: '상품 ID가 올바르지 않습니다.' })
    }

    const updateData = {}

    for (const field of UPDATABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: '수정할 항목이 없습니다.' })
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: 'after',
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    return res.status(200).json(formatProduct(product))
  } catch (error) {
    const validationMessage = getValidationErrorMessage(error)

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage })
    }

    return res.status(500).json({ message: '상품 수정에 실패했습니다.' })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    if (isInvalidObjectId(id)) {
      return res.status(400).json({ message: '상품 ID가 올바르지 않습니다.' })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: '상품 삭제에 실패했습니다.' })
  }
}
