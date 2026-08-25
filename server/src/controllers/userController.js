import { getUserById } from "../services/userService.js";

export async function getMeController(req, res, next) {
  try {
    const userId = req.user.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
