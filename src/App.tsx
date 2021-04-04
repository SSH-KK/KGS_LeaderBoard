import { useAPI } from '@hooks/useAPI'
import { getTop } from '@utils/getTop'
import useBD from '@hooks/useBD'
import {getDBT, putDBT} from '@type/db'
import React, { useEffect } from 'react'
import { reducerConstructor } from '@utils/messageReducer'

export const App = () => {
  const { connected, deleteDB, getDB, listDB, putDB } = useBD()

  // const reducer = reducerConstructor({ get: getDB, put: putDB, all:listDB, dell:deleteDB })

  // const [responsePull, doRequest] = useAPI('dm1sh', 'vp5s27', reducer)

  // useEffect(() => {
  //   if (connected) (async () => console.log(await getTop(putDB)))()
  // }, [connected])

  useEffect(() => {
    if (connected) (async () => console.log(await listDB('user')))()
  }, [connected])

  return (
    <div>
      {/* <ul>
        {responsePull.map((message, index) => (
          <li key={`message${index}`}>{message.type}</li>
        ))}
      </ul> */}
    </div>
  )
}
