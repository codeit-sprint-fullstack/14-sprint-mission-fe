const emailInput = document.querySelector("#email_input");
const nicknameInput = document.querySelector("#nickname_input");
const passwordInput = document.querySelector("#password_input");
const passwordCheckInput = document.querySelector("#password_check_input");

const signupButton = document.querySelector(".signup_btn");

const emailError = document.querySelector("#email_error");
const passwordError = document.querySelector("#password_error");
const passwordCheckError = document.querySelector("#password_check_error");

const passwordToggle = document.querySelector("#password_toggle");
const passwordIcon = document.querySelector("#password_icon");
const passwordCheckToggle = document.querySelector("#password_check_toggle");
const passwordCheckIcon = document.querySelector("#password_check_icon");

const errorModal = document.querySelector("#error_modal");
const errorModalMessage = document.querySelector("#error_modal_message");
const errorModalClose = document.querySelector("#error_modal_close");

import {USER_DATA} from "./UserData.js";

const emailRegex =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// ======================================================================
// 값 검사 함수
// ======================================================================
function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}

function isPasswordMatched(password, passwordCheck) {
  return password === passwordCheck;
}

function isNicknameValid() {
  return nicknameInput.value.trim() !== "";
}


// ======================================================================
// 입력 오류 표시
// ======================================================================
function showInputError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  inputElement.classList.add("input_error");
}

function clearInputError(inputElement, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("input_error");
}


// ======================================================================
// 이메일 검사
// ======================================================================
function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showInputError(
      emailInput,
      emailError,
      "이메일을 입력해주세요."
    );
    return false;
  }

  if (!isValidEmail(emailValue)) {
    showInputError(
      emailInput,
      emailError,
      "잘못된 이메일 형식입니다"
    );
    return false;
  }

  clearInputError(emailInput, emailError);
  return true;
}


// ======================================================================
// 비밀번호 검사
// ======================================================================
function validatePassword() {
  const passwordValue = passwordInput.value;

  if (passwordValue === "") {
    showInputError(
      passwordInput,
      passwordError,
      "비밀번호를 입력해주세요."
    );
    return false;
  }

  if (!isValidPassword(passwordValue)) {
    showInputError(
      passwordInput,
      passwordError,
      "비밀번호를 8자 이상 입력해주세요."
    );
    return false;
  }

  clearInputError(passwordInput, passwordError);
  return true;
}


// ======================================================================
// 비밀번호 확인 검사
// ======================================================================
function validatePasswordCheck() {
  const passwordValue = passwordInput.value;
  const passwordCheckValue = passwordCheckInput.value;

  if (passwordCheckValue === "") {
    showInputError(
      passwordCheckInput,
      passwordCheckError,
      "비밀번호를 다시 입력해주세요."
    );
    return false;
  }

  if (!isPasswordMatched(passwordValue, passwordCheckValue)) {
    showInputError(
      passwordCheckInput,
      passwordCheckError,
      "비밀번호가 일치하지 않습니다."
    );
    return false;
  }

  clearInputError(passwordCheckInput, passwordCheckError);
  return true;
}


// ======================================================================
// 회원가입 버튼 상태
// ======================================================================
function updateSignupButton() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value;
  const passwordCheckValue = passwordCheckInput.value;

  const hasErrorMessage =
    emailError.textContent !== "" ||
    passwordError.textContent !== "" ||
    passwordCheckError.textContent !== "";

  const isFormValid =
    isValidEmail(emailValue) &&
    isNicknameValid() &&
    isValidPassword(passwordValue) &&
    passwordCheckValue !== "" &&
    isPasswordMatched(passwordValue, passwordCheckValue) &&
    !hasErrorMessage;

  signupButton.disabled = !isFormValid;
  signupButton.classList.toggle("active", isFormValid);
}


// ======================================================================
// 비밀번호 표시 및 숨김
// ======================================================================
function togglePasswordVisibility(
  inputElement,
  iconElement,
  toggleButton,
  showLabel,
  hideLabel
) {
  const isPasswordHidden = inputElement.type === "password";

  if (isPasswordHidden) {
    inputElement.type = "text";
    iconElement.src = "/image/eye_hidden.png";
    iconElement.alt = hideLabel;
    toggleButton.setAttribute("aria-label", hideLabel);
  } else {
    inputElement.type = "password";
    iconElement.src = "/image/eye.png";
    iconElement.alt = showLabel;
    toggleButton.setAttribute("aria-label", showLabel);
  }
}


// ======================================================================
// 오류 모달
// ======================================================================
function showErrorModal(message) {
  errorModalMessage.textContent = message;
  errorModal.hidden = false;
}

function closeErrorModal() {
  errorModal.hidden = true;
}


// ======================================================================
// 회원가입 처리
// ======================================================================
function handleSignup() {
  const isEmailValidResult = validateEmail();
  const isNicknameValidResult = isNicknameValid();
  const isPasswordValidResult = validatePassword();
  const isPasswordCheckValidResult = validatePasswordCheck();

  const hasInvalidInput =
    !isEmailValidResult ||
    !isNicknameValidResult ||
    !isPasswordValidResult ||
    !isPasswordCheckValidResult;

  if (hasInvalidInput) {
    updateSignupButton();
    return;
  }

  const emailValue = emailInput.value.trim();

  const isEmailDuplicated = USER_DATA.some(function (user) {
    return user.email === emailValue;
  });

  if (isEmailDuplicated) {
    showErrorModal("사용 중인 이메일입니다");
    return;
  }

  window.location.href = "login.html";
}


// ======================================================================
// blur 이벤트
// ======================================================================
emailInput.addEventListener("blur", function () {
  validateEmail();
  updateSignupButton();
});

passwordInput.addEventListener("blur", function () {
  validatePassword();
  updateSignupButton();
});

passwordCheckInput.addEventListener("blur", function () {
  validatePasswordCheck();
  updateSignupButton();
});


// ======================================================================
// input 이벤트
// ======================================================================
emailInput.addEventListener("input", function () {
  if (emailError.textContent !== "") {
    validateEmail();
  }

  updateSignupButton();
});

nicknameInput.addEventListener("input", updateSignupButton);

passwordInput.addEventListener("input", function () {
  if (passwordError.textContent !== "") {
    validatePassword();
  }

  if (
    passwordCheckInput.value !== "" ||
    passwordCheckError.textContent !== ""
  ) {
    validatePasswordCheck();
  }

  updateSignupButton();
});

passwordCheckInput.addEventListener("input", function () {
  if (passwordCheckError.textContent !== "") {
    validatePasswordCheck();
  }

  updateSignupButton();
});


// ======================================================================
// 비밀번호 눈 아이콘 이벤트
// ======================================================================
passwordToggle.addEventListener("click", function () {
  togglePasswordVisibility(
    passwordInput,
    passwordIcon,
    passwordToggle,
    "비밀번호 보기",
    "비밀번호 숨기기"
  );
});

passwordCheckToggle.addEventListener("click", function () {
  togglePasswordVisibility(
    passwordCheckInput,
    passwordCheckIcon,
    passwordCheckToggle,
    "비밀번호 확인 보기",
    "비밀번호 확인 숨기기"
  );
});


// ======================================================================
// 회원가입 버튼 및 모달 이벤트
// ======================================================================
signupButton.addEventListener("click", handleSignup);
errorModalClose.addEventListener("click", closeErrorModal);


// 페이지가 처음 열렸을 때 버튼 상태 설정
updateSignupButton();