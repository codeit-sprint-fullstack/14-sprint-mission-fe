import AppError from "../errors/AppError.js";

export function validateCreateProduct(req, res, next) {
  const { name, description, price, tags = [], images = [] } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError(400, "상품명을 입력해 주세요."));
  }

  if (typeof description !== "string" || !description.trim()) {
    return next(new AppError(400, "상품 설명을 입력해 주세요."));
  }

  if (!Number.isInteger(price) || price < 0) {
    return next(new AppError(400, "가격은 0 이상의 정수여야 합니다."));
  }

  if (
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === "string" && Boolean(tag.trim()))
  ) {
    return next(new AppError(400, "태그는 문자열 배열이어야 합니다."));
  }

  if (!Array.isArray(images)) {
    return next(new AppError(400, "이미지는 문자열 배열이어야 합니다."));
  }

  if (images.length > 3) {
    return next(new AppError(400, "이미지는 최대 3개까지 등록할 수 있습니다."));
  }

  if (
    !images.every((image) => typeof image === "string" && Boolean(image.trim()))
  ) {
    return next(new AppError(400, "올바른 이미지 경로를 입력해 주세요."));
  }

  req.body = {
    name: name.trim(),
    description: description.trim(),
    price,
    tags: tags.map((tag) => tag.trim()),
    images: images.map((image) => image.trim()),
  };

  return next();
}
