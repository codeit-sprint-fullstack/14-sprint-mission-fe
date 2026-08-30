import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({
      message: "로그인이 필요합니다."
    })
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    )
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "유효하지 않은 토큰입니다.",
    });
  }
}