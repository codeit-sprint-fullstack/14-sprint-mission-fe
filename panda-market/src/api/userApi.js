import { fetchWithAuth } from '@/api/fetchWithAuth'

const USER_API_URL = 'https://panda-market-api.vercel.app/users/me'

async function getUserProfile() {
  const res = await fetchWithAuth(USER_API_URL, {
    // fetch의 기본 메서드가 GET이기 때문에 생략 가능하나 가독성을 위해 유지
    method: 'GET',
  })

  if (!res.ok) {
    const data = await res.json()

    throw new Error(
      data.message || `유저 정보를 불러오지 못했습니다. (${res.status})`,
    )
  }

  return res.json()
}

export { getUserProfile }
