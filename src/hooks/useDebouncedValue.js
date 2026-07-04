import { useEffect, useState } from 'react'

const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebouncedValue
