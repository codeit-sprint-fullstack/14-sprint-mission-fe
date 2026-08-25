import { Router } from "express";
import { signUp, login, getMe } from "../controllers/auth.controller.js";
import { validateSignUp, validateLogin } from "../middlewares/validateAuth.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/login", validateLogin, login);
authRouter.get("/me", authenticate, getMe);

export default authRouter;
