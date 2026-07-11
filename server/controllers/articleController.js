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
    const article = await articleService.getArticle(req.params.id)
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

    const article = await articleService.patchArticle(req.params.id, req.body)
    res.send(article)
  } catch(err) {
    next(err)
  }
}

export async function deleteArticle(req, res, next) {
  try {
    await articleService.deleteArticle(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}