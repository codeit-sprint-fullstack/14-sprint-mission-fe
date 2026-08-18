const AUTH_API_URL = 'https://panda-market-api.vercel.app/auth'

async function requestAuth(path, body) {
  const res = await fetch(`${AUTH_API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || `인증 요청에 실패했습니다. (${res.status})`)
  }

  return data
}

async function signin({ email, password }) {
  return requestAuth('signIn', {
    email,
    password,
  })
}

async function signup({ email, nickname, password, passwordConfirmation }) {
  return requestAuth('signUp', {
    email,
    nickname,
    password,
    passwordConfirmation,
  })
}

export { signin, signup }
