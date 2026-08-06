import prisma from '@/lib/prisma'
import { assert } from 'superstruct'
import { CreateComment } from '@/validators/commentValidator'

export async function GET(req, { params }) {
  try {
    const { id: articleId } = await params
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')
    const limit = searchParams.get('limit')
    const take = Number(limit) || 10

    const comments = await prisma.comment.findMany({
      where: { articleId },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      take: take + 1,
    })

    const hasNextPage = comments.length > take
    const list = hasNextPage ? comments.slice(0, take) : comments
    const nextCursor = hasNextPage ? list[list.length - 1].id : null

    return Response.json({
      list,
      nextCursor,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        message: 'Failed to get comments.',
        code: 'GET_COMMENTS_FAILED',
      },
      {
        status: 500,
      },
    )
  }
}

export async function POST(req, { params }) {
  try {
    const { id: articleId } = await params
    const body = await req.json()

    assert(body, CreateComment)

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
      },
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

    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        articleId,
      },
    })

    const responseComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
    }

    return Response.json(
      {
        message: 'Comment created successfully.',
        code: 'CREATE_COMMENT_SUCCESS',
        comment: responseComment,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        message: 'Failed to create comment.',
        code: 'CREATE_COMMENT_FAILED',
      },
      {
        status: 400,
      },
    )
  }
}
