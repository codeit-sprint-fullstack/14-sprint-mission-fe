import { useEffect, useState } from "react"

function useMediaQuery () {
  const [pageSize, setPageSize] = useState(10)

  const handleResize = () => {
    if (window.innerWidth <= 375) {
      setPageSize(4)
    } else if (window.innerWidth <= 744) {
      setPageSize(6)
    } else {
      setPageSize(10)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { pageSize }
}

export default useMediaQuery