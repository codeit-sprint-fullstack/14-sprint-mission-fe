import { object, string, validate } from 'superstruct'

import prisma from '../lib/prisma.js'
import {
  getCursorPagination,
  isPrismaForeignKeyError,
  isPrismaNotFoundError,
  parsePositiveInt,
} from '../utils/request.js'

const MAX_COMMENT_LIMIT = 50

const commentListSelect = {
  id: true,
  content: true,
  createdAt: true,
}

const CommentStruct = object({
  content: string(),
})

const normalizeCommentBody = (body) => {
  const normalizedBody = { ...body }

  if (typeof normalizedBody.content === 'string') {
    normalizedBody.content = normalizedBody.content.trim()
  }

  return normalizedBody
}

const validateComment = (body) => {
  const normalizedBody = normalizeCommentBody(body)
  const [error, value] = validate(normalizedBody, CommentStruct)

  if (error) {
    return {
      value: null,
      message: '입력 값의 형식이 올바르지 않습니다.',
    }
  }

  if (!value.content) {
    return { value: null, message: '댓글 내용을 입력해주세요.' }
  }

  return { value, message: null }
}

export const getArticleComments = async (req, res) => {
  try {
    const articleId = parsePositiveInt(req.params.articleId)

    if (!articleId) {
      return res.status(400).json({ message: '게시글 ID가 올바르지 않습니다.' })
    }

    const {
      limit,
      cursor,
      error: paginationError,
    } = getCursorPagination(req.query, { maxLimit: MAX_COMMENT_LIMIT })

    if (paginationError) {
      return res
        .status(400)
        .json({ message: '페이지네이션 값이 올바르지 않습니다.' })
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    })

    if (!article) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    }

    const comments = await prisma.articleComment.findMany({
      where: { articleId },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: commentListSelect,
    })

    const hasNext = comments.length > limit
    const list = hasNext ? comments.slice(0, limit) : comments

    return res.status(200).json({
      list,
      nextCursor: hasNext ? list.at(-1).id : null,
    })
  } catch {
    return res.status(500).json({ message: '댓글 목록 조회에 실패했습니다.' })
  }
}

export const createArticleComment = async (req, res) => {
  try {
    const articleId = parsePositiveInt(req.params.articleId)

    if (!articleId) {
      return res.status(400).json({ message: '게시글 ID가 올바르지 않습니다.' })
    }

    const { value, message } = validateComment(req.body)

    if (message) {
      return res.status(400).json({ message })
    }

    const comment = await prisma.articleComment.create({
      data: {
        ...value,
        articleId,
      },
    })

    return res.status(201).json(comment)
  } catch (error) {
    if (isPrismaForeignKeyError(error)) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '댓글 등록에 실패했습니다.' })
  }
}

export const updateArticleComment = async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '댓글 ID가 올바르지 않습니다.' })
    }

    const { value, message } = validateComment(req.body)

    if (message) {
      return res.status(400).json({ message })
    }

    const comment = await prisma.articleComment.update({
      where: { id },
      data: value,
    })

    return res.status(200).json(comment)
  } catch (error) {
    if (isPrismaNotFoundError(error)) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '댓글 수정에 실패했습니다.' })
  }
}

export const deleteArticleComment = async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id)

    if (!id) {
      return res.status(400).json({ message: '댓글 ID가 올바르지 않습니다.' })
    }

    await prisma.articleComment.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error) {
    if (isPrismaNotFoundError(error)) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
    }

    return res.status(500).json({ message: '댓글 삭제에 실패했습니다.' })
  }
}
