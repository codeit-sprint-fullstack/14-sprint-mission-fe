export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000;

  if (diff < 60) {
    return `${Math.floor(diff)}초 전`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}분 전`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}시간 전`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)}일 전`;
  } else if (diff < 31104000) {
    return `${Math.floor(diff / 2592000)}개월 전`;
  } else {
    return `${Math.floor(diff / 31104000)}년 전`;
  }
}
