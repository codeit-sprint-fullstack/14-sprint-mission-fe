// 상대 시간 표시 (방금 전, 몇 분 전, 몇 시간 전 등)
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

// yyyy.mm.dd 형식으로 변환
export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

