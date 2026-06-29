import express from 'express';

const router = express.Router();

// 인메모리 데이터 저장소
let articles = [];
let nextId = 1;

// 게시글 목록 조회 GET /articles?page=1&pageSize=10&keyword=
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, keyword = '' } = req.query;

  let filtered = articles.filter(
    (a) => a.title.includes(keyword) || a.content.includes(keyword)
  );

  filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const pageNum = parseInt(page);
  const size = parseInt(pageSize);
  const start = (pageNum - 1) * size;
  const list = filtered.slice(start, start + size);

  res.json({ list, totalCount: filtered.length });
});

// 게시글 단건 조회 GET /articles/:id
router.get('/:id', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }
  res.json(article);
});

// 게시글 생성 POST /articles
router.post('/', (req, res) => {
  const { title, content, image = '' } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'title, content는 필수입니다.' });
  }

  const now = new Date();
  const article = {
    id: nextId++,
    title,
    content,
    image,
    likeCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  articles.push(article);
  res.status(201).json(article);
});

// 게시글 수정 PATCH /articles/:id
router.patch('/:id', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }

  const { title, content, image } = req.body;
  if (title !== undefined) article.title = title;
  if (content !== undefined) article.content = content;
  if (image !== undefined) article.image = image;
  article.updatedAt = new Date();

  res.json(article);
});

// 게시글 삭제 DELETE /articles/:id
router.delete('/:id', (req, res) => {
  const index = articles.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
  }

  articles.splice(index, 1);
  res.status(204).send();
});

export default router;
