import {
  validateEmail,
  validatePassword,
  setError,
  clearError,
} from './validation.js';

import { showModal, initModal } from './modal.js';

//이메일과 패스워드 폼 input값
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
//이메일과 패스워드의 오류경고문 불러오는 코드
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
//로그인버튼
const loginButton = document.querySelector('.login-button');

//이메일 유효성 검사
function checkEmail() {
  const email = emailInput.value;

  clearError(emailInput, emailError);

  if (!email) {
    setError(emailError, '이메일을 입력해주세요.');
    return false;
  }

  if (!validateEmail(email)) {
    setError(emailError, '잘못된 이메일 형식입니다.');
    return false;
  }

  return true;
}

//비밀번호 유효성 검사
function checkPassword() {
  const password = passwordInput.value;

  clearError(passwordInput, passwordError);

  if (!password) {
    setError(passwordError, '비밀번호를 입력해주세요.');
    return false;
  }

  if (!validatePassword(password)) {
    setError(passwordError, '비밀번호를 8자 이상 입력해주세요.');
    return false;
  }

  return true;
}

//로그인 버튼
function updateButtonState() {
  const emailValid =
    emailInput.value &&
    validateEmail(emailInput.value);

  const passwordValid =
    passwordInput.value &&
    validatePassword(passwordInput.value);

  loginButton.disabled = !(emailValid && passwordValid);
}

//focus-out했을 때
emailInput.addEventListener('blur', () => {
  checkEmail(),
    updateButtonState()
});
passwordInput.addEventListener('blur', () => {
  checkPassword(),
    updateButtonState()
});

emailInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);

//데이터베이스
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];



//모달(alert 팝업창)

initModal();

loginButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const user = USER_DATA.find((user) => user.email === email);

  if (!user) {
    showModal('존재하지 않는 이메일입니다.')
    return;
  } else if (user.password !== password) {
    showModal('비밀번호가 일치하지 않습니다.');
    return;
  }

  location.href = '/items';
})



//비밀번호 보기/숨기기 토글 기능
const togglePasswordBtn = document.querySelector('.toggle-password');
const toggleIcon = togglePasswordBtn.querySelector('img');

let isPasswordVisible = false;

togglePasswordBtn.addEventListener('click', (e) => {
  e.preventDefault();

  isPasswordVisible = !isPasswordVisible;

  if (isPasswordVisible) {
    //비밀번호 보이기
    passwordInput.type = 'text';
    toggleIcon.src = './images/eye_on.png'
  } else {
    passwordInput.type = 'password';
    toggleIcon.src = './images/eye_off.png'
  }
})

