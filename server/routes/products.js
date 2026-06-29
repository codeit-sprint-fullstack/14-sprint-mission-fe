import express from 'express';

const router = express.Router();

// 인메모리 데이터 저장소
let products = [];
let nextId = 1;

// 상품 목록 조회 GET /products?page=1&pageSize=10&orderBy=recent&keyword=
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;

  let filtered = products.filter(
    (p) =>
      p.name.includes(keyword) || p.description.includes(keyword)
  );

  if (orderBy === 'recent') {
    filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const pageNum = parseInt(page);
  const size = parseInt(pageSize);
  const start = (pageNum - 1) * size;
  const list = filtered.slice(start, start + size);

  res.json({ list, totalCount: filtered.length });
});

// 상품 단건 조회 GET /products/:id
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'id는 숫자여야 합니다.' });
    }

    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    const { name, description, price, tags, createdAt } = product;
    res.json({ id, name, description, price, tags, createdAt });
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 등록 POST /products
router.post('/', (req, res) => {
  try {
    const { name, description, price, tags = [], images = [] } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'name, description, price는 필수입니다.' });
    }

    const now = new Date();
    const product = {
      id: nextId++,
      name,
      description,
      price,
      tags,
      images,
      favoriteCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    products.push(product);
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 수정 PATCH /products/:id
router.patch('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'id는 숫자여야 합니다.' });
    }

    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    const { name, description, price, tags, images } = req.body;
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (tags !== undefined) product.tags = tags;
    if (images !== undefined) product.images = images;
    product.updatedAt = new Date();

    res.json(product);
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 삭제 DELETE /products/:id
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'id는 숫자여야 합니다.' });
    }

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    products.splice(index, 1);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;
