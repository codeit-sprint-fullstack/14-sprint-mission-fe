import express from 'express';
import passport from '../config/passport.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get(
  '',
  passport.authenticate('access-token', { session: false }),
  userController.getMe
);

router.patch(
  '/',
  passport.authenticate('access-token', { session: false }),
  userController.updateImage
);

router.patch(
  '/password',
  passport.authenticate('access-token', { session: false }),
  userController.updatePassword
);

router.get(
  '/products',
  passport.authenticate('access-token', { session: false }),
  userController.getProducts
)

router.get(
  '/favorites',
  passport.authenticate('access-token', { session: false }),
  userController.getFavoriteProducts
)

export default router;