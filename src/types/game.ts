import { BoardT, IntersectionState } from './board'

export type ColorT = Exclude<IntersectionState, IntersectionState.EMPTY>

export type GameStepT = {
  color: ColorT
  boardState: BoardT
}