import { validateEmail, validatePassword, validatePasswordConfirm, handleValidationError, setupPasswordToggle } from "./validate.js";
import { USER_DATA } from "./auth-data.js";

const emailInput = document.getElementById("signup-email");
const emailError = document.getElementById("signup-email-error");
const nicknameInput = document.getElementById("signup-nickname");
const passwordInput = document.getElementById("signup-password");
const passwordError = document.getElementById("signup-password-error");
const confirmPasswordInput = document.getElementById("signup-password-confirm");
const confirmPasswordError = document.getElementById("signup-password-confirm-error");
const signupPasswordToggleBtn = document.getElementById("signup-password-toggle");
const confirmPasswordToggleBtn = document.getElementById("signup-password-confirm-toggle");
const signupBtn = document.getElementById("signup-btn");
const signupForm = document.querySelector("form");

function toggleSignupButton() {
  const emailValue = emailInput.value.trim();
  const nicknameValue = nicknameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const isNotEmpty = emailValue !== "" && nicknameValue !== "" && passwordValue !== "" && confirmPasswordValue !== "";
  const hasNoErrors = !emailError.classList.contains("active") && 
                      !passwordError.classList.contains("active") && 
                      !confirmPasswordError.classList.contains("active");
  const canLogin = isNotEmpty && hasNoErrors;
  signupBtn.disabled = !canLogin;
}

setupPasswordToggle(signupPasswordToggleBtn, passwordInput);
setupPasswordToggle(confirmPasswordToggleBtn, confirmPasswordInput);

emailInput.addEventListener("focusout", function () {
  const { isValid, message } = validateEmail(emailInput.value.trim());
  handleValidationError(isValid, message, emailInput, emailError);
  toggleSignupButton();
});

passwordInput.addEventListener("focusout", function () {
  const { isValid, message } = validatePassword(passwordInput.value.trim());
  handleValidationError(isValid, message, passwordInput.parentElement, passwordError);
  toggleSignupButton();
});

confirmPasswordInput.addEventListener("focusout", function () {
  const { isValid, message } = validatePasswordConfirm(passwordInput.value.trim(), confirmPasswordInput.value.trim());
  handleValidationError(isValid, message, confirmPasswordInput.parentElement, confirmPasswordError);
  toggleSignupButton();
});

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (signupBtn.disabled) return;
  const emailValue = emailInput.value.trim();
  // 중복 여부 확인하기 .some()
  const isEmailTaken = USER_DATA.some(user => user.email === emailValue);
  if (isEmailTaken) {
    alert("사용 중인 이메일입니다.");
  } else {
    window.location.href = "./login.html";
  }
});