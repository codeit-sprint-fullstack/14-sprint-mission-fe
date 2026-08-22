import { assert } from 'superstruct'
import { CreateComment, PatchComment } from '../structs.js'
import * as commentService from '../services/commentService.js'

export async function getProductComments(req, res, next) {
  try {
    const { productId } = req.params
    const productComments = await commentService.getProductComments(productId, req.query)
    res.send(productComments)
  } catch (err) {
    next(err)
  }
}

export async function getArticleComments(req, res, next) {
  try {
    const { articleId } = req.params
    const articleComments = await commentService.getArticleComments(articleId, req.query)
    res.send(articleComments)
  } catch(err) {
    next(err)
  }
}

export async function createProductComment(req, res, next) {
  try {
    assert(req.body, CreateComment)

    const { productId } = req.params
    const productComment = await commentService.createProductComment(productId, req.body)
    res.status(201).send(productComment)
  } catch (err) {
    next(err)
  }
}

export async function createArticleComment(req, res, next) {
  try {
    assert(req.body, CreateComment)

    const { articleId } = req.params
    const articleComment = await commentService.createArticleComment(articleId, req.body)
    res.status(201).send(articleComment)
  } catch (err) {
    next(err)
  }
}

export async function patchComment(req, res, next) {
  try {
    assert(req.body, PatchComment)

    const { commentId } = req.params
    const comment = await commentService.patchComment(commentId, req.body)
    res.send(comment)
  } catch (err) {
    next(err)
  }
}

export async function deleteComment(req, res, next) {
  try {
    const { commentId } = req.params
    await commentService.deleteComment(commentId)
    res.sendStatus(204)
  } catch(err) {
    next(err)
  }
}