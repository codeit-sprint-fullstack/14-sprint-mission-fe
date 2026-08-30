import { Router } from "express";
import { uploadProductImages } from "../controllers/upload.controller.js";
import authenticate from "../middlewares/authenticate.js";
import uploadImages from "../middlewares/uploadImages.js";

const uploadRouter = Router();

uploadRouter.post("/images", authenticate, uploadImages, uploadProductImages);

export default uploadRouter;
