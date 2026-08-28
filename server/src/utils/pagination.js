import createHttpError from "./createHttpError.js";

export function createPagePagination(page = 1, pageSize = 10) {
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    !Number.isInteger(pageSizeNumber) ||
    pageSizeNumber < 1
  ) {
    throw createHttpError(400, "페이지 조회 요청이 올바르지 않습니다.");
  }

  return {
    skip: (pageNumber - 1) * pageSizeNumber,
    take: pageSizeNumber,
  };
}

export function createCursorPage(items, limit) {
  const hasMore = items.length > limit;

  const list = hasMore ? items.slice(0, limit) : items;

  const nextCursor = hasMore ? list[list.length - 1].id : null;

  return {
    list,
    nextCursor,
  };
}
