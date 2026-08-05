import formatDate from './formatDate';

export default function formatTime(dateString) {
  const createdAt = new Date(dateString);
  const now = new Date();
  
  const msDiff = now.getTime() - createdAt.getTime();
  const minDiff = Math.floor(msDiff / (1000 * 60));
  const hourDiff = Math.floor(msDiff / (1000 * 60 * 60));
  const dayDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

  if (msDiff < 1) {
    return '방금 전';
  }

  if (minDiff < 60) {
    return `${minDiff}분 전`;
  }

  if (hourDiff < 24) {
    return `${hourDiff}시간 전`;
  }

  if (dayDiff < 7) {
    return `${dayDiff}일 전`;
  } else {
    return formatDate(dateString);
  }
}