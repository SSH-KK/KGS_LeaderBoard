import { IntersectionState } from './board'

export type BoardT = IntersectionState[][]

export type PositionT = {
  x: number
  y: number
}

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
  stones: PositionT[]
  border: PositionT[]
}
