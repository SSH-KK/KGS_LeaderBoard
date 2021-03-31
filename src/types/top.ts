import { LastGameT } from './gameFetch'

export type UserTopT = {
  name: string
  rank: string
  place: number
  last: LastGameT[]
}
