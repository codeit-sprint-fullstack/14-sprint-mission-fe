import express from 'express'
import prisma from '../lib/prisma.js'
import { assert } from 'superstruct'
import { CreateComment, UpdateComment } from '../validators/commentValidator.js'
import {
  getCommentList,
  createCommentData,
} from '../services/commentService.js'

const commentRoutes = express.Router()

commentRoutes.get('/products/:productId/comments', async (req, res) => {
  try {
    const { productId } = req.params
    const { cursor, limit } = req.query
    const take = Number(limit) || 10
    const result = await getCommentList({
      where: { productId },
      cursor,
      take,
    })

    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get comments.',
      code: 'GET_COMMENTS_FAILED',
    })
  }
})

commentRoutes.get('/articles/:articleId/comments', async (req, res) => {
  try {
    const { articleId } = req.params
    const { cursor, limit } = req.query
    const take = Number(limit) || 10
    const result = await getCommentList({
      where: { articleId },
      cursor,
      take,
    })

    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get comments.',
      code: 'GET_COMMENTS_FAILED',
    })
  }
})

commentRoutes.get('/comments/:id', async (req, res) => {
  const { id } = req.params
  try {
    const comment = await prisma.comment.findUnique({ where: { id } })
    if (!comment) {
      res.status(404).json({
        message: 'Comment not found.',
        code: 'COMMENT_NOT_FOUND',
      })
      return
    }

    const responseComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }

    res.json(responseComment)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get comment.',
      code: 'GET_COMMENT_FAILED',
    })
  }
})

commentRoutes.post('/products/:productId/comments', async (req, res) => {
  assert(req.body, CreateComment)
  try {
    const { productId } = req.params
    const { content } = req.body
    const responseComment = await createCommentData({
      parentKey: 'productId',
      parentId: productId,
      content,
    })

    res.status(201).json({
      message: 'Comment created successfully.',
      code: 'CREATE_COMMENT_SUCCESS',
      comment: responseComment,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create comment.',
      code: 'CREATE_COMMENT_FAILED',
    })
  }
})

commentRoutes.post('/articles/:articleId/comments', async (req, res) => {
  assert(req.body, CreateComment)
  try {
    const { articleId } = req.params
    const { content } = req.body
    const responseComment = await createCommentData({
      parentKey: 'articleId',
      parentId: articleId,
      content,
    })

    res.status(201).json({
      message: 'Comment created successfully.',
      code: 'CREATE_COMMENT_SUCCESS',
      comment: responseComment,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Failed to create comment.',
      code: 'CREATE_COMMENT_FAILED',
    })
  }
})

commentRoutes.patch('/comments/:id', async (req, res) => {
  assert(req.body, UpdateComment)
  try {
    const { id } = req.params
    const targetComment = await prisma.comment.findUnique({ where: { id } })
    if (!targetComment) {
      res.status(404).json({
        message: 'Comment not found.',
        code: 'COMMENT_NOT_FOUND',
      })
      return
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: req.body,
    })

    const responseComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }

    res.json({
      message: 'Comment updated successfully.',
      code: 'UPDATE_COMMENT_SUCCESS',
      comment: responseComment,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update comment.',
      code: 'UPDATE_COMMENT_FAILED',
    })
  }
})

commentRoutes.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params
    const targetComment = await prisma.comment.findUnique({ where: { id } })
    if (!targetComment) {
      res.status(404).json({
        message: 'Comment not found.',
        code: 'COMMENT_NOT_FOUND',
      })
      return
    }

    await prisma.comment.delete({ where: { id } })

    res.status(200).json({
      message: 'Comment deleted successfully.',
      code: 'DELETE_COMMENT_SUCCESS',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete comment.',
      code: 'DELETE_COMMENT_FAILED',
    })
  }
})

export default commentRoutes
