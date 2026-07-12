# MarketPage.jsx 코드 설명

## 1. 역할

`MarketPage.jsx`는 중고마켓 페이지를 담당하는 컴포넌트입니다.

주요 기능은 다음과 같습니다.

- 베스트 상품 조회
- 전체 상품 조회
- 상품 검색
- 최신순 / 좋아요순 정렬
- 페이지네이션
- 반응형 화면에 따른 상품 개수 변경
- 상단 헤더, 검색 박스, 위로가기 버튼, 푸터 렌더링

## 2. 주요 상수

```jsx
const PAGE_SIZE = {
  desktop: { best: 4, products: 15 },
  tablet: { best: 2, products: 9 },
  mobile: { best: 1, products: 8 },
};
```

`PAGE_SIZE`는 화면 크기별로 서버에 요청할 상품 개수를 정합니다.

- `best`: 베스트 상품 개수
- `products`: 전체 상품 목록 개수

```jsx
const ORDER_LABELS = {
  recent: '최신순',
  favorite: '좋아요순',
};
```

`ORDER_LABELS`는 정렬 옵션의 내부 값과 화면에 보이는 텍스트를 연결합니다.

```jsx
const MARKET_NAV_LINKS = [
  ['#free-board', '자유게시판'],
  ['#top', '중고마켓'],
];
```

`MARKET_NAV_LINKS`는 `Header` 컴포넌트에 넘겨주는 중고마켓 페이지용 네비게이션 링크입니다.

## 3. 주요 상태값

```jsx
const [page, setPage] = useState(1);
const [orderBy, setOrderBy] = useState('recent');
const [searchValue, setSearchValue] = useState('');
const [keyword, setKeyword] = useState('');
const [isSortOpen, setIsSortOpen] = useState(false);
```

### `page`

현재 상품 목록 페이지 번호입니다.

페이지네이션 버튼을 클릭하면 값이 바뀌고, 해당 페이지의 상품을 다시 요청합니다.

### `orderBy`

상품 정렬 기준입니다.

- `recent`: 최신순
- `favorite`: 좋아요순

정렬 옵션을 선택하면 상품 목록을 다시 불러옵니다.

### `searchValue`

검색 input에 사용자가 입력 중인 값입니다.

입력 즉시 API 요청에 사용하지 않고, debounce 처리를 거쳐 `keyword`로 반영됩니다.

### `keyword`

실제 API 요청에 사용되는 검색어입니다.

### `isSortOpen`

정렬 드롭다운이 열려 있는지 여부를 저장합니다.

## 4. 반응형 처리

```jsx
const breakpoint = useBreakpoint();
const sizes = PAGE_SIZE[breakpoint];
```

`useBreakpoint()`를 통해 현재 화면 크기를 구분합니다.

현재 breakpoint에 따라 `sizes.best`, `sizes.products` 값이 정해지고, 이 값이 API 요청의 `pageSize`로 사용됩니다.

## 5. 상품 데이터 요청

```jsx
const bestProducts = useProducts({
  page: 1,
  pageSize: sizes.best,
  orderBy: 'favorite',
});

const products = useProducts({
  page,
  pageSize: sizes.products,
  keyword,
  orderBy,
});
```

### 베스트 상품

베스트 상품은 항상 1페이지를 요청하고, 좋아요순(`favorite`) 기준으로 가져옵니다.

### 전체 상품

전체 상품은 현재 페이지, 검색어, 정렬 기준에 따라 상품 목록을 가져옵니다.

## 6. useEffect 설명

### 페이지 초기화

```jsx
useEffect(() => {
  setPage(1);
}, [breakpoint, keyword, orderBy]);
```

화면 크기, 검색어, 정렬 기준이 바뀌면 현재 페이지를 1페이지로 초기화합니다.

예를 들어 5페이지를 보고 있다가 검색어를 바꾸면, 검색 결과의 1페이지부터 다시 보여주는 방식입니다.

### 검색어 debounce 처리

```jsx
useEffect(() => {
  const timerId = window.setTimeout(() => {
    setKeyword(searchValue.trim());
  }, 350);

  return () => window.clearTimeout(timerId);
}, [searchValue]);
```

사용자가 검색어를 입력할 때마다 바로 API 요청하지 않고, 350ms 뒤에 `keyword`를 갱신합니다.

입력이 계속되면 이전 타이머를 제거해서 불필요한 요청을 줄입니다.

### 정렬 드롭다운 닫기

```jsx
useEffect(() => {
  if (!isSortOpen) {
    return undefined;
  }

  const closeSort = (event) => {
    if (!event.target.closest('.market-sort-control')) {
      setIsSortOpen(false);
    }
  };

  const closeOnEscape = (event) => {
    if (event.key === 'Escape') {
      setIsSortOpen(false);
    }
  };

  document.addEventListener('click', closeSort);
  document.addEventListener('keydown', closeOnEscape);

  return () => {
    document.removeEventListener('click', closeSort);
    document.removeEventListener('keydown', closeOnEscape);
  };
}, [isSortOpen]);
```

