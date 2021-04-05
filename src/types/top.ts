import { Dispatch, SetStateAction } from 'react'
import { LastGameT } from './fetch'
import { SetStateFT } from './utils'

export type TopUserInfoT = {
  username: string
  rank: string
  place: number
  games: LastGameT[]
}

export type SetTopFT = SetStateFT<TopUserInfoT[]>
