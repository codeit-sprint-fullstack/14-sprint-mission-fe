import USER_DATA from "../userData.js";

const inputEmail = document.querySelector('#email_adress');
const inputPassword = document.querySelector('#Password_text');
const passwordFrame = document.querySelector(`#show_word`);
const emailFailureMessage = document.querySelector('#none_email'); // 이메일이 적혀있지 않을 경우
const emailFailureMessage2 = document.querySelector('#wrong_rule'); // 이메일 형식에 맞지 않을 경우
const passwordFailureMessage = document.querySelector(`#none_password`); // 비밀번호가 적혀있지 않을 경우
const passwordFailureMessage2 = document.querySelector(`#wrong_rule_password`); // 비밀번호가 8자 미만일 경우
const loginButton = document.querySelector(`#loginButton`); //로그인 버튼 활성화
const modal = document.querySelector(`#infoModal`);
const close = document.querySelector(`#ok`);

close.onclick = () => {
  modal.style.display = "none";
};

function emailCheck(email){ // 유효성 검사
	const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,4}$/i; // mail 주소 [a-zA-Z0-9._-] , @ 필수, 도메인 주소 [a-zA-Z0-9.-], . 필수, com, net, co.kr 부분[a-zA-Z0-9.-]
	return email_regex.test(email);
}

function accountCheck(email, password){ // 계정 체크
  for (const user of USER_DATA) {
    if (user.email === email && user.password === password) {
      return true;
    }
  }
  return false;
}

function buttonCheck() { // 로그인 버튼 활성화 검사
  if (!inputEmail.classList.contains(`errorfocus`) && !inputPassword.classList.contains(`errorfocus`) && !inputEmail.classList.contains(`default`) && !inputPassword.classList.contains(`default`)) {
    loginButton.classList.add(`active`);
  }
  else {
    loginButton.classList.remove(`active`);
    loginButton.onclick = null;
  }
}

buttonCheck(); // 새로고침 로그인 버튼 검사

loginButton.addEventListener("mousedown", e => { // 클릭 시 email, password 확인
  if (loginButton.classList.contains(`active`)) {
    if (accountCheck(inputEmail.value, inputPassword.value)){
      loginButton.onclick = () => {
        location.href = "../items/";
      };
    }
    else {
      modal.style.display = "block";
      alert(`비밀번호가 일치하지 않습니다.`);
    }
  }
})

loginButton.addEventListener("keydown", e => { // 엔터 시 email, password 확인
  if (e.key === "Enter" && loginButton.classList.contains("active")) {
    if (accountCheck(inputEmail.value, inputPassword.value)) {
      location.href = "../items/";
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
});

inputEmail.addEventListener("focusout", e => { // 포커스 땐 후에
  inputEmail.classList.remove(`default`);
  if (inputEmail.value.length == 0) {  // 이메일칸에 값이 없을 경우 
    emailFailureMessage.classList.remove(`hidden`);
    emailFailureMessage2.classList.add(`hidden`);
    inputEmail.classList.add('errorfocus');
    console.log('이메일 없음');
    buttonCheck();
  }
  else if (!emailCheck(inputEmail.value)) { // 이메일 형식 결과가 false 일 경우
    emailFailureMessage.classList.add(`hidden`);
    emailFailureMessage2.classList.remove(`hidden`);
    inputEmail.classList.add('errorfocus');
    console.log('이메일형식 오류');
    buttonCheck();
  }
  else { // 이외의 모든 경우
    emailFailureMessage.classList.add(`hidden`);
    emailFailureMessage2.classList.add(`hidden`);
    inputEmail.classList.remove('errorfocus');
    console.log('통과');
    buttonCheck();
  }
});

inputPassword.addEventListener("focusout", e => { // 포커스 땐 후에
  inputPassword.classList.remove(`default`);
  if (inputPassword.value.length == 0) {  // 이메일칸에 값이 없을 경우 
    passwordFailureMessage.classList.remove(`hidden`);
    passwordFailureMessage2.classList.add(`hidden`);
    passwordFrame.classList.add('errorfocus');
    console.log('비밀번호 없음');
    buttonCheck();
  }
  else if (inputPassword.value.length < 8) { // 비밀번호가 8자리 미만일 경우
    passwordFailureMessage.classList.add(`hidden`);
    passwordFailureMessage2.classList.remove(`hidden`);
    passwordFrame.classList.add('errorfocus');
    console.log('비밀번호 8자리 미만');
    buttonCheck();
  }
  else { // 이외의 모든 경우
    passwordFailureMessage.classList.add(`hidden`);
    passwordFailureMessage2.classList.add(`hidden`);
    passwordFrame.classList.remove('errorfocus');
    console.log('통과');
    buttonCheck();
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("Password_text");
  const toggleIcon = document.querySelector("#show_word img");

  // 아이콘 hover 시 비밀번호 표시
  toggleIcon.addEventListener("mousedown", () => {
    passwordInput.type = "text";
    console.log("비밀번호 표시됨");
  });

  // 아이콘에서 마우스를 떼면 다시 숨김
  toggleIcon.addEventListener("mouseup", () => {
    passwordInput.type = "password";
    console.log("비밀번호 숨김");
  });
});