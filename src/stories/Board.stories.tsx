import React from 'react';
import { Story } from '@storybook/react';

import { Board, IBoardProps } from '@components/Board';

export default {
  title: 'Board',
  component: Board,
};

const Template: Story<IBoardProps> = (args) => <Board {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  size: 12,
};
