import * as commentService from '../services/commentService.js';

export const getArticleComments = async (req, res) => {
  try {
    const commentType = 'ARTICLE_COMMENT';
    const cursor = req.query.cursor;
    const limit = Number(req.query.limit ?? 10);

    const result = await commentService.getComments(
      commentType,
      cursor,
      limit
    );

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '게시글 댓글 조회에 실패했습니다.' });
  }
};

export const getProductComments = async (req, res) => {
  try {
    const commentType = 'PRODUCT_COMMENT';
    const cursor = req.query.cursor;
    const limit = Number(req.query.limit ?? 10);

    const result = await commentService.getComments(
      commentType,
      cursor,
      limit
    );

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '상품 댓글 조회에 실패했습니다.' });
  }
};

export const getComments = async (req, res) => {
  try {
    const commentType = req.query.commentType;
    const cursor = req.query.cursor;
    const limit = Number(req.query.limit ?? 10);

    const result = await commentService.getComments(
      commentType,
      cursor,
      limit
    );

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '댓글 조회에 실패했습니다.' });
  }
};

// 댓글 단건 조회
export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getCommentById(id);

    if (!comment) {
      return res.status(404).send({ message: '댓글을 찾을 수 없습니다.' });
    }

    res.status(200).send(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '댓글 조회에 실패했습니다.' });
  }
};

// 댓글 수정
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commentService.updateComment(id, req.body);

    if (!result) {
      return res.status(404).send({ message: '댓글을 찾을 수 없습니다.' });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: '댓글 수정에 실패했습니다.' });
  }
};

// 댓글 삭제
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(id);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '댓글 삭제에 실패했습니다.' });
  }
};

// 중고거래 댓글 등록
export const createProductComment = async (req, res) => {
  try {
    const result = await commentService.createComment(
      req.body,
      'PRODUCT_COMMENT'
    );

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: '상품 댓글 등록에 실패했습니다.' });
  }
};

// 자유게시판 댓글 등록
export const createArticleComment = async (req, res) => {
  try {
    const result = await commentService.createComment(
      req.body,
      'ARTICLE_COMMENT'
    );

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: '게시글 댓글 등록에 실패했습니다.' });
  }
};