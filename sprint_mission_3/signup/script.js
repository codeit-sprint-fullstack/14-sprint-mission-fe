document.addEventListener("DOMContentLoaded", () => {
  const passwordInputs = document.querySelectorAll(".Password_text");
  const toggleIcons = document.querySelectorAll(".show_word img");

  // forEach를 통해 class로 잡힌 각각의 img에 event 적용
  toggleIcons.forEach((icon, index) => {
    const input = passwordInputs[index];

    // 아이콘 hover 시 비밀번호 표시
    icon.addEventListener("mouseenter", () => {
      input.type = "text";
      console.log("비밀번호 표시됨");
    });

    // 아이콘에서 마우스를 떼면 다시 숨김
    icon.addEventListener("mouseleave", () => {
      input.type = "password";
      console.log("비밀번호 숨김");
    });
  });
});