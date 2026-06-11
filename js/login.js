import { validateEmail, validatePassword, handleValidationError, setupPasswordToggle } from "./validate.js";
import { USER_DATA } from "./auth-data.js";

const emailInput = document.getElementById("login-email");
const emailError = document.getElementById("login-email-error");
const passwordInput = document.getElementById("login-password");
const passwordError = document.getElementById("login-password-error");
const passwordToggleBtn = document.querySelector(".password-toggle-btn");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.querySelector("form");

function toggleLoginButton() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // isNotEmpty 해석: 이메일과 비밀번호 둘 다 입력값이 있다
  const isNotEmpty = emailValue !== "" && passwordValue !== "";

  // hasNoErrors 해석: 이메일 에러와 비밀번호 에러 클래스에 active 클래스가 없다 = 둘 다 에러 없음
  const hasNoErrors = 
    !emailError.classList.contains("active") &&
    !passwordError.classList.contains("active");

  // 두 조건 전부 만족해야 로그인 가능
  const canLogin = isNotEmpty && hasNoErrors;

  // 로그인 불가능하면 버튼 비활성화
  loginBtn.disabled = !canLogin;
}

setupPasswordToggle(passwordToggleBtn, passwordInput);

emailInput.addEventListener("focusout", function () {
  /* 객체 구조 분해 할당

  const result = validateEmail(emailInput.value.trim());

  const isValid = result.isValid;
  const message = result.message;

  */
  // 위 3줄을 아래 1줄로 축약
  const { isValid, message } = validateEmail(emailInput.value.trim());
  handleValidationError(isValid, message, emailInput, emailError);
  toggleLoginButton();
});

passwordInput.addEventListener("focusout", function () {
  const { isValid, message } = validatePassword(passwordInput.value.trim());
  handleValidationError(isValid, message, passwordInput, passwordError);
  toggleLoginButton();
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (loginBtn.disabled) return;
  const inputEmail = emailInput.value.trim();
  const inputPassword = passwordInput.value.trim();
  // 사용자 정보 찾기 .find()
  /* 배열.find(요소 => 조건) = 배열 안에 조건을 만족하는 첫 번째 요소는 무엇인가? (반환값: 요소(USER_DATA에서는 객체)/undefined)
   USER_DATA.find(user => user.email === inputEmail) 배열 요소 중 입력한 이메일과 일치하는 사용자(객체)는 누구인가? */
  const matchedUser = USER_DATA.find(user => user.email === inputEmail);
  if (!matchedUser || matchedUser.password !== inputPassword) {
    alert("비밀번호가 일치하지 않습니다.");
  } else {
    window.location.href = "./items.html";
  }
});