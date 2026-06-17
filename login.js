import {
  AUTH_MESSAGES,
  createAuthController,
  findUserByEmail,
  setupPasswordVisibility,
  showMessageModal,
  validateEmail,
  validatePassword,
} from './auth.js';

const form = document.querySelector('[data-auth-form="login"]');
const emailInput = form.querySelector('[data-auth-field="email"]');
const passwordInput = form.querySelector('[data-auth-field="password"]');

setupPasswordVisibility(form);

createAuthController({
  form,
  fields: {
    email: {
      input: emailInput,
      errorElement: form.querySelector('[data-error-for="email"]'),
    },
    password: {
      input: passwordInput,
      errorElement: form.querySelector('[data-error-for="password"]'),
    },
  },
  validators: {
    email: () => validateEmail(emailInput.value),
    password: () => validatePassword(passwordInput.value),
  },
  onSubmit: () => {
    const user = findUserByEmail(emailInput.value);

    if (!user || user.password !== passwordInput.value.trim()) {
      showMessageModal(AUTH_MESSAGES.passwordMismatch);
      return;
    }

    window.location.href = './item.html';
  },
});
