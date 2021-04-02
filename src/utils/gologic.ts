interface Move {
  passing: boolean
  coords: { x: number; y: number } | null
}

interface BoardData {
  size: number
  stones: (boolean | null)[][]
  game_over: boolean
  score: Score
  color: boolean
}

interface Score {
  black: number
  white: number
}

function py2jsdata(pydata: any): BoardData {
  pydata = pydata['$string_dict']
  return {
    color: pydata['color'][0] as boolean,
    game_over: pydata['game_over'][0] as boolean,
    score: {
      black: pydata['score'][0][1],
      white: pydata['score'][0][0],
    } as Score,
    size: pydata['size'][0] as number,
    stones: pydata['stones'][0].map((arr: Array<any>) => [...arr]) as (
      | boolean
      | null
    )[][],
  }
}

export function makeMove(tid: string, move: Move): boolean {
  if (move.passing && move.coords != null) {
    // @ts-ignore
    return py_place(tid, -1, -1)
  } else {
    // @ts-ignore
    return py_place(tid, move.coords.x, move.coords.y)
  }
}

export function createBoard(tid: string, size: number = 19): BoardData {
  // @ts-ignore
  return py2jsdata(py_create_board(tid, size))
}

export function getData(tid: string): BoardData {
  // @ts-ignore
  return py2jsdata(py_get_data(tid))
}

export function getScore(tid: string): Score {
  // @ts-ignore
  const scores: [number, number] = py_get_score(tid)
  return {
    black: scores[1],
    white: scores[0],
  }
}
