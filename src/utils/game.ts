import { IntersectionState } from '@type/board'
import { MoveChangeT, ColorT, PositionT, IGroup } from '@type/game'
import { Dispatch, SetStateAction } from 'react'

export const getOpponent = (player: ColorT): ColorT =>
  player === IntersectionState.WHITE
    ? IntersectionState.BLACK
    : IntersectionState.WHITE

export const countCaptures = (
  prevCaptures: [number, number],
  deaths: MoveChangeT[]
) =>
  deaths.reduce((captures, death): [number, number] => {
    if (death.player === IntersectionState.BLACK)
      return [captures[0] + 1, captures[1]]
    else return [captures[1], captures[1] + 1]
  }, prevCaptures)

export const initializeWorkBoard = (size: number) =>
  Array(size)
    .fill('')
    .map(() =>
      Array(size)
        .fill('')
        .map(() => null)
    )

export const initGroup = (color: ColorT, stones: PositionT[] = []): IGroup => ({
  color,
  stones,
  border: [],
})

export const mergeGroups = (a: IGroup, b: IGroup) => {
  if (a.color != b.color)
    throw new Error('Only groups of same colour can be merged')

  const newGroup = initGroup(a.color, [...a.stones, ...b.stones])

  newGroup.border = [...a.border, ...b.border]

  return newGroup
}

interface AddStoneReturnT {
  adds: MoveChangeT[]
  deaths: MoveChangeT[]
}

export const placeStone = (
  player: ColorT,
  pos: PositionT,
  board: IGroup[][] | null[][],
  setBoardState: Dispatch<SetStateAction<IGroup[][] | null[][]>>
): AddStoneReturnT => {
  // TODO: add validation

  const { x, y } = pos
  const size = board.length

  const adds: MoveChangeT[] = []
  const deaths: MoveChangeT[] = []
  const opponent = getOpponent(player)

  let newGroup = initGroup(player, [pos])

  for (const [checkX, checkY] of [
    [x, y + 1],
    [x + 1, y],
    [x - 1, y],
    [x, y - 1],
  ] as [number, number][]) {
    if (checkX < 0 || checkY < 0 || checkX == size || checkY == size) continue

    newGroup.border.push({ x: checkX, y: checkY })

    const checkGroup = board[checkY][checkX]

    if (checkGroup === null) continue

    if (newGroup.color === checkGroup.color) {
      newGroup = mergeGroups(newGroup, checkGroup)
    }
  }

  return { adds, deaths }
}
