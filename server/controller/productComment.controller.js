import * as productCommentService from '../service/productComment.service.js';
// 컨트롤러: 브라우저와 소통
// 서비스: 데이터베이스와 소통

// 목록 조회 (cursor 페이지네이션)
export async function getProductCommentList(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
    const take = Number(req.query.take) || 10;

    const comments = await productCommentService.getProductCommentList(productId, cursor, take);

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
}

// 등록
export async function createProductComment(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const newComment = await productCommentService.createProductComment(productId, req.body);

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
}

// 수정 (PATCH)
export async function patchProductComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updatedComment = await productCommentService.patchProductComment(id, req.body);

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
}

// 삭제
export async function deleteProductComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    await productCommentService.deleteProductComment(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
