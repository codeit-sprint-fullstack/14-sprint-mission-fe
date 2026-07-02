import express from 'express'

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)
router.post('/', createProduct)
router.get('/:id', getProductById)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
