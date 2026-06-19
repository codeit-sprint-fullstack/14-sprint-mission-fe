import { useEffect, useState } from 'react'

// 베스트 상품 개수를 페이지 폭에 따라 4개 2개 1개로 조정

function useBestProductSize() {
  const getSize = () => {
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1200) return 2
    return 4
  }

  const [size, setSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

export default useBestProductSize