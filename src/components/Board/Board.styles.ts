import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: #212529;
  border-radius: 0.25rem;
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

  .boardtop,
  .boardleft,
  .boardbottom,
  .boardright {
    position: absolute;
    text-align: center;
    color: #9B9D97;
  }

  .boardtop,
  .boardbottom {
    left: ${(props) => 100 / (props.size + 2)}%;
    right: ${(props) => 100 / (props.size + 2)}%;

    .caption {
      display: inline-block;
    }
  }

  .boardleft,
  .boardright {
    top: ${(props) => 100 / (props.size + 2)}%;
    width: ${(props) => 100 / (props.size + 2)}%;
    bottom: ${(props) => 100 / (props.size + 2)}%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .caption {
      width: 100%;
    }
  }

  .boardbottom {
    bottom: calc(${(props) => 100 / (props.size + 10) / 2}% - 9px);
  }

  .boardright {
    right: 0;
  }

  .caption {
    box-sizing: border-box;
    width: ${(props) => 100 / props.size}%;
    font-size: 1.25rem;
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

  .boardRow {
    height: ${(props) => 100 / props.size}%;
  }
`
