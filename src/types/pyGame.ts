export type PyGameData = {
  $string_dict: {
    color: [boolean, number]
    game_over: [boolean, number]
    score: [[number, number], number]
    size: [number, number]
    stones: [(boolean | null)[][], number]
    territory: [(boolean | null)[][], number]
  }
}

export type PyGetData = (tid: string) => PyGameData | null

export type PyCreateBoard = (tid: string, size: number) => PyGameData

export type PyGetScore = (tid: string) => [number, number]

export type PyPlaceStone = (tid: string, x: number, y: number) => boolean | null

export interface MoveT {
  passing: false
  coords: { x: number; y: number }
}

export interface PassT {
  passing: true
}

export interface BoardData {
  size: number
  stones: (boolean | null)[][]
  game_over: boolean
  score: ScoreT
  color: boolean
}

export interface ScoreT {
  black: number
  white: number
}
