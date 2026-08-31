export function isValidEmail(email) {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return EMAIL_REGEX.test(email);
}

export const PASSWORD_MIN_LENGTH = 8;
export function isValidPassword(password) {
  const isLongEnough = password.length >= PASSWORD_MIN_LENGTH;

  return isLongEnough;
}

export function parseEnum(value, { allowed, defaultValue }) {
  return allowed.includes(value) ? value : defaultValue;
}

export function parseNumberParam(value, defaultValue) {
  const parsed = Number(value);
  const isValid =
    !Number.isNaN(parsed) && Number.isInteger(parsed) && parsed > 0;

  return isValid ? parsed : defaultValue;
}
