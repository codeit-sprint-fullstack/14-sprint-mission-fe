  const emailInput = document.querySelector("#email_input");
  const passwordInput = document.querySelector("#password_input");
  const passwordToggle = document.querySelector("#password_toggle");
  const passwordIcon = document.querySelector("#password_icon");
  const loginButton = document.querySelector(".login_btn");

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

  function checkLoginInputs() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue !== "" && passwordValue !== "") {
      loginButton.classList.add("active");
    } else {
      loginButton.classList.remove("active");
    }
  }

  emailInput.addEventListener("input", checkLoginInputs);
  passwordInput.addEventListener("input", checkLoginInputs);