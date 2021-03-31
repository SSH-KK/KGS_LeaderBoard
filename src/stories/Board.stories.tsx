import React from 'react'
import { Story } from '@storybook/react'

import { Board, IBoardProps } from '@components/Board'
import { initializeState } from '@hooks/useBoardState'

export default {
  title: 'Board',
  component: Board,
}

const Template: Story<IBoardProps> = (args) => <Board {...args} />

export const Primary = Template.bind({})

Primary.args = {
  size: 13,
  state: initializeState(13),
}
