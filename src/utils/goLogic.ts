import { BoardData, PyGameData, MoveT, PassT, ScoreT } from '@type/pyGame'

const py2jsData = (pyData: PyGameData | null): BoardData | null => {
  if (!pyData) return null

  const pyDict = pyData.$string_dict
  return {
    color: pyDict.color[0],
    game_over: pyDict.game_over[0],
    score: {
      black: pyDict.score[0][1],
      white: pyDict.score[0][0],
    },
    size: pyDict.size[0],
    stones: pyDict.stones[0],
  }
}

export const makeMove = (tid: string, move: MoveT | PassT): boolean | null =>
  move.passing
    ? window.py.place(tid, -1, -1)
    : window.py.place(tid, move.coords.x, move.coords.y)

export const createBoard = (tid: string, size = 19): BoardData | null =>
  py2jsData(window.py.createBoard(tid, size))

export const getData = (tid: string): BoardData | null =>
  py2jsData(window.py.getData(tid))

export const getScore = (tid: string): ScoreT => {
  const scores: [number, number] = window.py.getScore(tid)

  return {
    black: scores[1],
    white: scores[0],
  }
}
