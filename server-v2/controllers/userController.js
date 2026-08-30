import { assert } from 'superstruct';
import userService from '../services/userService.js';
import userStruct from '../structs/userStruct.js';

async function getMe(req, res, next) {
  try {
    const user = await userService.getMe(req.user);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateImage(req, res, next) {
  try {
    assert(req.body, userStruct.updateImage);
    const user = await userService.updateImage(req.user.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req, res, next) {
  try {
    assert(req.body, userStruct.updatePassword);
    const user = await userService.updatePassword(req.user.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await userService.getProducts(req.user.id, req.query);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getFavoriteProducts(req, res, next) {
  try {
    const favorites = await userService.getFavoriteProducts(req.user.id, req.query);
    return res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
}

export default {
  getMe,
  updateImage,
  updatePassword,
  getProducts,
  getFavoriteProducts,
}