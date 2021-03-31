import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: #dfbd6d;
`

export const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export interface IBoardCoordProps {
  size: number
}

export const BoardCoord = styled.div<IBoardCoordProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .top,
  .left,
  .bottom,
  .right {
    position: absolute;
    text-align: center;
    color: #a78a48;
  }

  .top,
  .bottom {
    left: ${(props) => 100 / (props.size + 2)}%;
    right: ${(props) => 100 / (props.size + 2)}%;

    .caption {
      display: inline-block;
    }
  }

  .left,
  .right {
    top: ${(props) => 100 / (props.size + 2)}%;
    width: ${(props) => 100 / (props.size + 2)}%;
    bottom: ${(props) => 100 / (props.size + 2)}%;
    box-sizing: border-box;

    .caption {
      padding-top: 25%;
      height: ${(props) => 100 / props.size}%;
      width: 100%;
    }
  }

  .top {
    top: calc(${(props) => 100 / (props.size + 2) / 2}% - 9px);
  }

  .bottom {
    bottom: calc(${(props) => 100 / (props.size + 2) / 2}% - 9px);
  }

  .right {
    right: 0;
  }

  .caption {
    box-sizing: border-box;
    width: ${(props) => 100 / props.size}%;
    font-size: 18px;
    text-align: center;
    vertical-align: sub;
  }
`

export interface IBoardInnerProps {
  size: number
}

export const BoardInner = styled.div<IBoardInnerProps>`
  position: absolute;
  ${(props) =>
    ['top', 'left', 'bottom', 'right'].reduce(
      (collector, key) => collector + `\n${key}: ${100 / (props.size + 2)}%;`,
      ''
    )}

  .row {
    height: ${(props) => 100 / props.size}%;
  }
`
