import { getDBT, putDBT } from '@type/db'
import { isArchiveJoin } from '@type/messageTypeChecker'
import { DownsteamMessage } from '@type/messages'
import { TopUserInfoT } from '@type/top'

export const reducerConstructor = (iDB: { get: getDBT; put: putDBT }) => {
  return async (message: DownsteamMessage) => {
    console.log('Called reducer', message)
    if (isArchiveJoin(message)) {
      console.log('Started ARCHIVE_JOIN processing')
      const userInfo = await iDB.get<TopUserInfoT>('top', message.user.name)
      console.log('Got user info', userInfo)
      const games = []

      for (const game of message.games.reverse())
        if (!game.inPlay && game.score !== 'UNFINISHED') {
          games.push(game)
          if (games.length == 2) break
        }

      console.log('Processing games', userInfo, games)

      await iDB.put<TopUserInfoT>('top', {
        ...userInfo,
        games,
      })
    }
  }
}
