import mongoose from 'mongoose'

import Product from '../models/Product.js'

const MAX_PRODUCT_LIMIT = 50

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

const getValidationErrorMessage = (error) => {
  if (error.name !== 'ValidationError') return null

  return Object.values(error.errors)
    .map((fieldError) => fieldError.message)
    .join(' ')
}

const isBlank = (value) => typeof value !== 'string' || value.trim() === ''

const isInvalidObjectId = (id) => !mongoose.isValidObjectId(id)

const isMissing = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '')

const hasInvalidTagType = (tags) => tags.some((tag) => typeof tag !== 'string')

const validateCreateProduct = ({ name, description, price, tags }) => {
  if (isBlank(name)) return '상품명을 입력해주세요.'
  if (isBlank(description)) return '상품 소개를 입력해주세요.'

  if (isMissing(price)) return '판매 가격을 입력해주세요.'

  const numericPrice = Number(price)

  if (!Number.isFinite(numericPrice)) {
    return '판매 가격은 숫자로 입력해주세요.'
  }

  if (numericPrice < 0) {
    return '판매 가격은 0원 이상이어야 합니다.'
  }

  if (!Array.isArray(tags)) {
    return '태그 형식이 올바르지 않습니다.'
  }

  if (hasInvalidTagType(tags)) {
    return '태그 형식이 올바르지 않습니다.'
  }

  if (tags.length === 0) {
    return '태그를 1개 이상 입력해주세요.'
  }

  return null
}

const validateUpdateProduct = ({ name, description, price, tags }) => {
  if (name !== undefined && isBlank(name)) {
    return '상품명을 입력해주세요.'
  }

  if (description !== undefined && isBlank(description)) {
    return '상품 소개를 입력해주세요.'
  }

  if (price !== undefined) {
    if (isMissing(price)) return '판매 가격을 입력해주세요.'

    const numericPrice = Number(price)

    if (!Number.isFinite(numericPrice)) {
      return '판매 가격은 숫자로 입력해주세요.'
    }

    if (numericPrice < 0) {
      return '판매 가격은 0원 이상이어야 합니다.'
    }
  }

  if (tags !== undefined) {
    if (!Array.isArray(tags)) return '태그 형식이 올바르지 않습니다.'
    if (hasInvalidTagType(tags)) return '태그 형식이 올바르지 않습니다.'
    if (tags.length === 0) return '태그를 1개 이상 입력해주세요.'
  }

  return null
}

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

    const validationMessage = validateUpdateProduct(req.body)

    if (validationMessage) {
      return res.status(400).json({ message: validationMessage })
    }

    const updateData = {}

    if (req.body.tags !== undefined) {
      updateData.tags = req.body.tags
    }

    if (req.body.name !== undefined) {
      updateData.name = req.body.name
    }

    if (req.body.description !== undefined) {
      updateData.description = req.body.description
    }

    if (req.body.price !== undefined) {
      updateData.price = Number(req.body.price)
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
