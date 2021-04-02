import React from 'react'

import { useBoardState } from '@hooks/useBoardState'
import { useGame } from '@hooks/useGame'
import { GameInfoT } from '@type/game'
import { Board } from '@components/Board'
import styles from '@styles/Game.module.css'

import LeftArrow from '@icons/LeftArrow.svg'
import RightArrow from '@icons/RightArrow.svg'

export interface IGameProps {
  state: GameInfoT
  timestamp: string
}

export const Game = (args: IGameProps) => {
  const fetchedState = args.state

  const [board, setBoardState] = useBoardState(fetchedState.gameSummary.size)
  const [] = useGame(args.timestamp, board, setBoardState)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`${styles.customCol} col-md-9`}>
          <div className={`${styles.boardContaier} mx-auto`}><Board size={fetchedState.gameSummary.size} state={board} /></div>
        </div>
        <div className={`${styles.bgMain} col-md-3`}>
          <h4 className="text-white"> Game menu:</h4>
          <div className="row">
            <div className="col-12 py-3">
              <label htmlFor="customRange" className="form-label text-white fs-5">Game process scroll</label>
              <input type="range" className="form-range" min="0" max="100" step="1" id="customRange"/>
              <label htmlFor="customRange" className="form-label text-white fs-5">Game step: 300</label>
            </div>
            <div className="col-12 mb-2">
              <div className="btn-group w-100" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-lg btn-primary border-end border-2 d-flex justify-content-center text-white"><LeftArrow/></button>
                <button type="button" className="btn btn-lg btn-primary border-start border-2 d-flex justify-content-center text-white"><RightArrow/></button>
              </div>
            </div>
            <span className="text-white fs-5 mb-2">Game step info:</span>
            <div className={`col-12 d-flex flex-column text-secondary ${styles.scrollMenu}`}>
              <span className={`fs-5 bg-info p-1 border-bottom border-2 text-center ${styles.activeInfo}`}>x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-bottom border-2 bg-light text-center">x:B y:12 COLOR:BLACK</span>
              <span className="fs-5 p-1 border-top border-3 bg-light text-center">x:B y:12 COLOR:BLACK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
