import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import ArticleDetailClient from '@/app/(with-layout)/boards/[id]/ArticleDetailClient'

export const dynamic = 'force-dynamic'

async function ArticleDetailPage({ params }) {
  const { id: articleId } = await params

  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  })

  if (!article) {
    notFound()
  }
  // Server component에서 Client component로 전달할 수 있도록 createdAt 객체를 문자열로 변환
  const serializedArticle = {
    ...article,
    createdAt: article.createdAt.toISOString(),
  }

  return <ArticleDetailClient article={serializedArticle} />
}

export default ArticleDetailPage
