function createValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function checkText(value, fieldName) {
  //fieldName = 컬럼의 이름
  if (typeof value !== "string") {
    throw createValidationError(`${fieldName}은 문자열이어야 합니다.`);
  }

  const trimmedValue = value.trim(); //trim() 은 문자열만 해당

  if (!trimmedValue) {
    throw createValidationError(`${fieldName}은 빈 문자열일 수 없습니다.`);
  }

  return trimmedValue;
}

function checkPrice(value, fieldName) {
  if (typeof value !== "number") {
    throw createValidationError(`${fieldName}은 숫자여야 합니다.`);
  }
  //정수가 아니면 막기
  if (!Number.isInteger(value)) {
    throw createValidationError(`${fieldName}은 정수여야 합니다.`);
  }

  if (value <= 0) {
    throw createValidationError(`${fieldName}은 0보다 커야 합니다.`);
  }

  return value;
}

function checkTags(value, fieldName) {
  if (!Array.isArray(value)) {
    throw createValidationError(`${fieldName}은 배열이여야 합니다.`);
  }

  const trimmedTags = value.map((tag) => {
    //태그가 문자열이 아니면 막기
    if (typeof tag !== "string") {
      throw createValidationError(
        `${fieldName}의 각 태그는 문자열이어야 합니다.`,
      );
    }

    const trimmedTag = tag.trim();

    if (!trimmedTag) {
      throw createValidationError(
        `${fieldName}에는 빈 문자열 태그가 들어갈 수 없습니다.`,
      );
    }
    //검사 통과한 태그 반환
    return trimmedTag;
  });
  //검사 통과한 태그 배열 반환
  return trimmedTags;
}

export function validationCreateProductBody(body) {
  const name = checkText(body.name, "name");

  const description = checkText(body.description, "description");

  const price = checkPrice(body.price, "price");

  const tags = checkTags(body.tags, "tags");
  // Prisma에 넘길 안전한 data 객체 변환
  return {
    name,
    description,
    price,
    tags,
  };
}

export function validationUpdateProductBody(body) {
  const data = {};

  if (body.name !== undefined) {
    data.name = checkText(body.name, "name");
  }

  if (body.description !== undefined) {
    data.description = checkText(body.description, "description");
  }

  if (body.price !== undefined) {
    data.price = checkPrice(body.price, "price");
  }

  if (body.tags !== undefined) {
    data.tags = checkTags(body.tags, "tags");
  }
  // 수정할 필드가 하나도 없으면 막기
  if (Object.keys(data).length === 0) {
    throw createValidationError("수정할 필드가 필요합니다.");
  }

  return data;
}
