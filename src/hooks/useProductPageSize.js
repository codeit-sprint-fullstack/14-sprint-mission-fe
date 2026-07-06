import { useEffect, useState } from 'react'
import { BREAKPOINT_TABLET, BREAKPOINT_DESKTOP } from '../constants/layout'

const getProductPageSize = () => {
  if (window.innerWidth < BREAKPOINT_TABLET) return 4
  if (window.innerWidth < BREAKPOINT_DESKTOP) return 6
  return 10
}

const useProductPageSize = (onPageSizeChange) => {
  const [pageSize, setPageSize] = useState(getProductPageSize)

  useEffect(() => {
    const handleResize = () => {
      const nextPageSize = getProductPageSize()

      if (nextPageSize === pageSize) return

      setPageSize(nextPageSize)
      onPageSizeChange?.()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageSize, onPageSizeChange])

  return pageSize
}

export default useProductPageSize
