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

export type GameSummaryT = {
  gameType: string
  komi: number
  size: number
  white: PlayerT
  black: PlayerT
}

export type PlayerT = {
  name: string
  rank: string
}

export type FetchedEvent = {
  position: [number, number]
  color: 'black' | 'white'
}

export interface IFetchedGame {
  gameSummary: GameSummaryT
  events: FetchedEvent[]
}
