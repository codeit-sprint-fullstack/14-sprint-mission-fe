import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.article.createMany({
    data: [
      {
        title: "이 스파이더맨 피규어 얼마면 살 수 있어요?",
        content: "스파이더맨 피규어 중고 가격이 궁금해요.",
        image: null,
        likeCount: 32,
      },
      {
        title: "맥북 중고로 팔려고 하는데 가격 괜찮을까요?",
        content: "맥북을 정리하려고 하는데 적정 가격이 궁금합니다.",
        image: null,
        likeCount: 18,
      },
      {
        title: "닌텐도 스위치 OLED 판매하려고 합니다",
        content: "박스랑 구성품은 전부 있어요.",
        image: null,
        likeCount: 41,
      },
      {
        title: "아이패드 프로랑 애플펜슬 같이 팔까요?",
        content: "같이 파는 게 나을지 따로 파는 게 나을지 고민이에요.",
        image: null,
        likeCount: 25,
      },
      {
        title: "에어팟 맥스 중고 가격 질문드립니다",
        content: "사용 횟수 적고 상태 좋아요.",
        image: null,
        likeCount: 12,
      },
      {
        title: "레고 세트 중고로 판매해보신 분 있나요?",
        content: "조립해서 전시만 했던 제품입니다.",
        image: null,
        likeCount: 8,
      },
      {
        title: "기계식 키보드 판매 가격 고민 중입니다",
        content: "커스텀 키보드인데 사용감은 조금 있어요.",
        image: null,
        likeCount: 17,
      },
      {
        title: "플레이스테이션5 중고 거래 질문",
        content: "디스크 버전입니다.",
        image: null,
        likeCount: 29,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });