import prisma from '@/lib/prisma'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const keyword = searchParams.get('keyword') ?? ''
    const sort = searchParams.get('sort')
    const offset = searchParams.get('offset')
    const pageSize = searchParams.get('pageSize')

    const skip = Number(offset) || 0
    const take = Number(pageSize) || 10

    const filter = keyword
      ? {
          title: {
            contains: keyword,
            mode: 'insensitive',
          },
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
