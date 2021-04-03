import React, { useEffect } from 'react'

import { BoardCoord, BoardInner, Container, Inner } from './Board.styles'
import { ALPHABET_START_CHAR } from '@config/boardConfig'
import { Intersection } from '@components/Intersection'
import { BoardT } from '@type/board'
import { GameStepT } from '@type/game'

export interface IBoardProps {
  size: number
  state: BoardT
  lastStep: GameStepT
}

const startCharCode = ALPHABET_START_CHAR.charCodeAt(0)

export const Board = ({ size, state, lastStep }: IBoardProps) => {
  return (
    <Container>
      <Inner>
        <BoardCoord size={size}>
          {['top', 'bottom'].map((pos) => (
            <div key={`${pos}coord`} className={`board${pos}`}>
              {Array(size)
                .fill('')
                .map((_, i) => (
                  <div key={`${pos}${i}`} className="caption">
                    {String.fromCharCode(startCharCode + i)}
                  </div>
                ))}
            </div>
          ))}
          {['left', 'right'].map((pos) => (
            <div key={`${pos}coord`} className={`board${pos}`}>
              {Array(size)
                .fill('')
                .map((_, i) => (
                  <div key={`${pos}${i}`} className="caption">
                    {size - i}
                  </div>
                ))}
            </div>
          ))}
        </BoardCoord>
        <BoardInner size={size}>
          {Array(size)
            .fill('')
            .map((_, rowIndex) => (
              <div key={`${rowIndex}row`} className="boardRow">
                {Array(size)
                  .fill('')
                  .map((_, columnIndex) => (
                    <Intersection
                      key={`${columnIndex}column`}
                      size={size}
                      position={[rowIndex, columnIndex]}
                      state={state[rowIndex][columnIndex]}
                      last={
                        Object.values(lastStep.loc).toString() ==
                        [columnIndex, size - rowIndex].toString()
                      }
                    />
                  ))}
              </div>
            ))}
        </BoardInner>
      </Inner>
    </Container>
  )
}
