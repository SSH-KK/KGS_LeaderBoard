import { GOKGS_URL } from '@config/webConfig'
import { DownsteamResponse, RequestTypes, UpstreamRequest } from '@type/fetch'
import { DownsteamMessage } from '@type/messages'
import { LoginRequest } from '@type/requests'
import { useCallback, useEffect, useState } from 'react'
import throttle from 'fetch-throttle'
import assert from 'assert'

const fetchThrottle = throttle(fetch, 1, 1000)

export type DoRequest = <T extends UpstreamRequest>(
  msg: UpstreamRequest & T
) => Promise<void>

export type UseAPIReturnT = DoRequest

export const useAPI = (
  username: string,
  password: string,
  reducer: (msg: DownsteamMessage) => void
): UseAPIReturnT => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (isLoggedIn) getDownstram()
  }, [isLoggedIn])

  const getDownstram = useCallback(async () => {
    try {
      console.log('Called getDownstream')

      const res = await fetchThrottle(GOKGS_URL, {
        mode: 'cors',
        method: 'GET',
      })

      if (res.status === 200) {
        const data = (await res.json()) as DownsteamResponse

        if (data.messages)
          data.messages.map((message) => {
            reducer(message)
          })

        getDownstram()
      } else {
        setIsLoggedIn(false)
        throw new Error('LOGOUT')
      }
    } catch (err) {
      console.error(err.message)
      if (err.message === 'LOGOUT') throw err
    }
  }, [])

  const doUpstream = useCallback<DoRequest>(async (msg) => {
    try {
      const res = await fetchThrottle(GOKGS_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(msg),
      })

      if (res.status == 200) {
        if (msg.type === RequestTypes.login) {
          setIsLoggedIn(true)
        }
      } else throw new Error(res.statusText)
    } catch (err) {
      console.error(err.message)
      if (err.message === 'LOGOUT') throw err
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        await doUpstream<LoginRequest>({
          type: RequestTypes.login,
          name: username,
          password,
          locale: 'en_US',
        })
      } catch (err) {}
    })()
  }, [])

  return doUpstream
}
