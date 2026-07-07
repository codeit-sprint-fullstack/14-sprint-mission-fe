import express from 'express'
import * as productController from '../controllers/productController.js'

const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)
router.post('/', productController.createProduct)
router.patch('/:id', productController.patchProduct)
router.delete('/:id', productController.deleteProduct)

export default router