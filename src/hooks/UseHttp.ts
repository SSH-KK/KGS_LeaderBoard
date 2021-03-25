import { useState, useCallback } from 'react'
import {SERVER_URL} from '@config/webConfig'

const UseHttp = () => {
  const [loading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Object | null>(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)
      try {
        const res = await fetch(`${SERVER_URL}${url}`, {
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
