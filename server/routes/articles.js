import express from 'express';
import prisma from '../prisma.js';
import { createCommentRouter } from './comments.js';

const router = express.Router();

// 자유게시판 댓글: /articles/:articleId/comments
router.use('/:articleId/comments', createCommentRouter('article'));

// 조회 시 반환할 필드 (요구사항: id, title, content, createdAt)
const ARTICLE_SELECT = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
};

// 게시글 목록 조회 (offset 페이지네이션 + 검색 + 최신순 정렬)
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = '' } = req.query;

    const pageNum = Math.max(Number(page) || 1, 1);
    const size = Math.max(Number(pageSize) || 10, 1);

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: 'insensitive' } },
            { content: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {};

    const [list, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        select: ARTICLE_SELECT,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * size,
        take: size,
      }),
      prisma.article.count({ where }),
    ]);

    res.json({ list, totalCount });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 단건 조회
router.get('/:id', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: req.params.id },
      select: ARTICLE_SELECT,
    });
    if (!article) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    res.json(article);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 등록
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'title, content는 필수입니다.' });
    }
    const article = await prisma.article.create({
      data: { title, content },
      select: ARTICLE_SELECT,
    });
    res.status(201).json(article);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 수정
router.patch('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;

    const article = await prisma.article.update({
      where: { id: req.params.id },
      data,
      select: ARTICLE_SELECT,
    });
    res.json(article);
  } catch (e) {
    if (e.code === 'P2025') {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    if (e.code === 'P2025') {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;
