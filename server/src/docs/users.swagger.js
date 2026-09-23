/**
 * @openapi
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: 내 정보 조회
 *     description: 액세스 토큰으로 현재 로그인한 사용자 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
