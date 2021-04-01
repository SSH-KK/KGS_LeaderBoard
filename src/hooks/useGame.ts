import { SetBoardStateFT } from '@hooks/useBoardState'
import { GameInfoT } from '@type/gameFetch'
import { useEffect, useState } from 'react'
import { IGameMove, WorkBoardT } from '@type/game'
import { placeStone, countCaptures, initializeWorkBoard } from '@utils/game'
import { convertPlayerColor } from '@utils/gameFetch'
import { BoardT } from '@type/board'

export const useGame = (
  state: GameInfoT,
  timestamp: string,
  board: BoardT,
  setBoardState: SetBoardStateFT
) => {
  const [ready, setReady] = useState(false)

  const [moves, setMovesState] = useState<IGameMove[]>([])

  const [workBoard, setWorkBoardState] = useState<WorkBoardT>(
    initializeWorkBoard(state.gameSummary.size)
  )

  useEffect(() => {
    setMovesState((prev) => {
      const prevMove = prev[prev.length - 1]

      return state.sgfEvents.map((event, eventIndex) => {
        const { adds, deaths } = placeStone(
          convertPlayerColor(event.props[0].color),
          [event.props[0].loc.x, event.props[0].loc.y],
          workBoard,
          setWorkBoardState
        )

        const captures = countCaptures(prevMove.captures, deaths)

        return { adds, deaths, captures, n: eventIndex }
      })
    })
    setReady(true)
  }, [])

  return [ready]
}
