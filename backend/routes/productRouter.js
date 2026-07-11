import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: 아이폰
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 상품 상세 조회 성공
 *       404:
 *         description: 상품을 찾을 수 없음
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: 상품 등록
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: 상태 좋은 중고 아이폰입니다.
 *               price:
 *                 type: integer
 *                 example: 950000
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com/image1.jpg
 *                   - https://example.com/image2.jpg
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - 애플
 *                   - 스마트폰
 *     responses:
 *       201:
 *         description: 상품 등록 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: 상품 수정
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro Max
 *               description:
 *                 type: string
 *                 example: 상태 매우 좋은 상품입니다.
 *               price:
 *                 type: integer
 *                 example: 1000000
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *       404:
 *         description: 상품을 찾을 수 없음
 */
router.patch('/:id', productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: 상품 삭제 성공
 *       404:
 *         description: 상품을 찾을 수 없음
 */
router.delete('/:id', productController.deleteProduct);

export default router;