function createValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function checkText(value, fieldName) {
  //fieldName = 칼럼의 이름
  if (typeof value !== "string") {
    throw createValidationError(`${fieldName}은 문자열이어야 합니다.`);
  }

  const trimmedValue = value.trim(); // trim()은 문자열만 해당

  if (!trimmedValue) {
    throw createValidationError(`${fieldName}은 빈 문자열일 수 없습니다.`);
  }

  return trimmedValue;
}

export function validateCreateArticleBody(body) {
  const title = checkText(body.title, "title");
  const content = checkText(body.content, "content");

  return {
    title,
    content,
  };
}

export function validateUpdateArticleBody(body) {
  const data = {};

  if (body.title !== undefined) {
    data.title = checkText(body.title, "title");
  }

  if (body.content !== undefined) {
    data.content = checkText(body.content, "content");
  }
  //data 객체 안의 key값들을 배열 형태로 뽑아줌
  if (Object.keys(data).length === 0) {
    throw createValidationError("수정할 필드가 필요합니다.");
  }

  return data;
}
