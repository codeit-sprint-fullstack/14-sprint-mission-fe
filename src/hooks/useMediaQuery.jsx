import { useEffect, useState } from "react"

function UseMediaQuery () {
  const [pageSize, setPageSize] = useState(10)
  const [bestPageSize, setBestPageSize] = useState(4)

  const handleResize = () => {
    if (window.innerWidth <= 480) {
      setPageSize(4)
      setBestPageSize(1)
    } else if (window.innerWidth <= 768) {
      setPageSize(6)
      setBestPageSize(2)
    } else {
      setPageSize(10)
      setBestPageSize(4)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { pageSize, bestPageSize }
}

export default UseMediaQuery