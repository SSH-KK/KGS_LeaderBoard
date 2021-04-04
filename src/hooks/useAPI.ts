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
      const req = new XMLHttpRequest()

      req.onreadystatechange = () => {
        if (req.readyState == 4) {
          if (req.status == 200) {
            const res = JSON.parse(req.responseText)

            if (res.messages) {
              console.log(res.messages)
            }

            if (isLoggedIn) getDownstram()
          }
        }
      }

      req.open('GET', GOKGS_URL, true)
      // req.setRequestHeader('Accept', 'application/json;charset=UTF-8')
      // req.withCredentials = true
      req.send()

      // const res = await fetch(GOKGS_URL, {
      //   mode: 'cors',
      //   method: 'GET',
      // })

      // if (res.status === 200) {
      //   const data = (await res.json()) as DownsteamResponse

      //   if (data.messages)
      //     setResponsePull((prev) => [...prev, ...data.messages])
      // } else {
      //   setIsLoggedIn(false)
      //   throw new Error('LOGOUT')
      // }
    } catch (err) {
      console.error(err.message)
      if (err.message === 'LOGOUT') throw err
    }
  }, [])

  const doUpstream = useCallback(
    async <T extends UpstreamRequest>(msg: UpstreamRequest & T) => {
      try {
        const req = new XMLHttpRequest()

        req.onreadystatechange = () => {
          if (req.readyState == 4) {
            if (req.status == 200) {
              if (msg.type === ReuestTypes.login) {
                setIsLoggedIn(true)
                getDownstram()
                console.log(req.getAllResponseHeaders())
              }
            } else console.error(req.responseText)
          }
        }

        req.open('POST', GOKGS_URL, true)
        req.withCredentials = true
        req.setRequestHeader('content-type', 'application/json;charset=UTF-8')

        req.send(JSON.stringify(msg))
        // // await fetch(GOKGS_URL, { method: 'GET' })
        // const res = await fetch(GOKGS_URL, {
        //   method: 'POST',
        //   mode: 'cors',
        //   credentials: 'include',
        //   headers: {
        //     'Content-Type': 'application/json;charset=UTF-8',
        //   },
        //   body: JSON.stringify(msg),
        // })

        // if (res.status == 200) {
        //   if (msg.type === ReuestTypes.login) {
        //     setIsLoggedIn(true)
        //     getDownstram()
        //   }
        // } else throw new Error(res.statusText)
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
