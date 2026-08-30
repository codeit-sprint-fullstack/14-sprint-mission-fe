import AppError from "../errors/AppError.js";

export function uploadProductImages(req, res, next) {
  try {
    if (!req.files?.length) {
      throw new AppError(400, "업로드할 이미지를 선택해 주세요.");
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    return res.status(201).json({
      images,
    });
  } catch (error) {
    return next(error);
  }
}
