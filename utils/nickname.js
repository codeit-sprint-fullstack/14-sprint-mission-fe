const NICKNAMES = [
  "초코비버",
  "총명한 판다",
  "졸린 판다",
  "느긋한 판다",
  "부지런한 판다",
];

export function getFallbackNickname(id) {
  const str = String(id);
  const sum = str
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return NICKNAMES[sum % NICKNAMES.length];
}