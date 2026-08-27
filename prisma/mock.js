// mock.js
// 시드용 목데이터. Product 는 ownerEmail 로 User 와 연결된다.

export const USERS = [
  { email: "soon@example.com", nickname: "Soon", password: "password123" },
  { email: "admin@example.com", nickname: "Admin", password: "password123" },
  { email: "tester@example.com", nickname: "Tester", password: "password123" },
  { email: "test5531@naver.com", nickname: "꿈행복", password: "11111111" },
];

const NAMES = [
  "무선 이어폰", "게이밍 의자", "커피 머신", "기계식 키보드", "27인치 모니터",
  "스탠딩 데스크", "블루투스 스피커", "전기 주전자", "공기청정기", "로봇청소기",
  "캠핑 텐트", "등산 배낭", "런닝화", "요가 매트", "덤벨 세트",
  "전자레인지", "에어프라이어", "핸드 블렌더", "토스터", "가습기",
  "책상 스탠드", "노트북 거치대", "웹캠", "마이크", "그래픽 태블릿",
  "보드게임", "레고 세트", "드론", "폴라로이드 카메라", "턴테이블",
];

const TAGS = ["전자제품", "가구", "주방", "스포츠", "취미", "생활가전", "음향기기", "게임"];

export const PRODUCTS = NAMES.map((name, i) => ({
  name,
  description: `${name} 판매합니다. 사용감 적고 정상 작동, 직거래/택배 모두 가능합니다.`,
  price: (i + 1) * 5000 + 9900,
  tags: [TAGS[i % TAGS.length], TAGS[(i + 3) % TAGS.length]],
  images: [`https://picsum.photos/seed/item${i + 1}/400/300`],
  ownerEmail: USERS[i % USERS.length].email,
  likes: i % 5, // 0~4명이 좋아요 (좋아요순 정렬 테스트용)
  createdAtOffsetMin: (NAMES.length - i) * 11, // 뒤로 갈수록 최신 (최신순 정렬용)
}));

const ARTICLE_TITLES = [
  "판다마켓 사용 후기 공유합니다", "직거래 시 주의할 점 정리", "오늘 좋은 거래 했어요",
  "이 앱 UI 진짜 깔끔하네요", "중고 거래 처음인데 팁 좀", "택배 거래 사기 조심하세요",
  "에어팟 시세가 어떻게 되나요?", "가구 옮길 때 용달 추천", "따뜻한 거래 감사합니다",
  "번개장터랑 여기 중에 고민", "노트북 살 때 체크리스트", "카페 창업 준비하며 중고 구매",
  "자취 필수템 공유", "게이밍 셋업 자랑합니다", "이번 주 나눔 이벤트 정보",
  "가격 협상 어떻게 하시나요?", "포장 꼼꼼하게 해주신 판매자님 감사", "첫 판매 완료 후기",
  "여기 커뮤니티 분위기 좋네요", "중고 거래로 미니멀 라이프",
];

export const ARTICLES = ARTICLE_TITLES.map((title, i) => ({
  title,
  content: `${title}\n\n자세한 내용입니다. 다들 안전 거래 하세요! (${i + 1}번째 글)`,
  // 0~3개 (i%4): 이미지 없는 글도 섞임
  images: Array.from({ length: i % 4 }, (_, k) => `https://picsum.photos/seed/article${i + 1}-${k + 1}/600/400`),
  writerEmail: USERS[i % USERS.length].email,
  likes: (i * 2) % 5, // 0~4
  createdAtOffsetMin: (ARTICLE_TITLES.length - i) * 17,
}));
