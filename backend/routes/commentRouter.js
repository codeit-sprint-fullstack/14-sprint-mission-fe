import express from 'express';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: 댓글 목록 조회
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 */
router.get('/', commentController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: 댓글 상세 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 댓글 상세 조회 성공
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
router.get('/:id', commentController.getCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: 댓글 수정
 *     tags: [Comments]
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
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: 수정된 댓글입니다.
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
router.patch('/:id', commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 *       404:
 *         description: 댓글을 찾을 수 없음
 */
router.delete('/:id', commentController.deleteComment);

/**
 * @swagger
 * /comments/product:
 *   post:
 *     summary: 상품 댓글 생성
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - content
 *             properties:
 *               productId:
 *                 type: string
 *                 example: e8dbe36d-0a5c-46a8-94cf-2db22b7d2d77
 *               content:
 *                 type: string
 *                 example: 좋은 상품이네요!
 *     responses:
 *       201:
 *         description: 상품 댓글 생성 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/product', commentController.createProductComment);

/**
 * @swagger
 * /comments/article:
 *   post:
 *     summary: 게시글 댓글 생성
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - articleId
 *               - content
 *             properties:
 *               articleId:
 *                 type: string
 *                 example: 0f16d4df-2b56-48ef-9f83-7a8b7fd46d0d
 *               content:
 *                 type: string
 *                 example: 유익한 글 감사합니다.
 *     responses:
 *       201:
 *         description: 게시글 댓글 생성 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/article', commentController.createArticleComment);

export default router;