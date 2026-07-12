import express from 'express'
import * as productController from '../controllers/productController.js'
import * as commentController from '../controllers/commentController.js'

const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProduct)
router.post('/', productController.createProduct)
router.patch('/:productId', productController.patchProduct)
router.delete('/:productId', productController.deleteProduct)

router.get('/:productId/comments', commentController.getProductComments)
router.post('/:productId/comments', commentController.createProductComment)

export default router