import { refreshAccessToken } from './authApi'

// 상세·프로필·댓글 요청이 동시에 401을 받아도 재발급 API가 한 번만 호출되도록 결과를 공유
let refreshPromise = null

function createAuthError(message) {
  const error = new Error(message)

  error.status = 401

  return error
}

function removeAuthTokens() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

async function requestWithAccessToken(requestUrl, requestOptions, accessToken) {
  const headers = new Headers(requestOptions.headers)

  headers.set('Authorization', `Bearer ${accessToken}`)

  return fetch(requestUrl, { ...requestOptions, headers })
}

async function getRefreshedAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')

  if (!refreshToken) {
    throw createAuthError('로그인이 만료되었습니다.')
  }

  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(refreshToken)
      .then((data) => {
        if (!data.accessToken) {
          throw createAuthError('새로운 액세스 토큰을 발급받지 못했습니다.')
        }

        localStorage.setItem('accessToken', data.accessToken)

        return data.accessToken
      })
      // 재발급 성공·실패와 관계없이 작업이 종료됐으므로 다음 요청을 위해 초기화
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

async function fetchWithAuth(requestUrl, requestOptions = {}) {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw createAuthError('로그인이 필요합니다.')
  }

  let res = await requestWithAccessToken(
    requestUrl,
    requestOptions,
    accessToken,
  )

  if (res.status !== 401) {
    return res
  }

  let newAccessToken

  try {
    const latestAccessToken = localStorage.getItem('accessToken')

    // 다른 요청이 이미 재발급했다면 저장된 최신 토큰을 사용
    if (latestAccessToken && latestAccessToken !== accessToken) {
      newAccessToken = latestAccessToken
    } else {
      newAccessToken = await getRefreshedAccessToken()
    }
  } catch (error) {
    const isInvalidRefreshToken = error.status >= 400 && error.status < 500

    if (isInvalidRefreshToken) {
      removeAuthTokens()
      throw createAuthError(error.message)
    }
    // 네트워크 오류나 서버의 500대 오류라면 저장된 토큰 유지
    throw error
  }

  // 재귀 호출하지 않고 새 토큰으로 원래 요청을 딱 한 번만 재시도
  res = await requestWithAccessToken(requestUrl, requestOptions, newAccessToken)

  // 새 accessToken으로 재시도했는데도 401이면 두 토큰 제거
  if (res.status === 401) {
    // let errorData

    // try {
    //   errorData = await res.json()
    // } catch {
    //   errorData = null
    // } 와 같은 코드로 에러 본문이 JSON이 아니면 null로 처리
    const errorData = await res.json().catch(() => null)

    removeAuthTokens()

    throw createAuthError(errorData?.message || '로그인이 만료되었습니다.')
  }

  return res
}

export { fetchWithAuth }
