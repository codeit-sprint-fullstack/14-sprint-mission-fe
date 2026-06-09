const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorModal = document.getElementById("errorModal");
const modalMessage = document.getElementById("modalMessage");

function validateEmail(value) {
  if (!value) return "이메일을 입력해주세요.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "잘못된 이메일 형식입니다.";
  return "";
}

function validatePassword(value) {
  if (!value) return "비밀번호를 입력해주세요.";
  if (value.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
  return "";
}

function showError(inputEl, errorEl, message) {
  if (message) {
    inputEl.classList.add("error");
    errorEl.textContent = message;
    errorEl.classList.add("visible");
  } else {
    inputEl.classList.remove("error");
    errorEl.textContent = "";
    errorEl.classList.remove("visible");
  }
}

function showModal(message) {
  modalMessage.textContent = message;
  errorModal.classList.add("show");
}

function closeModal() {
  errorModal.classList.remove("show");
}

function updateLoginBtn() {
  const isValid =
    !validateEmail(emailInput.value) &&
    !validatePassword(passwordInput.value);
  loginBtn.disabled = !isValid;
}

loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (loginUser(email, password)) {
    window.location.href = "./items.html";
  } else {
    showModal("비밀번호가 일치하지 않습니다.");
  }
});

emailInput.addEventListener("blur", () => {
  showError(emailInput, document.getElementById("email-error"), validateEmail(emailInput.value));
  updateLoginBtn();
});

passwordInput.addEventListener("blur", () => {
  showError(passwordInput, document.getElementById("password-error"), validatePassword(passwordInput.value));
  updateLoginBtn();
});

errorModal.addEventListener("click", (e) => {
  if (e.target === errorModal) {
    closeModal();
  }
});
