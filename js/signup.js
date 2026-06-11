import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  setError,
  clearError,
} from './validation.js';

import { showModal, initModal } from './modal.js';

//이메일 패스워드 비번확인 닉네임 폼 input값
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const passwordConfirmInput = document.querySelector('#passwordConfirm');
const nicknameInput = document.querySelector('#nickname');
//이메일 패스워드 비번확인 오류경고문 코드 (빨간색)
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const passwordConfirmError = document.querySelector('#passwordConfirm-error');
const nicknameError = document.querySelector('#nickname-error');
//회원가입 버튼
const signupButton = document.querySelector('.signup-button');


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

function checknickname() {
  const nickname = nicknameInput.value;

  clearError(nicknameInput, nicknameError);

  if (!nickname) {
    setError(nicknameError, '닉네임을 입력해주세요.')
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

//비밀번호 재입력 유효성 검사
function checkPasswordConfirm() {
  const password = passwordInput.value;
  const confirm = passwordConfirmInput.value;

  clearError(passwordConfirmInput, passwordConfirmError)

  if (!confirm) {
    setError(
      passwordConfirmError,
      '비밀번호를 다시 입력해주세요.'
    );
  }

  if (!validatePasswordConfirm(password, confirm)) {
    setError(passwordConfirmError, '비밀번호가 일치하지 않습니다.')
    return false
  }

  return true
}


//회원가입 버튼
function updateButtonState() {
  const emailValid =
    emailInput.value &&
    validateEmail(emailInput.value);

  const passwordValid =
    passwordInput.value &&
    validatePassword(passwordInput.value);

  const passwordConfirmValid =
    passwordConfirmInput.value &&
    validatePasswordConfirm(passwordInput.value, passwordConfirmInput.value);

  const nicknameValid = nicknameInput.value;

  signupButton.disabled = !(emailValid && passwordValid && passwordConfirmValid && nicknameValid)

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

passwordConfirmInput.addEventListener('blur', () => {
  checkPasswordConfirm(),
    updateButtonState()
});
nicknameInput.addEventListener('blur', () => {
  checknickname(),
    updateButtonState()
})

emailInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
passwordConfirmInput.addEventListener('input', updateButtonState);
nicknameInput.addEventListener('input', updateButtonState);

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

//회원가입 시 database에 이미 존재할 때 alert 팝업창 띄우기
signupButton.addEventListener('click', (e) => {
  e.preventDefault();

  const isEmailValid = checkEmail();
  const isPasswordValid = checkPassword();
  const isConfirmValid = checkPasswordConfirm();
  const isNicknameValid = checknickname();

  if (!isEmailValid || !isPasswordValid || !isConfirmValid || !isNicknameValid) {
    return
  }

  const email = emailInput.value

  const isDuplicate = USER_DATA.some(user => user.email === email)

  if (isDuplicate) {
    showModal('사용 중인 이메일입니다.')
    return
  }

  location.href = '/login'

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

const togglePasswordConfirmBtn = document.querySelector('.toggle-passwordConfirm');
const toggleIcon2 = togglePasswordConfirmBtn.querySelector('img');

let isPasswordConfirmVisible = false;

togglePasswordConfirmBtn.addEventListener('click', (e) => {
  e.preventDefault();

  isPasswordConfirmVisible = !isPasswordConfirmVisible;

  if (isPasswordConfirmVisible) {
    //비밀번호 보이기
    passwordConfirmInput.type = 'text';
    toggleIcon2.src = './images/eye_on.png'
  } else {
    passwordConfirmInput.type = 'password';
    toggleIcon2.src = './images/eye_off.png'
  }
})

