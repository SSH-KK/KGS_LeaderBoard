import { Dispatch, SetStateAction } from 'react'
import { LastGameT } from './fetch'

export type TopUserInfoT = {
  username: string
  rank: string
  place: number
  games: LastGameT[]
}

export type SetTopFT = Dispatch<SetStateAction<TopUserInfoT>>
