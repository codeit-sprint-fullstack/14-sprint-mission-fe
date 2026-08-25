import { Router } from "express";
import { signUp, login } from "../controllers/auth.controller.js";
import { validateSignUp, validateLogin } from "../middlewares/validateAuth.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/login", validateLogin, login);

export default authRouter;
