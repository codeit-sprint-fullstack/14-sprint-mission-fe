import express from "express";
import { authController } from "../src/controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);
router.post("/google", authController.google);
router.post("/refresh-token", authController.refresh);

export default router;
