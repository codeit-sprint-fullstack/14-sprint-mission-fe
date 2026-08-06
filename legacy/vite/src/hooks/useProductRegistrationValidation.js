const rules = {
  name: {
    isValid: (value) => value.trim().length >= 1 && value.trim().length <= 10,
    message: '10자 이내로 입력해주세요',
  },
  description: {
    isValid: (value) => value.trim().length >= 10 && value.trim().length <= 100,
    message: '10자 이상 100자 이내로 입력해주세요',
  },
  price: {
    isValid: (value) => value.trim().length >= 1 && /^\d+$/.test(value.trim()),
    message: '숫자로 입력해주세요',
  },
  tag: {
    isValid: (value) => value.trim().length >= 1 && value.trim().length <= 5,
    message: '5글자 이내로 입력해주세요',
  },
};

function useProductRegistrationValidation({ values, tags, tagInput }) {
  const fieldErrors = {
    name: values.name.trim() && !rules.name.isValid(values.name) ? rules.name.message : '',
    description: values.description.trim() && !rules.description.isValid(values.description) ? rules.description.message : '',
    price: values.price.trim() && !rules.price.isValid(values.price) ? rules.price.message : '',
    tagInput: tagInput.trim() && !rules.tag.isValid(tagInput) ? rules.tag.message : '',
    tags: tags.length ? '' : '태그를 1개 이상 입력해주세요',
  };

  const requiredFieldsFilled = Boolean(
    values.name.trim()
      && values.description.trim()
      && values.price.trim()
      && tags.length,
  );

  const isValid = requiredFieldsFilled
    && rules.name.isValid(values.name)
    && rules.description.isValid(values.description)
    && rules.price.isValid(values.price)
    && !fieldErrors.tagInput;

  const validateTag = (value) => ({
    isValid: rules.tag.isValid(value),
    message: rules.tag.message,
  });

  return {
    errors: fieldErrors,
    isValid,
    requiredFieldsFilled,
    validateTag,
  };
}

export default useProductRegistrationValidation;
