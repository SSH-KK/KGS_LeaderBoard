import { getDBT, putDBT } from '@type/db'
import { isArchiveJoin } from '@type/messageTypeChecker'
import { DownsteamMessage } from '@type/messages'
import { TopUserInfoT } from '@type/top'
import { Dispatch, SetStateAction } from 'react'
import { LastGameT } from '@type/fetch'

export const reducerConstructor = (
  iDB: { get: getDBT; put: putDBT },
  setTopList: Dispatch<SetStateAction<TopUserInfoT[]>>
) => {
  return async (message: DownsteamMessage) => {
    if (isArchiveJoin(message)) {
      console.log('Started ARCHIVE_JOIN processing', message)
      // const userInfo = await iDB.get<TopUserInfoT>('top', message.user.name)
      // console.log('Got user info for reducer', userInfo)
      const games: LastGameT[] = []

      for (let index = message.games.length - 1; index > 0; index--) {
        const game = message.games[index]
        console.log('Processing game', game)
        if (!game.inPlay && game.score !== 'UNFINISHED') {
          console.log('Found good game')
          games.push(game)
          if (games.length == 2) break
        }
      }

      console.log('Processing games', games)

      // await iDB.put<TopUserInfoT>('top', {
      //   place: 0,
      //   rank: message.user.rank,
      //   username: message.user.name,
      //   games,
      // })

      const composedUser: TopUserInfoT = {
        place: 0,
        rank: message.user.rank,
        username: message.user.name,
        games,
      }

      console.log('Put', composedUser)

      setTopList((prev) => [...prev, composedUser])
    }
  }
}
