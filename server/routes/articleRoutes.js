import express from 'express'

import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from '../controllers/articleController.js'

const router = express.Router()

router.get('/', getArticles)
router.post('/', createArticle)
router.get('/:id', getArticleById)
router.patch('/:id', updateArticle)
router.delete('/:id', deleteArticle)

export default router
