export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

export const AUTH_MESSAGES = {
  emailRequired: '이메일을 입력해주세요.',
  emailInvalid: '잘못된 이메일 형식입니다',
  passwordRequired: '비밀번호를 입력해주세요.',
  passwordShort: '비밀번호를 10자 이상 입력해주세요.',
  passwordWeak: '비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
  passwordForbiddenSpecial: '- 사용 불가능한 특수문자입니다.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  emailInUse: '사용 중인 이메일입니다',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedSpecialPattern = /[!@#$%^&*?_-]/;
const forbiddenSpecialPattern = /[\s<>"'`\\\/|;:]/;
const visibilityIconOn = './images/btn_visibility_on_24px.png';
const visibilityIconOff = './images/btn_visibility_off_24px.png';

export function validateEmail(value) {
  const email = value.trim();

  if (!email) {
    return AUTH_MESSAGES.emailRequired;
  }

  if (!emailPattern.test(email)) {
    return AUTH_MESSAGES.emailInvalid;
  }

  return '';
}

export function validatePassword(value) {
  const password = value.trim();

  if (!password) {
    return AUTH_MESSAGES.passwordRequired;
  }

  if (password.length < 8) {
    return AUTH_MESSAGES.passwordShort;
  }

  return '';
}

export function validateSignupPassword(value) {
  const basicError = validatePassword(value);

  if (basicError) {
    return basicError;
  }

  const checks = getSignupPasswordChecks(value);

  if (!checks.forbidden) {
    return AUTH_MESSAGES.passwordForbiddenSpecial;
  }

  if (!checks.letters || !checks.number || !checks.special) {
    return AUTH_MESSAGES.passwordWeak;
  }

  return '';
}

export function getSignupPasswordChecks(value) {
  const password = value;

  return {
    length: password.length >= 10,
    letters: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: allowedSpecialPattern.test(password),
    forbidden: !forbiddenSpecialPattern.test(password),
  };
}

export function validatePasswordConfirm(password, passwordConfirm) {
  const confirmValue = passwordConfirm.trim();

  if (!confirmValue) {
    return AUTH_MESSAGES.passwordRequired;
  }

  if (password.trim() !== confirmValue) {
    return AUTH_MESSAGES.passwordMismatch;
  }

  return '';
}

export function findUserByEmail(email) {
  return USER_DATA.find((user) => user.email === email.trim());
}

export function isRegisteredEmail(email) {
  return Boolean(findUserByEmail(email));
}

export function setupPasswordVisibility(root = document) {
  root.querySelectorAll('.visibility-button').forEach((button) => {
    const passwordInput = button.parentElement?.querySelector('input');

    if (!passwordInput) {
      return;
    }

    button.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      button.setAttribute('aria-label', isHidden ? '비밀번호 숨기기' : '비밀번호 보기');
      const image = button.querySelector('img');
      if (image) {
        image.src = isHidden ? visibilityIconOff : visibilityIconOn;
        image.alt = isHidden ? '비밀번호 숨기기' : '비밀번호 보기';
      }
    });
  });
}

export function createAuthController({ form, fields, validators, onSubmit }) {
  const submitButton = form.querySelector('.login-btn');
  const touchedFields = new Set();

  const setFieldError = (name, message) => {
    const field = fields[name];

    if (!field?.input || !field?.errorElement) {
      return;
    }

    field.input.classList.toggle('input-error', Boolean(message));
    field.errorElement.textContent = message;
    field.errorElement.classList.toggle('is-visible', Boolean(message));
  };

  const validateField = (name, shouldShowError = false) => {
    const validator = validators[name];
    const message = validator ? validator() : '';

    if (shouldShowError || touchedFields.has(name)) {
      setFieldError(name, message);
    }

    return message;
  };

  const hasEmptyRequiredField = () => Object.values(fields).some(({ input }) => input.required && !input.value.trim());
  const hasValidationError = () => Object.keys(validators).some((name) => Boolean(validators[name]()));
  const isSubmittable = () => !hasEmptyRequiredField() && !hasValidationError();

  const updateSubmitButton = () => {
    submitButton.disabled = !isSubmittable();
  };

  Object.entries(fields).forEach(([name, field]) => {
    field.input.addEventListener('blur', () => {
      touchedFields.add(name);
      validateField(name, true);

      if (name === 'password' && fields.passwordConfirm?.input.value) {
        validateField('passwordConfirm', touchedFields.has('passwordConfirm'));
      }

      updateSubmitButton();
    });

    field.input.addEventListener('input', () => {
      if (touchedFields.has(name)) {
        validateField(name, true);
      }

      if (name === 'password' && touchedFields.has('passwordConfirm')) {
        validateField('passwordConfirm', true);
      }

      updateSubmitButton();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    Object.keys(validators).forEach((name) => {
      touchedFields.add(name);
      validateField(name, true);
    });

    updateSubmitButton();

    if (isSubmittable()) {
      onSubmit();
    }
  });

  updateSubmitButton();
}

export function showMessageModal(message) {
  let modal = document.querySelector('.message-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'message-modal';
    modal.innerHTML = `
      <div class="message-modal__backdrop" data-modal-close></div>
      <div class="message-modal__panel" role="alertdialog" aria-modal="true" aria-labelledby="message-modal-title">
        <p id="message-modal-title" class="message-modal__text"></p>
        <button type="button" class="message-modal__button" data-modal-close>확인</button>
      </div>
    `;
    document.body.append(modal);

    modal.addEventListener('click', (event) => {
      if (event.target.matches('[data-modal-close]')) {
        modal.classList.remove('is-visible');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        modal.classList.remove('is-visible');
      }
    });
  }

  modal.querySelector('.message-modal__text').textContent = message;
  modal.classList.add('is-visible');
  modal.querySelector('.message-modal__button').focus();
}
