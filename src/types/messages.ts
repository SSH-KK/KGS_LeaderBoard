import {
  LastGameT,
  ResponseTypes,
  IFetchedGameSummaryT,
  SgfEventT,
} from './fetch'

export type DownsteamMessage = {
  type: ResponseTypes
}

export type ArchiveJoinMessage = DownsteamMessage & {
  user: {
    name: string
    rank: string
  }
  games: LastGameT[]
}

export type GameJoinMessage = DownsteamMessage & {
  gameSummary: IFetchedGameSummaryT
  sgfEvents: SgfEventT[]
}
