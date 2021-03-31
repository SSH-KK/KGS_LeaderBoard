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
  state: {
    gameSummary: {
      gameType: 'review',
      score: 'UNFINISHED',
      private: true,
      komi: 0.5,
      size: 19,
      players: {
        white: {
          name: 'cheater',
          rank: '9d',
        },
        black: {
          name: 'Fredda',
          rank: '8d',
        },
      },
    },
    sgfEvents: [
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 1,
        props: [
          {
            loc: {
              x: 12,
              y: 6,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 2,
        props: [
          {
            loc: {
              x: 3,
              y: 15,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 3,
        props: [
          {
            loc: {
              x: 6,
              y: 6,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 4,
        props: [
          {
            loc: {
              x: 9,
              y: 2,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 5,
        props: [
          {
            loc: {
              x: 9,
              y: 11,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 6,
        props: [
          {
            loc: {
              x: 12,
              y: 2,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 7,
        props: [
          {
            loc: {
              x: 2,
              y: 16,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 8,
        props: [
          {
            loc: {
              x: 3,
              y: 16,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 9,
        props: [
          {
            loc: {
              x: 2,
              y: 15,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 10,
        props: [
          {
            loc: {
              x: 3,
              y: 14,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 11,
        props: [
          {
            loc: {
              x: 2,
              y: 14,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 12,
        props: [
          {
            loc: {
              x: 3,
              y: 13,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 13,
        props: [
          {
            loc: {
              x: 2,
              y: 13,
            },
            color: 'black',
            name: 'MOVE',
          },
          {
            color: 'black',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
      {
        type: 'PROP_GROUP_ADDED',
        nodeId: 14,
        props: [
          {
            loc: {
              x: 3,
              y: 12,
            },
            color: 'white',
            name: 'MOVE',
          },
          {
            color: 'white',
            name: 'TIMELEFT',
            float: 10,
            int: 5,
          },
        ],
      },
    ],
  },
}
