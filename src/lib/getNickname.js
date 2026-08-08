const nicknames = [
  "인생이 난리자베스",
  "월급통장 스루패스",
  "퇴사욕구 최고조",
  "영혼 빼고 출근 완료",
  "점심은 언제먹지",
];

export default function getNickname(id = "") {
  const nicknameIndex = id ? id.charCodeAt(0) % nicknames.length : 0;

  return nicknames[nicknameIndex];
}
