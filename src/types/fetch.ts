export enum ReuestTypes {
  login = 'LOGIN',
}

export enum ResponseTypes {
  loginSuccess = 'LOGIN_SUCCESS',
  noSuchUser = 'LOGIN_FAILED_NO_SUCH_USER',
  wrongPassword = 'LOGIN_FAILED_BAD_PASSWORD',
}

export type UpstreamRequest = {
  type: ReuestTypes
}

export type DownsteamResponse = {
  messages: DownsteamMessage[]
}

export type DownsteamMessage = {
  type: ResponseTypes
}

export type LoginRequest = UpstreamRequest & {
  name: string
  password: string
  locale?: string
}

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
  timestamp: string
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
