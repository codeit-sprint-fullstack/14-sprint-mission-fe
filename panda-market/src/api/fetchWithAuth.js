async function fetchWithAuth(url, options = {}) {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인이 필요합니다.')
  }

  const headers = new Headers(options.headers)

  headers.set('Authorization', `Bearer ${accessToken}`)

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    throw new Error('로그인이 만료되었습니다.')
  }

  return res
}

export { fetchWithAuth }
