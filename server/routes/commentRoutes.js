import express from 'express'
import * as commentController from '../controllers/commentController.js'

const router = express.Router()

router.get('/products/:productId/comments', commentController.getProductComments)
router.get('/articles/:articleId/comments', commentController.getArticleComments)
router.post('/products/:productId/comments', commentController.createProductComment)
router.post('/articles/:articleId/comments', commentController.createArticleComment)
router.patch('/comments/:commentId', commentController.patchComment)
router.delete('/comments/:commentId', commentController.deleteComment)

export default router