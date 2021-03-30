import { LastGameT } from './game'

export type UserTopT = {
  name: string
  rank: string
  place: number
  last: LastGameT[]
}
