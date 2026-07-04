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
  return async (path, options = {}) => {
    let response

    try {
      response = await fetch(`${baseUrl}${path}`, options)
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
