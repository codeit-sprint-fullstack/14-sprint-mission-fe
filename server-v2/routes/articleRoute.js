import express from 'express';
import passport from '../config/passport.js';
import articleController from '../controllers/articleController.js';

const router = express.Router();

router.post(
  '/', 
  passport.authenticate('access-token', { session: false }),
  articleController.createArticle
);

router.get(
  '/',
  articleController.getArticles
);

router.get(
  '/:articleId',
  passport.authenticate('access-token', { session: false }),
  articleController.getArticle
);

router.patch(
  '/:articleId',
  passport.authenticate('access-token', { session: false }),
  articleController.updateArticle
);

router.delete(
  '/:articleId',
  passport.authenticate('access-token', { session: false }),
  articleController.deleteArticle
);

router.post(
  '/:articleId/like',
  passport.authenticate('access-token', { session: false }),
  articleController.createLike
)

router.delete(
  '/:articleId/like',
  passport.authenticate('access-token', { session: false }),
  articleController.deleteLike
)

export default router;