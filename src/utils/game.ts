import { IntersectionState } from '@type/board'
import { MoveChangeT, ColorT, PositionT, IGroup, WorkBoardT } from '@type/game'
import { Dispatch, SetStateAction } from 'react'

export const getOpponent = (player: ColorT): ColorT =>
  player === IntersectionState.WHITE
    ? IntersectionState.BLACK
    : IntersectionState.WHITE

export const countCaptures = (prevCaptures: PositionT, deaths: MoveChangeT[]) =>
  deaths.reduce((captures, death): PositionT => {
    if (death.player === IntersectionState.BLACK)
      return [captures[0] + 1, captures[1]]
    else return [captures[0], captures[1] + 1]
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
  stones: new Set(stones),
  border: new Set(),
})

export const mergeGroups = (a: IGroup, b: IGroup) => {
  if (a.color != b.color)
    throw new Error('Only groups of same colour can be merged')

  const newGroup = initGroup(a.color, [...a.stones, ...b.stones])

  newGroup.border = new Set(
    [...a.border, ...b.border].filter(
      (el) => !a.stones.has(el) && !b.stones.has(el)
    )
  )

  return newGroup
}

export const countLiberties = (group: IGroup, board: WorkBoardT): number =>
  [...group.border].reduce(
    (collector, [x, y]) => collector + (board[y][x] ? 1 : 0),
    0
  )

interface AddStoneReturnT {
  adds: MoveChangeT[]
  deaths: MoveChangeT[]
}

export const placeStone = (
  player: ColorT,
  pos: PositionT,
  board: WorkBoardT,
  setBoardState: Dispatch<SetStateAction<WorkBoardT>>
): AddStoneReturnT => {
  // TODO: add validation

  const [x, y] = pos
  const size = board.length

  const adds: MoveChangeT[] = []
  const deaths: MoveChangeT[] = []
  // const opponent = getOpponent(player)

  const moveActions: { kill: IGroup[]; remove: IGroup[] } = {
    kill: [],
    remove: [],
  }

  let newGroup = initGroup(player, [pos])

  for (const [checkX, checkY] of [
    [x, y + 1],
    [x + 1, y],
    [x - 1, y],
    [x, y - 1],
  ] as PositionT[]) {
    if (checkX < 0 || checkY < 0 || checkX == size || checkY == size) continue

    newGroup.border.add([checkX, checkY])

    const checkGroup = board[checkY][checkX]

    if (checkGroup === null) continue

    if (newGroup.color === checkGroup.color)
      newGroup = mergeGroups(newGroup, checkGroup)
    else if (countLiberties(checkGroup, board) === 1)
      moveActions.kill.push(checkGroup)
  }

  return { adds, deaths }
}
