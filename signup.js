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

    checkSignupButton();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    emailInput.classList.add('error');
    emailError.textContent = '잘못된 이메일 형식입니다.';

    checkSignupButton();
    return;
  }

  emailInput.classList.remove('error');
  emailError.textContent = '';

  checkSignupButton();
});

const nicknameInput = document.querySelector('.nickname-input');
const nicknameError = document.querySelector('.nickname-error');

nicknameInput.addEventListener('blur', () => {
  const nicknameValue = nicknameInput.value;

  if (nicknameValue === '') {
    nicknameInput.classList.add('error');
    nicknameError.textContent = '닉네임을 입력해주세요.'

    checkSignupButton();
    return;
  }

  nicknameInput.classList.remove('error');
  nicknameError.textContent = '';

  checkSignupButton();
});


const passwordInput = document.querySelector('.password-input');
const passwordError = document.querySelector('.password-error');

passwordInput.addEventListener('blur', () => {
  const passwordValue = passwordInput.value;

  if (passwordValue === '') {
    passwordInput.classList.add('error');
    passwordError.textContent = "비밀번호를 입력해주세요.";

    checkSignupButton();
    return;
  }

  if (passwordValue.length < 8) {
    passwordInput.classList.add('error');
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";

    checkSignupButton();
    return;
  }

  passwordInput.classList.remove('error');
  passwordError.textContent = '';

  checkSignupButton();
});

const againInput = document.querySelector('.again-input');
const againError = document.querySelector('.again-error');

againInput.addEventListener('blur', () => {
  const againValue = againInput.value;
  const passwordValue = passwordInput.value;

  if (againValue === '') {
    againInput.classList.add('error');
    againError.textContent = '비밀번호를 다시 한 번 입력해주세요.';

    checkSignupButton();
    return;
  }

  if (againValue !== passwordValue) {
    againInput.classList.add('error');
    againError.textContent = '비밀번호가 일치하지 않습니다.';

    checkSignupButton();
    return;
  }

  againInput.classList.remove('error');
  againError.textContent = '';

  checkSignupButton();
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

const toggleAgain = document.querySelector('.toggle-again');

toggleAgain.addEventListener('click', () => {
  if (againInput.type === 'password') {
    againInput.type = 'text';
    toggleAgain.src = 'images/btn_eye.png';
  } else {
    againInput.type = 'password';
    toggleAgain.src = 'images/btn_eye_off.png';
  }
});

const signupButton = document.querySelector('.signup-button');

function checkSignupButton() {
  if (
    emailError.textContent === '' &&
    emailInput.value !== '' &&
    nicknameError.textContent === '' &&
    nicknameInput.value !== '' &&
    passwordError.textContent === '' &&
    passwordInput.value !== '' &&
    againError.textContent === '' &&
    againInput.value !== ''
  ) {
    signupButton.classList.add('active-button');
    signupButton.disabled = false;
  } else {
    signupButton.classList.remove('active-button');
    signupButton.disabled = true;
  }
};

signupButton.addEventListener('click', (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const nicknameValue = nicknameInput.value;

  const foundUser = USER_DATA.find((user) => {
    return user.email === emailValue
  })

  if (foundUser) {
    showModal('사용 중인 이메일입니다.');
    return;
  }

  window.location.href = '/login.html';
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