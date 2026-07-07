export const PRODUCTS = [
  {
    id: '8f4b5c0a-3c7d-4a61-9c8d-2f91e76a4b23',
    name: '아이폰15',
    description: '생활기스 조금 있지만 기능 문제 없고 배터리 상태도 괜찮습니다.',
    price: 1250000,
    tags: ['애플', '폰', '중고'],
    createdAt: new Date('2026-07-01T09:00:00.000Z'),
  },
  {
    id: '3a7e9f21-b4c8-4df5-9a2e-6c0f8d31b572',
    name: '맥북에어',
    description: '문서 작업용으로 사용했고 외관 깨끗하며 충전기 포함입니다.',
    price: 980000,
    tags: ['애플', '맥북', '노트북'],
    createdAt: new Date('2026-07-01T10:30:00.000Z'),
  },
  {
    id: 'c2d1a6f8-7e4b-4c90-8f63-1b9a0d5e72ac',
    name: '아이패드',
    description: '필기용으로 사용했고 액정 보호필름이 부착되어 있습니다.',
    price: 430000,
    tags: ['애플', '태블릿', '필기'],
    createdAt: new Date('2026-07-02T08:20:00.000Z'),
  },
  {
    id: '5b8c2e4d-91f6-4a37-b0c8-7e3a2d6f9415',
    name: '버즈프로',
    description: '케이스에 사용감은 조금 있지만 음질은 정상입니다.',
    price: 95000,
    tags: ['삼성', '이어폰', '무선'],
    createdAt: new Date('2026-07-02T12:00:00.000Z'),
  },
  {
    id: 'e9f1c6a2-4d78-43b5-a92c-0f7e5b3d861a',
    name: '소니헤드폰',
    description: '노이즈캔슬링 잘 되고 박스 없이 본품만 판매합니다.',
    price: 210000,
    tags: ['소니', '헤드폰', '노캔'],
    createdAt: new Date('2026-07-03T09:10:00.000Z'),
  },
  {
    id: '71d3a9e5-2c6f-4b8a-9e17-f0c4d8b65293',
    name: '스위치',
    description: '게임하려고 샀지만 거의 사용하지 않아 상태가 좋습니다.',
    price: 310000,
    tags: ['게임', '닌텐도', '취미'],
    createdAt: new Date('2026-07-03T15:30:00.000Z'),
  },
  {
    id: '0a6f3c9d-8b21-4e75-96d4-3f1a7c0e5b82',
    name: '무선마우스',
    description: '사무용으로 사용했고 클릭감과 연결 상태 모두 정상입니다.',
    price: 78000,
    tags: ['마우스', '무선', '사무'],
    createdAt: new Date('2026-07-04T03:00:00.000Z'),
  },
  {
    id: 'd4b7e2a1-6f3c-4a98-b51e-8c0d9f276a34',
    name: '키보드',
    description: '갈축 모델이고 키캡에 약간의 사용감이 있습니다.',
    price: 65000,
    tags: ['키보드', '기계식', '사무'],
    createdAt: new Date('2026-07-04T06:15:00.000Z'),
  },
  {
    id: '9c1e5a7f-2d84-4b63-a0f9-6e3b8d21c745',
    name: '모니터',
    description: '재택근무용으로 사용했고 화면 이상 없이 잘 작동합니다.',
    price: 260000,
    tags: ['모니터', '재택', '화면'],
    createdAt: new Date('2026-07-04T09:40:00.000Z'),
  },
  {
    id: '6e2f8c4a-1b7d-4d95-8a3f-c9e0b5a67241',
    name: '책상조명',
    description: '밝기 조절이 가능해서 공부용이나 작업용으로 좋습니다.',
    price: 18000,
    tags: ['조명', '책상', '공부'],
    createdAt: new Date('2026-07-05T02:20:00.000Z'),
  },
  {
    id: 'f3a9d1c7-5e82-4b0a-9d6f-2c8e4a7b1390',
    name: '이케아책상',
    description: '상판에 작은 찍힘이 있어 직접 확인 후 가져가시면 좋습니다.',
    price: 45000,
    tags: ['가구', '책상', '자취'],
    createdAt: new Date('2026-07-05T08:00:00.000Z'),
  },
  {
    id: '2b5e7d9a-0c61-4f38-a8d2-7e9c1b4f6530',
    name: '시디즈의자',
    description: '오래 앉아도 편하고 바퀴와 높이 조절 모두 정상입니다.',
    price: 120000,
    tags: ['가구', '의자', '사무'],
    createdAt: new Date('2026-07-05T11:30:00.000Z'),
  },
  {
    id: 'ad8f4c72-96b1-4a0e-8f35-2c7e9b5d6410',
    name: '수납박스',
    description: '옷 정리용으로 사용했고 깨끗한 상태로 보관했습니다.',
    price: 25000,
    tags: ['수납', '정리', '생활'],
    createdAt: new Date('2026-07-06T01:50:00.000Z'),
  },
  {
    id: 'bc1e7a59-4d82-4f0c-9a63-8e2b5d7f3146',
    name: '캠핑의자',
    description: '한 번만 사용했고 전용 가방도 함께 드립니다.',
    price: 30000,
    tags: ['캠핑', '의자', '야외'],
    createdAt: new Date('2026-07-06T05:25:00.000Z'),
  },
  {
    id: 'd7a3f9c1-5e40-4b82-91d6-7c5f2a8e0391',
    name: '텀블러',
    description: '선물 받은 새 상품이고 한 번도 사용하지 않았습니다.',
    price: 22000,
    tags: ['텀블러', '새상품', '생활'],
    createdAt: new Date('2026-07-06T07:40:00.000Z'),
  },
]

