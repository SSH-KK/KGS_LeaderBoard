import { DownsteamMessage } from './messages'

export enum RequestTypes {
  login = 'LOGIN',
  joinArchive = 'JOIN_ARCHIVE_REQUEST',
  logout = 'LOGOUT',
}

export enum ResponseTypes {
  loginSuccess = 'LOGIN_SUCCESS',
  logout = 'LOGOUT',
  noSuchUser = 'LOGIN_FAILED_NO_SUCH_USER',
  wrongPassword = 'LOGIN_FAILED_BAD_PASSWORD',
  archiveJoin = 'ARCHIVE_JOIN',
}

export type UpstreamRequest = {
  type: RequestTypes
}

export type DownsteamResponse = {
  messages: DownsteamMessage[]
}

export type LastGameT = {
  gameType: string
  score: string
  komi: number
  size: number
  inPlay?: true
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
