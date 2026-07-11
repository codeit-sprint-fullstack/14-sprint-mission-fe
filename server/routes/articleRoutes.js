import express from 'express'
import * as articleController from '../controllers/articleController.js'

const router = express.Router()

router.get('/', articleController.getArticles)
router.get('/:id', articleController.getArticle)
router.post('/', articleController.createArticle)
router.patch('/:id', articleController.patchArticle)
router.delete('/:id', articleController.deleteArticle)

export default router