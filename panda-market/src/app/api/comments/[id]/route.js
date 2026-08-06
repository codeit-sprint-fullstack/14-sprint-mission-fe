import prisma from '@/lib/prisma'
import { assert } from 'superstruct'
import { UpdateComment } from '@/validators/commentValidator'

export async function GET(req, { params }) {
  try {
    const { id } = await params

    const comment = await prisma.comment.findUnique({
      where: { id },
    })

    if (!comment) {
      return Response.json(
        {
          message: 'Comment not found.',
          code: 'COMMENT_NOT_FOUND',
        },
        {
          status: 404,
        },
      )
    }

    const responseComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }

    return Response.json(responseComment)
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        message: 'Failed to get comment.',
        code: 'GET_COMMENT_FAILED',
      },
      {
        status: 500,
      },
    )
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()

    assert(body, UpdateComment)

    const targetComment = await prisma.comment.findUnique({
      where: { id },
    })

    if (!targetComment) {
      return Response.json(
        {
          message: 'Comment not found.',
          code: 'COMMENT_NOT_FOUND',
        },
        {
          status: 404,
        },
      )
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: body,
    })

    const responseComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }

    return Response.json({
      message: 'Comment updated successfully.',
      code: 'UPDATE_COMMENT_SUCCESS',
      comment: responseComment,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        message: 'Failed to update comment.',
        code: 'UPDATE_COMMENT_FAILED',
      },
      {
        status: 400,
      },
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params

    const targetComment = await prisma.comment.findUnique({
      where: { id },
    })

    if (!targetComment) {
      return Response.json(
        {
          message: 'Comment not found.',
          code: 'COMMENT_NOT_FOUND',
        },
        {
          status: 404,
        },
      )
    }

    await prisma.comment.delete({
      where: { id },
    })

    return Response.json({
      message: 'Comment deleted successfully.',
      code: 'DELETE_COMMENT_SUCCESS',
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        message: 'Failed to delete comment.',
        code: 'DELETE_COMMENT_FAILED',
      },
      {
        status: 500,
      },
    )
  }
}
