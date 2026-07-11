import express from 'express'
import * as articleController from '../controllers/articleController.js'

const router = express.Router()

router.get('/', articleController.getArticles)
router.get('/:articleId', articleController.getArticle)
router.post('/', articleController.createArticle)
router.patch('/:articleId', articleController.patchArticle)
router.delete('/:articleId', articleController.deleteArticle)

export default router