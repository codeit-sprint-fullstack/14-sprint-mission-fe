const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function validateEmail(email) {
  if (!email) {
    return { isValid: false, message: '이메일을 입력해주세요.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: '잘못된 이메일 형식입니다.' }
  }

  return { isValid: true, message: '' }
}

function validateNickname(nickname) {
  if (!nickname) {
    return { isValid: false, message: '닉네임을 입력해주세요.' }
  }

  if (nickname.length > 20) {
    return {
      isValid: false,
      message: '닉네임은 20자 이하로 입력해주세요.',
    }
  }

  return { isValid: true, message: '' }
}

const PASSWORD_REGEX = /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/

function validatePassword(password) {
  if (!password) {
    return { isValid: false, message: '비밀번호를 입력해주세요.' }
  }

  if (password.length < 8) {
    return { isValid: false, message: '비밀번호를 8자 이상 입력해주세요.' }
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      isValid: false,
      message:
        '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)만 사용할 수 있습니다.',
    }
  }

  return { isValid: true, message: '' }
}

function validatePasswordConfirm(password, passwordConfirm) {
  if (!passwordConfirm) {
    return { isValid: false, message: '비밀번호 확인을 입력해주세요.' }
  }

  const passwordConfirmValidation = validatePassword(passwordConfirm)

  if (!passwordConfirmValidation.isValid) {
    return passwordConfirmValidation
  }

  if (password !== passwordConfirm) {
    return { isValid: false, message: '비밀번호가 일치하지 않습니다.' }
  }

  return { isValid: true, message: '' }
}

export {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
}
