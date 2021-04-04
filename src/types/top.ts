import { LastGameT } from './fetch'

export type TopUserInfoT = {
  username: string
  rank: string
  place: number
  games: LastGameT[]
}
