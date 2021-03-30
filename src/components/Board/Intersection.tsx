import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Stone } from './Stone';
import { IntersectionState } from './types';

export interface IntersectionProps extends StyledIntersectionProps {
  position: [number, number];
}

interface StyledIntersectionProps {
  size: number;
}

const StyledIntersection = styled.div<StyledIntersectionProps>`
  display: inline-block;
  height: 100%;
  position: relative;
  width: ${(props) => 100 / props.size}%;

  :before {
    border-top: 1px solid #a78a48;
    width: 100%;
    display: block;
    content: '';
    top: calc((100%-1) / 2);
    position: absolute;
    z-index: 0;
  }

  :after {
    border-left: 1px solid #a78a48;
    height: 100%;
    display: block;
    content: '';
    left: calc((100%-1) / 2);
    top: 0px;
    position: absolute;
    z-index: 1;
  }
`;

const StarDot = styled.div`
  position: absolute;
  height: 25%;
  width: 25%;
  border-radius: 100%;
  background-color: #957b40;
  top: 50%;
  left: 50%;
  margin-left: -12.5%;
  margin-top: -12.5%;
  z-index: 500;
`;

const checkIsStar = (size: number, x: number, y: number) => {
  if (size == 19)
    if ((x == 4 || x == 10 || x == 16) && (y == 4 || y == 10 || y == 16)) {
      return true;
    }
  if (size == 13)
    if ((x == 4 || x == 7 || x == 10) && (y == 4 || y == 7 || y == 10)) {
      return true;
    }
  if (size == 9)
    if ((x == 3 || x == 5 || x == 7) && (y == 3 || y == 5 || y == 7)) {
      return true;
    }

  return false;
};

export const Intersection = (args: IntersectionProps) => {
  const size = args.size;
  const [y, x] = args.position;

  const [isStar, setIsStar] = useState<boolean>(false);
  useEffect(() => setIsStar(checkIsStar(size, x + 1, y + 1)), [size]);

  const [state, setState] = useState<IntersectionState>(
    IntersectionState.EMPTY,
  );

  return (
    <StyledIntersection size={args.size}>
      {isStar && <StarDot />}
      {state != IntersectionState.EMPTY && <Stone colour={state} />}
    </StyledIntersection>
  );
};
