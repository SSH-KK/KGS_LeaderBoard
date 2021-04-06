import { UpstreamRequest } from './fetch'

export type LoginRequest = UpstreamRequest & {
  name: string
  password: string
  locale?: string
}

export type JoinArchiveRequest = UpstreamRequest & {
  name: string
}

export type RoomLoadGameRequest = UpstreamRequest & {
  timestamp: string
  channelId: number
}
