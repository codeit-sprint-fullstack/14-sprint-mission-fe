import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { pool } from '../config/db.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

const products = [
  {
    name: '맥북',
    description: '상태 좋은 맥북을 판매합니다.',
    price: 1200000,
    tags: ['노트북', '전자'],
  },
  {
    name: '의자',
    description: '재택근무에 사용하기 좋은 의자입니다.',
    price: 45000,
    tags: ['가구'],
  },
  {
    name: '후드티',
    description: '가볍게 입기 좋은 후드티입니다.',
    price: 30000,
    tags: ['의류'],
  },
];

const articles = [
  {
    title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    content: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    image: '/images/Img_home_01.png',
  },
  {
    title: '중고 거래할 때 확인할 점 공유합니다',
    content: '직거래 장소와 제품 상태, 구성품을 꼭 확인해보세요.',
    image: null,
  },
  {
    title: '판다마켓 사용 후기',
    content: '검색과 등록 흐름이 간단해서 쓰기 편했습니다.',
    image: null,
  },
];

async function seed() {
  const schemaSql = await readFile(join(currentDir, 'schema.sql'), 'utf8');
  await pool.query(schemaSql);

  await pool.query('TRUNCATE comments, products, articles RESTART IDENTITY CASCADE');

  const productIds = [];
  for (const product of products) {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, tags)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [product.name, product.description, product.price, product.tags],
    );
    productIds.push(result.rows[0].id);
  }

  const articleIds = [];
  for (const article of articles) {
    const result = await pool.query(
      `INSERT INTO articles (title, content, image)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [article.title, article.content, article.image],
    );
    articleIds.push(result.rows[0].id);
  }

  await pool.query(
    `INSERT INTO comments (product_id, content)
     VALUES ($1, $2), ($1, $3)`,
    [productIds[0], '제품 상태 사진을 더 볼 수 있을까요?', '혹시 직거래 가능할까요?'],
  );

  await pool.query(
    `INSERT INTO comments (article_id, content)
     VALUES ($1, $2), ($1, $3), ($1, $4)`,
    [
      articleIds[0],
      '혹시 사용기간이 어떻게 되실까요?',
      '배터리 사이클도 확인해보세요.',
      '구성품에 따라 가격이 달라질 것 같습니다.',
    ],
  );

  await pool.end();
  console.log('Seed completed');
}

seed().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
