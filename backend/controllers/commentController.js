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
  const comments = await commentService.getComments();

  res.send(comments);
}

//게시글 단건조회
export const getCommentById = async (req, res) => {
  const {id} = req.params;
  const comment = await commentService.getCommentById(id);

  res.send(comment);
};

//댓글 등록
export const createComment = async (req, res) => {
  const result = await commentService.createComment(req.body);

  res.status(201).send(result);
}