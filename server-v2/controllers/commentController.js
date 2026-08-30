import { assert } from 'superstruct';
import commentService from '../services/commentService.js';
import commentStruct from '../structs/commentStruct.js';

async function createProductComment(req, res, next) {
  try {
    assert(req.body, commentStruct.createComment);
    const productId = Number(req.params.productId);
    const comment = await commentService.createProductComment(productId, req.body, req.user.id);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

async function getProductComments(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const comments = await commentService.getProductComments(productId, req.query);
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

async function createArticleComment(req, res, next) {
  try {
    assert(req.body, commentStruct.updateComment);
    const articleId = Number(req.params.articleId);
    const comment = await commentService.createArticleComment(articleId, req.body, req.user.id);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

async function getArticleComments(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const comments = await commentService.getArticleComments(articleId, req.query);
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    assert(req.body, commentStruct.updateComment);
    const commentId = Number(req.params.commentId);
    const comment = await commentService.updateComment(commentId, req.body, req.user.id);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const commentId = Number(req.params.commentId);
    const comment = await commentService.deleteComment(commentId, req.user.id);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export default {
  createProductComment,
  getProductComments,
  createArticleComment,
  getArticleComments,
  updateComment,
  deleteComment,
}