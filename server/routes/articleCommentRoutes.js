import express from 'express'

import {
  deleteArticleComment,
  updateArticleComment,
} from '../controllers/articleCommentController.js'

const router = express.Router()

router.patch('/:id', updateArticleComment)
router.delete('/:id', deleteArticleComment)

export default router
