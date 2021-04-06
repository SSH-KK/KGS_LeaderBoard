import React, { ChangeEvent } from 'react'

import { useBoardState } from '@hooks/useBoardState'
import { useGame } from '@hooks/useGame'
import { IFetchedGame } from '@type/fetch'
import { Board } from '@components/Board'
import '@styles/Game.css'

import LeftArrow from '@icons/LeftArrow.svg'
import RightArrow from '@icons/RightArrow.svg'
import Loader from '@components/Loader'
import { Steps } from './Steps'

export interface IGameProps {
  state: IFetchedGame
  timestamp: string
}

export const Game = (args: IGameProps) => {
  const fetchedState = args.state

  const [board, _, setFullBoardState] = useBoardState(
    fetchedState.gameSummary.size
  )

  const [steps, currentStep, loading, seekToStep] = useGame(
    args.timestamp,
    fetchedState,
    setFullBoardState
  )

  const goNext = () => {
    if (currentStep < fetchedState.events.length) seekToStep(currentStep + 1)
  }

  const goPrev = () => {
    if (currentStep > 0) seekToStep(currentStep - 1)
  }

  const handleRange = (e: ChangeEvent<HTMLInputElement>) => {
    seekToStep(parseInt(e.target.value))
  }

  return (
    <Loader loading={loading}>
      <div className="container-fluid">
        <div className="row">
          <div className={`customCol col-md-9`}>
            <div className={`boardContaier mx-auto`}>
              <Board
                size={fetchedState.gameSummary.size}
                state={board}
                lastStep={steps[currentStep]}
              />
            </div>
          </div>
          <div className={`bgMain col-md-3`}>
            <h4 className="text-white"> Game menu:</h4>
            <div className="row">
              <div className="col-12 py-3">
                <label
                  htmlFor="customRange"
                  className="form-label text-white fs-5"
                >
                  Game process scroll
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max={fetchedState.events.length}
                  step="1"
                  id="customRange"
                  value={currentStep}
                  onChange={handleRange}
                />
                <label
                  htmlFor="customRange"
                  className="form-label text-white fs-5"
                >
                  Game step: {currentStep + 1}/{steps.length}
                </label>
              </div>
              <div className="col-12 mb-2">
                <div
                  className="btn-group w-100"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-lg btn-primary border-end border-2 d-flex justify-content-center text-white"
                    onClick={goPrev}
                    disabled={currentStep == 0}
                  >
                    <LeftArrow />
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary border-start border-2 d-flex justify-content-center text-white"
                    onClick={goNext}
                    disabled={currentStep == steps.length - 1}
                  >
                    <RightArrow />
                  </button>
                </div>
              </div>
              <span className="text-white fs-5 mb-2">Game step info:</span>
              <div className={`col-12 scrollMenu`}>
                <div className='scrollContent'>
                  <Steps currentStep={currentStep} steps={steps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  )
}
