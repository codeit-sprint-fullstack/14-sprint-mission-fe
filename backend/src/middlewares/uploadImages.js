import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",

  filename(req, file, callback) {
    const extension = extname(file.originalname);

    callback(null, `${randomUUID()}${extension}`);
  },
});

const uploadImages = multer({
  storage,
}).array("images", 3);

export default uploadImages;
