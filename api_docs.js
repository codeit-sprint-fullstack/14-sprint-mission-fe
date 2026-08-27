// API 명세
/**
 * @swagger
 * /products:
 *   post:
 *     summary: 상품 등록
 *     description: 로그인한 사용자가 새 상품을 등록합니다. (이미지 최대 3개)
 *     tags:
 *        - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: 상품이 성공적으로 등록됨
 *       400:
 *         description: 필수값 누락 또는 이미지 4개 이상
 *       401:
 *         description: 인증 실패
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: 전체 상품 조회
 *     description: 등록된 모든 상품을 페이지네이션, 검색, 정렬 조건에 맞게 조회합니다.
 *     tags:
 *        - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호 (기본값 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 페이지 크기 (기본값 10)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [recent, favorite]
 *         description: 정렬 기준
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 검색 키워드
 *     responses:
 *       200:
 *         description: 상품 목록 반환
 */
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 특정 상품 조회
 *     description: 상품 ID로 특정 상품을 조회합니다.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 상세 정보 반환
 *       404:
 *         description: 상품을 찾을 수 없음
 */
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: 상품 수정
 *     description: 등록한 사용자 본인만 수정할 수 있습니다.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 등록한 사용자가 아님
 *       404:
 *         description: 상품을 찾을 수 없음
 */
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     description: 등록한 사용자 본인만 삭제할 수 있습니다.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 상품 삭제 성공
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 등록한 사용자가 아님
 *       404:
 *         description: 상품을 찾을 수 없음
 */
/**
 * @swagger
 * /products/{id}/favorite:
 *   post:
 *     summary: 상품 좋아요 추가
 *     description: $transaction 으로 Favorite 생성 + favoriteCount 증가. 이미 눌렀으면 멱등 처리.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: isFavorite=true 상태의 상품
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 상품을 찾을 수 없음
 */
/**
 * @swagger
 * /products/{id}/favorite:
 *   delete:
 *     summary: 상품 좋아요 취소
 *     description: $transaction 으로 Favorite 삭제 + favoriteCount 감소.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: isFavorite=false 상태의 상품
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 상품을 찾을 수 없음
 */
/**
 * @swagger
 * /products/{id}/comments:
 *   get:
 *     summary: 상품 댓글 목록 조회
 *     description: cursor 기반 페이지네이션 (id 내림차순).
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 개수 (기본 10, 최대 100)
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: 이전 응답의 nextCursor
 *     responses:
 *       200:
 *         description: 댓글 목록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentList'
 *       404:
 *         description: 상품을 찾을 수 없음
 *   post:
 *     summary: 상품 댓글 등록
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 등록된 댓글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: 내용 누락
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 상품을 찾을 수 없음
 */
