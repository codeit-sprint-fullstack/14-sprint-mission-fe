// 검증 결과를 객체로 반환
function validateEmail(email) {
  if (!email) return { isValid: false, message: "이메일을 입력해주세요." };
  const emailParts = email.split('@');
  if (emailParts.length !== 2 || !emailParts[0] || !emailParts[1]) {
    return { isValid: false, message: "잘못된 이메일 형식입니다." };
  }
  const domainParts = emailParts[1].split('.');
  /* 배열.some(요소=>조건) = 배열 안에 조건을 만족하는 요소가 하나라도 있는가?
     domainParts.some(part => !part) 배열 요소 중 빈 문자열이 하나라도 있으면 true 반환 */
  if (domainParts.length < 2 || domainParts.some(part => !part)) {
    return { isValid: false, message: "잘못된 이메일 형식입니다." };
  }
  return { isValid: true, message: "" };
}

function validatePassword(password) {
  if (!password) return { isValid: false, message: "비밀번호를 입력해주세요." };
  if (password.length < 8) return { isValid: false, message: "비밀번호를 8자 이상 입력해주세요." };
  return { isValid: true, message: "" };
}

function validatePasswordConfirm(password, passwordConfirm) {
  if (!passwordConfirm) return { isValid: false, message: "비밀번호 확인을 입력해주세요." };
  if (password !== passwordConfirm) return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
  return { isValid: true, message: "" };
}

function handleValidationError(isValid, message, inputTarget, errorTarget) {
  if (!isValid) {
    inputTarget.classList.add("input-invalid");
    errorTarget.textContent = message;
    errorTarget.classList.add("active");
  } else {
    inputTarget.classList.remove("input-invalid");
    errorTarget.textContent = "";
    errorTarget.classList.remove("active");
  }
}

// inputField : 입력 영역(input 요소)
function setupPasswordToggle(toggleBtn, inputField) {

  if (toggleBtn && inputField) {

    toggleBtn.addEventListener("click", function () {

      // isPassword = 현재 password 타입인지 여부 (true/false)
      const isPassword = inputField.type === "password";

      /* 삼항 연산자

      조건 ? true일 때 값 : false일 때 값

      해석 :
      조건이 맞아?
      맞으면 앞의 값
      아니면 뒤의 값

      */

      // 현재 password면 text로, 아니면 password로 변경
      inputField.type = isPassword ? "text" : "password";

      const toggleImg = this.querySelector("img");

      if (toggleImg) {

        // toggleImg.src = 이미지 경로를 바꾼다
        toggleImg.src = isPassword 
          ? "images/btn_visibility_on_24px.svg"
          : "images/btn_visibility_off_24px.svg";
      }
    });
  }
}

export { validateEmail, validatePassword, validatePasswordConfirm, handleValidationError, setupPasswordToggle };