//이메일, 비밀번호 검증을 위한 함수 모음

//이메일 검증
export function validateEmail(email) {
  const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return emailRegex.test(email);
}
//비밀번호 검증
export function validatePassword(password) {
  return password.length >= 8;
}
//비밀번호 확인 검증
export function validatePasswordConfirm(password, passwordConfirm) {
  return password === passwordConfirm;
}

//에러 처리 함수
export function setError(messageEl, message) {
  messageEl.textContent = message
}

export function clearError(input, messageEl) {
  input.style.border = ''
  messageEl.textContent = ''
}