import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// 게시글 목록 조회
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = '' } = req.query;

    const filter = keyword
      ? { $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }] }
      : {};

    const total = await Article.countDocuments(filter);
    const list = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    res.json({ list, totalCount: total });
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 단건 조회
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    res.json(article);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 생성
router.post('/', async (req, res) => {
  try {
    const { title, content, image = '' } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'title, content는 필수입니다.' });
    }
    const article = await Article.create({ title, content, image });
    res.status(201).json(article);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 수정
router.patch('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    res.json(article);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;