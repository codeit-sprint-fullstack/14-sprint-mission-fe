import { array, integer, object, partial, string, validate } from 'superstruct'

import {
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_ORDER_BY,
  PRODUCT_PRICE_MIN,
  PRODUCT_TAG_MAX_LENGTH,
} from '../../shared/constants/product.js'
import prisma from '../lib/prisma.js'

const MAX_PRODUCT_LIMIT = 50

const productListSelect = {
  id: true,
  name: true,
  price: true,
  createdAt: true,
}

const ProductCreateStruct = object({
  name: string(),
  description: string(),
  price: integer(),
  tags: array(string()),
})

const ProductUpdateStruct = partial(ProductCreateStruct)

const parseProductId = (id) => {
  const productId = Number(id)

  return Number.isInteger(productId) && productId > 0 ? productId : null
}

const normalizeProductBody = (body) => {
  const normalizedBody = { ...body }

  if (typeof normalizedBody.name === 'string') {
    normalizedBody.name = normalizedBody.name.trim()
  }

  if (typeof normalizedBody.description === 'string') {
    normalizedBody.description = normalizedBody.description.trim()
  }

  if (Array.isArray(normalizedBody.tags)) {
    normalizedBody.tags = normalizedBody.tags.map((tag) =>
      typeof tag === 'string' ? tag.trim() : tag,
    )
  }

  return normalizedBody
}

const validateProduct = (body, struct) => {
  const normalizedBody = normalizeProductBody(body)
  const [error, value] = validate(normalizedBody, struct)

  if (error) {
    return {
      value: null,
      message: '입력 값의 형식이 올바르지 않습니다.',
    }
  }

  if (value.name !== undefined) {
    if (!value.name) {
      return { value: null, message: '상품명을 입력해주세요.' }
    }

    if (value.name.length > PRODUCT_NAME_MAX_LENGTH) {
      return {
        value: null,
        message: `상품명은 ${PRODUCT_NAME_MAX_LENGTH}자 이내로 입력해주세요.`,
      }
    }
  }

  if (value.description !== undefined) {
    if (!value.description) {
      return { value: null, message: '상품 소개를 입력해주세요.' }
    }

    if (value.description.length < PRODUCT_DESCRIPTION_MIN_LENGTH) {
      return {
        value: null,
        message: `상품 소개는 ${PRODUCT_DESCRIPTION_MIN_LENGTH}자 이상 입력해주세요.`,
      }
    }

    if (value.description.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
      return {
        value: null,
        message: `상품 소개는 ${PRODUCT_DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`,
      }
    }
  }

  if (value.price !== undefined && value.price < PRODUCT_PRICE_MIN) {
    return {
      value: null,
      message: `판매 가격은 ${PRODUCT_PRICE_MIN}원 이상이어야 합니다.`,
    }
  }

  if (value.tags !== undefined) {
    if (value.tags.length === 0) {
      return { value: null, message: '태그를 1개 이상 입력해주세요.' }
    }

    if (
      value.tags.some(
        (tag) => tag.length < 1 || tag.length > PRODUCT_TAG_MAX_LENGTH,
      )
    ) {
      return {
        value: null,
        message: `태그는 1자 이상 ${PRODUCT_TAG_MAX_LENGTH}자 이내로 입력해주세요.`,
      }
    }
  }

  return { value, message: null }
}

const getProductSearchWhere = (keyword) => {
  const normalizedKeyword = typeof keyword === 'string' ? keyword.trim() : ''

  if (!normalizedKeyword) return {}

  return {
    OR: [
      { name: { contains: normalizedKeyword, mode: 'insensitive' } },
      { description: { contains: normalizedKeyword, mode: 'insensitive' } },
    ],
  }
}

export const getProducts = async (req, res) => {
  try {
    const offset = Number(req.query.offset ?? 0)
    const limit = Number(req.query.limit ?? 10)
    const { keyword, orderBy = PRODUCT_ORDER_BY.RECENT } = req.query

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

    if (orderBy !== PRODUCT_ORDER_BY.RECENT) {
      return res.status(400).json({ message: '정렬 값이 올바르지 않습니다.' })
    }

    const where = getProductSearchWhere(keyword)

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: offset,
        take: limit,
        select: productListSelect,
      }),
      prisma.product.count({ where }),
    ])

    return res.status(200).json({
      list: products,
      totalCount,
    })
  } catch {
    return res.status(500).json({ message: '상품 목록 조회에 실패했습니다.' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { value, message } = validateProduct(req.body, ProductCreateStruct)

    if (message) {
      return res.status(400).json({ message })
    }

    const product = await prisma.product.create({
      data: value,
    })

    return res.status(201).json(product)
  } catch {
    return res.status(500).json({ message: '상품 등록에 실패했습니다.' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const id = parseProductId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '상품 ID가 올바르지 않습니다.' })
    }

    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    return res.status(200).json(product)
  } catch {
    return res.status(500).json({ message: '상품 조회에 실패했습니다.' })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const id = parseProductId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '상품 ID가 올바르지 않습니다.' })
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: '수정할 항목이 없습니다.' })
    }

    const { value, message } = validateProduct(req.body, ProductUpdateStruct)

    if (message) {
      return res.status(400).json({ message })
    }

    const product = await prisma.product.update({
      where: { id },
      data: value,
    })

    return res.status(200).json(product)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '상품 수정에 실패했습니다.' })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const id = parseProductId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '상품 ID가 올바르지 않습니다.' })
    }

    await prisma.product.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '상품 삭제에 실패했습니다.' })
  }
}
