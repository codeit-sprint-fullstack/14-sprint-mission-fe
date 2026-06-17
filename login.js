const emailInput = document.querySelector('#e-mail');
const emailError = document.querySelector('#email-error');

const passwordInput = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');

emailInput.addEventListener('focusout', function() {
    const emailValue = emailInput.value.trim();

    if (emailValue === '') {
        emailInput.classList.add('is-invalid');
        emailError.textContent = '값을 입력하십시오.';
    }else {
        emailInput.classList.remove('is-invalid');
        emailError.textContent = '';
    }
});

passwordInput.addEventListener('focusout', function() {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue === '') {
        passwordInput.classList.add('is-invalid');
        passwordError.textContent = '값을 입력하십시오.';
    }else {
        passwordInput.classList.remove('is-invalid');
        passwordError.textContent = '';
    }
});

// const passwordInput = document.getElementById('#password');
const eyeButton = document.querySelector('.eye_button');

function passwordShow () {
    passwordInput.type = 'text';
}
function passwordHide () {
    passwordInput.type = 'password';
}
eyeButton.addEventListener('mousedown', passwordShow);
eyeButton.addEventListener('mouseup', passwordHide);
eyeButton.addEventListener('mouseleave', passwordHide);