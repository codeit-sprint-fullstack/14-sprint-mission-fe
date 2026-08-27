import fs from "fs";
import multer from "multer";

fs.mkdirSync("uploads/products", { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/products");
  },

  filename(req, file, callback) {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    callback(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

export default upload;
