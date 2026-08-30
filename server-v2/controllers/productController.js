import { assert } from 'superstruct';
import productService from '../services/productService.js';
import productStruct from '../structs/productStruct.js';

async function createProduct(req, res, next) {
  try {
    assert(req.body, productStruct.createProduct);
    const product = await productService.createProduct(req.body, req.user.id);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts(req.query);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const product = await productService.getProduct(productId, req.user.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    assert(req.body, productStruct.updateProduct);
    const productId  = Number(req.params.productId);
    const product = await productService.updateProduct(productId, req.body, req.user.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const product= await productService.deleteProduct(productId, req.user.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function createFavorite(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const product = await productService.createFavorite(productId, req.user.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteFavorite(req, res, next) {
  try {
    const productId = Number(req.params.productId);
    const product = await productService.deleteFavorite(productId, req.user.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createFavorite,
  deleteFavorite,
}