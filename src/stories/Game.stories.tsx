import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react'

import { Game } from '@components/Game'
import { IFetchedGame } from '@type/fetch'
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
  state: (testState as unknown) as IFetchedGame,
}
