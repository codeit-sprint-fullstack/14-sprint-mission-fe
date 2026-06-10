import { validateEmail, validatePassword } from "./validate.js";

const emailInput = document.getElementById("login-email");
const emailError = document.getElementById("login-email-error");
const passwordInput = document.getElementById("login-password");
const passwordError = document.getElementById("login-password-error");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.querySelector("form");

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function toggleLoginButton() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  const isNotEmpty = emailValue !== "" && passwordValue !== "";
  
  const hasNoErrors = !emailError.classList.contains("active") && !passwordError.classList.contains("active");

  if (isNotEmpty && hasNoErrors) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}


emailInput.addEventListener("focusout", function () {
  const { isValid, message } = validateEmail(emailInput.value.trim());
  if (!isValid) {
    emailInput.classList.add("input-invalid");
    emailError.textContent = message;
    emailError.classList.add("active");
  } else {
    emailInput.classList.remove("input-invalid");
    emailError.textContent = "";
    emailError.classList.remove("active");
  }
  toggleLoginButton();
});

passwordInput.addEventListener("focusout", function () {
  const { isValid, message } = validatePassword(passwordInput.value.trim());
  if (!isValid) {
    passwordInput.classList.add("input-invalid");
    passwordError.textContent = message;
    passwordError.classList.add("active");
  } else {
    passwordInput.classList.remove("input-invalid");
    passwordError.textContent = "";
    passwordError.classList.remove("active");
  }
  toggleLoginButton();
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  if (loginBtn.disabled) return;

  const inputEmail = emailInput.value.trim();
  const inputPassword = passwordInput.value.trim();

  const matchedUser = USER_DATA.find(user => user.email === inputEmail);

  if (!matchedUser || matchedUser.password !== inputPassword) {
    alert("비밀번호가 일치하지 않습니다.");
  } 
  else {
    window.location.href = "./items.html";
  }
});
