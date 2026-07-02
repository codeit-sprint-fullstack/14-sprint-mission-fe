import express from 'express';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);

export default router;