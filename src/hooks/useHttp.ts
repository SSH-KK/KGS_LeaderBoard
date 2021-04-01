import { useState, useCallback } from 'react'
import { SERVER_URL } from '@config/webConfig'

export type RequestFT = <T>(
  url: string,
  method?: 'GET' | 'POST',
  body?: BodyInit | null,
  headers?: HeadersInit
) => Promise<T>

export type UseHttpReturnT = {
  request: RequestFT
  loading: boolean
  error: unknown
}

const useHttp = (): UseHttpReturnT => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

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
        console.log('WAS ERROR')
        console.log(e)
        setError(e)
        setLoading(false)
      }
    },
    []
  )

  return { request, loading, error }
}

export default useHttp
