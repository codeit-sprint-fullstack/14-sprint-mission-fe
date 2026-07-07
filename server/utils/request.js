export const parsePositiveInt = (value) => {
  const number = Number(value)

  return Number.isInteger(number) && number > 0 ? number : null
}

export const getOffsetPagination = (
  query,
  { defaultLimit = 10, maxLimit = 50 } = {},
) => {
  const offset = Number(query.offset ?? 0)
  const limit = Number(query.limit ?? defaultLimit)

  if (
    !Number.isInteger(offset) ||
    !Number.isInteger(limit) ||
    offset < 0 ||
    limit < 1 ||
    limit > maxLimit
  ) {
    return { offset: null, limit: null, error: true }
  }

  return { offset, limit, error: false }
}

export const getCursorPagination = (
  query,
  { defaultLimit = 10, maxLimit = 50 } = {},
) => {
  const limit = Number(query.limit ?? defaultLimit)
  const cursor =
    query.cursor === undefined ? null : parsePositiveInt(query.cursor)

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > maxLimit ||
    (query.cursor !== undefined && !cursor)
  ) {
    return { limit: null, cursor: null, error: true }
  }

  return { limit, cursor, error: false }
}

export const isPrismaNotFoundError = (error) => error?.code === 'P2025'

export const isPrismaForeignKeyError = (error) => error?.code === 'P2003'
