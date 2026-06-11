function validateEmail(email) {
    return email.includes("@");
}

function validatePassword(password) {
    return password.length >= 8;
}


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if(!validateEmail(email)) {
        alert("잘못된 이메일 형식입니다");
        return;
    }

    if(!validatePassword(password)) {
        alert("비밀번호를 8자 이상 입력해주세요.");
        return;
    }

    console.log("로그인 시도", email);
});