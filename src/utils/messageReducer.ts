import { get, set } from 'idb-keyval'

import { isArchiveJoin } from '@type/messageTypeChecker'
import { DownsteamMessage } from '@type/messages'
import { SetTopFT, TopUserInfoT } from '@type/top'

export const reducerConstructor = (archiveJoinMethods: {
  setTopList: SetTopFT
}) => {
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
  }
}
