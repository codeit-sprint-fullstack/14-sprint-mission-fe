function useProductValidation({ name, description, price, tagInput }) {
  const trimmedName = name.trim();
  const trimmedDescription = description.trim();
  const trimmedPrice = price.trim();
  const trimmedTagInput = tagInput.trim().replaceAll("#", "");

  const errors = {
    name: "",
    description: "",
    price: "",
    tagInput: "",
  };

  if (trimmedName === "") {
    errors.name = "상품명을 입력해주세요.";
  } else if (trimmedName.length > 10) {
    errors.name = "10자 이내로 입력해주세요.";
  }

  if (trimmedDescription === "") {
    errors.description = "상품 소개를 입력해주세요.";
  } else if (trimmedDescription.length < 10) {
    errors.description = "10자 이상 입력해주세요.";
  } else if (trimmedDescription.length > 100) {
    errors.description = "100자 이내로 입력해주세요.";
  }

  if (trimmedPrice === "") {
    errors.price = "판매 가격을 입력해주세요.";
  } else if (Number.isNaN(Number(trimmedPrice))) {
    errors.price = "숫자로 입력해주세요.";
  }

  if (trimmedTagInput.length > 5) {
    errors.tagInput = "5글자 이내로 입력해주세요.";
  }

  const isFormValid =
    errors.name === "" &&
    errors.description === "" && 
    errors.price === "" &&
    errors.tagInput === "";

  return {
    errors,
    isFormValid,
  };
}

export default useProductValidation;