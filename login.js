const emailInput = document.querySelector("#email_input");
const passwordInput = document.querySelector("#password_input");
const passwordToggle = document.querySelector("#password_toggle");
const passwordIcon = document.querySelector("#password_icon");
const loginButton = document.querySelector(".login_btn");

const emailError = document.querySelector("#email_error");
const passwordError = document.querySelector("#password_error");

const errorModal = document.querySelector("#error_modal");
const errorModalMessage = document.querySelector("#error_modal_message");
const errorModalClose = document.querySelector("#error_modal_close");

import {USER_DATA} from "./UserData.js";

// ======================================================================
// 값 검사
// ======================================================================
const emailRegex =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailError.textContent = "이메일을 입력해주세요.";
    emailInput.classList.add("input_error");
    return false;
  }

  if (!emailRegex.test(emailValue)) {
    emailError.textContent = "잘못된 이메일 형식입니다";
    emailInput.classList.add("input_error");
    return false;
  }

  emailError.textContent = "";
  emailInput.classList.remove("input_error");
  return true;
}
emailInput.addEventListener("blur", validateEmail);


// ======================================================================
// 패스워드 검사
// ======================================================================
function validatePassword() {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue === "") {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordInput.classList.add("input_error");
    return false;
  }

  if (passwordValue.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordInput.classList.add("input_error");
    return false;
  }

  passwordError.textContent = "";
  passwordInput.classList.remove("input_error");
  return true;
}

passwordInput.addEventListener("blur", validatePassword);


// ======================================================================
// 비밀번호 on,off
// ======================================================================
  passwordToggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordIcon.src = "image/eye_hidden.png";
      passwordIcon.alt = "비밀번호 숨기기";
    } else {
      passwordInput.type = "password";
      passwordIcon.src = "image/eye.png";
      passwordIcon.alt = "비밀번호 보기";
    }
  });


// ======================================================================
// id,pw 입력시 로그인 버튼 활성화
// ======================================================================
function checkLoginInputs() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  const isEmailValid = emailRegex.test(emailValue);
  const isPasswordValid = passwordValue.length >= 8;

  if (isEmailValid) {
    emailError.textContent = "";
    emailInput.classList.remove("input_error");
  }

  if (isPasswordValid) {
    passwordError.textContent = "";
    passwordInput.classList.remove("input_error");
  }

  const hasErrorMessage =
    emailError.textContent !== "" ||
    passwordError.textContent !== "";

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    !hasErrorMessage;

  loginButton.disabled = !isFormValid;
  loginButton.classList.toggle("active", isFormValid);
}

  emailInput.addEventListener("input", checkLoginInputs);
  passwordInput.addEventListener("input", checkLoginInputs);


// ======================================================================
// 정보 확인
// ======================================================================
  loginButton.addEventListener("click", function () {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  const matchedUser = USER_DATA.find(function (user) {
    return user.email === emailValue;
  });

  if (!matchedUser || matchedUser.password !== passwordValue) {
    showErrorModal("비밀번호가 일치하지 않습니다.");
    return;
  }

  window.location.href = "items.html";
});

// ======================================================================
// 모달
// ======================================================================
function showErrorModal(message) {
  errorModalMessage.textContent = message;
  errorModal.hidden = false;
}

function closeErrorModal() {
  errorModal.hidden = true;
}

errorModalClose.addEventListener("click", closeErrorModal);