import { validateEmail, validatePassword, validatePasswordConfirm } from "./validate.js";

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

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function toggleSignupButton() {
  const emailValue = emailInput.value.trim();
  const nicknameValue = nicknameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  const isNotEmpty = emailValue !== "" && nicknameValue !== "" && passwordValue !== "" && confirmPasswordValue !== "";
  
  const hasNoErrors = !emailError.classList.contains("active") && 
                      !passwordError.classList.contains("active") && 
                      !confirmPasswordError.classList.contains("active");

  if (isNotEmpty && hasNoErrors) {
    signupBtn.disabled = false;
  } else {
    signupBtn.disabled = true;
  }
}


if (signupPasswordToggleBtn && passwordInput) {
  signupPasswordToggleBtn.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    
    const toggleImg = this.querySelector("img");
    if (toggleImg) {
      toggleImg.src = isPassword 
        ? "images/btn_visibility_on_24px.svg"
        : "images/btn_visibility_off_24px.svg";
    }
  });
}


if (confirmPasswordToggleBtn && confirmPasswordInput) {
  confirmPasswordToggleBtn.addEventListener("click", function () {
    const isPassword = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isPassword ? "text" : "password";
    
    const toggleImg = this.querySelector("img");
    if (toggleImg) {
      toggleImg.src = isPassword 
        ? "images/btn_visibility_on_24px.svg"
        : "images/btn_visibility_off_24px.svg";
    }
  });
}


emailInput.addEventListener("focusout", function () {
  const emailValue = emailInput.value.trim();
  const { isValid, message } = validateEmail(emailValue);
  
  if (!isValid) {
    emailInput.classList.add("input-invalid");
    emailError.textContent = message;
    emailError.classList.add("active");
  } else {
    emailInput.classList.remove("input-invalid");
    emailError.textContent = "";
    emailError.classList.remove("active");
  }
  toggleSignupButton();
});


passwordInput.addEventListener("focusout", function () {
  const { isValid, message } = validatePassword(passwordInput.value.trim());
  
  const passwordWrapper = passwordInput.parentElement;

  if (!isValid) {
    passwordWrapper.classList.add("input-invalid");
    passwordError.textContent = message;
    passwordError.classList.add("active");
  } else {
    passwordWrapper.classList.remove("input-invalid");
    passwordError.textContent = "";
    passwordError.classList.remove("active");
  }
  toggleSignupButton();
});


confirmPasswordInput.addEventListener("focusout", function () {
  const { isValid, message } = validatePasswordConfirm(passwordInput.value.trim(), confirmPasswordInput.value.trim());
  
  const confirmWrapper = confirmPasswordInput.parentElement;

  if (!isValid) {
    confirmWrapper.classList.add("input-invalid");
    confirmPasswordError.textContent = message;
    confirmPasswordError.classList.add("active");
  } else {
    confirmWrapper.classList.remove("input-invalid");
    confirmPasswordError.textContent = "";
    confirmPasswordError.classList.remove("active");
  }
  toggleSignupButton();
});


signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  if (signupBtn.disabled) return;

  const emailValue = emailInput.value.trim();

  const isEmailTaken = USER_DATA.some(user => user.email === emailValue);

  if (isEmailTaken) {
    alert("사용 중인 이메일입니다.");
  } else {
    window.location.href = "./login.html";
  }
});
