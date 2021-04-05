import React, { useEffect, useState } from 'react'
import { match, Redirect } from 'react-router-dom'

import { IFetchedGame } from '@type/fetch'
import Loader from './Loader'

import { Game } from './Game'
import { getGame } from '@utils/getGame'
import { DoRequest } from '@hooks/useAPI'

type MatchParams = {
  game_timestamp: string
}

export interface IGameProps {
  match: match<MatchParams>
  isAuth: boolean
  doRequest: DoRequest
}

const GameView: React.FC<IGameProps> = ({ match, isAuth, doRequest }) => {

  const [state, setState] = useState<IFetchedGame>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    if(isAuth){
      const timestamp = atob(match.params.game_timestamp)
      getGame(doRequest,timestamp)
      .then((tdata)=>{
        setState(tdata)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
    }
  },[])
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
