import { signUp as signUpService } from "../services/auth.service.js";

export async function signUp(req, res, next) {
  try {
    const user = await signUpService(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}
