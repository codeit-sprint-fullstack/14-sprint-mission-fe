import { Router } from 'express';
import { deleteComment, patchComment } from '../controllers/commentController.js';

const router = Router();

router.patch('/:commentId', patchComment);
router.delete('/:commentId', deleteComment);

export default router;
