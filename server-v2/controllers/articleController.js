import { assert } from 'superstruct';
import articleService from '../services/articleService.js';
import articleStruct from '../structs/articleStruct.js';

async function createArticle(req, res, next) {
  try {
    assert(req.body, articleStruct.createArticle);
    const article = await articleService.createArticle(req.body, req.user.id);
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function getArticles(req, res, next) {
  try {
    const articles = await articleService.getArticles(req.query);
    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}

async function getArticle(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const article = await articleService.getArticle(articleId, req.user.id);
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function updateArticle(req, res, next) {
  try {
    assert(req.body, articleStruct.updateArticle);
    const articleId = Number(req.params.articleId);
    const article = await articleService.updateArticle(articleId, req.body, req.user.id);
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const article = await articleService.deleteArticle(articleId, req.user.id);
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function createLike(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const article = await articleService.createLike(articleId, req.user.id);
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function deleteLike(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const article = await articleService.deleteLike(articleId, req.user.id);
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

export default {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  createLike,
  deleteLike,
}