export const ARTICLES = [
  {
    id: 'a7c3e9f1-4b62-4d8a-91f0-3e6b2c7d5a84',
    title: '맥북 중고 거래할 때 확인해야 할 것들',
    content: '배터리 사이클, 외관 찍힘, 키보드 상태, 충전기 포함 여부를 꼭 확인해보세요.',
    createdAt: new Date('2026-07-01T04:00:00.000Z'),
  },
  {
    id: '4e9a2c8f-1b73-4d56-a0c9-8f2e6b5d3147',
    title: '자취방 정리하면서 물건 많이 올렸어요',
    content: '책상, 의자, 조명, 수납 박스 등 자취용품 위주로 판매 중입니다.',
    createdAt: new Date('2026-07-01T06:30:00.000Z'),
  },
  {
    id: 'd8f1b3a6-7c25-4e90-9a4b-1f6c8e2d5730',
    title: '아이패드 필기용으로 사려면 몇 세대가 괜찮을까요?',
    content: '강의 필기와 PDF 읽기 정도로 사용할 예정인데 추천 부탁드립니다.',
    createdAt: new Date('2026-07-02T02:20:00.000Z'),
  },
  {
    id: '1f6e9c2a-8d74-4b53-a7c0-5e3d9f1b6248',
    title: '중고 거래 직거래 장소는 어디가 좋나요?',
    content: '처음 직거래를 해보려고 하는데 지하철역이나 카페 앞이 괜찮을까요?',
    createdAt: new Date('2026-07-02T05:50:00.000Z'),
  },
  {
    id: '7b2d5e8a-0f63-4c91-b4e7-9a1c3d6f2850',
    title: '안 쓰는 전자기기 정리하는 중입니다',
    content: '이어폰, 마우스, 키보드 같은 소형 전자기기를 한 번에 정리하고 있어요.',
    createdAt: new Date('2026-07-03T03:15:00.000Z'),
  },
  {
    id: 'c5a9f0e3-2d81-4b76-8f4a-6e7c1d9b3250',
    title: '닌텐도 스위치 OLED 구매 고민 중',
    content: '일반 스위치랑 OLED 차이가 체감되는지 궁금합니다.',
    createdAt: new Date('2026-07-03T08:45:00.000Z'),
  },
  {
    id: '3d7e1a9c-5b20-4f86-a2c9-8e6f0b4d7315',
    title: '중고 의자 살 때 체크할 부분',
    content: '바퀴, 높이 조절, 등받이 흔들림, 좌판 꺼짐 정도는 직접 확인하는 게 좋습니다.',
    createdAt: new Date('2026-07-04T01:30:00.000Z'),
  },
  {
    id: '9f4b2c7e-6a31-4d85-90f1-2e8c5a7d4639',
    title: '택배 거래할 때 포장 어떻게 하세요?',
    content: '전자기기 판매할 때 뽁뽁이랑 박스 포장을 어느 정도 해야 안전할까요?',
    createdAt: new Date('2026-07-04T07:10:00.000Z'),
  },
  {
    id: '2c8f6b5d-9147-4e3a-a0d9-7f1b4c6e2583',
    title: '사용감 있는 제품 가격 정하기 어렵네요',
    content: '상태가 애매한 물건들은 어느 정도로 가격을 낮추는 게 좋을지 고민입니다.',
    createdAt: new Date('2026-07-05T02:40:00.000Z'),
  },
  {
    id: '6a1d9e7c-3b58-4f20-8c94-1e5b7a2d6039',
    title: '개발 공부 책 나눔하려고 합니다',
    content: '자바스크립트 입문서와 HTML CSS 책 몇 권 정리하려고 합니다.',
    createdAt: new Date('2026-07-05T06:00:00.000Z'),
  },
]

