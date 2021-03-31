import { IntersectionState } from '@type/board'
import { Dispatch, SetStateAction, useState } from 'react'

export const initializeState = (size: number): IntersectionState[][] =>
  new Array(size).fill(new Array(size).fill(IntersectionState.EMPTY))

export type SetBoardStateFT = (
  x: number,
  y: number,
  value: IntersectionState,
) => void

export type useBoardStateReturnT = [IntersectionState[][], SetBoardStateFT]

export const useBoardState = (size: number): useBoardStateReturnT => {
  const [state, setState] = useState<IntersectionState[][]>(
    initializeState(size),
  )

  const setBoardState: SetBoardStateFT = (x, y, value) => {
    if (x >= 0 && x < state.length && y >= 0 && y < state.length)
      setState((board) =>
        board.map((boardRow, yPos) => {
          if (yPos == y)
            return boardRow.map((prevValue, xPos) => {
              if (xPos == x) return value
              else return prevValue
            })
          else return boardRow
        }),
      )
  }

  return [state, setBoardState]
}
