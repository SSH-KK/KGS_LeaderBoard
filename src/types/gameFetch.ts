export type LastGameT = {
  gameType: string
  score: string
  komi: number
  size: number
  players: {
    white: {
      name: string
      flags: string
      rank: string
    }
    black: {
      name: string
      flags: string
      rank: string
    }
  }
  handicap: number
  timestamp: Date
}

export type sgfEventPropT = [
  {
    loc: {
      x: number
      y: number
    }
    color: 'black' | 'white'
    name: string
  },
  {
    color: 'black' | 'white'
    name: string
    float: number
    int: number
  }
]

export type sgfeventT = {
  type: string
  nodeId: number
  props: sgfEventPropT
}

export type GameSummaryT = {
  gameType: string
  score: string
  private: boolean
  komi: number
  size: number
  players: {
    white: {
      name: string
      rank: string
    }
    black: {
      name: string
      rank: string
    }
  }
}

export type GameInfoT = {
  gameSummary: GameSummaryT
  sgfEvents: sgfeventT[]
}
