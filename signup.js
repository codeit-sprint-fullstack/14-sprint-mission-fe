  const emailInput = document.querySelector("#email_input");
  const nicknameInput = document.querySelector("#Nickname_input");
  const passwordInput = document.querySelector("#password_input");
  const passwordCheckInput = document.querySelector("#password_check_input");
  const signupButton = document.querySelector(".signup_btn");

  const passwordToggle = document.querySelector("#password_toggle");
  const passwordIcon = document.querySelector("#password_icon");

  const passwordCheckToggle = document.querySelector("#password_check_toggle");
  const passwordCheckIcon = document.querySelector("#password_check_icon");

  passwordToggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordIcon.src = "image/eye_hidden.png";
      passwordIcon.alt = "비밀번호 숨기기";
    } else {
      passwordInput.type = "password";
      passwordIcon.src = "image/eye.png";
      passwordIcon.alt = "비밀번호 보기";
    }
  });

  passwordCheckToggle.addEventListener("click", function () {
    if (passwordCheckInput.type === "password") {
      passwordCheckInput.type = "text";
      passwordCheckIcon.src = "image/eye_hidden.png";
      passwordCheckIcon.alt = "비밀번호 확인 숨기기";
    } else {
      passwordCheckInput.type = "password";
      passwordCheckIcon.src = "image/eye.png";
      passwordCheckIcon.alt = "비밀번호 확인 보기";
    }
  });

  function checkSignupInputs() {
    const emailValue = emailInput.value.trim();
    const nicknameValue = nicknameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const passwordCheckValue = passwordCheckInput.value.trim();

    if (
      emailValue !== "" &&
      nicknameValue !== "" &&
      passwordValue !== "" &&
      passwordCheckValue !== ""
    ) {
      signupButton.classList.add("active");
    } else {
      signupButton.classList.remove("active");
    }
  }

  emailInput.addEventListener("input", checkSignupInputs);
  nicknameInput.addEventListener("input", checkSignupInputs);
  passwordInput.addEventListener("input", checkSignupInputs);
  passwordCheckInput.addEventListener("input", checkSignupInputs);