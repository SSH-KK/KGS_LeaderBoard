import React, { useEffect, useState } from 'react'
import UseHttp from '@hooks/UseHttp'
import { match } from 'react-router-dom';
import {GameInfoT} from '@type/game'

type MatchParams = {
    game_timestamp: string;
}

type GameProps = {
    match: match<MatchParams>
}

const Game: React.FC<GameProps> = ({match})=>{
    const [game, setGame] = useState<GameInfoT | {}>({})
    const { request, loading, error } = UseHttp()

    useEffect(()=>{
        request(`/game/${match.params.game_timestamp}`, 'GET').then((tdata) => {
            setGame(tdata)
          })
    },[])

    return(
        <>
        <h1>{match.params.game_timestamp}</h1>
        </>
    );
}

export default Game