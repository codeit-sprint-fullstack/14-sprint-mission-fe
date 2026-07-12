export function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function parsePositiveInteger(value, fieldName) {
  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue <= 0) {
    throw createHttpError(400, `${fieldName} 값이 올바르지 않습니다.`);
  }

  return numberValue;
}

export function parseOffset(value = 0) {
  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue < 0) {
    throw createHttpError(400, 'offset 값이 올바르지 않습니다.');
  }

  return numberValue;
}

export function parseLimit(value = 10, max = 50) {
  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue <= 0) {
    throw createHttpError(400, 'limit 값이 올바르지 않습니다.');
  }

  return Math.min(numberValue, max);
}

export function normalizeRequiredText(value, fieldName) {
  const text = String(value ?? '').trim();

  if (!text) {
    throw createHttpError(400, `${fieldName} 필드는 필수입니다.`);
  }

  return text;
}

export function normalizeOptionalText(value) {
  if (value == null) {
    return undefined;
  }

  return String(value).trim();
}
