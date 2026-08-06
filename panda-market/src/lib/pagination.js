function parseBoundedInteger(value, { defaultValue, min, max, parameterName }) {
  if (value === null || value === undefined || value === '') {
    return defaultValue
  }

  const parsedValue = Number(value)

  if (
    !Number.isFinite(parsedValue) ||
    !Number.isInteger(parsedValue) ||
    parsedValue < min ||
    parsedValue > max
  ) {
    throw new PaginationQueryError(
      `${parameterName} must be an integer between ${min} and ${max}.`,
    )
  }

  return parsedValue
}

class PaginationQueryError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PaginationQueryError'
  }
}

export { parseBoundedInteger, PaginationQueryError }
