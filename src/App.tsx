import { useAPI } from '@hooks/useAPI'
import React from 'react'

export const App = () => {
  const [responsePull] = useAPI('dm1sh', 'vp5s27')

  return (
    <div>
      <ul>
        {responsePull.map((message, index) => (
          <li key={`message${index}`}>{message.type}</li>
        ))}
      </ul>
    </div>
  )
}