/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: 이미지 업로드
 *     description: 단일 이미지를 업로드하고 업로드된 파일의 URL을 반환합니다.
 *     tags:
 *       - Images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *     responses:
 *       200:
 *         description: 업로드 성공, 이미지 URL 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: /uploads/1693100000000.jpg
 *       400:
 *         description: 이미지가 업로드되지 않았을 때 에러 반환
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nickname:
 *           type: string
 *           example: 판다마켓
 *         image:
 *           type: string
 *           nullable: true
 *           example: http://localhost:4000/uploads/1693100000000.png
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AuthResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT 액세스 토큰 (기본 1h)
 *         refreshToken:
 *           type: string
 *           description: JWT 리프레시 토큰 (기본 14d)
 *         user:
 *           $ref: '#/components/schemas/User'
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: 회원가입
 *     description: 이메일, 닉네임, 비밀번호로 회원가입하고 액세스/리프레시 토큰을 발급받습니다.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickname
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: panda@example.com
 *               nickname:
 *                 type: string
 *                 example: 판다마켓
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: password123
 *               passwordConfirmation:
 *                 type: string
 *                 format: password
 *                 description: 있으면 password 와 일치해야 함
 *                 example: password123
 *     responses:
 *       201:
 *         description: 회원가입 성공, 토큰 및 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: 필수값 누락 / 이메일 형식 오류 / 비밀번호 8자 미만 / 비밀번호 불일치
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: 이미 사용 중인 이메일 또는 닉네임
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     summary: 로그인
 *     description: 이메일과 비밀번호로 로그인하고 액세스/리프레시 토큰을 발급받습니다.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: panda@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 및 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: 이메일 또는 비밀번호 미입력
 *       401:
 *         description: 이메일 또는 비밀번호 불일치
 */

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: 구글 로그인 / 회원가입
 *     description: >
 *       프론트에서 받은 구글 토큰을 검증한다 (credential=ID토큰 또는 accessToken 중 하나).
 *       해당 이메일의 유저가 없으면 자동으로 회원가입(provider=google, 비밀번호 없음) 후 로그인 처리.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *                 description: GIS <GoogleLogin> 이 발급한 ID 토큰
 *               accessToken:
 *                 type: string
 *                 description: useGoogleLogin(implicit) 이 발급한 access 토큰
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 및 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: credential 누락
 *       401:
 *         description: 구글 인증 실패 / 이메일 미확인 계정
 *       503:
 *         description: 서버에 GOOGLE_CLIENT_ID 가 설정되지 않음
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: 액세스 토큰 재발급
 *     description: 유효한 리프레시 토큰으로 새 액세스/리프레시 토큰을 발급받습니다 (sliding session).
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: 재발급 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: refreshToken 미입력
 *       401:
 *         description: 유효하지 않거나 만료된 리프레시 토큰
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 내 정보 조회
 *     description: 액세스 토큰으로 로그인한 사용자의 정보를 조회합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: 토큰 없음 / 유효하지 않음 / 만료됨
 *       404:
 *         description: 유저를 찾을 수 없음
 *   patch:
 *     summary: 내 정보 수정
 *     description: 로그인한 사용자의 닉네임 또는 프로필 이미지를 수정합니다.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               image:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: 수정된 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: 인증 실패
 *       422:
 *         description: 이미 사용 중인 닉네임
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticleWriter:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         nickname:
 *           type: string
 *           example: 판다
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: 이미지 URL 배열 (최대 3개)
 *         likeCount:
 *           type: integer
 *           example: 4
 *         isLiked:
 *           type: boolean
 *           description: 요청 사용자의 좋아요 여부 (토큰 있을 때만 정확)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         writer:
 *           $ref: '#/components/schemas/ArticleWriter'
 *     ArticleList:
 *       type: object
 *       properties:
 *         list:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Article'
 *         totalCount:
 *           type: integer
 *           example: 20
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         writer:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             nickname:
 *               type: string
 *             image:
 *               type: string
 *               nullable: true
 *     CommentList:
 *       type: object
 *       properties:
 *         list:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         nextCursor:
 *           type: integer
 *           nullable: true
 *           description: 다음 페이지 커서 (없으면 null)
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 게시글 목록 조회
 *     description: 자유게시판 게시글을 페이지네이션·검색·정렬 조건으로 조회합니다. 토큰을 보내면 각 항목의 isLiked 가 계산됩니다.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호 (기본값 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 페이지 크기 (기본값 10)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [recent, like]
 *         description: 정렬 기준 (recent=최신순, like=좋아요순)
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 제목·내용 검색어
 *     responses:
 *       200:
 *         description: 게시글 목록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleList'
 *   post:
 *     summary: 게시글 등록
 *     description: 로그인한 사용자가 게시글을 등록합니다.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 최대 3개
 *     responses:
 *       201:
 *         description: 등록된 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: 제목/내용 누락 또는 이미지 4개 이상
 *       401:
 *         description: 인증 실패
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 상세
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *   patch:
 *     summary: 게시글 수정
 *     description: 작성자 본인만 수정할 수 있습니다.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 수정된 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: 이미지 4개 이상
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 작성자가 아님
 *       404:
 *         description: 게시글을 찾을 수 없음
 *   delete:
 *     summary: 게시글 삭제
 *     description: 작성자 본인만 삭제할 수 있습니다.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 작성자가 아님
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

/**
 * @swagger
 * /articles/{id}/like:
 *   post:
 *     summary: 게시글 좋아요
 *     description: $transaction 으로 ArticleLike 생성 + likeCount 증가. 이미 눌렀으면 멱등 처리.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: isLiked=true 상태의 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 게시글을 찾을 수 없음
 *   delete:
 *     summary: 게시글 좋아요 취소
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: isLiked=false 상태의 게시글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

/**
 * @swagger
 * /articles/{id}/comments:
 *   get:
 *     summary: 게시글 댓글 목록 조회
 *     description: cursor 기반 페이지네이션 (id 내림차순).
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 개수 (기본 10, 최대 100)
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *         description: 이전 응답의 nextCursor
 *     responses:
 *       200:
 *         description: 댓글 목록
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentList'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *   post:
 *     summary: 게시글 댓글 등록
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 등록된 댓글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: 내용 누락
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     summary: 댓글 수정
 *     description: 상품·게시글 댓글 공용. 작성자 본인만 수정할 수 있습니다.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정된 댓글
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: 내용 누락
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 작성자가 아님
 *       404:
 *         description: 댓글을 찾을 수 없음
 *   delete:
 *     summary: 댓글 삭제
 *     description: 상품·게시글 댓글 공용. 작성자 본인만 삭제할 수 있습니다.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 작성자가 아님
 *       404:
 *         description: 댓글을 찾을 수 없음
 */






