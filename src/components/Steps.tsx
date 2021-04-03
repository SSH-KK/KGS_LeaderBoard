import { ALPHABET_START_CHAR } from '@config/boardConfig'
import { IntersectionState } from '@type/board'
import { GameStepT } from '@type/game'
import React, { createRef, useEffect } from 'react'
import styles from '@styles/Game.module.css'

export interface IStepsProps {
  currentStep: number
  steps: GameStepT[]
}

const startCharCode = ALPHABET_START_CHAR.charCodeAt(0)

export const Steps = ({ currentStep, steps }: IStepsProps) => {
  const scrollMenu = createRef<HTMLDivElement>()

  useEffect(() => {
    if (scrollMenu.current && scrollMenu.current.offsetParent) {
      const new_scroll =
        (steps.length - currentStep) *
          (scrollMenu.current.offsetHeight / steps.length) -
        scrollMenu.current.offsetParent.clientHeight / 2
      scrollMenu.current.offsetParent.scrollTop = new_scroll
    }
  }, [currentStep])

  return (
    <div
      ref={scrollMenu}
      className={`d-flex flex-column text-secondary ${styles.roundedMenu}`}
    >
      {steps
        .slice()
        .reverse()
        .map((step, index) => {
          return (
            <span
              key={`step${index}`}
              className={`fs-5 p-1 ${
                index != steps.length - 1 ? 'border-bottom border-2' : ''
              } text-center ${
                index === steps.length - currentStep - 1
                  ? `${styles.activeInfo}`
                  : 'bg-light'
              }`}
            >
              x:{String.fromCharCode(startCharCode + step.loc.x)} y:
              {step.loc.y} COLOR:
              {step.color === IntersectionState.BLACK ? 'BLACK' : 'WHITE'}
            </span>
          )
        })}
    </div>
  )
}
