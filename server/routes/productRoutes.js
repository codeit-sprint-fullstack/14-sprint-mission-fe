import express from 'express'
import * as productController from '../controllers/productController.js'

const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProduct)
router.post('/', productController.createProduct)
router.patch('/:productId', productController.patchProduct)
router.delete('/:productId', productController.deleteProduct)

export default router