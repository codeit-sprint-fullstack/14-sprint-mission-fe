import express from 'express';
import * as articleController from '../controllers/articleController.js';

const router = express.Router();

//게시글 목록조회
// [ ] id, title, content, createdAt를 조회합니다.
// [ ] offset 방식의 페이지네이션 기능을 포함해 주세요.
// [ ] 최신순(recent)으로 정렬할 수 있습니다.
// [ ] title, content에 포함된 단어로 검색할 수 있습니다.

router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleByid);
router.post('/', articleController.createArticle);

export default router;