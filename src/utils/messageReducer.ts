import { getDBT, putDBT,listDBT, deleteDBT } from '@type/db'
import { isArchiveJoin, isGameJoin } from '@type/messageTypeChecker'
import { DownsteamMessage } from '@type/messageTypes'
import { TopUserInfoT } from '@type/top'
import {FetchedEvent, IFetchedGame, GameSummaryT} from '@type/fetch'
import {associated_keys, game_summary_keys} from '@config/webConfig'

export const reducerConstructor = (iDB: { get: getDBT; put: putDBT, all:listDBT, dell:deleteDBT }) => {
  return async (message: DownsteamMessage) => {
    if (isArchiveJoin(message)) {
      // const userInfo = await iDB.get<TopUserInfoT>('top', message.user.name)
      // const games = []

      // for (const game of message.games)
      //   if (!game.inPlay && game.score !== 'UNFINISHED') games.push(game)

      // await iDB.put<TopUserInfoT>('top',{
      //   username: message.user.name,
      //   ...userInfo,
      //   games,
      // })
    }
    else if(isGameJoin(message)){
      const lastTimestamp = (await iDB.all('game_query'))[0]
      await iDB.dell('game_query',lastTimestamp)
      const gameSummary = message.gameSummary
      const all_events = message.sgfEvents.slice(1).filter((ob)=>ob.type=='PROP_GROUP_ADDED')
      const sgfEvents:{
        events:FetchedEvent[]
        points:FetchedEvent[]
      } = {
        events:[],
        points:[],
      }
      all_events.forEach((ob)=>{
        ob.props.forEach((prop)=>{
          if(associated_keys.hasOwnProperty(prop.name)){
            sgfEvents[associated_keys[prop.name as 'MOVE' | 'TERRITORY'] as 'events'|'points'].push({
              position: typeof prop.loc === 'object'? Object.values(prop.loc) as [number, number] : prop.loc,
              color:prop.color
            })
          }
        })
      })
      const res:IFetchedGame = {
        gameSummary: Object.fromEntries(game_summary_keys.map((key)=>[key,gameSummary[key]])) as GameSummaryT,
        ...sgfEvents
      }
      await iDB.put('game',{
        timestamp:lastTimestamp,
        ...res
      })
    }
  }
}
