import express from 'express';
import productController from '../controllers/productController.js';
import passport from '../config/passport.js';

const router = express.Router();

router.post(
  '', 
  passport.authenticate('access-token', { session: false }), 
  productController.createProduct
);

router.get(
  '', 
  productController.getProducts
);

router.get(
  '/:productId', 
  passport.authenticate('access-token', { session: false }),
  productController.getProduct
);

router.patch(
  '/:productId',
  passport.authenticate('access-token', { session: false }),
  productController.updateProduct
);

router.delete(
  '/:productId',
  passport.authenticate('access-token', { session: false }),
  productController.deleteProduct
);

router.post(
  '/:productId/favorite',
  passport.authenticate('access-token', { session: false }),
  productController.createFavorite
);

router.delete(
  '/:productId/favorite',
  passport.authenticate('access-token', { session: false }),
  productController.deleteFavorite
);

export default router;