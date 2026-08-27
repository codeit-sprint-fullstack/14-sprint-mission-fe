export default function useProductFormValidation({ name, description, price, tags, tagInput, image }) {
  const errors = {};

  if (!image) {
    errors.image = "상품 이미지를 등록해 주세요.";
  }

  if (!name.trim()) {
    errors.name = "상품명을 입력해 주세요.";
  } else if (name.trim().length > 30) {
    errors.name = "상품명은 30자 이내로 입력해 주세요.";
  }

  if (!description.trim()) {
    errors.description = "상품 소개를 입력해 주세요.";
  } else if (description.trim().length < 10) {
    errors.description = "상품 소개는 10자 이상 입력해 주세요.";
  }

  if (!price.trim()) {
    errors.price = "판매 가격을 입력해 주세요.";
  } else if (!/^\d+$/.test(price) || Number(price) < 0) {
    errors.price = "판매 가격은 0 이상의 숫자로 입력해 주세요.";
  }

  if (tagInput.trim().length > 20 || tags.some((tag) => tag.length > 20)) {
    errors.tag = "태그는 20자 이내로 입력해 주세요.";
  } else if (tags.length === 0) {
    errors.tag = "태그를 1개 이상 입력해 주세요.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
