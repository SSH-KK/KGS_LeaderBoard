import { IntersectionState } from '@type/board'

export const convertPlayerColor = (color: 'black' | 'white') =>
  color === 'black' ? IntersectionState.BLACK : IntersectionState.WHITE
