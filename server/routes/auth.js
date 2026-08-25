import express from "express";
import { signIn, signUp } from "../services/authService.js";

const router = express.Router();

router.post("/signUp", async (req, res, next) => {
  try {
    const result = await signUp(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
});

router.post("/signIn", async (req, res, next) => {
  try {
    const result = await signIn(req.body);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

export default router;
