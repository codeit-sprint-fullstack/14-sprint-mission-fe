import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 사용자 목록 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 사용자 상세 조회
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 사용자 상세 조회 성공
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 사용자 생성
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickname
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hong@example.com
 *               nickname:
 *                 type: string
 *                 example: 홍길동
 *               image:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/profile.png
 *     responses:
 *       201:
 *         description: 사용자 생성 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', userController.createUser);

export default router;