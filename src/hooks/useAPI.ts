import { set, get } from 'idb-keyval'
import { GOKGS_URL } from '@config/webConfig'
import {
  DownsteamResponse,
  LoginRequest,
  ReuestTypes,
  UpstreamRequest,
} from '@type/fetch'
import { DownsteamMessage } from '@type/messageTypes'
import { useCallback, useEffect, useState } from 'react'

export type UseAPIReturnT = [
  DownsteamMessage[],
  <T extends UpstreamRequest>(msg: UpstreamRequest & T) => Promise<void>
]

export const useAPI = (
  username: string,
  password: string,
  reducer: (msg: DownsteamMessage) => void
): UseAPIReturnT => {
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

        if (data.messages) data.messages.map(reducer)

        if (isLoggedIn) getDownstram()
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
        const res = await fetch(GOKGS_URL, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
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
        await set('timestamp_query',[])
        await doUpstream<LoginRequest>({
          type: ReuestTypes.login,
          name: username,
          password,
          locale: 'en_US',
        })
      } catch (err) {}
    })()
  }, [])

  return [responsePull, doUpstream]
}
