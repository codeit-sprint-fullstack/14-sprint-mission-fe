import { getUserById } from "../services/userService.js";

export async function getMeController(req, res) {
  const userId = req.user.userId;

  const user = await getUserById(userId);

  return res.json(user);
}
