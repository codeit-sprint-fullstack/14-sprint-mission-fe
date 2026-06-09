const emailInputElement = document.getElementById('email');
const pwInputElement = document.getElementById('password');

emailInputElement.addEventListener('focusout', function() {
	const emptyEmailMsg = document.createElement('span');
	emptyEmailMsg.classList.add('validation_msg');
	emptyEmailMsg.classList.add('email');
	emptyEmailMsg.innerHTML = '이메일을 입력해주세요.';

	const wrongEmailMsg = document.createElement('span');
	wrongEmailMsg.classList.add('validation_msg');
	wrongEmailMsg.classList.add('email');
	wrongEmailMsg.innerHTML = '잘못된 이메일 형식입니다.';

	const email = emailInputElement.value;
	const emailInputWrap = emailInputElement.parentElement;
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const validationMsg = emailInputWrap.querySelector('.validation_msg');

	if (!email || !(emailRegex.test(email))) {
		if (validationMsg) {
			validationMsg.remove();
		}

		if (!email) {
			emailInputWrap.appendChild(emptyEmailMsg);

		} else {
			emailInputWrap.appendChild(wrongEmailMsg);
		}

		emailInputElement.classList.add('warning');

	} else {		
		if (validationMsg) {
			validationMsg.remove();
			emailInputElement.classList.remove('warning');
		}
	}
});

pwInputElement.addEventListener('focusout', function() {
	const emptyPasswordMsg = document.createElement('span');
	emptyPasswordMsg.classList.add('validation_msg');
	emptyPasswordMsg.innerHTML = '비밀번호를 입력해주세요.';

	const shortPasswordMsg = document.createElement('span');
	shortPasswordMsg.classList.add('validation_msg');
	shortPasswordMsg.innerHTML = '비밀번호를 8자 이상 입력해주세요.';

	const password = pwInputElement.value;
	const passwordInputWrap = pwInputElement.parentElement;
	const validationMsg = passwordInputWrap.querySelector('.validation_msg');

	if (!password || password.length < 8) {
		if (validationMsg) {
			validationMsg.remove();
		}

		if (!password) {
			passwordInputWrap.appendChild(emptyPasswordMsg);

		} else {
			passwordInputWrap.appendChild(shortPasswordMsg);
		}

		pwInputElement.classList.add('warning');		

	} else {
		if (validationMsg) {
			validationMsg.remove();
			pwInputElement.classList.remove('warning');		
		}
	}});