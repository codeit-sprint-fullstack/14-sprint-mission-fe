import express from "express";
import { authenticate } from "../src/middlewares/authenticate.js";
import { userController } from "../src/controllers/user.controller.js";

const router = express.Router();

router
  .route("/me")
  .get(authenticate, userController.getMe)
  .patch(authenticate, userController.updateMe);

export default router;
