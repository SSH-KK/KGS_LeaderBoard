import React from 'react';

import {
  BoardCoord,
  BoardInner,
  Container,
  Inner,
  Intersection,
} from './Board.styles';
import { ALPHABET_START_CHAR } from '@config/boardConfig';

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
            .map((_, RowIndex) => (
              <div className="row">
                {Array(size)
                  .fill('')
                  .map((_, columnIndex) => (
                    <Intersection size={size}></Intersection>
                  ))}
              </div>
            ))}
        </BoardInner>
      </Inner>
    </Container>
  );
};
