import 'dotenv/config';
import pkg from '@prisma/client'
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import mock from './mock.js';

const { Notice, Comment } = mock;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.notice.deleteMany();

  // Notice 먼저 삽입
  await prisma.notice.createMany({ data: Notice });
  const notices = await prisma.notice.findMany();

  // Comment에 실제 noticeId 매핑
  const commentsWithIds = Comment.map((c, i) => ({
    ...c,
    noticeId: notices[i % notices.length].id
  }));

  await prisma.comment.createMany({ data: commentsWithIds });

  console.log("Seed data inserted successfully!");
}

main()
  .then(async() => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });