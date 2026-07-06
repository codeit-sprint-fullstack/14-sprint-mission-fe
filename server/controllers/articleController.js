import { object, partial, string, validate } from 'superstruct'

import { ARTICLE_ORDER_BY } from '../../shared/constants/article.js'
import prisma from '../lib/prisma.js'

const MAX_ARTICLE_LIMIT = 50

const articleListSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
}

const ArticleCreateStruct = object({
  title: string(),
  content: string(),
})

const ArticleUpdateStruct = partial(ArticleCreateStruct)

const parseArticleId = (id) => {
  const articleId = Number(id)

  return Number.isInteger(articleId) && articleId > 0 ? articleId : null
}

const normalizeArticleBody = (body) => {
  const normalizedBody = { ...body }

  if (typeof normalizedBody.title === 'string') {
    normalizedBody.title = normalizedBody.title.trim()
  }

  if (typeof normalizedBody.content === 'string') {
    normalizedBody.content = normalizedBody.content.trim()
  }

  return normalizedBody
}

const validateArticle = (body, struct) => {
  const normalizedBody = normalizeArticleBody(body)
  const [error, value] = validate(normalizedBody, struct)

  if (error) {
    return {
      value: null,
      message: '입력 값의 형식이 올바르지 않습니다.',
    }
  }

  if (value.title !== undefined && !value.title) {
    return { value: null, message: '제목을 입력해주세요.' }
  }

  if (value.content !== undefined && !value.content) {
    return { value: null, message: '내용을 입력해주세요.' }
  }

  return { value, message: null }
}

const getArticleSearchWhere = (keyword) => {
  const normalizedKeyword = typeof keyword === 'string' ? keyword.trim() : ''

  if (!normalizedKeyword) return {}

  return {
    OR: [
      { title: { contains: normalizedKeyword, mode: 'insensitive' } },
      { content: { contains: normalizedKeyword, mode: 'insensitive' } },
    ],
  }
}

export const getArticles = async (req, res) => {
  try {
    const offset = Number(req.query.offset ?? 0)
    const limit = Number(req.query.limit ?? 10)
    const { keyword, orderBy = ARTICLE_ORDER_BY.RECENT } = req.query

    if (
      !Number.isInteger(offset) ||
      !Number.isInteger(limit) ||
      offset < 0 ||
      limit < 1 ||
      limit > MAX_ARTICLE_LIMIT
    ) {
      return res
        .status(400)
        .json({ message: '페이지네이션 값이 올바르지 않습니다.' })
    }

    if (orderBy !== ARTICLE_ORDER_BY.RECENT) {
      return res.status(400).json({ message: '정렬 값이 올바르지 않습니다.' })
    }

    const where = getArticleSearchWhere(keyword)

    const [articles, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: offset,
        take: limit,
        select: articleListSelect,
      }),
      prisma.article.count({ where }),
    ])

    return res.status(200).json({
      list: articles,
      totalCount,
    })
  } catch {
    return res.status(500).json({ message: '게시글 목록 조회에 실패했습니다.' })
  }
}

export const createArticle = async (req, res) => {
  try {
    const { value, message } = validateArticle(req.body, ArticleCreateStruct)

    if (message) {
      return res.status(400).json({ message })
    }

    const article = await prisma.article.create({
      data: value,
    })

    return res.status(201).json(article)
  } catch {
    return res.status(500).json({ message: '게시글 등록에 실패했습니다.' })
  }
}

export const getArticleById = async (req, res) => {
  try {
    const id = parseArticleId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '게시글 ID가 올바르지 않습니다.' })
    }

    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    }

    return res.status(200).json(article)
  } catch {
    return res.status(500).json({ message: '게시글 조회에 실패했습니다.' })
  }
}

export const updateArticle = async (req, res) => {
  try {
    const id = parseArticleId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '게시글 ID가 올바르지 않습니다.' })
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: '수정할 항목이 없습니다.' })
    }

    const { value, message } = validateArticle(req.body, ArticleUpdateStruct)

    if (message) {
      return res.status(400).json({ message })
    }

    const article = await prisma.article.update({
      where: { id },
      data: value,
    })

    return res.status(200).json(article)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '게시글 수정에 실패했습니다.' })
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const id = parseArticleId(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '게시글 ID가 올바르지 않습니다.' })
    }

    await prisma.article.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '게시글 삭제에 실패했습니다.' })
  }
}
