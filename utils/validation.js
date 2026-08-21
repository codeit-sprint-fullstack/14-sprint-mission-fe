export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateNickname(nickname) {
  return nickname.trim().length > 0;
}

export function validatePasswordConfirmation(password, passwordConfirmation) {
  return password === passwordConfirmation;
}