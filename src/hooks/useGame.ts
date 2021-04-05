import { IntersectionState } from '@type/board'
import { SetFullBoardStateFT } from '@hooks/useBoardState'
import { useEffect, useState } from 'react'
import { createBoard, getData, makeMove } from '@utils/goLogic'
import { IFetchedGame } from '@type/fetch'
import { ColorT, GameStepT } from '@type/game'
import { BoardData } from '@type/pyGame'

const convertStringToColor = (str: 'black' | 'white'): ColorT =>
  str === 'black' ? IntersectionState.BLACK : IntersectionState.WHITE

export type UseGameReturnT = [
  GameStepT[],
  number,
  boolean,
  (to: number) => void
]

export const useGame = (
  timestamp: string,
  fetchedGame: IFetchedGame,
  setFullBoardState: SetFullBoardStateFT
): UseGameReturnT => {
  console.log('Used useGame hook')
  const [loading, setLoading] = useState(true)

  const [steps, setSteps] = useState<GameStepT[]>([])

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (createBoard(timestamp, fetchedGame.gameSummary.size, fetchedGame.events[0].color == 'black'))
      setSteps(() =>
        fetchedGame.events.map((event) => {
          const { color, position } = event
          const [x, y] = position as [number, number]

          makeMove(timestamp, { coords: { x, y }, passing: false }, color)

          const boardState = getData(timestamp) as BoardData

          return {
            boardState: boardState.stones,
            loc: { x, y: fetchedGame.gameSummary.size - y },
            color: convertStringToColor(color),
          }
        })
      )
  }, [])

  const seekToStep = (to: number) => {
    if (to < steps.length && to >= 0) {
      setFullBoardState(steps[to].boardState)
      setCurrentStep(() => to)
    }
  }

  useEffect(() => {
    seekToStep(steps.length - 1)
    setLoading(false)
  }, [steps])

  return [steps, currentStep, loading, seekToStep]
}
