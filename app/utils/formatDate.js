export function formatDate(dateString) {
  return dateString.slice(0, 10).replaceAll("-", ". ");
}

export function getRelativeTime(dateString) {
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
  const MIN = 60;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;

  if (diff < MIN) return "방금 전";
  if (diff < HOUR) return `${Math.floor(diff / 60)}분 전`;
  if (diff < DAY) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < WEEK) return `${Math.floor(diff / 86400)}일 전`;

  return formatDate(dateString); // 일주일 넘으면 날짜
}
