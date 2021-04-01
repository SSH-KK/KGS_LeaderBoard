import { IntersectionState } from '../types/board'
import { expect } from 'chai'
import { getOpponent } from './game'

describe('Game engine tests', function () {
  describe('getOpponent test', () => {
    it("Returns player's opponent", () => {
      expect(getOpponent(IntersectionState.BLACK)).equal(
        IntersectionState.WHITE
      )
      expect(getOpponent(IntersectionState.WHITE)).equal(
        IntersectionState.BLACK
      )
    })
  })
})
