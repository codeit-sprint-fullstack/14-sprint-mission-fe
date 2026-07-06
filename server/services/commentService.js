import prisma from '../lib/prisma.js'

async function getCommentList({ where, cursor, take }) {
  // TODO: 리팩토링 - createdAt과 id를 함께 사용해 정렬 기준과 cursor 기준을 일치시키기
  const comments = await prisma.comment.findMany({
    where,
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },

    // 쿼리에서 받은 cursor가 있으면 그 id부터 시작하고, 없으면 처음부터 조회(옵션 사용 안함)
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    // 다음 댓글이 있는지 확인
    take: take + 1,
  })

  const hasNextPage = comments.length > take
  const list = hasNextPage ? comments.slice(0, take) : comments
  const nextCursor = hasNextPage ? list[list.length - 1].id : null

  return { list, nextCursor }
}

async function createCommentData({ parentKey, parentId, content }) {
  const comment = await prisma.comment.create({
    data: {
      content,
      // Computed Property Name([key])
      // 객체의 key를 변수로 받아 동적으로 생성하여 공통 함수로 설계
      [parentKey]: parentId,
    },
  })

  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
  }
}

export { getCommentList, createCommentData }
