import { assert } from 'superstruct'
import { CreateArticle, PatchArticle } from '../structs.js'
import * as articleService from '../services/articleService.js'

export async function getArticles(req, res, next) {
  try {
    const articles = await articleService.getArticles(req.query)
    res.send(articles)
  } catch(err) {
    next(err)
  }
}

export async function getArticle(req, res, next) {
  try {
    const { articleId } = req.params
    const article = await articleService.getArticle(articleId)
    res.send(article)
  } catch (err) {
    next(err)
  }
}

export async function createArticle(req, res, next) {
  try {
    assert(req.body, CreateArticle)

    const article = await articleService.createArticle(req.body)
    res.status(201).send(article)
  } catch (err) {
    next(err)
  }
}

export async function patchArticle(req, res, next) {
  try {
    assert(req.body, PatchArticle)

    const { articleId } = req.params
    const article = await articleService.patchArticle(articleId, req.body)
    res.send(article)
  } catch(err) {
    next(err)
  }
}

export async function deleteArticle(req, res, next) {
  try {
    const { articleId } = req.params
    await articleService.deleteArticle(articleId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}