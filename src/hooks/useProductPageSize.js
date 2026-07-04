import { useEffect, useState } from 'react'
import { BREAKPOINT_TABLET, BREAKPOINT_DESKTOP } from '../constants/layout'

const getProductPageSize = () => {
  if (window.innerWidth < BREAKPOINT_TABLET) {
    return {
      type: 'mobile',
      all: 4,
    }
  }

  if (window.innerWidth < BREAKPOINT_DESKTOP) {
    return {
      type: 'tablet',
      all: 6,
    }
  }

  return {
    type: 'desktop',
    all: 10,
  }
}

const useProductPageSize = (onPageSizeChange) => {
  const [pageSize, setPageSize] = useState(getProductPageSize)

  useEffect(() => {
    const handleResize = () => {
      const nextPageSize = getProductPageSize()

      if (pageSize.type === nextPageSize.type) {
        return
      }

      setPageSize(nextPageSize)
      onPageSizeChange?.()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageSize.type, onPageSizeChange])

  return pageSize
}

export default useProductPageSize
