import { BadRequest } from "../errors/HttpError.js";

const MAX_IMAGES = 3;

// 상품 등록 유효성 검사
export function validateProduct(req, res, next) {
  const { name, description, price } = req.body;

  if (Array.isArray(req.body.images) && req.body.images.length > MAX_IMAGES) {
    return next(BadRequest(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`));
  }
  if (!name || !description || price === undefined || price === null || price === "") {
    return next(BadRequest("상품명, 설명, 가격은 필수입니다."));
  }
  const priceNum = Number(price);
  if (Number.isNaN(priceNum) || priceNum <= 0) {
    return next(BadRequest("가격은 0보다 큰 숫자여야 합니다."));
  }
  next();
}

// 게시글 등록 유효성 검사
export function validateArticle(req, res, next) {
  const { title, content } = req.body;

  if (!title || !title.trim() || !content || !content.trim()) {
    return next(BadRequest("제목과 내용은 필수입니다."));
  }
  if (Array.isArray(req.body.images) && req.body.images.length > MAX_IMAGES) {
    return next(BadRequest(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`));
  }
  next();
}
