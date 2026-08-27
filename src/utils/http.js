import { BadRequest } from "../errors/HttpError.js";

// 비동기 컨트롤러의 에러를 next() 로 넘겨주는 래퍼
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// 경로 파라미터의 정수 id 파싱 (실패 시 400)
export function parseIntParam(value, label = "ID") {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) throw BadRequest(`유효하지 않은 ${label} 입니다.`);
  return n;
}

// offset 페이지네이션 쿼리 파싱
export function parsePagination(query) {
  return {
    page: Math.max(Number.parseInt(query.page, 10) || 1, 1),
    pageSize: Math.max(Number.parseInt(query.pageSize, 10) || 10, 1),
    orderBy: query.orderBy || "recent",
    keyword: query.keyword || "",
  };
}

// cursor 페이지네이션 쿼리 파싱
export function parseCursor(query) {
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 10, 1), 100);
  const cursor = Number.parseInt(query.cursor, 10);
  return { limit, cursor: Number.isNaN(cursor) ? null : cursor };
}
