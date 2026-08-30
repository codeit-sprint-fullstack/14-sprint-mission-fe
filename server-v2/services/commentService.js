import commentRepository from '../repositories/commentRepository.js';
import productRepository from '../repositories/productRepository.js';
import articleRepository from '../repositories/articleRepository.js';

// 응답 형식 포맷 함수
function formatComment(comment) {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    writer: {
      id: comment.user.id,
      nickname: comment.user.nickname,
    },
  };
}

// 상품 댓글 생성하기
async function createProductComment(productId, data, userId) {
  // 1. 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }

  // 2. 상품에 댓글 생성
  const comment = await commentRepository.save({ productId, comment: data, userId });
  
  return formatComment(comment);
}

// 상품 댓글 가져오기
async function getProductComments(productId, query = {}) {
  // 1. 상품이 있는지 확인
  const existingProduct = await productRepository.findUnique(productId);
  if (!existingProduct) {
    const error = new Error('Product not found');
    error.code = 404;
    throw error;
  }
  
  // 2. 상품의 댓글 가져오기
  const { limit = 4, cursor } = query;
  const limitNumber = Number(limit);
  const cursorNumber = Number(cursor);

  const { nextCursor, comments } = await commentRepository.findMany({ 
    productId, 
    limit: limitNumber, 
    cursor: cursorNumber 
  });

  return {
    nextCursor,
    list: comments.map(formatComment),
  }
}

// 게시글 댓글 생성하기
async function createArticleComment(articleId, data, userId) {
  // 1. 게시글이 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 게시글에 댓글 생성
  const comment = await commentRepository.save({ articleId, comment: data, userId });
  
  return formatComment(comment);
}

// 게시글 댓글 가져오기
async function getArticleComments(articleId, query = {}) {
  // 1. 게시글이 있는지 확인
  const existingArticle = await articleRepository.findUnique(articleId);
  if (!existingArticle) {
    const error = new Error('Article not found');
    error.code = 404;
    throw error;
  }

  // 2. 게시글의 댓글 가져오기
  const { limit = 4, cursor } = query;
  const limitNumber = Number(limit);
  const cursorNumber = Number(cursor);

  const { nextCursor, comments } = await commentRepository.findMany({ 
    articleId, 
    limit: limitNumber, 
    cursor: cursorNumber 
  })

  return {
    nextCursor,
    list: comments.map(formatComment),
  }
}

// 댓글 수정하기
async function updateComment(commentId, data, userId) {
  // 1. 수정하려는 댓글이 있는지 확인
  const existingComment = await commentRepository.findUnique(commentId);
  if (!existingComment) {
    const error = new Error('Comment not found');
    error.code = 404;
    throw error;
  }

  // 2. 수정하려는 댓글의 작성자와 유저가 동일한지 비교
  if (existingComment.user.id !== userId) {
    const error = new Error('Forbidden');
    error.code = 403;
    throw error;
  }

  // 3. 통과하면 댓글 수정하기
  const updatedComment = await commentRepository.update(commentId, data);

  return formatComment(updatedComment);
}

// 댓글 삭제하기
async function deleteComment(commentId, userId) {
  //1. 삭제하려는 댓글 있는지 확인
  const existingComment = await commentRepository.findUnique(commentId);
  if (!existingComment) {
    const error = new Error('Comment not found');
    error.code = 404;
    throw error;
  }

  // 2. 삭제하려는 댓글 작성자와 유저가 동일한지 비교
  if (existingComment.user.id !== userId) {
    const error = new Error('Forbidden');
    error.code = 403;
    throw error;
  }

  // 3. 통과하면 댓글 삭제
  return await commentRepository.remove(commentId);
}

export default {
  createProductComment,
  getProductComments,
  createArticleComment,
  getArticleComments,
  updateComment,
  deleteComment,
}