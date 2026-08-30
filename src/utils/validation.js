export function validateEmail(email) {
  if (!email) {
    return "이메일을 입력해주세요.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "잘못된 이메일 형식입니다";
  }

  return "";
}

export function validatePassword(password) {
  if (!password) {
    return "비밀번호를 입력해주세요.";
  }

  if (password.length < 8) {
    return "비밀번호를 8자 이상 입력해주세요.";
  }

  return "";
}