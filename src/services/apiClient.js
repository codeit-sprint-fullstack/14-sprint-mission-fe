export const createQueryString = (params) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value)
    }
  })

  return searchParams.toString()
}

export const createApiClient = ({ baseUrl, errorMessage }) => {
  return async (path, { body, ...options } = {}) => {
    const fetchOptions = { ...options }

    if (body !== undefined) {
      fetchOptions.headers = { 'Content-Type': 'application/json' }
      fetchOptions.body = JSON.stringify(body)
    }

    let response

    try {
      response = await fetch(`${baseUrl}${path}`, fetchOptions)
    } catch {
      throw new Error(errorMessage)
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message ?? errorMessage)
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  }
}
