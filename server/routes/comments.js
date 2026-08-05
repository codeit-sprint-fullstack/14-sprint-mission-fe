import express from 'express';
import prisma from '../prisma.js';

// 조회 시 반환할 필드 (요구사항: id, content, createdAt)
const COMMENT_SELECT = {
  id: true,
  content: true,
  createdAt: true,
};

/**
 * 자유게시판(article) / 중고마켓(product) 댓글 라우터를 생성한다.
 * 두 리소스의 댓글 로직이 부모만 다르고 동일해서 공통 팩토리로 둔다.
 *
 * @param {'article' | 'product'} parent  부모 리소스 종류
 */
export function createCommentRouter(parent) {
  // mergeParams: 부모 라우터의 :articleId / :productId 를 물려받기 위해 필요
  const router = express.Router({ mergeParams: true });

  const parentIdParam = `${parent}Id`; // 'articleId' | 'productId'
  const parentLabel = parent === 'article' ? '게시글' : '상품';

  // 부모 존재 여부 확인 (없는 글에 댓글이 달리는 것을 막는다)
  const parentExists = async (id) => {
    const found = await prisma[parent].findUnique({ where: { id }, select: { id: true } });
    return Boolean(found);
  };

  // 댓글 목록 조회 (cursor 페이지네이션)
  router.get('/', async (req, res) => {
    try {
      const parentId = req.params[parentIdParam];
      const { cursor, limit = 10 } = req.query;

      if (!(await parentExists(parentId))) {
        return res.status(404).json({ message: `${parentLabel}을 찾을 수 없습니다.` });
      }

      const take = Math.max(Number(limit) || 10, 1);

      const list = await prisma.comment.findMany({
        where: { [parentIdParam]: parentId },
        select: COMMENT_SELECT,
        orderBy: { createdAt: 'desc' },
        take: take + 1, // 다음 페이지 존재 여부 판단을 위해 1개 더 조회
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      });

      // 초과분이 있으면 다음 페이지가 있다는 뜻
      const hasNext = list.length > take;
      if (hasNext) list.pop();

      const nextCursor = hasNext ? list[list.length - 1].id : null;

      res.json({ list, nextCursor });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  });

  // 댓글 등록
  router.post('/', async (req, res) => {
    try {
      const parentId = req.params[parentIdParam];
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ message: 'content는 필수입니다.' });
      }
      if (!(await parentExists(parentId))) {
        return res.status(404).json({ message: `${parentLabel}을 찾을 수 없습니다.` });
      }

      const comment = await prisma.comment.create({
        data: { content, [parentIdParam]: parentId },
        select: COMMENT_SELECT,
      });

      res.status(201).json(comment);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  });

  return router;
}

/**
 * 댓글 수정/삭제 라우터.
 * 댓글 id만으로 대상이 특정되므로 부모와 무관하게 하나로 둔다.
 */
export function createCommentItemRouter() {
  const router = express.Router();

  // 댓글 수정
  router.patch('/:id', async (req, res) => {
    try {
      const { content } = req.body;
      if (content === undefined) {
        return res.status(400).json({ message: 'content는 필수입니다.' });
      }

      const comment = await prisma.comment.update({
        where: { id: req.params.id },
        data: { content },
        select: COMMENT_SELECT,
      });

      res.json(comment);
    } catch (e) {
      if (e.code === 'P2025') {
        return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
      }
      console.error(e);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  });

  // 댓글 삭제
  router.delete('/:id', async (req, res) => {
    try {
      await prisma.comment.delete({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (e) {
      if (e.code === 'P2025') {
        return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
      }
      console.error(e);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  });

  return router;
}
