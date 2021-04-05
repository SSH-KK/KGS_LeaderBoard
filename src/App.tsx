import { useAPI } from '@hooks/useAPI'
import { getTop } from '@utils/getTop'
import useBD from '@hooks/useBD'
import React, { useCallback, useEffect } from 'react'
import { reducerConstructor } from '@utils/messageReducer'

export const App = () => {
  const { connected, deleteDB, getDB, listDB, putDB } = useBD()

  const reducer = useCallback(reducerConstructor({ get: getDB, put: putDB }), [
    getDB,
    putDB,
  ])

  const doRequest = useAPI('dm1sh', 'vp5s27', reducer)

  useEffect(() => {
    if (connected)
      (async () => console.log(await getTop(putDB, getDB, doRequest)))()
  }, [connected])

  return (
    <div>
      <ul></ul>
    </div>
  )
}
