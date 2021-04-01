import React, { useEffect, useState } from 'react'
import { match } from 'react-router-dom'

import { GameInfoT } from '@type/gameFetch'
import useHttp from '@hooks/useHttp'
import Loader from './Loader'
import { Game } from './Game'

type MatchParams = {
  game_timestamp: string
}

export interface IGameProps {
  match: match<MatchParams>
}

const GameView = ({ match }: IGameProps) => {
  const { request, loading, error } = useHttp()

  const [state, setState] = useState<GameInfoT>()

  useEffect(() => {
    request<GameInfoT>(
      `/game/${match.params.game_timestamp}`,
      'GET'
    ).then((tdata) => setState(tdata))
  }, [])

  if (error)
    return (
      <div>
        <h1>Error occurred</h1>
      </div>
    )
  else
    return (
      <Loader loading={loading || !state}>
        <Game
          state={state as GameInfoT}
          timestamp={match.params.game_timestamp}
        />
      </Loader>
    )
}

export default GameView
