import express from 'express'

import {
  createProduct,
  getProductById,
} from '../controllers/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/:id', getProductById)

export default router
