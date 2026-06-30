import { useState } from 'react';

export default function useProductValidation() {
  const [errors, setErrors] = useState({});

  function validateField(field, value) {
    let message = '';

    if (field === 'name') {
      if (value.length < 1 || value.length > 10) {
        message = '상품명은 1자 이상 10자 이내로 입력해주세요.';
      }
    }

    if (field === 'description') {
      if (value.length < 10 || value.length > 100) {
        message = '상품 소개는 10자 이상 100자 이내로 입력해주세요.';
      }
    }

    if (field === 'price') {
      if (value.length < 1) {
        message = '판매 가격을 입력해주세요.';
      } else if (isNaN(Number(value))) {
        message = '판매 가격은 숫자로 입력해주세요.';
      }
    }

    if (field === 'tag') {
      if (value.length > 5) {
        message = '태그는 5글자 이내로 입력해주세요.';
      }
    }

    // 해당 필드의 에러만 갱신
    setErrors((prev) => ({ ...prev, [field]: message }));
    return message; // '' 이면 통과
  }

  return { errors, validateField };
}