import { IntersectionState } from '@components/Board/types'
import { SetBoardStateFT } from '@hooks/useBoardState'
import { useEffect, useState } from 'react'
import { useBoardState } from './useBoardState'
import useHttp from './UseHttp'

export interface IGameState {
  size: number
  turn: number
}

export const useGame = (
  timestamp: string,
  board: IntersectionState[][],
  setBoardState: SetBoardStateFT,
) => {
  return [0]
}
