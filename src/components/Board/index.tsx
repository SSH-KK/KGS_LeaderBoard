import React from 'react';

import { BoardCoord, BoardInner, Container, Inner } from './Board.styles';
import { ALPHABET_START_CHAR } from '@config/boardConfig';
import { Intersection } from './Intersection';

export interface IBoardProps {
  size: number;
}

const startCharCode = ALPHABET_START_CHAR.charCodeAt(0);

export const Board = (args: IBoardProps) => {
  const { size } = args;

  return (
    <Container>
      <Inner>
        <BoardCoord size={args.size}>
          {['top', 'bottom'].map((pos) => (
            <div className={pos}>
              {Array(size)
                .fill('')
                .map((_, i) => (
                  <div className="caption">
                    {String.fromCharCode(startCharCode + i)}
                  </div>
                ))}
            </div>
          ))}
          {['left', 'right'].map((pos) => (
            <div className={pos}>
              {Array(size)
                .fill('')
                .map((_, i) => (
                  <div className="caption">{size - i}</div>
                ))}
            </div>
          ))}
        </BoardCoord>
        <BoardInner size={args.size}>
          {Array(size)
            .fill('')
            .map((_, rowIndex) => (
              <div className="row">
                {Array(size)
                  .fill('')
                  .map((_, columnIndex) => (
                    <Intersection
                      size={size}
                      position={[rowIndex, columnIndex]}
                    />
                  ))}
              </div>
            ))}
        </BoardInner>
      </Inner>
    </Container>
  );
};
