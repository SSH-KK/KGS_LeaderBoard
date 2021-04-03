import React, { useEffect, useState } from 'react'
import { match, Redirect } from 'react-router-dom'

import { IFetchedGame } from '@type/fetch'
import useHttp from '@hooks/useHttp'
import Loader from './Loader'
import { Game } from './Game'

type MatchParams = {
  game_timestamp: string
}

export interface IGameProps {
  match: match<MatchParams>
  isAuth: boolean
}

const GameView: React.FC<IGameProps> = ({ match, isAuth }) => {
  const { request, loading, error } = useHttp()

  const [state, setState] = useState<IFetchedGame>()

  useEffect(() => {
    if (isAuth) {
      const timestamp = atob(match.params.game_timestamp)
      request<IFetchedGame>(`/game/${timestamp}`, 'GET')
        .then((tdata) => setState(tdata))
        .catch((e) => {
          console.log(e)
        })
    }
  }, [])

  if (error)
    return (
      <div>
        <h1>Error occurred</h1>
      </div>
    )
  else
    return !isAuth ? (
      <Redirect to="/" />
    ) : (
      <Loader loading={loading || !state}>
        <Game
          state={state as IFetchedGame}
          timestamp={match.params.game_timestamp}
        />
      </Loader>
    )
}

export default GameView