export const PRODUCT_COMMENTS = [
  {
    id: '0e2a6d5f-7c91-4b38-a6e2-9f1c3d8b4270',
    content: '아직 판매 중인가요?',
    createdAt: new Date('2026-07-06T09:00:00.000Z'),
    product: {
      connect: { id: '8f4b5c0a-3c7d-4a61-9c8d-2f91e76a4b23' }
    }
  },
  {
    id: '4b9c1e7a-2d63-4f85-91b0-6e3a8d5c7249',
    content: '배터리 성능은 몇 퍼센트인가요?',
    createdAt: new Date('2026-07-06T09:15:00.000Z'),
    product: {
      connect: { id: '8f4b5c0a-3c7d-4a61-9c8d-2f91e76a4b23' }
    }
  },
  {
    id: '8d2f6b4c-1a75-4e90-9c3d-5f7a2e8b6140',
    content: '충전기도 같이 포함인가요?',
    createdAt: new Date('2026-07-06T09:30:00.000Z'),
    product: {
      connect: { id: '3a7e9f21-b4c8-4df5-9a2e-6c0f8d31b572' }
    }
  },
  {
    id: '1f7c9a3e-5d84-4b62-a0e9-7c2f6d8b4135',
    content: '직거래 가능 지역이 어디인가요?',
    createdAt: new Date('2026-07-06T10:00:00.000Z'),
    product: {
      connect: { id: '3a7e9f21-b4c8-4df5-9a2e-6c0f8d31b572' }
    }
  },
  {
    id: '6c3e8f1a-9b25-4d70-8f6a-2e1c7d5b9048',
    content: '애플펜슬도 같이 판매하시나요?',
    createdAt: new Date('2026-07-06T10:20:00.000Z'),
    product: {
      connect: { id: 'c2d1a6f8-7e4b-4c90-8f63-1b9a0d5e72ac' }
    }
  },
  {
    id: '9a5d2c7f-3e81-4b96-a2d0-6f4c1e8b7352',
    content: '케이스 상태도 괜찮나요?',
    createdAt: new Date('2026-07-06T10:40:00.000Z'),
    product: {
      connect: { id: '5b8c2e4d-91f6-4a37-b0c8-7e3a2d6f9415' }
    }
  },
  {
    id: '2d8e4b6a-7f31-4c95-8a0e-3b9c6f1d5274',
    content: '소리 끊김은 없나요?',
    createdAt: new Date('2026-07-06T11:00:00.000Z'),
    product: {
      connect: { id: 'e9f1c6a2-4d78-43b5-a92c-0f7e5b3d861a' }
    }
  },
  {
    id: '7f1a9c3d-6b42-4e80-91d5-8c2e4f7a6031',
    content: '조이콘 쏠림 증상은 없나요?',
    createdAt: new Date('2026-07-06T11:30:00.000Z'),
    product: {
      connect: { id: '71d3a9e5-2c6f-4b8a-9e17-f0c4d8b65293' }
    }
  },
  {
    id: '3e6b1d9a-8c52-4f70-a6e1-9d2c7b5f4380',
    content: '몇 개월 정도 사용하셨나요?',
    createdAt: new Date('2026-07-06T12:00:00.000Z'),
    product: {
      connect: { id: '0a6f3c9d-8b21-4e75-96d4-3f1a7c0e5b82' }
    }
  },
  {
    id: '5b7d9f2a-1e64-4c83-9a5d-0f6e3c8b2174',
    content: '키보드 연결 방식은 블루투스인가요?',
    createdAt: new Date('2026-07-06T12:20:00.000Z'),
    product: {
      connect: { id: 'd4b7e2a1-6f3c-4a98-b51e-8c0d9f276a34' }
    }
  },
  {
    id: '8c4f2a6e-0b75-4d91-8f3c-6a1e9d5b7240',
    content: '화면에 흠집은 없나요?',
    createdAt: new Date('2026-07-06T13:00:00.000Z'),
    product: {
      connect: { id: '9c1e5a7f-2d84-4b63-a0f9-6e3b8d21c745' }
    }
  },
  {
    id: '1a9e5d7c-3f62-4b80-9c1d-7e4a2f6b8350',
    content: '밝기 조절은 몇 단계까지 되나요?',
    createdAt: new Date('2026-07-06T13:30:00.000Z'),
    product: {
      connect: { id: '6e2f8c4a-1b7d-4d95-8a3f-c9e0b5a67241' }
    }
  },
  {
    id: '6f3b8d1e-9a25-4c70-b2e6-5d7c1f4a8039',
    content: '분해해서 가져갈 수 있나요?',
    createdAt: new Date('2026-07-06T14:00:00.000Z'),
    product: {
      connect: { id: 'f3a9d1c7-5e82-4b0a-9d6f-2c8e4a7b1390' }
    }
  },
  {
    id: '4d2c7a9f-8e31-4b65-90f1-6c5e3d8b2740',
    content: '의자 쿠션 꺼짐은 어느 정도인가요?',
    createdAt: new Date('2026-07-06T14:20:00.000Z'),
    product: {
      connect: { id: '2b5e7d9a-0c61-4f38-a8d2-7e9c1b4f6530' }
    }
  },
  {
    id: '9e1f6c3a-5b82-4d70-a9c4-2f8d7b1e6035',
    content: '새 상품이면 포장도 그대로 있나요?',
    createdAt: new Date('2026-07-06T15:00:00.000Z'),
    product: {
      connect: { id: 'd7a3f9c1-5e40-4b82-91d6-7c5f2a8e0391' }
    }
  }
]

