import * as commentService from '../services/commentService.js';

//댓글 목록조회
// [ ] 댓글 등록 API를 만들어 주세요.
// [ ] content를 입력하여 댓글을 등록합니다.
// [ ] 중고마켓, 자유게시판 댓글 등록 API를 따로 만들어 주세요.
// [ ] 댓글 수정 API를 만들어 주세요.
// [ ] PATCH 메서드를 사용해 주세요.
// [ ] 댓글 삭제 API를 만들어 주세요.
// [ ] 댓글 목록 조회 API를 만들어 주세요.
// [ ] id, content, createdAt 를 조회합니다.
// [ ] cursor 방식의 페이지네이션 기능을 포함해 주세요.
// [ ] 중고마켓, 자유게시판 댓글 목록 조회 API를 따로 만들어 주세요.
export const getComments = async (req, res) => {
  // const articleId = req.params.id;
  const cursor = req.query.cursor;
  const limit = Number(req.query.limit ?? 10);

  const result = await commentService.getComments(
    // articleId,
    cursor,
    limit
  );

  res.send(result);
};

//댓글 단건조회
export const getCommentById = async (req, res) => {
  const {id} = req.params;
  const comment = await commentService.getCommentById(id);

  res.send(comment);
};

//댓글 수정
export const updateComment = async (req, res) => {
  const {id} = req.params;
  const result = await commentService.updateComment(id, req.body);

  res.status(201).send(result);
}

//댓글 삭제
export const deleteComment = async (req, res) => {
  const {id} = req.params;
  await commentService.deleteComment(id);

  res.sendStatus(204);
}

//중고거래 댓글 등록
export const createProductComment = async (req, res) => {
  const result = await commentService.createComment(req.body, 'PRODUCT_COMMENT');

  res.status(201).send(result);
}

//자유게시판 댓글 등록
export const createArticleComment = async (req, res) => {
  const result = await commentService.createComment(req.body, 'ARTICLE_COMMENT');

  res.status(201).send(result);
}