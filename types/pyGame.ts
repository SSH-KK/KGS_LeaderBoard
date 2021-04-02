declare class PyNone {
  constructor()

  $infos: {
    __name__: 'NoneType'
  }
}

export const isPyNone = <T>(val: PyNone | T): val is PyNone => {
  return val instanceof PyNone
}

export type GameData = {
  $string_dict: {
    color: [boolean, number]
    game_over: [boolean, number]
    score: [[number, number], number]
    size: [number, number]
    stones: (boolean | PyNone)[][]
    territory: (boolean | PyNone)[][]
  }
}

export type GetData = (tid: string) => GameData | PyNone

export type CreateBoard = (tid: string, size: number) => GameData

export type GetScore = (tid: string) => [number, number]

export type PlaceStone = (tid: string, x: number, y: number) => boolean | PyNone
