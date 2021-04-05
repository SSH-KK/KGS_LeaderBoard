import { useAPI } from '@hooks/useAPI'
import { getTop } from '@utils/getTop'
import useBD from '@hooks/useBD'
import React, { useCallback, useEffect, useState } from 'react'
import { reducerConstructor } from '@utils/messageReducer'
import { TopUserInfoT } from '@type/top'

export const App = () => {
  const { connected, deleteDB, getDB, listDB, putDB } = useBD()
  const [usersTop, setUsersTop] = useState<TopUserInfoT[]>([])

  const reducer = useCallback(reducerConstructor({ setTopList: setUsersTop }), [
    getDB,
    putDB,
  ])

  const doRequest = useAPI('dm1sh', 'vp5s27', reducer)

  useEffect(() => {
    if (connected)
      (async () => console.warn(await getTop(doRequest, setUsersTop)))()
  }, [connected])

  return (
    <div>
      <span>{usersTop.length}</span>
      <ul>
        {usersTop.map((user) => (
          <li key={user.username}>
            {user.username}

            <ul>
              {user.games.map((game) => (
                <li key={game.timestamp}>{game.timestamp}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
