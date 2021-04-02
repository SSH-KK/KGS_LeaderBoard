import { CreateBoard, GetData, GetScore, PlaceStone } from './pyGame'

declare global {
  interface Window {
    game: {
      createBoard: CreateBoard
      getData: GetData
      getScore: GetScore
      place: PlaceStone
    }
  }
}

export {}
