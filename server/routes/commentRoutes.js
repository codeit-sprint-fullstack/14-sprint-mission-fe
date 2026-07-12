import express from 'express'
import * as commentController from '../controllers/commentController.js'

const router = express.Router()

router.patch('/:commentId', commentController.patchComment)
router.delete('/:commentId', commentController.deleteComment)

export default router