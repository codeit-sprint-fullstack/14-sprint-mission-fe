import { asyncHandler, parseIntParam, parsePagination, parseCursor } from "../utils/http.js";
import { articleService } from "../services/article.service.js";

const aid = (req) => parseIntParam(req.params.id, "게시글 ID");

export const articleController = {
  list: asyncHandler(async (req, res) => {
    res.json(await articleService.list(parsePagination(req.query), req.userId));
  }),

  get: asyncHandler(async (req, res) => {
    res.json(await articleService.get(aid(req), req.userId));
  }),

  create: asyncHandler(async (req, res) => {
    res.status(201).json(await articleService.create(req.body, req.userId));
  }),

  update: asyncHandler(async (req, res) => {
    res.json(await articleService.update(aid(req), req.body, req.userId));
  }),

  remove: asyncHandler(async (req, res) => {
    res.json(await articleService.remove(aid(req), req.userId));
  }),

  addLike: asyncHandler(async (req, res) => {
    res.json(await articleService.addLike(aid(req), req.userId));
  }),

  removeLike: asyncHandler(async (req, res) => {
    res.json(await articleService.removeLike(aid(req), req.userId));
  }),

  listComments: asyncHandler(async (req, res) => {
    res.json(await articleService.listComments(aid(req), parseCursor(req.query)));
  }),

  addComment: asyncHandler(async (req, res) => {
    res.status(201).json(await articleService.addComment(aid(req), req.body.content, req.userId));
  }),
};
