import { IntersectionState } from './board'

export type WorkBoardT = (IGroup | null)[][]

export type PositionT = [number, number]

export type MoveChangeT = {
  pos: PositionT
  player: ColorT
}

export type ColorT = Exclude<IntersectionState, IntersectionState.EMPTY>

export interface IGameMove {
  adds: MoveChangeT[]
  deaths: MoveChangeT[]
  captures: [number, number]
  n: number
}

export interface IGroup {
  color: ColorT
  stones: Set<PositionT>
  border: Set<PositionT>
}
