export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'Codeit1111!' },
  { email: 'codeit2@codeit.com', password: 'Codeit2222!' },
  { email: 'codeit3@codeit.com', password: 'Codeit3333!' },
  { email: 'codeit4@codeit.com', password: 'Codeit4444!' },
  { email: 'codeit5@codeit.com', password: 'Codeit5555!' },
  { email: 'codeit6@codeit.com', password: 'Codeit6666!' },
];

export const AUTH_MESSAGES = {
  emailRequired: '이메일을 입력해주세요.',
  emailInvalid: '잘못된 이메일 형식입니다',
  passwordRequired: '비밀번호를 입력해주세요.',
  passwordShort: '비밀번호를 10자 이상 입력해주세요.',
  passwordWeak: '비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
  passwordForbiddenSpecial: '- 사용 불가능한 특수문자입니다.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  emailInUse: '사용 중인 이메일입니다',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedSpecialPattern = /[!@#$%^&*?_-]/;
const forbiddenSpecialPattern = /[\s<>"'`\\/|;:]/;

export function validateEmail(value) {
  const email = value.trim();

  if (!email) {
    return AUTH_MESSAGES.emailRequired;
  }

  if (!emailPattern.test(email)) {
    return AUTH_MESSAGES.emailInvalid;
  }

  return '';
}

export function validatePassword(value) {
  const password = value.trim();

  if (!password) {
    return AUTH_MESSAGES.passwordRequired;
  }

  if (password.length < 10) {
    return AUTH_MESSAGES.passwordShort;
  }

  return '';
}

export function getSignupPasswordChecks(value) {
  return {
    length: value.length >= 10,
    letters: /[a-z]/.test(value) && /[A-Z]/.test(value),
    number: /\d/.test(value),
    special: allowedSpecialPattern.test(value),
    forbidden: !forbiddenSpecialPattern.test(value),
  };
}

export function validateSignupPassword(value) {
  const basicError = validatePassword(value);

  if (basicError) {
    return basicError;
  }

  const checks = getSignupPasswordChecks(value);

  if (!checks.forbidden) {
    return AUTH_MESSAGES.passwordForbiddenSpecial;
  }

  if (!checks.letters || !checks.number || !checks.special) {
    return AUTH_MESSAGES.passwordWeak;
  }

  return '';
}

export function validatePasswordConfirm(password, passwordConfirm) {
  const confirmValue = passwordConfirm.trim();

  if (!confirmValue) {
    return AUTH_MESSAGES.passwordRequired;
  }

  if (password.trim() !== confirmValue) {
    return AUTH_MESSAGES.passwordMismatch;
  }

  return '';
}

export function findUserByEmail(email) {
  return USER_DATA.find((user) => user.email === email.trim());
}

export function isRegisteredEmail(email) {
  return Boolean(findUserByEmail(email));
}