정렬 드롭다운이 열려 있을 때만 이벤트를 등록합니다.

- 바깥 영역 클릭 시 드롭다운 닫힘
- `Escape` 키 입력 시 드롭다운 닫힘

드롭다운이 닫히거나 컴포넌트가 다시 렌더링되면 이벤트 리스너를 제거합니다.

## 7. 주요 내부 함수

### `formatPrice`

```jsx
function formatPrice(price) {
  return `${Number(price || 0).toLocaleString('ko-KR')}원`;
}
```

숫자 가격을 한국어 천 단위 콤마가 들어간 원화 문자열로 바꿉니다.

### `getProductImage`

```jsx
function getProductImage(product) {
  return product?.images?.[0] || product?.image || FALLBACK_IMAGE;
}
```

상품 이미지가 있으면 첫 번째 이미지를 사용하고, 없으면 기본 이미지를 사용합니다.

### `getPageNumbers`

```jsx
function getPageNumbers(currentPage, totalPages) {
  const visibleCount = 5;
  const half = Math.floor(visibleCount / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visibleCount - 1);
  start = Math.max(1, end - visibleCount + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
```

페이지네이션에 보여줄 페이지 번호 배열을 만듭니다.

최대 5개의 페이지 번호를 보여주도록 계산합니다.

## 8. 주요 내부 컴포넌트

### `ProductCard`

상품 하나를 카드 형태로 보여줍니다.

표시 내용은 다음과 같습니다.

- 상품 이미지
- 상품 이름
- 가격
- 좋아요 수

로딩 상태일 때는 `is-loading` 클래스를 추가해서 skeleton 스타일을 적용할 수 있게 합니다.

### `ProductGrid`

상품 배열을 받아 카드 목록으로 렌더링합니다.

로딩 중이면 실제 상품 대신 임시 loading item을 만들어 카드 개수를 유지합니다.

### `Pagination`

상품 목록 페이지를 이동하는 버튼 UI입니다.

- 이전 페이지
- 페이지 번호
- 다음 페이지

현재 페이지는 `is-active` 클래스가 적용됩니다.

### `MarketFloatingControls`

검색창과 상품 등록 버튼을 포함하는 floating 영역입니다.

내부에는 모바일/태블릿용 `ScrollTopButton`도 포함되어 있습니다.

## 9. 이벤트 처리

### 검색 제출

```jsx
const submitSearch = (event) => {
  event.preventDefault();
  setKeyword(searchValue.trim());
};
```

검색 form 제출 시 새로고침을 막고, 입력값을 실제 검색어인 `keyword`로 반영합니다.

### 정렬 선택

```jsx
const selectOrder = (nextOrderBy) => {
  setOrderBy(nextOrderBy);
  setIsSortOpen(false);
};
```

정렬 옵션을 선택하면 정렬 기준을 바꾸고 드롭다운을 닫습니다.

## 10. 렌더링 구조

```jsx
return (
  <div className="market-page" id="top">
    <Header logoMode="market" navLinks={MARKET_NAV_LINKS} variant="market" />
    <MarketFloatingControls />
    <div className="market-desktop-scroll-slot">
      <ScrollTopButton />
    </div>

    <main className="market-main">
      <section className="market-section market-best-section">
        베스트 상품
      </section>

      <section className="market-section market-sale-section">
        판매 중인 상품
        정렬 드롭다운
        상품 상태 메시지
        상품 그리드
        페이지네이션
      </section>
    </main>

    <Footer />
  </div>
);
```

전체 구조는 다음 순서입니다.

1. 상단 헤더
2. 검색 / 상품 등록 floating 박스
3. 데스크탑용 위로가기 버튼 영역
4. 베스트 상품 영역
5. 판매 중인 상품 영역
6. 페이지네이션
7. 푸터

## 11. 흐름 요약

1. 화면 크기를 `useBreakpoint()`로 확인합니다.
2. 화면 크기에 맞는 상품 개수를 계산합니다.
3. 베스트 상품과 전체 상품을 `useProducts()`로 요청합니다.
4. 사용자가 검색어를 입력하면 350ms 뒤 `keyword`가 갱신됩니다.
5. `keyword`가 바뀌면 상품 목록을 다시 요청하고 페이지는 1로 초기화됩니다.
6. 정렬 기준을 바꾸면 상품 목록을 다시 요청하고 드롭다운은 닫힙니다.
7. 페이지네이션을 누르면 해당 페이지의 상품 목록을 다시 요청합니다.
