import styled from 'styled-components'

import { IntersectionState } from '@type/board'
import { ColorT } from '@type/game'

export interface IStoneProps {
  colour: ColorT
}

export const Stone = styled.div<IStoneProps>`
  position: absolute;
  background-color: ${(props) =>
    props.colour == IntersectionState.BLACK ? '#333' : '#e8e8e8'};
  border-radius: 100%;
  height: 75%;
  width: 75%;
  margin-top: -37.5%;
  margin-left: -37.5%;
  top: 50%;
  left: 50%;
  z-index: 1000;

  :before {
    content: ' ';
    position: absolute;
    left: 2%;
    top: 2%;
    width: 96%;
    height: 96%;
    border-radius: 100%;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  }

  :after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: 80%;
    height: 80%;
    border-radius: 100%;
    background: ${(props) =>
      props.colour == IntersectionState.BLACK
        ? 'radial-gradient(ellipse at center, #505050 10%, rgba(80, 80, 80, 0) 55%)'
        : 'radial-gradient(ellipse at center, #fff 20%, hsla(0, 0%, 100%, 0) 70%)'};
  }
`
