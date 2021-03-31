import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react'

import { Game } from '@components/Game'
import { GameInfoT } from '@type/game'
import testState from '../assets/test.json'

export default {
  title: 'Game',
  component: Game,
}

const Template: Story<ComponentProps<typeof Game>> = (args) => (
  <Game {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  timestamp: 'dfhjgfhgjf',
  state: testState as GameInfoT,
}
