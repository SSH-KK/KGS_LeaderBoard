import { useState, useCallback } from 'react'
import { SERVER_URL } from '@config/webConfig'

export type RequestFT = (
  url: string,
  method?: 'GET' | 'POST',
  body?: any,
  headers?: any,
) => Promise<any>

export type UseHttpReturnT = {
  request: RequestFT
  loading: boolean
  error: Object | null
}

const useHttp = (): UseHttpReturnT => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Object | null>(null)

  const request = useCallback<RequestFT>(
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
    [],
  )

  return { request, loading, error }
}

export default useHttp
