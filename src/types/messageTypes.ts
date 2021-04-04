import { GameSummaryT, LastGameT, ResponseTypes, sgfEvent } from './fetch'

export type DownsteamMessage = {
  type: ResponseTypes
}

export type ArchiveJoinMessage = DownsteamMessage & {
  user: {
    name: string
  }
  games: LastGameT[]
}

export type GameJoinMessage = DownsteamMessage & {
  gameSummary: GameSummaryT
  sgfEvents: sgfEvent[]
}