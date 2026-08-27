import createHttpError from "../utils/createHttpError.js";

export function validateProductCreate(req, res, next) {
  const { name, description, price } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return next(createHttpError(400, "상품명을 입력해 주세요."));
  }

  if (typeof description !== "string" || !description.trim()) {
    return next(createHttpError(400, "상품 설명을 입력해 주세요."));
  }

  const isValidPriceType =
    typeof price === "number" || typeof price === "string";
  const priceNumber = Number(price);

  if (
    !isValidPriceType ||
    (typeof price === "string" && !price.trim()) ||
    !Number.isInteger(priceNumber) ||
    priceNumber < 0
  ) {
    return next(createHttpError(400, "올바른 가격을 입력해 주세요."));
  }

  return next();
}

export function validateProductUpdate(req, res, next) {
  const { name, description, price } = req.body;

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return next(createHttpError(400, "상품명을 입력해 주세요."));
  }

  if (
    description !== undefined &&
    (typeof description !== "string" || !description.trim())
  ) {
    return next(createHttpError(400, "상품 설명을 입력해 주세요."));
  }

  if (price !== undefined) {
    const isValidPriceType =
      typeof price === "number" || typeof price === "string";
    const priceNumber = Number(price);

    if (
      !isValidPriceType ||
      (typeof price === "string" && !price.trim()) ||
      !Number.isInteger(priceNumber) ||
      priceNumber < 0
    ) {
      return next(createHttpError(400, "올바른 가격을 입력해 주세요."));
    }
  }

  return next();
}
