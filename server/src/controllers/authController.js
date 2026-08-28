import { signIn, signUp } from "../services/authService.js";

export async function signUpController(req, res) {
  const result = await signUp(req.body);

  return res.status(201).json(result);
}

export async function signInController(req, res) {
  const result = await signIn(req.body);

  return res.json(result);
}
