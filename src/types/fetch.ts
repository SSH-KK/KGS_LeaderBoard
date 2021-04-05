import { DownsteamMessage } from './messageTypes'

export enum ReuestTypes {
  login = 'LOGIN',
  joinArchive = 'JOIN_ARCHIVE_REQUEST',
  roomLoadGame = 'ROOM_LOAD_GAME'
}

export enum ResponseTypes {
  loginSuccess = 'LOGIN_SUCCESS',
  noSuchUser = 'LOGIN_FAILED_NO_SUCH_USER',
  wrongPassword = 'LOGIN_FAILED_BAD_PASSWORD',
  archiveJoin = 'ARCHIVE_JOIN',
  gameJoin = 'GAME_JOIN',
}

export type UpstreamRequest = {
  type: ReuestTypes
}

export type DownsteamResponse = {
  messages: DownsteamMessage[]
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

export type IFetchedGameSummaryT = {
  gameType: string
  komi: number
  size: number
  players:{
    white: PlayerT
    black: PlayerT
  }
}

export type PlayerT = {
  name: string
  rank: string
}

export type FetchedEvent = {
  position: [number, number] | string
  color: 'black' | 'white'
}

export interface IFetchedGame {
  gameSummary: GameSummaryT
  events: FetchedEvent[]
}

export type SgfPropT = {
  name: string
  color:'black' | 'white'
  loc:{
    x:number
    y:number
  }|string
}

export type SgfEventT = {
  type: string
  props:SgfPropT[]
}
