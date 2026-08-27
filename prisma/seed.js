import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { USERS, PRODUCTS, ARTICLES } from './mock.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // onDelete: Cascade 지만 순서 명시적으로
  await prisma.favorite.deleteMany();
  await prisma.articleLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  // 1) User 시드
  const users = await Promise.all(
    USERS.map(async ({ email, nickname, password }) =>
      prisma.user.create({
        data: { email, nickname, encryptedPassword: await bcrypt.hash(password, 10) },
      })
    )
  );
  const userIdByEmail = Object.fromEntries(users.map((u) => [u.email, u.id]));

  // 2) Product 시드 — createdAt 을 스태거하고, likes 만큼 Favorite 행도 생성
  let favoriteTotal = 0;
  for (const { ownerEmail, likes, createdAtOffsetMin, ...product } of PRODUCTS) {
    const created = await prisma.product.create({
      data: {
        ...product,
        ownerId: userIdByEmail[ownerEmail],
        favoriteCount: likes,
        createdAt: new Date(Date.now() - createdAtOffsetMin * 60_000),
      },
    });

    for (let u = 0; u < Math.min(likes, users.length); u++) {
      await prisma.favorite.create({
        data: { userId: users[u].id, productId: created.id },
      });
      favoriteTotal++;
    }
  }

  // 3) Article 시드 — createdAt 스태거, likes 만큼 ArticleLike 행 생성
  let articleLikeTotal = 0;
  for (const { writerEmail, likes, createdAtOffsetMin, ...article } of ARTICLES) {
    const created = await prisma.article.create({
      data: {
        ...article,
        writerId: userIdByEmail[writerEmail],
        likeCount: likes,
        createdAt: new Date(Date.now() - createdAtOffsetMin * 60_000),
      },
    });

    for (let u = 0; u < Math.min(likes, users.length); u++) {
      await prisma.articleLike.create({
        data: { userId: users[u].id, articleId: created.id },
      });
      articleLikeTotal++;
    }
  }

  console.log(
    `✅ 시드 완료 — User ${users.length}명, Product ${PRODUCTS.length}개(Favorite ${favoriteTotal}), Article ${ARTICLES.length}개(Like ${articleLikeTotal})`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ 시드 에러:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
