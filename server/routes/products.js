import express from 'express';
import prisma from '../prisma.js';
import { createCommentRouter } from './comments.js';

const router = express.Router();

// 중고마켓 댓글: /products/:productId/comments
router.use('/:productId/comments', createCommentRouter('product'));

// 상품 목록 조회 (페이지네이션 + 검색 + 정렬)
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;

    const pageNum = Math.max(Number(page) || 1, 1);
    const size = Math.max(Number(pageSize) || 10, 1);

    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
          ],
        }
      : {};

    const sort = orderBy === 'favorite' ? { favoriteCount: 'desc' } : { createdAt: 'desc' };

    const [list, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: sort,
        skip: (pageNum - 1) * size,
        take: size,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({ list, totalCount });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 단건 조회
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 등록
router.post('/', async (req, res) => {
  try {
    const { name, description, price, tags = [], images = [] } = req.body;
    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'name, description, price는 필수입니다.' });
    }
    const product = await prisma.product.create({
      data: { name, description, price: Number(price), tags, images },
    });
    res.status(201).json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 수정
router.patch('/:id', async (req, res) => {
  try {
    const { name, description, price, tags, images } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = Number(price);
    if (tags !== undefined) data.tags = tags;
    if (images !== undefined) data.images = images;

    const product = await prisma.product.update({ where: { id: req.params.id }, data });
    res.json(product);
  } catch (e) {
    if (e.code === 'P2025') {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 삭제
router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    if (e.code === 'P2025') {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    console.error(e);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;
