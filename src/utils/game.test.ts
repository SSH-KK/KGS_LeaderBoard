// import { IntersectionState } from '../types/board'
// import { expect } from 'chai'
// import { countCaptures, getOpponent, mergeGroups } from './game'

// describe('Game engine tests', function () {
//   describe('getOpponent test', () => {
//     it("Returns player's opponent", () => {
//       expect(getOpponent(IntersectionState.BLACK)).equal(
//         IntersectionState.WHITE
//       )
//       expect(getOpponent(IntersectionState.WHITE)).equal(
//         IntersectionState.BLACK
//       )
//     })
//   })

//   describe('countCaptures test', () => {
//     it('Returns new captures array with stones captured in this move', () => {
//       expect(
//         countCaptures(
//           [1, 3],
//           [
//             { player: IntersectionState.BLACK, pos: [1, 2] },
//             { player: IntersectionState.WHITE, pos: [3, 5] },
//           ]
//         )
//       ).eql([2, 4])
//     })
//   })

//   describe('mergeGroups test', () => {
//     it('Returns new group with merged stones and boards', () => {
//       const group = mergeGroups(
//         {
//           border: new Set([
//             [1, 0],
//             [0, 1],
//             [2, 1],
//             [1, 2],
//           ]),
//           color: IntersectionState.BLACK,
//           stones: new Set([[1, 1]]),
//         },
//         {
//           border: new Set([
//             [0, 0],
//             [1, 1],
//             [2, 0],
//           ]),
//           color: IntersectionState.BLACK,
//           stones: new Set([[1, 0]]),
//         }
//       )

//       console.log(group.border)

//       expect(group.border).to.have.all.keys([
//         { x: 0, y: 0 },
//         { x: 0, y: 1 },
//         { x: 1, y: 2 },
//         { x: 2, y: 0 },
//         { x: 2, y: 1 },
//       ])

//       expect(group.stones).to.have.all.keys([
//         { x: 1, y: 1 },
//         { x: 1, y: 0 },
//       ])
//     })
//   })
// })
