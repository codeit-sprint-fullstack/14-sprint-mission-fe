import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// 상품 목록 조회
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;

    const filter = keyword
      ? { $or: [{ name: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }] }
      : {};

    const sort = orderBy === 'recent' ? { createdAt: -1 } : { favoriteCount: -1 };

    const total = await Product.countDocuments(filter);
    const list = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    res.json({ list, totalCount: total });
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 단건 조회
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    res.json(product);
  } catch (e) {
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
    const product = await Product.create({ name, description, price, tags, images });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 수정
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 삭제
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;