import React, { useState } from 'react';

import { BoardCoord, BoardInner, Container, Inner } from './Board.styles';
import { ALPHABET_START_CHAR } from '@config/boardConfig';
import { Intersection } from './Intersection';
import { useBoardState } from '@hooks/useBoardState';

export interface IBoardProps {
  size: number;
}

const startCharCode = ALPHABET_START_CHAR.charCodeAt(0);

export const Board = (args: IBoardProps) => {
  const { size } = args;

  const [state, setState] = useBoardState(size);

  return (
    <Container>
      <Inner>
        <BoardCoord size={args.size}>
          {['top', 'bottom'].map((pos) => (
            <div key={`${pos}coord`} className={pos}>
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
            <div key={`${pos}coord`} className={pos}>
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
        <BoardInner size={args.size}>
          {Array(size)
            .fill('')
            .map((_, rowIndex) => (
              <div key={`${rowIndex}row`} className="row">
                {Array(size)
                  .fill('')
                  .map((_, columnIndex) => (
                    <Intersection
                      key={`${columnIndex}column`}
                      size={size}
                      position={[rowIndex, columnIndex]}
                      state={state[rowIndex][columnIndex]}
                    />
                  ))}
              </div>
            ))}
        </BoardInner>
      </Inner>
    </Container>
  );
};
