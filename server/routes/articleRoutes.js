import express from 'express'
import * as articleController from '../controllers/articleController.js'
import * as commentController from '../controllers/commentController.js'

const router = express.Router()

router.get('/', articleController.getArticles)
router.get('/:articleId', articleController.getArticle)
router.post('/', articleController.createArticle)
router.patch('/:articleId', articleController.patchArticle)
router.delete('/:articleId', articleController.deleteArticle)

router.get('/:articleId/comments', commentController.getArticleComments)
router.post('/:articleId/comments', commentController.createArticleComment)

export default router