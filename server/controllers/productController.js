import { assert } from 'superstruct'
import { CreateProduct, PatchProduct } from '../structs.js'
import * as productService from '../services/productService.js'

export async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts(req.query)
    res.send(products)
  } catch (err) {
    next(err)
  }
}

export async function getProduct(req, res, next) {
  try {
    const { productId } = req.params
    const product = await productService.getProduct(productId)
    res.send(product)
  } catch (err) {
    next(err)
  }
}

export async function createProduct(req, res, next) {
  try {
    assert(req.body, CreateProduct)

    const product = await productService.createProduct(req.body)
    res.status(201).send(product)
  } catch (err) {
    next(err)
  }
}

export async function patchProduct(req, res, next) {
  try {
    assert(req.body, PatchProduct)

    const { productId } = req.params
    const product = await productService.patchProduct(productId, req.body)
    res.send(product)
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { productId } = req.params
    await productService.deleteProduct(productId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}