import React from 'react'

import { useBoardState } from '@hooks/useBoardState'
import { useGame } from '@hooks/useGame'
import { GameInfoT } from '@type/game'
import { Board } from '@components/Board'

export interface IGameProps {
  state: GameInfoT
  timestamp: string
}

export const Game = (args: IGameProps) => {
  const fetchedState = args.state

  const [board, setBoardState] = useBoardState(fetchedState.gameSummary.size)
  const [] = useGame(args.timestamp, board, setBoardState)

  return (
    <div>
      <Board size={fetchedState.gameSummary.size} state={board} />
    </div>
  )
}
