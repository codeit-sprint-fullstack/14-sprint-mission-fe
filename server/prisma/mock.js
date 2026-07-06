export const PRODUCTS = [
  {
    name: "뉴질랜드 새벽 공기 한 봉지",
    description:
      "해발 1,200m에서 상상으로 채집한 프리미엄 공기입니다. 개봉 즉시 기분만 상쾌해질 수 있습니다.",
    price: 300000,
    tags: ["공기", "감성템", "해외직구"],
    image: "https://example.com/images/new-zealand-air.png",
  },
  {
    name: "버그 퇴치 부적 키캡",
    description:
      "ESC 키에 끼우면 버그가 도망간다는 전설이 있습니다. 실제 효과는 개발자의 컨디션에 따라 다릅니다.",
    price: 12900,
    tags: ["키캡", "개발자", "부적"],
    image: "https://example.com/images/bug-away-keycap.png",
  },
  {
    name: "회의에서 살아남는 투명 망토",
    description:
      "착용하면 회의 중 질문을 받을 확률이 12% 감소하는 기분이 듭니다. 카메라는 직접 꺼야 합니다.",
    price: 78000,
    tags: ["직장인", "회의", "생존템"],
    image: "https://example.com/images/invisible-meeting-cloak.png",
  },
  {
    name: "밤샘 코딩용 달빛 머그컵",
    description:
      "커피를 담으면 달빛 감성이 추가됩니다. 카페인은 별도로 준비해야 합니다.",
    price: 18000,
    tags: ["머그컵", "코딩", "카페인"],
    image: "https://example.com/images/moonlight-mug.png",
  },
  {
    name: "고양이가 승인한 노트북 받침대",
    description:
      "고양이가 한 번 올라앉았던 각도로 설계했습니다. 사람보다 고양이에게 더 인기 있을 수 있습니다.",
    price: 42000,
    tags: ["노트북", "고양이", "작업환경"],
    image: "https://example.com/images/cat-approved-stand.png",
  },
  {
    name: "월요일 삭제 버튼",
    description:
      "누르면 월요일이 사라지는 상상을 할 수 있습니다. 실제 달력에는 영향을 주지 않습니다.",
    price: 9900,
    tags: ["월요일", "상상력", "힐링"],
    image: "https://example.com/images/delete-monday-button.png",
  },
  {
    name: "말문이 막힐 때 쓰는 임시 대답 카드",
    description:
      "'좋은 질문입니다', '검토 후 공유드리겠습니다' 등 생존 문구 30종 수록.",
    price: 15000,
    tags: ["커뮤니케이션", "생존", "직장"],
    image: "https://example.com/images/emergency-answer-card.png",
  },
  {
    name: "집중력 충전용 가짜 배터리",
    description:
      "책상 위에 올려두면 집중력이 충전되는 느낌만 줍니다. 실제 충전은 수면으로 해주세요.",
    price: 23000,
    tags: ["집중력", "책상템", "기분전환"],
    image: "https://example.com/images/focus-battery.png",
  },
];

export const ARTICLES = [
  {
    title: "자유게시판에 글을 쓰면 자유로워질 줄 알았다",
    content:
      "하지만 제목을 정하는 순간부터 전혀 자유롭지 않았다. 자유에는 책임과 제목 센스가 필요하다.",
  },
  {
    title: "오늘의 개발 일기: 에러가 나를 키운다",
    content:
      "정확히는 에러 메시지를 읽는 척하다가 결국 검색창을 키운다. 그래도 어제보다 한 줄 더 이해했다.",
  },
  {
    title: "중고 거래할 때 가장 무서운 말",
    content:
      "'네고 가능할까요?'보다 무서운 건 '제가 지금 출발했는데요'다. 아직 약속 안 잡았는데요.",
  },
  {
    title: "프리즈마와 몽구스 사이에서 길을 잃다",
    content:
      "findById를 보내고 findUnique를 만났다. _id를 잃고 uuid를 얻었다. 이것은 성장인가 혼란인가.",
  },
  {
    title: "댓글 1빠 문화에 대한 짧은 고찰",
    content:
      "1빠는 빠르지만 내용이 없고, 2빠는 늦었지만 억울하다. 결국 중요한 건 content다.",
  },
  {
    title: "개발자가 커피를 마시는 이유",
    content:
      "잠을 깨려고 마시는 줄 알았는데, 사실은 에러를 마주할 용기를 충전하는 의식이었다.",
  },
  {
    title: "오늘의 교훈: undefined와 null은 다르다",
    content:
      "둘 다 비어 보이지만, 하나는 안 온 것이고 하나는 온다고 하고 빈손으로 온 것이다.",
  },
  {
    title: "미션 제출 전 가장 많이 하는 말",
    content: "'이거 왜 되지?'와 '이거 왜 안 되지?' 사이에서 인간은 성장한다.",
  },
];

export const PRODUCT_COMMENT_CONTENTS = [
  "이거 진짜 효과 있나요? 아니면 효과가 있는 기분인가요?",
  "상품 설명 보고 웃다가 장바구니 담았습니다.",
  "네고 가능할까요? 제 자존심도 같이 네고 가능합니다.",
  "이 제품은 필요 없는데 갖고 싶네요. 위험한 물건입니다.",
  "배송 오면 제 인생도 같이 도착하나요?",
  "후기 남깁니다. 아직 안 샀지만 마음은 이미 구매자입니다.",
  "가격이 묘하게 설득력 있어서 더 화납니다.",
  "이런 걸 파는 사람이 있다면 사는 사람도 있어야 균형이 맞죠.",
];

export const ARTICLE_COMMENT_CONTENTS = [
  "이 글 왜 이렇게 제 얘기 같죠?",
  "읽다가 웃었는데 약간 울고 있는 것 같기도 합니다.",
  "1빠를 놓쳤지만 품격은 지켰습니다.",
  "이 글은 자유게시판이 아니라 생존게시판에 가깝네요.",
  "undefined와 null 비유가 너무 아프게 이해됐습니다.",
  "개발 일기라면서 제 일기 훔쳐보신 건가요?",
  "좋은 글입니다. 물론 제가 이해했다는 뜻은 아닙니다.",
  "다음 편도 써주세요. 제가 또 댓글 달러 오겠습니다.",
];
