import { get } from 'idb-keyval'
import { GOKGS_URL } from '@config/webConfig'
import { DownsteamResponse, RequestTypes, UpstreamRequest } from '@type/fetch'
import { DownsteamMessage } from '@type/messages'
import { LoginRequest } from '@type/requests'
import { useCallback, useEffect, useState } from 'react'
import { SetStateFT } from '@type/utils'

export type DoRequest = <T extends UpstreamRequest = UpstreamRequest>(
  msg: UpstreamRequest & T
) => Promise<void>

export type DoLogin = (username: string, password: string) => Promise<void>

export type UseAPIReturnT = [DoLogin, DoRequest]

export const useAPI = (
  isLoggedIn: boolean,
  setIsLoggedIn: SetStateFT<boolean>,
  reducer: (msg: DownsteamMessage) => void
): UseAPIReturnT => {
  const [doneLogin, setDoneLogin] = useState(false)

  useEffect(() => {
    if (doneLogin) {
      getDownstram()
    } else if (isLoggedIn) {
      ;(async () => {
        const username = await get('user:login')
        const password = await get('user:password')

        if (username && password) doLogin(username, password)
      })()
    }
  }, [doneLogin])

  const getDownstram = useCallback(async () => {
    try {

      const res = await fetch(GOKGS_URL, {
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
        setDoneLogin(false)
        throw new Error('LOGOUT')
      }
    } catch (err) {
      if (err.message === 'LOGOUT') setIsLoggedIn(false)
    }
  }, [])

  const doUpstream = useCallback<DoRequest>(async (msg) => {
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
        if (msg.type === RequestTypes.login) {
          getDownstram()
        }
      } else throw new Error(res.statusText)
    } catch (err) {
      console.error(err.message)
      if (err.message === 'LOGOUT') throw err
    }
  }, [])

  const doLogin = useCallback<DoLogin>(async (username, password) => {
    try {
      await doUpstream<LoginRequest>({
        type: RequestTypes.login,
        name: username,
        password,
        locale: 'en_US',
      })
    } catch (err) {}
  }, [])

  return [doLogin, doUpstream]
}
