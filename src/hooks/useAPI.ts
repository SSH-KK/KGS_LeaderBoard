import { GOKGS_URL } from '@config/webConfig'
import {
  DownsteamMessage,
  DownsteamResponse,
  LoginRequest,
  ReuestTypes,
  UpstreamRequest,
} from '@type/fetch'
import { useCallback, useEffect, useState } from 'react'

export const useAPI = (username: string, password: string) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [responsePull, setResponsePull] = useState<DownsteamMessage[]>([])

  const getDownstram = useCallback(async () => {
    try {
      const res = await fetch(GOKGS_URL, {
        mode: 'cors',
        method: 'GET',
      })

      if (res.status === 200) {
        const data = (await res.json()) as DownsteamResponse

        if (data.messages)
          setResponsePull((prev) => [...prev, ...data.messages])
      } else {
        setIsLoggedIn(false)
        throw new Error('LOGOUT')
      }
    } catch (err) {
      console.error(err.message)
      if (err.message === 'LOGOUT') throw err
    }
  }, [])

  const doUpstream = useCallback(
    async <T extends UpstreamRequest>(msg: UpstreamRequest & T) => {
      try {
        // await fetch(GOKGS_URL, { method: 'GET' })
        const res = await fetch(GOKGS_URL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(msg),
        })

        if (res.status == 200) {
          if (msg.type === ReuestTypes.login) {
            setIsLoggedIn(true)
            getDownstram()
          }
        } else throw new Error(res.statusText)
      } catch (err) {
        console.error(err.message)
        if (err.message === 'LOGOUT') throw err
      }
    },
    [getDownstram]
  )

  useEffect(() => {
    ;(async () => {
      try {
        await doUpstream<LoginRequest>({
          type: ReuestTypes.login,
          name: username,
          password,
          locale: 'en_US',
        })
      } catch (err) {}
    })()
  }, [])

  return [responsePull]
}