export const ARTICLE_COMMENTS = [
  {
    id: '2a8f6d1c-7e35-4b90-9c2d-5f1a8e6b7340',
    content: '배터리 사이클 확인하는 방법도 궁금해요.',
    createdAt: new Date('2026-07-06T09:10:00.000Z'),
    article: {
      connect: { id: 'a7c3e9f1-4b62-4d8a-91f0-3e6b2c7d5a84' }
    }
  },
  {
    id: '7c1e9a5d-3b84-4f62-a0d9-6e2f8c4b5173',
    content: '직거래할 때 초기화 여부도 꼭 확인해야겠네요.',
    createdAt: new Date('2026-07-06T09:35:00.000Z'),
    article: {
      connect: { id: 'a7c3e9f1-4b62-4d8a-91f0-3e6b2c7d5a84' }
    }
  },
  {
    id: '5d3f8b2a-1c76-4e90-8a5f-2e9c6d7b3140',
    content: '자취용품 한 번에 보면 좋겠네요.',
    createdAt: new Date('2026-07-06T10:00:00.000Z'),
    article: {
      connect: { id: '4e9a2c8f-1b73-4d56-a0c9-8f2e6b5d3147' }
    }
  },
  {
    id: '9b6e1c7a-4d82-4f30-a5c9-7e2d8f1b6035',
    content: '필기용이면 에어 모델도 괜찮은 것 같아요.',
    createdAt: new Date('2026-07-06T10:25:00.000Z'),
    article: {
      connect: { id: 'd8f1b3a6-7c25-4e90-9a4b-1f6c8e2d5730' }
    }
  },
  {
    id: '1c7a9e5d-6f34-4b82-90d1-8e3f2c6b4750',
    content: 'PDF 위주면 저장 용량도 같이 보는 게 좋아요.',
    createdAt: new Date('2026-07-06T10:50:00.000Z'),
    article: {
      connect: { id: 'd8f1b3a6-7c25-4e90-9a4b-1f6c8e2d5730' }
    }
  },
  {
    id: '6e2f4b8c-0a91-4d75-b3c6-9f1e7a5d2840',
    content: '저는 사람 많은 지하철역 앞에서 거래해요.',
    createdAt: new Date('2026-07-06T11:15:00.000Z'),
    article: {
      connect: { id: '1f6e9c2a-8d74-4b53-a7c0-5e3d9f1b6248' }
    }
  },
  {
    id: '3f8d1b6a-9c25-4e70-a2f5-6d7c1e9b4380',
    content: '소형 전자기기는 택배 거래도 괜찮은 편이에요.',
    createdAt: new Date('2026-07-06T11:40:00.000Z'),
    article: {
      connect: { id: '7b2d5e8a-0f63-4c91-b4e7-9a1c3d6f2850' }
    }
  },
  {
    id: '8a5e2d9c-7b13-4f60-91c8-3e6f1d4b7250',
    content: 'OLED는 화면 차이가 꽤 느껴졌어요.',
    createdAt: new Date('2026-07-06T12:05:00.000Z'),
    article: {
      connect: { id: 'c5a9f0e3-2d81-4b76-8f4a-6e7c1d9b3250' }
    }
  },
  {
    id: '4b7c1e9a-2f63-4d85-a0e6-5d8f3c1b7290',
    content: '의자는 직접 앉아보고 사는 게 제일 안전한 것 같아요.',
    createdAt: new Date('2026-07-06T12:30:00.000Z'),
    article: {
      connect: { id: '3d7e1a9c-5b20-4f86-a2c9-8e6f0b4d7315' }
    }
  },
  {
    id: '7e3d9f1a-5c82-4b60-8a4e-2f6c1d8b9340',
    content: '전자기기는 완충재를 넉넉하게 넣는 게 좋아요.',
    createdAt: new Date('2026-07-06T13:00:00.000Z'),
    article: {
      connect: { id: '9f4b2c7e-6a31-4d85-90f1-2e8c5a7d4639' }
    }
  },
  {
    id: '0f6a3c9d-8b24-4e75-91d6-3f1e7c5b8029',
    content: '비슷한 제품 시세를 먼저 찾아보면 정하기 편해요.',
    createdAt: new Date('2026-07-06T13:25:00.000Z'),
    article: {
      connect: { id: '2c8f6b5d-9147-4e3a-a0d9-7f1b4c6e2583' }
    }
  },
  {
    id: '5c8e1d7a-3f69-4b20-a9d5-6e2f8c4b7130',
    content: '개발 책 나눔이면 관심 있는 분들 많을 것 같아요.',
    createdAt: new Date('2026-07-06T13:50:00.000Z'),
    article: {
      connect: { id: '6a1d9e7c-3b58-4f20-8c94-1e5b7a2d6039' }
    }
  }
]