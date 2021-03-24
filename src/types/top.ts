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

export type UserTopT = {
  name: string
  rank: string
  place: number
  last: LastGameT[]
}
