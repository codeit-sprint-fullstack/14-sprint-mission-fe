export function validateEmail(email) {
  return email.includes("@");
}

export function validateNickname(nickname) {
    return nickname.length > 0;
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validatePasswordConfirmation(password, passwordConfirmation) {
  {
    return password === passwordConfirmation;
  }
}