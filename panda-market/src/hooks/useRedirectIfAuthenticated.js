'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function useRedirectIfAuthenticated() {
  const router = useRouter()
  // useState(true)로 초기값을 설정하여 토큰 확인 전 인증 화면 깜빡임 방지
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      router.replace('/items')
      return
    }

    setIsCheckingAuth(false)
  }, [router])

  return isCheckingAuth
}

export default useRedirectIfAuthenticated
