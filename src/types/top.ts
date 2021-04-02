import { LastGameT } from './fetch'

export type UserTopT = {
  name: string
  rank: string
  place: number
  last: LastGameT[]
}
