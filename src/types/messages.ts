import { LastGameT, ResponseTypes } from './fetch'

export type DownsteamMessage = {
  type: ResponseTypes
}

export type ArchiveJoinMessage = DownsteamMessage & {
  user: {
    name: string
  }
  games: LastGameT[]
}
