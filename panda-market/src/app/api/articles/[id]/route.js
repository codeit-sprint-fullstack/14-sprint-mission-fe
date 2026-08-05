import prisma from '@/lib/prisma'
import { assert } from 'superstruct'
import { UpdateArticle } from '@/validators/articleValidator'

export async function GET(req, { params }) {
  try {
    const { id } = await params

    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return Response.json(
        {
          message: 'Article not found.',
          code: 'ARTICLE_NOT_FOUND',
        },
        {
          status: 404,
        },
      )
    }

    const responseArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }

    return Response.json(responseArticle)
  } catch (error) {
    return Response.json(
      {
        message: 'Failed to get article.',
        code: 'GET_ARTICLE_FAILED',
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

    assert(body, UpdateArticle)

    const targetArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!targetArticle) {
      return Response.json(
        {
          message: 'Article not found.',
          code: 'ARTICLE_NOT_FOUND',
        },
        {
          status: 404,
        },
      )
    }

    const article = await prisma.article.update({
      where: { id },
      data: body,
    })

    const responseArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }

    return Response.json({
      message: 'Article updated successfully.',
      code: 'UPDATE_ARTICLE_SUCCESS',
      article: responseArticle,
    })
  } catch (error) {
    return Response.json(
      {
        message: 'Failed to update article.',
        code: 'UPDATE_ARTICLE_FAILED',
      },
      {
        status: 400,
      },
    )
  }
}
