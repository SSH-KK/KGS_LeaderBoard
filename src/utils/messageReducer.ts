import { getDBT, putDBT } from '@type/db'
import { isArchiveJoin } from '@type/messageTypeChecker'
import { DownsteamMessage } from '@type/messageTypes'
import { TopUserInfoT } from '@type/top'

export const reducerConstructor = (iDB: { get: getDBT; put: putDBT }) => {
  return async (message: DownsteamMessage) => {
    if (isArchiveJoin(message)) {
      const userInfo = await iDB.get<TopUserInfoT>('top', message.user.name)
      const games = []

      for (const game of message.games)
        if (!game.inPlay && game.score !== 'UNFINISHED') games.push(game)

      await iDB.put<TopUserInfoT>('top', message.user.name, {
        ...userInfo,
        games,
      })
    }
  }
}
