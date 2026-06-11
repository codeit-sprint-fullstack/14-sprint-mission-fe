function validateEmail(email) {
    return email.includes("@");
}

function validateNickname(nickname) {
    return nickname.length > 0;
}

function validatePassword(password) {
    return password.length >= 8;
}

function validatePasswordConfirmation(password, passwordConfirmation) {
    return password === passwordConfirmation;
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const nickname = document.querySelector("#nickname").value;
    const password = document.querySelector("#password").value;
    const passwordConfirmation = document.querySelector("#passwordConfirmation").value;

    if(!validateEmail(email)) {
        alert("잘못된 이메일 형식입니다.");
        return;
    }

    if(!validateNickname(nickname)) {
        alert("닉네임을 입력해주세요.");
        return;
    }

    if(!validatePassword(password)) {
        alert("비밀번호를 8자 이상 입력해주세요.");
        return;
    }

    if(!validatePasswordConfirmation(password, passwordConfirmation)) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    console.log("로그인 시도", email, nickname);
});