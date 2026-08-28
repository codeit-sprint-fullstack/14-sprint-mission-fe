import prisma from '@/lib/prisma'
import { parseBoundedInteger, PaginationQueryError } from '@/lib/pagination'
import { assert } from 'superstruct'
import { CreateArticle } from '@/validators/articleValidator'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const keyword = searchParams.get('keyword') ?? ''
    const sort = searchParams.get('sort')
    const offset = searchParams.get('offset')
    const pageSize = searchParams.get('pageSize')

    const skip = parseBoundedInteger(offset, {
      defaultValue: 0,
      min: 0,
      max: 10000,
      parameterName: 'offset',
    })

    const take = parseBoundedInteger(pageSize, {
      defaultValue: 10,
      min: 1,
      max: 100,
      parameterName: 'pageSize',
    })

    const filter = keyword
      ? {
          OR: [
            {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              content: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {}

    const sortOption =
      sort === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' }

    const totalCount = await prisma.article.count({
      where: filter,
    })

    const list = await prisma.article.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
      orderBy: sortOption,
      skip,
      take,
    })

    return Response.json({
      totalCount,
      list,
    })
  } catch (error) {
    console.error(error)

    if (error instanceof PaginationQueryError) {
      return Response.json(
        {
          message: error.message,
          code: 'INVALID_PAGINATION_QUERY',
        },
        {
          status: 400,
        },
      )
    }

    return Response.json(
      {
        message: 'Failed to get articles.',
        code: 'GET_ARTICLES_FAILED',
      },
      {
        status: 500,
      },
    )
  }
}

export async function POST(req) {
  try {
    const body = await req.json()

    assert(body, CreateArticle)

    const { title, content } = body

    const article = await prisma.article.create({
      data: {
        title,
        content,
      },
    })

    const responseArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
    }

    return Response.json(
      {
        message: 'Article created successfully.',
        code: 'CREATE_ARTICLE_SUCCESS',
        article: responseArticle,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        message: 'Failed to create article.',
        code: 'CREATE_ARTICLE_FAILED',
      },
      {
        status: 400,
      },
    )
  }
}
