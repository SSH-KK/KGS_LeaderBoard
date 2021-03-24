import { useState, useCallback } from 'react'

const UseHttp = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Object | null>(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)
      try {
        const res = await fetch(url, {
          method,
          body,
          headers: { 'Content-Type': 'application/json', ...headers },
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Somthing goes wrong')
        }
        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e)
      }
    },
    []
  )

  return { request, loading, error }
}

export default UseHttp
