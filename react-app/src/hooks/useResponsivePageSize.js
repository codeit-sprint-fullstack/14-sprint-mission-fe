import { useEffect, useState } from 'react'

// 화면 비율에 따라 pageSize를 변경

function useResponsivePageSize() {
  // 현재 브라우저의 폭을 확인해서 개수를 4개 6개 10개로 조정
  const getPageSize = () => {
    if (window.innerWidth < 768) return 4
    if (window.innerWidth < 1200) return 6
    return 10
  }
  // 현재 pageSize 저장
  const [pageSize, setPageSize] = useState(getPageSize)

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize())
    }
    // 창 크기가 바뀌면 handleResize를 호출해줘.
    window.addEventListener('resize', handleResize)
    // resize 이벤트 제거로 중복 이벤트 발생 방지
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return pageSize
}

export default useResponsivePageSize