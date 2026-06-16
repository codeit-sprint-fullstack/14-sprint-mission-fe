const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');
const pwCheckInput = document.getElementById('password_check');
const passwordToggleBtn = document.getElementById('password_toggle_btn');
const loginBtn = document.getElementById('login_btn');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
	{ email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
	{ email: 'codeit4@codeit.com', password: "codeit404!" },
	{ email: 'codeit5@codeit.com', password: "codeit505!" },
	{ email: 'codeit6@codeit.com', password: "codeit606!" },
];

function showValidation(input, message) {
	const wrap = input.parentElement;
	const prevMsg = wrap.querySelector('.validation_msg');

	if (prevMsg) prevMsg.remove();

	const msg = document.createElement('span');
	msg.className = 'validation_msg';
	msg.textContent = message;

	wrap.appendChild(msg);

	input.classList.add('warning');
	input.classList.remove('validate');
}

function clearValidation(input) {
	const wrap = input.parentElement;
	const prevMsg = wrap.querySelector('.validation_msg');

	if (prevMsg) prevMsg.remove();

	input.classList.remove('warning');
	input.classList.add('validate');
}

function validateEmail() {
	const email = emailInput.value.trim();

	if (!email) {
		showValidation(emailInput, '이메일을 입력해주세요.');
		return false;
	}

	if (!emailRegex.test(email)) {
		showValidation(emailInput, '잘못된 이메일 형식입니다.');
		return false;
	}

	clearValidation(emailInput);
	return true;
}

function validatePassword() {
	const password = pwInput.value;

	if (!password) {
		showValidation(pwInput, '비밀번호를 입력해주세요.');
		return false;
	}

	if (password.length < 8) {
		showValidation(pwInput, '비밀번호를 8자 이상 입력해주세요.');
		return false;
	}

	clearValidation(pwInput);
	return true;
}

function validatePasswordCheck() {
	if (!pwCheckInput) return true;

	if (pwInput.value !== pwCheckInput.value) {
		showValidation(pwCheckInput, '비밀번호가 일치하지 않습니다.');
		return false;
	}

	clearValidation(pwCheckInput);
	return true;
}

function updateLoginButton() {
	const isEmailValid = emailInput.classList.contains('validate');
	const isPasswordValid = pwInput.classList.contains('validate');
	const isPasswordCheckValid = pwCheckInput
		? pwCheckInput.classList.contains('validate')
		: true;

	loginBtn.disabled = !(isEmailValid && isPasswordValid && isPasswordCheckValid);
}

emailInput.addEventListener('focusout', function () {
	validateEmail();
	updateLoginButton();
});

pwInput.addEventListener('focusout', function () {
	validatePassword();

	if (pwCheckInput && pwCheckInput.value) {
		validatePasswordCheck();
	}

	updateLoginButton();
});

if (pwCheckInput) {
	pwCheckInput.addEventListener('focusout', function () {
		validatePasswordCheck();
		updateLoginButton();
	});
}

passwordToggleBtn.addEventListener('click', function () {
	const isPassword = pwInput.type === 'password';

	pwInput.type = isPassword ? 'text' : 'password';
	pwInput.classList.toggle('text', isPassword);
});

loginBtn.addEventListener('click', function () {
	const email = emailInput.value;
	const userEmails = USER_DATA.map( e => e.email )
	
	if (loginBtn.classList.contains('sign_up')) {
		if (userEmails.includes(email)) {
			alert('사용 중인 이메일입니다.');
		} else {
			location.href = "/items";
		}
	} else {
		const password = pwInput.value;
		const user = USER_DATA.find(
			user => user.email === email && user.password === password
		);

		if (user) {
			alert('로그인 성공');
			location.href = '/items';
		} else {
			alert('이메일 또는 비밀번호가 일치하지 않습니다.');
		}
	}
});