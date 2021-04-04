import { LastGameT } from './fetch'

export type TopUserInfoT = {
  name: string
  rank: string
  place: number
  games: LastGameT[]
}
