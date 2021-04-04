import useBD from '@hooks/useBD'
import React, { useEffect } from 'react'

export const App: React.FC = () => {
  const { connected, requestToDB } = useBD()

  useEffect(() => {
    if (connected) {
      requestToDB('single', 'user', 1).then((resu) => {
        console.log(resu)
      })
    }
  }, [connected])

  return (
    <div>
      <h1>HELLO</h1>
    </div>
  )
}
