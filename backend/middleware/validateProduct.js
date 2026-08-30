export function validateProduct(req, res, next) {
  // 상품 이름 검사
  if (!req.body.name || !req.body.name.trim()) {
    return res.status(400).send({
      message: "상품 이름이 필요합니다."
    });
  }

  // 상품 설명 검사
  if (!req.body.description || !req.body.description.trim()) {
    return res.status(400).send({
      message: "상품 설명이 필요합니다."
    });
  }

  // FormData로 들어온 가격을 숫자로 변환
  const price = Number(req.body.price);

  // 숫자가 아니거나 0 이하인지 검사
  if (Number.isNaN(price) || price <= 0) {
    return res.status(400).send({
      message: "올바른 상품 가격이 필요합니다."
    });
  }

  // 모든 검사 통과 → 다음 단계로 이동
  next();
}