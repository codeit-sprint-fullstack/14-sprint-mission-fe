const seedData = [
  {
    "name": "멋쟁이 모자",
    "description": "딥그린 색상의 멋쟁이 모자",
    "price": 9000,
    "tags": ["모자"],
    "images": ["https://source.unsplash.com/800x600/?hat"],
    "ownerId": 1,
    "favoriteCount": 3
  },
  {
    "name": "화이트 스니커즈",
    "description": "깔끔한 디자인의 화이트 스니커즈",
    "price": 35000,
    "tags": ["신발", "운동화"],
    "images": ["https://source.unsplash.com/800x600/?sneakers"],
    "ownerId": 2,
    "favoriteCount": 8
  },
  {
    "name": "데님 자켓",
    "description": "사계절 활용 가능한 데님 자켓",
    "price": 45000,
    "tags": ["의류", "자켓"],
    "images": ["https://source.unsplash.com/800x600/?denim-jacket"],
    "ownerId": 3,
    "favoriteCount": 12
  },
  {
    "name": "기계식 키보드",
    "description": "청축 스위치가 적용된 기계식 키보드",
    "price": 60000,
    "tags": ["전자기기", "키보드"],
    "images": ["https://source.unsplash.com/800x600/?mechanical-keyboard"],
    "ownerId": 4,
    "favoriteCount": 16
  },
  {
    "name": "무선 헤드폰",
    "description": "노이즈 캔슬링 기능이 포함된 헤드폰",
    "price": 85000,
    "tags": ["전자기기", "음향"],
    "images": ["https://source.unsplash.com/800x600/?headphones"],
    "ownerId": 5,
    "favoriteCount": 22
  },
  {
    "name": "캠핑 랜턴",
    "description": "야외 활동에 적합한 LED 랜턴",
    "price": 25000,
    "tags": ["캠핑", "랜턴"],
    "images": ["https://source.unsplash.com/800x600/?camping-lantern"],
    "ownerId": 6,
    "favoriteCount": 5
  },
  {
    "name": "원목 책상",
    "description": "튼튼한 원목 소재의 컴퓨터 책상",
    "price": 120000,
    "tags": ["가구", "책상"],
    "images": ["https://source.unsplash.com/800x600/?wooden-desk"],
    "ownerId": 7,
    "favoriteCount": 10
  },
  {
    "name": "폴라로이드 카메라",
    "description": "즉석 사진 촬영이 가능한 카메라",
    "price": 70000,
    "tags": ["카메라"],
    "images": ["https://source.unsplash.com/800x600/?polaroid-camera"],
    "ownerId": 8,
    "favoriteCount": 18
  },
  {
    "name": "가죽 백팩",
    "description": "출퇴근용으로 활용하기 좋은 백팩",
    "price": 55000,
    "tags": ["가방"],
    "images": ["https://source.unsplash.com/800x600/?leather-backpack"],
    "ownerId": 9,
    "favoriteCount": 14
  },
  {
    "name": "닌텐도 스위치",
    "description": "상태 좋은 닌텐도 스위치 본체",
    "price": 220000,
    "tags": ["게임"],
    "images": ["https://source.unsplash.com/800x600/?nintendo-switch"],
    "ownerId": 10,
    "favoriteCount": 30
  },
  {
    "name": "아이패드 에어",
    "description": "필기용으로 사용한 아이패드 에어",
    "price": 480000,
    "tags": ["태블릿"],
    "images": ["https://source.unsplash.com/800x600/?ipad"],
    "ownerId": 1,
    "favoriteCount": 25
  },
  {
    "name": "게이밍 마우스",
    "description": "RGB 조명이 있는 게이밍 마우스",
    "price": 28000,
    "tags": ["마우스"],
    "images": ["https://source.unsplash.com/800x600/?gaming-mouse"],
    "ownerId": 2,
    "favoriteCount": 11
  },
  {
    "name": "러닝화",
    "description": "가볍고 쿠션감 좋은 러닝화",
    "price": 40000,
    "tags": ["운동화"],
    "images": ["https://source.unsplash.com/800x600/?running-shoes"],
    "ownerId": 3,
    "favoriteCount": 9
  },
  {
    "name": "에어프라이어",
    "description": "5L 대용량 에어프라이어",
    "price": 65000,
    "tags": ["가전"],
    "images": ["https://source.unsplash.com/800x600/?air-fryer"],
    "ownerId": 4,
    "favoriteCount": 17
  },
  {
    "name": "독서용 스탠드",
    "description": "밝기 조절이 가능한 LED 스탠드",
    "price": 15000,
    "tags": ["조명"],
    "images": ["https://source.unsplash.com/800x600/?desk-lamp"],
    "ownerId": 5,
    "favoriteCount": 4
  },
  {
    "name": "전자책 리더기",
    "description": "눈이 편한 전자책 리더기",
    "price": 90000,
    "tags": ["전자기기"],
    "images": ["https://source.unsplash.com/800x600/?ebook-reader"],
    "ownerId": 6,
    "favoriteCount": 13
  },
  {
    "name": "블루투스 스피커",
    "description": "휴대성이 좋은 블루투스 스피커",
    "price": 32000,
    "tags": ["스피커"],
    "images": ["https://source.unsplash.com/800x600/?bluetooth-speaker"],
    "ownerId": 7,
    "favoriteCount": 19
  },
  {
    "name": "요가 매트",
    "description": "미끄럼 방지 요가 매트",
    "price": 12000,
    "tags": ["운동"],
    "images": ["https://source.unsplash.com/800x600/?yoga-mat"],
    "ownerId": 8,
    "favoriteCount": 6
  },
  {
    "name": "커피 그라인더",
    "description": "원두 분쇄용 수동 그라인더",
    "price": 18000,
    "tags": ["커피"],
    "images": ["https://source.unsplash.com/800x600/?coffee-grinder"],
    "ownerId": 9,
    "favoriteCount": 7
  },
  {
    "name": "모니터 암",
    "description": "32인치까지 지원하는 모니터 암",
    "price": 45000,
    "tags": ["모니터"],
    "images": ["https://source.unsplash.com/800x600/?monitor-arm"],
    "ownerId": 10,
    "favoriteCount": 15
  }
]

export default seedData;