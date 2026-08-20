async function fetchWithAuth(url, options = {}) {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    const error = new Error('로그인이 필요합니다.')
    error.status = 401
    throw error
  }

  const headers = new Headers(options.headers)

  headers.set('Authorization', `Bearer ${accessToken}`)

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    // let errorData

    // try {
    //   errorData = await res.json()
    // } catch {
    //   errorData = null
    // } 와 같은 코드로 에러 본문이 JSON이 아니면 null로 처리
    const errorData = await res.json().catch(() => null)
    const error = new Error(errorData?.message || '로그인이 만료되었습니다.')

    error.status = res.status
    localStorage.removeItem('accessToken')

    throw error
  }

  return res
}

export { fetchWithAuth }
