import USER_DATA from "../userData.js";


const inputEmail = document.querySelector('#userEmail');
const inputNickname = document.querySelector(`#userNickname`)
const inputPassword = document.querySelector('#userPassword');
const inputPasswordCheck = document.querySelector(`#userPasswordCheck`);
const passwordFrame = document.querySelector(`#show_word`);
const passwordFrame2 = document.querySelector(`#show_word2`);
const emailFailureMessage = document.querySelector('#none_email'); // 이메일이 적혀있지 않을 경우
const emailFailureMessage2 = document.querySelector('#wrong_rule'); // 이메일 형식에 맞지 않을 경우
const nicknameFailureMessage = document.querySelector('#none_nickname'); // 닉네임이 적혀있지 않을 경우
const passwordFailureMessage = document.querySelector(`#none_password`); // 비밀번호가 적혀있지 않을 경우
const passwordFailureMessage2 = document.querySelector(`#wrong_rule_password`); // 비밀번호가 8자 미만일 경우
const passwordFailureMessage3 = document.querySelector(`#none_passwordcheck`); // 비밀번호 확인 칸에 적혀있지 않을 경우
const passwordFailureMessage4 = document.querySelector(`#wrong_passwordcheck`); // 비밀번호가 다를 경우
const signupButton = document.querySelector(`#signup`); //회원가입 버튼
const modal = document.querySelector(`#infoModal`);
const close = document.querySelector(`#ok`);

close.onclick = () => {
  modal.style.display = "none";
};


function emailCheck(email){ // 유효성 검사
	const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,4}$/i; // mail 주소 [a-zA-Z0-9._-] , @ 필수, 도메인 주소 [a-zA-Z0-9.-], . 필수, com, net, co.kr 부분[a-zA-Z0-9.-]
	return email_regex.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleIcons = document.querySelector("#show_word img");
  const toggleIcons2 = document.querySelector("#show_word2 img");

  // 아이콘 hover 시 비밀번호 표시
  toggleIcons.addEventListener("mousedown", () => {
    inputPassword.type = "text";
    console.log("비밀번호 표시됨");
  });

  // 아이콘에서 마우스를 떼면 다시 숨김
  toggleIcons.addEventListener("mouseup", () => {
    inputPassword.type = "password";
    console.log("비밀번호 숨김");
  });
    // 아이콘 hover 시 비밀번호 표시
  toggleIcons2.addEventListener("mousedown", () => {
    inputPasswordCheck.type = "text";
    console.log("비밀번호 표시됨");
  });

  // 아이콘에서 마우스를 떼면 다시 숨김
  toggleIcons2.addEventListener("mouseup", () => {
    inputPasswordCheck.type = "password";
    console.log("비밀번호 숨김");
  });
});

function accountCheck(email){ // 계정 체크
  for (const user of USER_DATA) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

function buttonCheck() { // 로그인 버튼 활성화 검사
  if (!inputEmail.classList.contains(`errorfocus`) &&
      !passwordFrame.classList.contains(`errorfocus`) && 
      !inputNickname.classList.contains(`errorfocus`) && 
      !passwordFrame2.classList.contains(`errorfocus`) && 
      !inputEmail.classList.contains(`default`) && 
      !inputPassword.classList.contains(`default`) && 
      !inputNickname.classList.contains(`default`) && 
      !inputPasswordCheck.classList.contains(`default`)) {
    signupButton.classList.add(`active`);
    console.log('활성화')
  }
  else {
    signupButton.classList.remove(`active`);
    signupButton.onclick = null;
  }
}

buttonCheck(); // 새로고침 로그인 버튼 검사

signupButton.addEventListener("mousedown", e => { // 클릭 시 email 확인 후 없으면 계정 생성
  if (signupButton.classList.contains(`active`)) {
    if (accountCheck(inputEmail.value)){
      modal.style.display = "block";
    }
    else {
      alert(`회원가입이 완료되었습니다.`);
      signupButton.onclick = () => {
        location.href = "../items/";
      };
    }
  }
})

signupButton.addEventListener("keydown", e => { // 엔터 시 email 확인 후 없으면 계정 생성
  if(e.key === "Enter"){
    if (signupButton.classList.contains(`active`)) {
      if (accountCheck(inputEmail.value)){
        modal.style.display = "block";
      }
      else {
        alert(`회원가입이 완료되었습니다.`);
        signupButton.onclick = () => {
          location.href = "../items/";
        };
      }
    }
  }
})


inputEmail.addEventListener("focusout", e => { // 이메일 포커스 땐 후에
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

inputNickname.addEventListener("focusout", e => { // 닉네임 포커스 땐 후에
  inputNickname.classList.remove(`default`);
  if (inputNickname.value.length == 0) {  // 닉네임 칸에 값이 없을 경우 
    nicknameFailureMessage.classList.remove(`hidden`);
    inputNickname.classList.add('errorfocus');
    console.log('닉네임 없음');
    buttonCheck();
  }
  else { // 이외의 모든 경우
    nicknameFailureMessage.classList.add(`hidden`);
    inputNickname.classList.remove('errorfocus');
    console.log('통과');
    buttonCheck();
  }
});

inputPassword.addEventListener("focusout", e => { // 비밀번호 포커스 땐 후에
  inputPassword.classList.remove(`default`);
  if (inputPassword.value.length == 0) {  // 비밀번호 칸에 값이 없을 경우 
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

inputPasswordCheck.addEventListener("focusout", e => { // 비밀번호 확인 포커스 땐 후에
  inputPasswordCheck.classList.remove(`default`);
  if (inputPasswordCheck.value.length == 0) {  // 비밀번호 확인 칸에 값이 없을 경우 
    passwordFailureMessage3.classList.remove(`hidden`);
    passwordFailureMessage4.classList.add(`hidden`);
    passwordFrame2.classList.add('errorfocus');
    console.log('비밀번호 확인 없음');
    buttonCheck();
  }
  else { // 이외의 모든 경우
    passwordFailureMessage3.classList.add(`hidden`);
    passwordFailureMessage4.classList.add(`hidden`);
    passwordFrame2.classList.remove('errorfocus');
    console.log('통과');
    buttonCheck();
  }
});