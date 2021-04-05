import { get, set } from 'idb-keyval'

import {
  isArchiveJoin,
  isLoginSuccess,
  isGameJoin,
  isNoSuchUser,
  isWrongPassword,
} from '@type/messageTypeChecker'
import { GameSummaryT, FetchedEvent } from '@type/fetch'
import { DownsteamMessage } from '@type/messages'
import { SetTopFT, TopUserInfoT } from '@type/top'
import { SetStateFT } from '@type/utils'

export const reducerConstructor = (
  archiveJoinMethods: {
    setTopList: SetTopFT
  },
  login: {
    setLoginError: SetStateFT<string | undefined>
    setIsLoggedIn: SetStateFT<boolean>
  }
) => {
  return async (message: DownsteamMessage) => {
    if (isArchiveJoin(message)) {
      const { setTopList } = archiveJoinMethods

      const userInfo = get(message.user.name)

      const games = []

      for (let index = message.games.length - 1; index > 0; index--) {
        const game = message.games[index]

        if (!game.inPlay && game.score !== 'UNFINISHED') {
          games.push(game)

          if (games.length == 2) break
        }
      }

      const composedUser: TopUserInfoT = {
        ...(await userInfo),
        games,
      }

      set(composedUser.username, composedUser)
      setTopList((prev) => [...prev, composedUser])
    }

    if (isNoSuchUser(message))
      login.setLoginError('No such user. Recheck if and try again')

    if (isWrongPassword(message)) login.setLoginError('Wrong passsword')

    if (isLoginSuccess(message)) login.setIsLoggedIn(true)

    if (isGameJoin(message)) {
      const lastTimestamps = await get<string[]>('timestamp_query')
      const lastTimestamp = lastTimestamps![0]
      set('timestamp_query', lastTimestamps!.slice(1))
      const gameSummary = message.gameSummary
      let newGameSummary: GameSummaryT = {
        ...gameSummary,
        ...gameSummary.players,
      }
      const all_events = message.sgfEvents
        .slice(1)
        .filter((ob) => ob.type == 'PROP_GROUP_ADDED')
      const game_summary_keys: [
        'gameType',
        'komi',
        'size',
        'white',
        'black'
      ] = ['gameType', 'komi', 'size', 'white', 'black']
      const associated_keys = {
        MOVE: 'events',
        TERRITORY: 'points',
      }
      newGameSummary = Object.fromEntries(
        game_summary_keys.map((key) => [key, newGameSummary[key]])
      ) as GameSummaryT

      const sgfEvents: {
        events: FetchedEvent[]
        points: FetchedEvent[]
      } = {
        events: [],
        points: [],
      }
      all_events.forEach((ob) => {
        ob.props.forEach((prop) => {
          if (associated_keys.hasOwnProperty(prop.name)) {
            sgfEvents[
              associated_keys[prop.name as 'MOVE' | 'TERRITORY'] as
                | 'events'
                | 'points'
            ].push({
              position:
                typeof prop.loc === 'object'
                  ? (Object.values(prop.loc) as [number, number])
                  : prop.loc,
              color: prop.color,
            })
          }
        })
      })
      const ans = {
        gameSummary,
        ...sgfEvents,
      }
      set(`game_${lastTimestamp}`, ans)
    }
  }
}
