import * as articleCommentService from '../service/articleComment.service.js';

// 목록 조회 (cursor 페이지네이션)
export async function getArticleCommentList(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
    const take = Number(req.query.take) || 10;

    const comments = await articleCommentService.getArticleCommentList(articleId, cursor, take);

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
}

// 등록
export async function createArticleComment(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const newComment = await articleCommentService.createArticleComment(articleId, req.body);

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
}

// 수정 (PATCH)
export async function patchArticleComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updatedComment = await articleCommentService.patchArticleComment(id, req.body);

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
}

// 삭제
export async function deleteArticleComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    await articleCommentService.deleteArticleComment(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}