/**
 * 게시글의 표시 전용 임의값을 만든다.
 *
 * 닉네임/좋아요/이미지는 API가 내려주지 않는 값이라 프론트에서 처리한다.
 * 렌더링마다 값이 흔들리지 않도록 게시글 id를 seed 삼아 고정한다.
 */

const NICKNAMES = ['총명한 판다', '행복한 판다', '용감한 판다', '슬기로운 판다', '자유로운 판다'];

export const DEFAULT_ARTICLE_IMAGE = '/img/default_items_img.png';

// 문자열을 안정적인 정수로 변환 (djb2 해시)
function hashCode(str = '') {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function getNickname(id) {
  return NICKNAMES[hashCode(id) % NICKNAMES.length];
}

export function getLikeCount(id) {
  return (hashCode(id) % 9999) + 1;
}

/** "1시간 전" 형태의 상대 시간으로 표기 */
export function formatRelativeTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return '방금 전';

  const units = [
    { limit: 60, label: '분' },
    { limit: 24, label: '시간' },
    { limit: 30, label: '일' },
    { limit: 12, label: '개월' },
  ];

  let amount = Math.floor(seconds / 60);
  for (const { limit, label } of units) {
    if (amount < limit) return `${amount}${label} 전`;
    amount = Math.floor(amount / limit);
  }

  return `${amount}년 전`;
}

/** 2024. 04. 16. 형태로 표기 */
export function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}`;
}
