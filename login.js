const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

const emailInput = document.querySelector('.email-input');
const emailError = document.querySelector('.email-error');

emailInput.addEventListener('blur', () => {
  const emailValue = emailInput.value;

  if (emailValue === '') {
    emailInput.classList.add('error');
    emailError.textContent = '이메일을 입력해주세요.';

    checkLoginButton();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    emailInput.classList.add('error');
    emailError.textContent = '잘못된 이메일 형식입니다.';

    checkLoginButton();
    return;
  }

  emailInput.classList.remove('error');
  emailError.textContent = '';

  checkLoginButton();
});

const passwordInput = document.querySelector('.password-input');
const passwordError = document.querySelector('.password-error');

passwordInput.addEventListener('blur', () => {
  const passwordValue = passwordInput.value;

  if (passwordValue === '') {
    passwordInput.classList.add('error');
    passwordError.textContent = '비밀번호를 입력해주세요.';

    checkLoginButton();
    return;
  }

  if (passwordValue.length < 8) {
    passwordInput.classList.add('error');
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';

    checkLoginButton();
    return;
  }

  passwordInput.classList.remove('error');
  passwordError.textContent = '';

  checkLoginButton();
});

const togglePassword = document.querySelector('.toggle-password');

togglePassword.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.src = 'images/btn_eye.png';
  } else {
    passwordInput.type = 'password';
    togglePassword.src = 'images/btn_eye_off.png';
  }
});

const loginButton = document.querySelector('.login-button');

function checkLoginButton() {
  if (
    emailError.textContent === '' &&
    emailInput.value !== '' &&
    passwordError.textContent === '' &&
    passwordInput.value !== ''
  ) {
    loginButton.classList.add('active-button');
    loginButton.disabled = false;
  } else {
    loginButton.classList.remove('active-button');
    loginButton.disabled = true;
  }
};

loginButton.addEventListener('click', (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const foundUser = USER_DATA.find((user) => {
    return user.email === emailValue;
  })

  if (!foundUser) {
    showModal('존재하지 않는 이메일입니다.');
    return;
  }

  if (foundUser.password !== passwordValue) {
    showModal('비밀번호가 일치하지 않습니다.')
    return;
  }

  window.location.href = '/items.html';
});

const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const modalClose = document.querySelector('.modal-close');

function showModal(message) {
  modalText.textContent = message;
  modal.classList.remove('hidden');
};

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});
