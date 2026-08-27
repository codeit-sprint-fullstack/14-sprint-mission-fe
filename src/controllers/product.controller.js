import { asyncHandler, parseIntParam, parsePagination, parseCursor } from "../utils/http.js";
import { productService } from "../services/product.service.js";

const pid = (req) => parseIntParam(req.params.id, "상품 ID");

export const productController = {
  list: asyncHandler(async (req, res) => {
    res.json(await productService.list(parsePagination(req.query), req.userId));
  }),

  get: asyncHandler(async (req, res) => {
    res.json(await productService.get(pid(req), req.userId));
  }),

  create: asyncHandler(async (req, res) => {
    res.status(201).json(await productService.create(req.body, req.userId));
  }),

  update: asyncHandler(async (req, res) => {
    res.json(await productService.update(pid(req), req.body, req.userId));
  }),

  remove: asyncHandler(async (req, res) => {
    res.json(await productService.remove(pid(req), req.userId));
  }),

  addFavorite: asyncHandler(async (req, res) => {
    res.json(await productService.addFavorite(pid(req), req.userId));
  }),

  removeFavorite: asyncHandler(async (req, res) => {
    res.json(await productService.removeFavorite(pid(req), req.userId));
  }),

  listComments: asyncHandler(async (req, res) => {
    res.json(await productService.listComments(pid(req), parseCursor(req.query)));
  }),

  addComment: asyncHandler(async (req, res) => {
    res.status(201).json(await productService.addComment(pid(req), req.body.content, req.userId));
  }),
};
