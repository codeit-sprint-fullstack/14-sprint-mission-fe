# SPRINT MISSION 3 (PANDA MARKET)

## 스프린트 미션 3 체크리스트

### 기본 요구사항

- [O] Github에 스프린트 미션 PR을 만들어 주세요.
- [O] 'https://panda-market-api-crud.vercel.app/docs/#/Article' API를 이용하여 아래 함수들을 구현해 주세요.
- [O] getArticleList() : GET 메서드를 사용해 주세요.
- [O] page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
- [O] getArticle() : GET 메서드를 사용해 주세요.
- [O] createArticle() : POST 메서드를 사용해 주세요.
- [O] request body에 title, content, image 를 포함해 주세요.
- [O] patchArticle() : PATCH 메서드를 사용해 주세요.
- [O] deleteArticle() : DELETE 메서드를 사용해 주세요.
- [O] fetch 혹은 axios 를 이용해 주세요.

- [O] 응답의 상태 코드가 2XX가 아닐 경우, 에러메시지를 콘솔에 출력해 주세요.
- [O] .then() 메서드를 이용하여 비동기 처리를 해주세요.

- [O] .catch() 를 이용하여 오류 처리를 해주세요.

- [O] 'https://panda-market-api-crud.vercel.app/docs/#/Product' API를 이용하여 아래 함수들을 구현해 주세요.

- [O] getProductList() : GET 메서드를 사용해 주세요.
- [O] page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
- [O] getProduct() : GET 메서드를 사용해 주세요.
- [O] createProduct() : POST 메서드를 사용해 주세요.
- [O] request body에 name, description, price, tags, images 를 포함해 주세요.
- [O] patchProduct() : PATCH 메서드를 사용해 주세요.
- [O] deleteProduct() : DELETE 메서드를 사용해 주세요.
- [O] async/await 을 이용하여 비동기 처리를 해주세요.

- [O] try/catch 를 이용하여 오류 처리를 해주세요.

- [O] 구현한 함수들을 아래와 같이 파일을 분리해 주세요.

- [O] export를 활용해 주세요.
- [O] ProductService.js 파일 Product API 관련 함수들을 작성해 주세요.
- [O] ArticleService.js 파일에 Article API 관련 함수들을 작성해 주세요.
- [O] 이외의 코드들은 모두 main.js 파일에 작성해 주세요.

- [O] import를 활용해 주세요.
- [O] 각 함수를 실행하는 코드를 작성하고, 제대로 동작하는지 확인해 주세요.

---

### 심화 요구사항

- [x] PC 사이즈를 고려한 디자인 구현
- [x] HTML, CSS 파일을 Netlify로 배포
- [x] reset.css를 설정
- [x] 사용자 브라우저 설정에 따라 글꼴 크기 설정이 변경되어도 페이지와 요소 간 간격, 요소의 크기, font-size 등이 비율에 맞게 변경되도록 구현

## 스프린트 미션 1 체크리스트

### 로그인 페이지, 회원가입 페이지 공통

- [x] "판다마켓" 로고 클릭 시 루트 페이지("/")로 이동합니다.
- [x] SNS 아이콘들은 클릭 시 각각
  - "https://www.google.com/"
  - "https://www.kakaocorp.com/page/"  
    으로 이동합니다.
- [x] input 요소에 focus in 일 때, 테두리 색상은 `#3692FF`입니다.
- [x] input 요소에 focus out 일 때, 테두리는 없습니다.

### 로그인 페이지

- [x] "회원가입" 버튼 클릭 시 "/signup" 페이지로 이동합니다.

### 회원가입 페이지

- [x] "로그인" 버튼 클릭 시 "/login" 페이지로 이동합니다.

### 공통 요구사항

- [x] PC사이즈만 고려해 주어진 디자인을 구현합니다.
- [x] HTML, CSS 파일을 Netlify로 배포해 주세요.

--

### 심화 요구사항

- [x] PC 사이즈를 고려한 디자인 구현
- [x] HTML, CSS 파일을 Netlify로 배포
- [x] reset.css를 설정
- [x] 사용자 브라우저 설정에 따라 글꼴 크기 설정이 변경되어도 페이지와 요소 간 간격, 요소의 크기, font-size 등이 비율에 맞게 변경되도록 구현
