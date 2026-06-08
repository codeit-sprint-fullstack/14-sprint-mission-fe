document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("Password_text");
  const toggleIcon = document.querySelector("#show_word img");

  // 아이콘 hover 시 비밀번호 표시
  toggleIcon.addEventListener("mouseenter", () => {
    passwordInput.type = "text";
    console.log("비밀번호 표시됨");
  });

  // 아이콘에서 마우스를 떼면 다시 숨김
  toggleIcon.addEventListener("mouseleave", () => {
    passwordInput.type = "password";
    console.log("비밀번호 숨김");
  });
});