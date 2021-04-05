import { useAPI } from '@hooks/useAPI'
import { getTop } from '@utils/getTop'
import { getGame } from '@utils/getGame'
import useBD from '@hooks/useBD'
import {getDBT, putDBT} from '@type/db'
import React, { useEffect } from 'react'
import { reducerConstructor } from '@utils/messageReducer'

export const App = () => {
  const { connected, deleteDB, getDB, listDB, putDB } = useBD()

  // const reducer = reducerConstructor({ get: getDB, put: putDB, all:listDB, dell:deleteDB })

  const doRequest = useAPI('TUTOR03', 'z4bw4n', reducer)

  // useEffect(() => {
  //   if (connected)
  //     (async () => console.warn(await getTop(doRequest, setUsersTop)))()
  // }, [connected])

  useEffect(() => {
    if (connected){
      getGame(doRequest, '2020-10-03T11:15:00.331Z').then((data)=>{
        console.log(data)
      })
      console.log('WAIT')
    }
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
