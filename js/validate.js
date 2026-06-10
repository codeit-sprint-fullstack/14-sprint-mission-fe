function validateEmail(email) {
  if (!email) {
    return {
      isValid: false,
      message: "이메일을 입력해주세요."
    };
  }

  const emailParts = email.split('@');

  if (emailParts.length !== 2 || !emailParts[0] || !emailParts[1]) {
    return {
      isValid: false,
      message: "잘못된 이메일 형식입니다."
    };
  }

  const domainParts = emailParts[1].split('.');

  if (domainParts.length < 2 || domainParts.some(part => !part)) {
    return {
      isValid: false,
      message: "잘못된 이메일 형식입니다."
    };
  }

  return {
    isValid: true,
    message: ""
  };
}

function validatePassword(password) {
  if (!password) {
    return {
      isValid: false,
      message: "비밀번호를 입력해주세요."
    };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      message: "비밀번호를 8자 이상 입력해주세요."
    };
  }
  return { isValid: true, message: "" };
}

function validatePasswordConfirm(password, passwordConfirm) {
  if (!passwordConfirm) {
    return {
      isValid: false,
      message: "비밀번호 확인을 입력해주세요."
    };
  }
  if (password !== passwordConfirm) {
    return {
      isValid: false,
      message: "비밀번호가 일치하지 않습니다."
    };
  }
  return { isValid: true, message: "" };
}


export { validateEmail, validatePassword, validatePasswordConfirm };