import { expect } from 'chai'
import { CoordinateList } from './coordinateList'

describe('CoordinateList class tests', () => {
  let cl: CoordinateList

  beforeEach(() => {
    cl = new CoordinateList([
      [1, 2],
      [1, 3],
      [0, 3],
    ])
  })

  describe('initialization', () => {
    it('Initializes with list of coordinates', () => {
      expect(cl.content).eql({ 2: [1], 3: [1, 0] })
    })
  })

  describe('get method', () => {
    it('Gives array of coordinates', () => {
      expect(cl.get()).eql([
        [1, 2],
        [1, 3],
        [0, 3],
      ])
    })
  })

  describe('intersection method', () => {
    let other: CoordinateList

    beforeEach(() => {
      other = new CoordinateList([
        [1, 2],
        [9, 2],
        [0, 3],
      ])
    })

    it('Returns intersection of two lists', () => {
      const intersection = cl.intersection(other)

      expect(intersection).to.have.same.deep.members([
        [1, 2],
        [0, 3],
      ])
    })

    it('Returns same result in both diractions', () => {
      const intersection1 = cl.intersection(other)
      const intersection2 = other.intersection(cl)

      expect(intersection1).to.have.same.deep.members(intersection2)
    })
  })

  describe('difference method', () => {
    let other: CoordinateList

    beforeEach(() => {
      other = new CoordinateList([
        [1, 2],
        [9, 2],
        [0, 3],
      ])
    })

    it('Returns difference of two lists', () => {
      const difference = cl.difference(other)

      expect(difference).to.have.same.deep.members([
        [9, 2],
        [1, 3],
      ])
    })

    it('Returns same result in both diractions', () => {
      const difference1 = cl.difference(other)
      const difference2 = other.difference(cl)

      expect(difference1).to.have.same.deep.members(difference2)
    })
  })

  describe('union method', () => {
    let other: CoordinateList

    beforeEach(() => {
      other = new CoordinateList([
        [1, 2],
        [9, 2],
        [0, 3],
      ])
    })

    it('Returns union of two lists', () => {
      const union = cl.union(other)

      expect(union).to.have.same.deep.members([
        [1, 2],
        [1, 3],
        [9, 2],
        [0, 3],
      ])
    })
  })

  describe('add method', () => {
    it('Adds coordinates to list', () => {
      cl.add([6, 5])

      expect(cl.get()).to.have.same.deep.members([
        [1, 2],
        [1, 3],
        [0, 3],
        [6, 5],
      ])
    })

    it('Correctly adds coordinates within same row', () => {
      cl.add([5, 2])
      expect(cl.content).eql({ 2: [1, 5], 3: [1, 0] })
    })
  })
})
