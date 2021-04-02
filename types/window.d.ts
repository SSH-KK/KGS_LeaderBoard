import {
  PyCreateBoard,
  PyGetData,
  PyGetScore,
  PyPlaceStone,
} from '.@type/pyGame'

declare global {
  interface Window {
    py: {
      createBoard: PyCreateBoard
      getData: PyGetData
      getScore: PyGetScore
      place: PyPlaceStone
    }
  }
}

export {}
