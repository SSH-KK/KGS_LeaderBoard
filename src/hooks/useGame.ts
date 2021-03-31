import { IntersectionState } from '@type/board'
import { SetBoardStateFT } from '@hooks/useBoardState'

export interface IGameState {
  size: number
  turn: number
}

export const useGame = (
  timestamp: string,
  board: IntersectionState[][],
  setBoardState: SetBoardStateFT
) => {
  return [0]
}
