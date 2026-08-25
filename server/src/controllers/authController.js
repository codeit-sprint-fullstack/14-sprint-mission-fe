import { signIn, signUp } from "../services/authService.js";

export async function signUpController(req, res, next) {
  try {
    const result = await signUp(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

export async function signInController(req, res, next) {
  try {
    const result = await signIn(req.body);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}
