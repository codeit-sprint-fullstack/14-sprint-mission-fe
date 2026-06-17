import {
  AUTH_MESSAGES,
  createAuthController,
  getSignupPasswordChecks,
  isRegisteredEmail,
  setupPasswordVisibility,
  showMessageModal,
  validateEmail,
  validatePasswordConfirm,
  validateSignupPassword,
} from './auth.js';

const form = document.querySelector('[data-auth-form="signup"]');
const emailInput = form.querySelector('[data-auth-field="email"]');
const nicknameInput = form.querySelector('[data-auth-field="nickname"]');
const passwordInput = form.querySelector('[data-auth-field="password"]');
const passwordConfirmInput = form.querySelector('[data-auth-field="passwordConfirm"]');
const passwordErrorElement = form.querySelector('[data-error-for="password"]');
const passwordChecklist = form.querySelector('[data-password-checklist]');
const specialRuleMessage = form.querySelector('[data-password-rule-message="special"]');
const passwordRuleItems = passwordChecklist
  ? [...passwordChecklist.querySelectorAll('[data-password-rule]')]
  : [];

setupPasswordVisibility(form);

function setForbiddenSpecialMessage(isVisible) {
  if (!specialRuleMessage) {
    return;
  }

  specialRuleMessage.textContent = isVisible ? AUTH_MESSAGES.passwordForbiddenSpecial : '';
  specialRuleMessage.classList.toggle('is-visible', isVisible);
}

function clearForbiddenPasswordError() {
  if (passwordErrorElement.textContent !== AUTH_MESSAGES.passwordForbiddenSpecial) {
    return;
  }

  passwordErrorElement.textContent = '';
  passwordErrorElement.classList.remove('is-visible');
}

function updatePasswordChecklist() {
  if (!passwordChecklist) {
    return;
  }

  const checks = getSignupPasswordChecks(passwordInput.value);
  const hasValue = Boolean(passwordInput.value);
  const hasForbiddenSpecial = hasValue && !checks.forbidden;

  passwordChecklist.classList.toggle('is-visible', hasValue || document.activeElement === passwordInput);
  passwordChecklist.dataset.hasValue = String(hasValue);

  passwordRuleItems.forEach((item) => {
    const rule = item.dataset.passwordRule;
    const isValid = rule === 'special' ? checks.special && checks.forbidden : checks[rule];
    item.classList.toggle('is-valid', isValid);
    item.classList.toggle('is-invalid', hasValue && !isValid);
  });

  setForbiddenSpecialMessage(hasForbiddenSpecial);

  if (hasForbiddenSpecial) {
    passwordInput.classList.add('input-error');
    clearForbiddenPasswordError();
    return;
  }

  if (!passwordErrorElement.classList.contains('is-visible')) {
    passwordInput.classList.remove('input-error');
  }

  clearForbiddenPasswordError();
}

passwordInput.addEventListener('focus', updatePasswordChecklist);
passwordInput.addEventListener('input', updatePasswordChecklist);
passwordInput.addEventListener('blur', updatePasswordChecklist);
updatePasswordChecklist();

new MutationObserver(() => {
  const hasForbiddenError = passwordErrorElement.textContent === AUTH_MESSAGES.passwordForbiddenSpecial;

  if (hasForbiddenError) {
    setForbiddenSpecialMessage(true);
    clearForbiddenPasswordError();
  }
}).observe(passwordErrorElement, { childList: true, subtree: true });

createAuthController({
  form,
  fields: {
    email: {
      input: emailInput,
      errorElement: form.querySelector('[data-error-for="email"]'),
    },
    nickname: {
      input: nicknameInput,
    },
    password: {
      input: passwordInput,
      errorElement: form.querySelector('[data-error-for="password"]'),
    },
    passwordConfirm: {
      input: passwordConfirmInput,
      errorElement: form.querySelector('[data-error-for="passwordConfirm"]'),
    },
  },
  validators: {
    email: () => validateEmail(emailInput.value),
    password: () => validateSignupPassword(passwordInput.value),
    passwordConfirm: () => validatePasswordConfirm(passwordInput.value, passwordConfirmInput.value),
  },
  onSubmit: () => {
    if (isRegisteredEmail(emailInput.value)) {
      showMessageModal(AUTH_MESSAGES.emailInUse);
      return;
    }

    window.location.href = './login.html';
  },
});
