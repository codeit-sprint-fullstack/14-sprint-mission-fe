import express from 'express';
import * as articleController from '../controllers/articleController.js';

const router = express.Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [Articles]
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
 *         example: 검색어
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 */
router.get('/', articleController.getArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 게시글 상세 조회 성공
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/:id', articleController.getArticleByid);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: 게시글 생성
 *     tags: [Articles]
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
 *                 example: 첫 번째 게시글
 *               content:
 *                 type: string
 *                 example: 게시글 내용입니다.
 *               image:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/image.png
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: 게시글 수정
 *     tags: [Articles]
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
 *               title:
 *                 type: string
 *                 example: 수정된 제목
 *               content:
 *                 type: string
 *                 example: 수정된 내용입니다.
 *               image:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/image.png
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.patch('/:id', articleController.updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: 게시글 삭제 성공
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.delete('/:id', articleController.deleteArticle);

export default router;