import { SetBoardStateFT } from '@hooks/useBoardState'
import { GameInfoT } from '@type/gameFetch'
import { useEffect, useState } from 'react'
import { BoardT, IGameMove, IGroup } from '@type/game'
import { placeStone, countCaptures, initializeWorkBoard } from '@utils/game'
import { convertPlayerColor } from '@utils/gameFetch'

export const useGame = (
  state: GameInfoT,
  timestamp: string,
  board: BoardT,
  setBoardState: SetBoardStateFT
) => {
  const [ready, setReady] = useState(false)

  const [moves, setMovesState] = useState<IGameMove[]>([])

  const [workBoard, setWorkBoardState] = useState<IGroup[][] | null[][]>(
    initializeWorkBoard(state.gameSummary.size)
  )

  useEffect(() => {
    setMovesState((prev) => {
      const prevMove = prev[prev.length - 1]

      return state.sgfEvents.map((event, eventIndex) => {
        const { adds, deaths } = placeStone(
          convertPlayerColor(event.props[0].color),
          event.props[0].loc,
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
