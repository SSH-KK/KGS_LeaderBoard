import { IntersectionState } from '@type/board'
import { SetFullBoardStateFT } from '@hooks/useBoardState'
import { useEffect, useState } from 'react'
import { createBoard, getData, makeMove } from '@utils/goLogic'
import { IFetchedGame } from '@type/fetch'
import { ColorT, CurrentStepT, GameStepT } from '@type/game'
import { BoardData } from '@type/pyGame'

const convertStringToColor = (str: 'black' | 'white'): ColorT =>
  str === 'black' ? IntersectionState.BLACK : IntersectionState.WHITE

export type UseGameReturnT =
  | [false, CurrentStepT, (to: number) => void]
  | [true, undefined, (to: number) => void]

export const useGame = (
  timestamp: string,
  fetchedGame: IFetchedGame,
  setFullBoardState: SetFullBoardStateFT
): UseGameReturnT => {
  const [loading, setLoading] = useState(true)

  const [steps, setSteps] = useState<GameStepT[]>([])

  const [currentStep, setCurrentStep] = useState<CurrentStepT>()

  const seekToStep = (to: number) => {
    if (to < steps.length && to >= 0) {
      setCurrentStep(() => ({
        step: steps[to],
        n: to,
      }))

      setFullBoardState(steps[to].boardState)
    }
  }

  useEffect(() => {
    if (createBoard(timestamp, fetchedGame.gameSummary.size))
      setSteps(() =>
        fetchedGame.events.map((event) => {
          const { color, position } = event
          const [x, y] = position

          makeMove(timestamp, { coords: { x, y }, passing: false })

          const boardState = getData(timestamp) as BoardData

          return {
            boardState: boardState.stones,
            color: convertStringToColor(color),
          }
        })
      )
  }, [])

  useEffect(() => {
    setLoading(false)
    seekToStep(steps.length - 1)
  }, [steps])

  if (loading) return [true, undefined, seekToStep]
  else return [false, currentStep!, seekToStep]
}
