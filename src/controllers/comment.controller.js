import { asyncHandler, parseIntParam } from "../utils/http.js";
import { commentService } from "../services/comment.service.js";

const cid = (req) => parseIntParam(req.params.commentId, "댓글 ID");

export const commentController = {
  update: asyncHandler(async (req, res) => {
    res.json(await commentService.update(cid(req), req.body.content, req.userId));
  }),

  remove: asyncHandler(async (req, res) => {
    res.json(await commentService.remove(cid(req), req.userId));
  }),
};
