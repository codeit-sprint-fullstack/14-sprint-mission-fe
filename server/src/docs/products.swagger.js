/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: 상품 목록 조회
 *     description: 상품 목록을 조회합니다. 액세스 토큰이 있으면 각 상품의 isLiked가 현재 사용자를 기준으로 계산됩니다.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum:
 *             - recent
 *             - likes
 *           default: recent
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ProductWithLike"
 *                 totalCount:
 *                   type: integer
 *       400:
 *         description: 잘못된 페이지 조회 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *
 *   post:
 *     tags:
 *       - Products
 *     summary: 상품 등록
 *     description: 로그인한 사용자가 상품과 최대 3개의 이미지를 등록합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *                 minimum: 0
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 maxItems: 3
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: 상품 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       400:
 *         description: 잘못된 상품 정보 또는 이미지 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: 상품 상세 조회
 *     description: 상품 상세 정보와 댓글 일부를 조회합니다. 액세스 토큰이 있으면 isLiked가 현재 사용자를 기준으로 계산됩니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: 상품 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductDetail"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *
 *   patch:
 *     tags:
 *       - Products
 *     summary: 상품 수정
 *     description: 상품을 등록한 사용자만 수정할 수 있습니다. 기존 이미지 경로와 새 이미지 파일을 images 필드로 전달하며 전체 이미지는 최대 3개입니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *                 minimum: 0
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 maxItems: 3
 *                 description: 기존 이미지 경로 문자열 또는 새 이미지 파일
 *                 items:
 *                   oneOf:
 *                     - type: string
 *                     - type: string
 *                       format: binary
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       400:
 *         description: 잘못된 상품 정보 또는 이미지 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       403:
 *         description: 상품 수정 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *
 *   delete:
 *     tags:
 *       - Products
 *     summary: 상품 삭제
 *     description: 상품을 등록한 사용자만 삭제할 수 있습니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: 상품 삭제 성공
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       403:
 *         description: 상품 삭제 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @openapi
 * /products/{productId}/likes:
 *   post:
 *     tags:
 *       - Products
 *     summary: 상품 좋아요
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: 상품 좋아요 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LikeResult"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *
 *   delete:
 *     tags:
 *       - Products
 *     summary: 상품 좋아요 취소
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: 상품 좋아요 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LikeResult"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @openapi
 * /products/{productId}/comments:
 *   get:
 *     tags:
 *       - Product Comments
 *     summary: 상품 댓글 목록 조회
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: 상품 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CommentPage"
 *       400:
 *         description: 잘못된 댓글 조회 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *
 *   post:
 *     tags:
 *       - Product Comments
 *     summary: 상품 댓글 등록
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *                 minLength: 1
 *     responses:
 *       201:
 *         description: 상품 댓글 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *       400:
 *         description: 댓글 내용 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: 상품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
