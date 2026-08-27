import { asyncHandler } from "../utils/http.js";
import { userService } from "../services/user.service.js";

export const userController = {
  getMe: asyncHandler(async (req, res) => {
    res.json(await userService.getMe(req.userId));
  }),

  updateMe: asyncHandler(async (req, res) => {
    res.json(await userService.updateMe(req.userId, req.body));
  }),
};
