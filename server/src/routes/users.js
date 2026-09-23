import express from "express";
import { getMeController } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", auth.verifyAccessToken, getMeController);

export default router;
