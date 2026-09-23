import express from "express";
import {
  signInController,
  signUpController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signUp", signUpController);

router.post("/signIn", signInController);

export default router;
