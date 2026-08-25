import {
  signUp as signUpService,
  login as loginService,
} from "../services/auth.service.js";

export async function signUp(req, res, next) {
  try {
    const user = await signUpService(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginService(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
