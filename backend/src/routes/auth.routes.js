import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { validateSignUp } from "../middlewares/validateAuth.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);

export default authRouter;
