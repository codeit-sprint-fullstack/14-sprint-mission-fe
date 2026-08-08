export default function formatTimeAgo(createdAt) {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();

  const differenceInMilliseconds = Math.max(currentTime - createdTime, 0);

  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60),
  );

  if (differenceInMinutes < 3) {
    return "방금 전";
  }

  if (differenceInMinutes < 60) {
    const tenMinuteUnit = Math.ceil(differenceInMinutes / 10) * 10;

    return `${Math.min(tenMinuteUnit, 50)}분 전`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays <= 30) {
    return `${differenceInDays}일 전`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);

  if (differenceInMonths < 12) {
    return `${differenceInMonths}달 전`;
  }

  const differenceInYears = Math.floor(differenceInMonths / 12);

  return `${differenceInYears}년 전`;
}
