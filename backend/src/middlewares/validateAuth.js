import AppError from "../errors/AppError.js";

export function validateSignUp(req, res, next) {
  const { email, nickname, password } = req.body ?? {};

  if (typeof email !== "string" || !email.trim()) {
    return next(new AppError(400, "이메일을 입력해 주세요."));
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(normalizedEmail)) {
    return next(new AppError(400, "올바른 이메일 형식이 아닙니다."));
  }

  if (typeof nickname !== "string" || !nickname.trim()) {
    return next(new AppError(400, "닉네임을 입력해 주세요."));
  }

  if (typeof password !== "string" || password.length < 8) {
    return next(new AppError(400, "비밀번호는 8자 이상이어야 합니다."));
  }

  req.body = {
    ...req.body,
    email: normalizedEmail,
    nickname: nickname.trim(),
  };

  return next();
}

export function validateLogin(req, res, next) {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || !email.trim()) {
    return next(new AppError(400, "이메일을 입력해 주세요."));
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(normalizedEmail)) {
    return next(new AppError(400, "올바른 이메일 형식이 아닙니다."));
  }

  if (typeof password !== "string" || password.length < 8) {
    return next(new AppError(400, "비밀번호는 8자 이상이어야 합니다."));
  }

  req.body = {
    ...req.body,
    email: normalizedEmail,
  };

  return next();
}
